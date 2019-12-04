/**
 * This baseline comes from the admission process.
 * Once an applicant makes progress over the unit 1 of the admission course,
 * her baseline data gets stored into a firestore collection called `baseline`,
 * but it doesn't get stored into MongoDB.
 * So, This schema is necessary to store such data into MongoDB.
 */
module.exports = (conn) => {
  const BaselineSchema = new conn.Schema({
    membership: {
      type: conn.Schema.Types.ObjectId,
      ref: 'CohortMembership',
      required: true,
      unique: true,
    },
    email: { type: String, required: true },
    cohortId: { type: String, required: true, index: true }, // Cohort slug
    questionnaire: {},
    score: { type: Number },
    createdAt: { type: Date, default: Date.now() },
  });


  return BaselineSchema;
};
