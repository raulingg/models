const { JSDOM } = require('jsdom');
const schemas = require('./src/schemas');
const Application = require('./src/Application');
const Campus = require('./src/Campus');
const Cohort = require('./src/Cohort');
const CohortMembership = require('./src/CohortMembership');
const CohortPlatziCourse = require('./src/CohortPlatziCourse');
const CohortProject = require('./src/CohortProject');
const CohortTopic = require('./src/CohortTopic');
const CohortTopicSettings = require('./src/CohortTopicSettings');
const GraduateProfile = require('./src/GraduateProfile');
const GraduateProfileEndorsement = require('./src/GraduateProfileEndorsement');
const GraduateProfileLifeSkill = require('./src/GraduateProfileLifeSkill');
const GraduateProfileProject = require('./src/GraduateProfileProject');
const HiringProcess = require('./src/HiringProcess');
const JobOpportunity = require('./src/JobOpportunity');
const Organization = require('./src/Organization');
const OrganizationMembership = require('./src/OrganizationMembership');
const Project = require('./src/Project');
const ProjectProgress = require('./src/ProjectProgress');
const Feedback = require('./src/Feedback');
const ReviewerSurvey = require('./src/ReviewerSurvey');
const ReviewQuestion = require('./src/ReviewQuestion');
const Tag = require('./src/Tag');
const Topic = require('./src/Topic');
const TopicUnit = require('./src/TopicUnit');
const TopicUnitPart = require('./src/TopicUnitPart');
const TopicProgress = require('./src/TopicProgress');
const TopicProgressStat = require('./src/TopicProgressStat');
const User = require('./src/User');
const UserActivityFeedModels = require('./src/UserActivityFeed');
const UserActivityLog = require('./src/UserActivityLog');

// enums
const { activities } = require('./src/schemas/UserActivityLogSchema');

module.exports = (conn) => {
  const {
    ApplicationSchema,
    CampusSchema,
    CohortSchema,
    CohortMembershipSchema,
    CohortPlatziCourseSchema,
    CohortProjectSchema,
    CohortTopicSchema,
    CohortTopicSettingsSchema,
    GraduateProfileSchema,
    GraduateProfileEndorsementSchema,
    GraduateProfileLifeSkillSchema,
    GraduateProfileProjectSchema,
    OrganizationSchema,
    OrganizationMembershipSchema,
    JobOpportunitySchema,
    HiringProcessSchema,
    ProjectSchema,
    ProjectProgressSchema,
    FeedbackSchema,
    ReviewerSurveySchema,
    ReviewQuestionSchema,
    TagSchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    TopicProgressSchema,
    TopicProgressStatSchema,
    UserSchema,
    UserActivityFeedEventSchemas,
    UserActivityLogSchema,
  } = schemas(conn, (new JSDOM()).window.document);

  return {
    Campus: Campus(conn, CampusSchema),
    Cohort: Cohort(conn, CohortSchema),
    Application: Application(conn, ApplicationSchema),
    CohortMembership: CohortMembership(conn, CohortMembershipSchema),
    CohortPlatziCourse: CohortPlatziCourse(conn, CohortPlatziCourseSchema),
    CohortProject: CohortProject(conn, CohortProjectSchema),
    CohortTopic: CohortTopic(conn, CohortTopicSchema),
    CohortTopicSettings: CohortTopicSettings(conn, CohortTopicSettingsSchema),
    GraduateProfile: GraduateProfile(conn, GraduateProfileSchema),
    GraduateProfileEndorsement: GraduateProfileEndorsement(conn, GraduateProfileEndorsementSchema),
    GraduateProfileProject: GraduateProfileProject(conn, GraduateProfileProjectSchema),
    GraduateProfileLifeSkill: GraduateProfileLifeSkill(conn, GraduateProfileLifeSkillSchema),
    Organization: Organization(conn, OrganizationSchema),
    OrganizationMembership: OrganizationMembership(conn, OrganizationMembershipSchema),
    JobOpportunity: JobOpportunity(conn, JobOpportunitySchema),
    HiringProcess: HiringProcess(conn, HiringProcessSchema),
    Project: Project(conn, ProjectSchema),
    ProjectProgress: ProjectProgress(conn, ProjectProgressSchema),
    Feedback: Feedback(conn, FeedbackSchema),
    ReviewerSurvey: ReviewerSurvey(conn, ReviewerSurveySchema),
    ReviewQuestion: ReviewQuestion(conn, ReviewQuestionSchema),
    Tag: Tag(conn, TagSchema),
    Topic: Topic(conn, TopicSchema),
    TopicUnit: TopicUnit(conn, TopicUnitSchema),
    TopicUnitPart: TopicUnitPart(conn, TopicUnitPartSchema),
    TopicProgress: TopicProgress(conn, TopicProgressSchema),
    TopicProgressStat: TopicProgressStat(conn, TopicProgressStatSchema),
    User: User(conn, UserSchema),
    UserActivityFeedEvents: UserActivityFeedModels(conn, UserActivityFeedEventSchemas),
    UserActivityLog: UserActivityLog(conn, UserActivityLogSchema),
    ApplicationSchema,
    CampusSchema,
    CohortSchema,
    CohortMembershipSchema,
    CohortPlatziCourseSchema,
    CohortProjectSchema,
    CohortTopicSchema,
    CohortTopicSettingsSchema,
    GraduateProfileSchema,
    GraduateProfileEndorsementSchema,
    GraduateProfileLifeSkillSchema,
    GraduateProfileProjectSchema,
    OrganizationSchema,
    OrganizationMembershipSchema,
    JobOpportunitySchema,
    HiringProcessSchema,
    ProjectSchema,
    ProjectProgressSchema,
    FeedbackSchema,
    ReviewerSurveySchema,
    ReviewQuestionSchema,
    TagSchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    UserSchema,
    UserActivityFeedEventSchemas,
    UserActivityLogSchema,
  };
};


// Enums
module.exports.enums = {
  USER_ACTIVITY: activities,
};
