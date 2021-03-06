module.exports = (conn) => {
  const CohortTopicSchema = new conn.Schema({
    cohort: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Cohort',
      required: true,
    },
    topic: {
      type: conn.Schema.Types.ObjectId,
      ref: 'Topic',
      required: true,
    },
  }, { collection: 'cohort_topics' });

  return CohortTopicSchema;
};
