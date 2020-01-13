const { JSDOM } = require('jsdom');
const schemas = require('./src/schemas');
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
const Organization = require('./src/Organization');
const OrganizationMembership = require('./src/OrganizationMembership');
const JobOpportunity = require('./src/JobOpportunity');
const HiringProcess = require('./src/HiringProcess');
const Project = require('./src/Project');
const ProjectFeedback = require('./src/ProjectFeedback');
const ReviewerSurvey = require('./src/ReviewerSurvey');
const ReviewQuestion = require('./src/ReviewQuestion');
const Tag = require('./src/Tag');
const Endorsement = require('./src/Endorsement');
const Topic = require('./src/Topic');
const TopicUnit = require('./src/TopicUnit');
const TopicUnitPart = require('./src/TopicUnitPart');
const User = require('./src/User');
const UserActivityFeedModels = require('./src/UserActivityFeed');
const Application = require('./src/Application');


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
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    ReviewQuestionSchema,
    TagSchema,
    EndorsementSchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    UserSchema,
    UserActivityFeedEventSchemas,
  } = schemas(conn, (new JSDOM()).window.document);

  return {
    Application: Application(conn, ApplicationSchema),
    Campus: Campus(conn, CampusSchema),
    Cohort: Cohort(conn, CohortSchema),
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
    ProjectFeedback: ProjectFeedback(conn, ProjectFeedbackSchema),
    ReviewerSurvey: ReviewerSurvey(conn, ReviewerSurveySchema),
    ReviewQuestion: ReviewQuestion(conn, ReviewQuestionSchema),
    Tag: Tag(conn, TagSchema),
    Endorsement: Endorsement(conn, EndorsementSchema),
    Topic: Topic(conn, TopicSchema),
    TopicUnit: TopicUnit(conn, TopicUnitSchema),
    TopicUnitPart: TopicUnitPart(conn, TopicUnitPartSchema),
    User: User(conn, UserSchema),
    UserActivityFeedEvents: UserActivityFeedModels(conn, UserActivityFeedEventSchemas),
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
    ProjectFeedbackSchema,
    ReviewerSurveySchema,
    ReviewQuestionSchema,
    TagSchema,
    EndorsementSchema,
    TopicSchema,
    TopicUnitSchema,
    TopicUnitPartSchema,
    UserSchema,
    UserActivityFeedEventSchemas,
  };
};
