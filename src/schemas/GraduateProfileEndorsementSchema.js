//
// # GraduateProfileEndorsementSchema
//
// This schema describes the endorsements Laboratoria staff (and hopefully 3rd
// parties) give our students. These are shown under the "Recommendations"
// section in the Job Placement app: https://app.talento.laboratoria.la/
//
// This data is managed by cohort admins via the cohort users management page in
// the LMS.
//
// Indexes:
//
// * `user`: Basic index to enhance filtering by student. Note that this index
//   is NOT _unique_, which means that a given student can have many
//   endorsements.
// * `endorsedBy`: Basic index to enhance filtering by `endorsedBy`. Note that
//   this index is NOT _unique_, which means that a given user can endorse many
//   students.
// * `user/endorsedBy`: A _unique_ compound index that ensures that a
//   given user can only endorse a given student once.
//
// Migration notes:
//
// * `user`: Previously the _key_ in the main `user` object.
// * `endorsedBy`: Previously we had the keys (uids) in the `recommendations`
//   object as well as two text fields (`author` and `authorLinkedin`) and now
//   we only store an ObjectId pointing to the author's
//   `User` document in the database, which in turn contains the user's name and
//   linkedin as well as other user details.
// * `text`: Previously known as `detail`.
//
// Example old recommendations in Firestore:
//
// "recommendations": {
//   "G9MyfnFrC8ViXCl3MQjX6bnqeEO2": {
//     "author": "Lupo"
//     "authorLinkedin": "lupomontero",
//     "company": "Laboratoria",
//     "companyUrl": "www.laboratoria.la",
//     "detail": "Una recomendación...",
//   }
// }
//
// Example new student profile endorsements:
//
// [
//   {
//     "user": "ObjectId",
//     "endorsedBy": "ObjectId",
//     "text": "Blah blah blah..."
//   }
// ]
//

module.exports = (conn) => {
  const GraduateProfileEndorsementSchema = new conn.Schema({
    user: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    endorsedBy: {
      type: conn.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    text: {
      type: String,
      trim: true,
    },
  }, { collection: 'graduate_profile_endorsements', timestamps: true });

  GraduateProfileEndorsementSchema.index(
    { user: 1, endorsedBy: 1 },
    { unique: true },
  );

  return GraduateProfileEndorsementSchema;
};
