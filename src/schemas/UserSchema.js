//
// # UserSchema
//
// The `UserSchema` describes "user objects", which hold info common to all
// users in the system (students, staff, recruiters, ...).
//
// User documents make reference to a Firebase user id, as authentication is
// handled using Firebase Auth.
//
// Indexes:
//
// * `uid`: _unique_
// * `email`: _unique_
// * `email`, `name`, `github`, `linkedin`, `roles`: _text_
//
// Migration notes:
//
// Job placement stuff has been moved to separate collections.
//
// Fields managed in LMS Settings page:
//
// * `portfolio`, `aboutMe`, `available`, `recommendedAs`, `englishLevel`
//   are now in`GraduateProfileSchema`
// * `githubProjects` is now in `GraduateProfileProjectSchema`
//
// Fields menaged in cohort users admin page:
//
// * `lifeSkills` are now in `GraduateProfileLifeSkillSchema`
// * `recommendations` are now in `GraduateProfileEndorsementSchema`
//
const AcademicProfileSchema = require('./AcademicProfileSchema');

module.exports = (conn) => {
  const UserSchema = new conn.Schema({
    // `uid`: the user's Firebase user id. This is mainly used to link auth user
    // to user doc stored in MongoDB.
    uid: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
    },
    // use common `locale`???
    locale: {
      type: String,
      required: false,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    // `roles`: one can be admin AND trainingManager, for example.
    roles: [{
      type: String,
      enum: [
        // 'student',
        'admin',
        // 'trainingManager',
        // 'jobPlacement',
        // 'coach',
        // 'alumnaeManager',
        // 'finances',
      ],
    }],
    // `signupCohort` is a cohort slug (old firestore cohort ids). This
    // represents the cohort the user "applied" to when signing up.
    // Not sure if this gets updated if a user re-applies to a future cohort.
    // NOTE: Deprecated???
    signupCohort: {
      type: String,
      trim: true,
    },

    // student code ???

    //
    // Alumnae stuff!! TBD
    //
    // avatar: { type: String },
    // NOTE: status vs role? maybe a bit confusing? what about companies and guests?
    // status: {
    //   type: String,
    //   enum: ['applicant', 'student', 'alumnae', 'expelled', 'laboratorian'],
    // },
    // NOTE: what is the `githubToken` used for?? why is it here?
    // githubToken: { type: String },
    // NOTE: should this be called `campus`? How does this relate to `signupCohort`??
    // NOTE: campus slugs should match actual campus objects!!
    // NOTE: This prop is no encluded in migration script???
    // headquarter: {
    //   type: String,
    //   enum: ['MEX', 'GDL', 'SCL', 'LIM', 'SAP'], // SaoPaulo => SAP
    // },
    // Payment system data
    // NOTE: WHAT IS THIS? Why is it here??
    // paymentStart: Date,
    // NOTE: ????
    // currentJob: String, // Reference to UserJob collection
    academicProfile: {
      default: {},
      type: AcademicProfileSchema(conn),
    },
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });


  // Wildcard text index to match any string field in a user document
  // NOTE: do we need to index al ALL text fields??
  // UserSchema.index({ '$**': 'text' });
  UserSchema.index({
    email: 'text',
    name: 'text',
    github: 'text',
    linkedin: 'text',
    roles: 'text',
  });


  return UserSchema;
};
