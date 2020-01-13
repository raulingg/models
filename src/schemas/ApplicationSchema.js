module.exports = (conn) => {
  const transform = (doc, { id, cohortRef, ...rest }) => {
    if (cohortRef && cohortRef.campus && cohortRef.campus.name) {
      return Object.assign(rest, { city: cohortRef.campus.name });
    }

    return rest;
  };
  const ApplicationSchema = new conn.Schema({
    cohortSlug: { type: String, required: true },
    email: { type: String, required: true, index: true },
    identificationNumber: { type: String, required: true },
    name: { type: String, required: true },
    familyName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    passed: { type: Boolean, required: true },
    appliedAt: { type: Date, default: Date.now() },
    referralSource: { type: String },
    isReturningApplicant: { type: Boolean, default: false },
  }, { versionKey: false, toJSON: { transform } });

  ApplicationSchema.index({ cohort: 1, email: 1 });

  ApplicationSchema.virtual('cohort', {
    ref: 'Cohort',
    localField: 'cohortSlug',
    foreignField: 'slug',
    justOne: true,
  });

  return ApplicationSchema;
};
