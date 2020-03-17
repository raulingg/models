const ApplicationSchema = require('./ApplicationSchema');
const CampusSchema = require('./CampusSchema');
const CohortMembershipSchema = require('./CohortMembershipSchema');
const CohortPlatziCourseSchema = require('./CohortPlatziCourseSchema');
const CohortProjectSchema = require('./CohortProjectSchema');
const CohortSchema = require('./CohortSchema');
const CohortTopicSchema = require('./CohortTopicSchema');
const CohortTopicSettingsSchema = require('./CohortTopicSettingsSchema');
const GraduateProfileEndorsementSchema = require('./GraduateProfileEndorsementSchema');
const GraduateProfileLifeSkillSchema = require('./GraduateProfileLifeSkillSchema');
const GraduateProfileProjectSchema = require('./GraduateProfileProjectSchema');
const GraduateProfileSchema = require('./GraduateProfileSchema');
const OrganizationSchema = require('./OrganizationSchema');
const FeedbackSchema = require('./FeedbackSchema');
const ProjectProgressSchema = require('./ProjectProgressSchema');
const ProjectSchema = require('./ProjectSchema');
const ReviewerSurveySchema = require('./ReviewerSurveySchema');
const ReviewQuestionSchema = require('./ReviewQuestionSchema');
const TagSchema = require('./TagSchema');
const HiringProcessSchema = require('./HiringProcessSchema');
const JobOpportunitySchema = require('./JobOpportunitySchema');
const OrganizationMembershipSchema = require('./OrganizationMembershipSchema');
const TopicSchema = require('./TopicSchema');
const TopicUnitSchema = require('./TopicUnitSchema');
const TopicUnitPartSchema = require('./TopicUnitPartSchema');
const TopicProgressSchema = require('./TopicProgressSchema');
const TopicProgressStatSchema = require('./TopicProgressStatSchema');
const UserSchema = require('./UserSchema');
const UserActivityFeedEventSchemas = require('./UserActivityFeedEventSchemas');
const UserActivityLogSchema = require('./UserActivityLogSchema');

const { activities } = require('./UserActivityLogSchema');

module.exports = (conn, document) => ({
  ApplicationSchema: ApplicationSchema(conn),
  CampusSchema: CampusSchema(conn),
  CohortMembershipSchema: CohortMembershipSchema(conn),
  CohortPlatziCourseSchema: CohortPlatziCourseSchema(conn),
  CohortProjectSchema: CohortProjectSchema(conn),
  CohortSchema: CohortSchema(conn),
  CohortTopicSchema: CohortTopicSchema(conn),
  CohortTopicSettingsSchema: CohortTopicSettingsSchema(conn),
  GraduateProfileEndorsementSchema: GraduateProfileEndorsementSchema(conn),
  GraduateProfileLifeSkillSchema: GraduateProfileLifeSkillSchema(conn),
  GraduateProfileProjectSchema: GraduateProfileProjectSchema(conn),
  GraduateProfileSchema: GraduateProfileSchema(conn),
  OrganizationSchema: OrganizationSchema(conn),
  FeedbackSchema: FeedbackSchema(conn),
  ProjectProgressSchema: ProjectProgressSchema(conn),
  ProjectSchema: ProjectSchema(conn),
  ReviewerSurveySchema: ReviewerSurveySchema(conn),
  ReviewQuestionSchema: ReviewQuestionSchema(conn),
  TagSchema: TagSchema(conn),
  HiringProcessSchema: HiringProcessSchema(conn),
  JobOpportunitySchema: JobOpportunitySchema(conn),
  OrganizationMembershipSchema: OrganizationMembershipSchema(conn),
  TopicSchema: TopicSchema(conn),
  TopicUnitSchema: TopicUnitSchema(conn),
  // eslint-disable-next-line no-undef
  TopicUnitPartSchema: TopicUnitPartSchema(conn, document || (typeof window !== 'undefined' ? window : {}).document),
  TopicProgressSchema: TopicProgressSchema(conn),
  TopicProgressStatSchema: TopicProgressStatSchema(conn),

  UserSchema: UserSchema(conn),
  UserActivityFeedEventSchemas: UserActivityFeedEventSchemas(conn),
  UserActivityLogSchema: UserActivityLogSchema(conn),
  // enums
  activities,
});
