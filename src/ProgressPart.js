module.exports = (conn, ProgressPartSchema) => conn.model('ProgressPart', ProgressPartSchema);

/**
 * I'd like to keep the below code, because it's part of my proposal
 */
// const { TopicUnitPart } = conn.models;

// ProgressPartSchema.virtual('assessments', {
//   ref: doc => doc.assessmentModel,
//   localField: '_id',
//   foreignField: 'progressPartId',
//   justOne: false,
// });

// ProgressPartSchema.pre('save', function (next) {
//   return TopicUnitPart.findById(this.part)
//     .then((part) => {
//       if (!part || !['quiz', 'practice'].includes(part.type)) {
//         next();
//       }

//       this.assessmentModel = part.type === 'quiz' ? 'QuizAssessment' : 'ExerciseAssessment';
//       next();
//     })
//     .catch(next);
// });
