/* eslint-disable no-return-assign */

const calculateCompletenessOverUnit = parts => parts.reduce(
  ([countMemo, durationMemo], progressPart) => (progressPart.completedAt
    ? [countMemo + 1, durationMemo + progressPart.part.duration]
    : [countMemo, durationMemo]),
  [0, 0],
);

const calculateCompletenessOverall = units => units.reduce(
  ([completedUnitsMemo, completedDurationMemo], { completedDuration, completedAt }) => [
    completedAt ? completedUnitsMemo + 1 : completedUnitsMemo,
    completedDurationMemo + completedDuration,
  ], [0, 0],
);

module.exports = (conn, ProgressSchema) => {
  ProgressSchema.post('validate', function (doc, next) {
    const {
      User, CohortTopic, ProgressUnit, ProgressPart,
    } = conn.models;

    Promise.all([
      User.findById(this.user),
      CohortTopic.findById(this.cohortTopic),
      ProgressUnit.populate(this.units, 'unit'),
      ...this.units.map(progressUnit => ProgressPart.populate(progressUnit.parts, 'part')),
    ])
      .then(([user, cohortTopic]) => {
        if (!user) {
          return next(new Error('User does not exist'));
        }

        if (!cohortTopic) {
          return next(new Error('Cohort Topic does not exist'));
        }

        if (this.units.some(({ unit }) => !(unit && unit._id))) {
          return next(new Error('Unit id does not exist'));
        }

        const nonexistingPart = this.units.some(
          ({ parts }) => parts.some(({ part }) => !(part && part._id)),
        );

        if (nonexistingPart) {
          return next(new Error('Part id does not exist'));
        }

        return next();
      })
      .catch(next);
  });

  ProgressSchema.pre('save', async function (next) {
    const { CohortTopic } = conn.models;
    const { topic } = await CohortTopic
      .findById(this.cohortTopic)
      .populate({ path: 'topic', select: 'stats' });

    this.units
      // Get only uncompleted units
      .filter(({ completedAt }) => !completedAt)
      // Get units which are being completed
      .filter(({ unit, parts }) => unit.stats.partCount === parts.length && parts.every(
        ({ completedAt }) => !!completedAt,
      ))
      // complete units by setting completedAt
      .forEach((completedProgressUnit) => {
        const key = this.units.findIndex(({ _id }) => _id === completedProgressUnit._id);
        this.units[key].completedAt = Date.now();
      });

    // Set completeness for each unit
    this.units.forEach(({ unit, parts }, key) => {
      const [completedParts, completedDurationOverUnit] = calculateCompletenessOverUnit(parts);
      this.units[key].completedDuration = completedDurationOverUnit;
      this.units[key].completedParts = completedParts;
      this.units[key].percent = Math.round(completedDurationOverUnit / unit.stats.duration * 100);
    });

    // Set completeness overall
    const [completedUnits, completedDurationOverall] = calculateCompletenessOverall(this.units);
    this.completedUnits = completedUnits;
    this.completedDuration = completedDurationOverall;
    this.percent = Math.round(completedDurationOverall / topic.stats.duration * 100);

    if (topic.stats.unitCount === completedUnits) {
      this.completedAt = Date.now();
    }

    next();
  });

  return conn.model('Progress', ProgressSchema);
};
