const mongoose = require('mongoose');
const {
  Campus,
  Cohort,
  CohortProject,
  User,
  Tag,
  Project,
} = require('../../')(mongoose);


describe('User', () => {
  let campus;
  let cohort;
  let project;
  let user;


  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await User.createIndexes();

    project = new Project({
      slug: 'cipher',
      repo: 'Laboratoria/curricula-js',
      path: 'projects/01-cipher',
      version: '2.0.0',
      parserVersion: '1.1.1',
      createdAt: new Date(),
      prefix: 1,
      title: 'Cifrado César',
      rubric: '2',
      locale: 'es-ES',
      track: 'js',
      skills: {},
    });

    campus = new Campus({
      slug: 'lim',
      name: 'Lima',
      locale: 'es-PE',
      timezone: 'America/Lima',
      active: true,
    });

    cohort = new Cohort({
      slug: 'lim-2017-09-bc-core-am',
      campus: campus._id,
      program: 'bc',
      track: 'core',
      name: 'am',
      generation: 1,
      start: new Date(),
      end: new Date(),
    });

    user = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@somewhere.com',
      name: 'Someone',
    });

    await campus.save();
    await cohort.save();
    await user.save();
    await project.save();
  });

  it('should ony require uid, email and name??', () => {
    const doc = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz1',
      email: 'other@somewhere.com',
      name: 'other',
    });

    return doc.save()
      .then((result) => {
        expect(result.uid).toBe('abcdefghijklmnopqrstuvwxyz1');
        expect(result.email).toBe('other@somewhere.com');
        expect(result.name).toBe('other');
        expect(Array.isArray(result.roles)).toBe(true);
        expect(result.roles.length).toBe(0);
      });
  });

  it('should fail given an AcademicProfile Tag with missing createdBy', async () => {
    const tag = new Tag({ i18nId: 'foo' });
    const doc = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@someone',
      name: 'Someone',
      academicProfile: {
        tags: [
          {
            createdBy: new User(),
            assignmentReason: 'xxxxx',
            tag: tag._id,
          },
        ],
      },
    });

    await tag.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('CreatedBy does not exist');
      });
  });

  it('should fail given an AcademicProfile Tag with missing tag', async () => {
    const doc = new User({
      uid: 'abcd',
      email: 'other@other',
      name: 'other',
      academicProfile: {
        tags: [
          {
            createdBy: user._id,
            assignmentReason: 'xxxxx',
            tag: new Tag(),
          },
        ],
      },
    });

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('Tag does not exist');
      });
  });

  it('should fail given an AcademicProfile Comments with missing createdBy', async () => {
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    const doc = new User({
      uid: 'abcdefghijklmnopqrstuvwxyz',
      email: 'someone@someone',
      name: 'Someone',
      academicProfile: {
        comments: [
          {
            createdBy: new User(),
            cohortProject: cohortProject._id,
            type: 'tech',
            text: 'foo',
          },
        ],
      },
    });

    await cohortProject.save();

    return doc.save()
      .catch((err) => {
        expect(err.message).toBe('CreatedBy does not exist');
      });
  });

  it('should fail given an AcademicProfile comments with missing cohortProject', async () => {
    const doc = new User({
      uid: 'abcd',
      email: 'other@other',
      name: 'Other',
      academicProfile: {
        comments: [
          {
            createdBy: user._id,
            cohortProject: 'cohortProject._id',
            type: 'tech',
            i18nId: 'foo',
          },
        ],
      },
    });

    return doc.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail given an AcademicProfile comments with type other', async () => {
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    const doc = new User({
      uid: 'abcd',
      email: 'other@other',
      name: 'Other',
      academicProfile: {
        comments: [
          {
            createdBy: user._id,
            cohortProject: cohortProject._id,
            type: 'other',
            text: 'foo',
          },
        ],
      },
    });

    await cohortProject.save();

    return doc.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });

  it('should fail given an AcademicProfile comments with missing text', async () => {
    const cohortProject = new CohortProject({
      cohort: cohort._id,
      project: project._id,
    });

    const doc = new User({
      uid: 'abcd',
      email: 'other@other',
      name: 'Other',
      academicProfile: {
        comments: [
          {
            createdBy: user._id,
            cohortProject: cohortProject._id,
            type: 'tech',
          },
        ],
      },
    });

    await cohortProject.save();

    return doc.save()
      .catch(err => expect(err.message).toMatchSnapshot());
  });
});
