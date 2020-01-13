module.exports = (conn, ApplicationSchema) => {
  const { Cohort } = conn.models;
  ApplicationSchema.pre('save', function (next) {
    Cohort.findOne({ slug: this.cohortSlug })
      .then(cohort => (!cohort
        ? next(
          Object.assign(
            new Error(`Cohort "${this.cohortSlug}" does not exist`),
            {
              name: 'ValidationError',
              errors: { cohort: new Error(`Cohort "${this.cohortSlug}" does not exist`) },
            },
          ),
        )
        : next()))
      .catch(next);
  });
  return conn.model('Application', ApplicationSchema);
};
