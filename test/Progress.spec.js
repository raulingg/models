const mongoose = require('mongoose');
const {
  Campus, Cohort, User, CohortTopic, Progress, Topic, TopicUnit, TopicUnitPart,
} = require('..')(mongoose);
const babelJson = require('./fixtures/topics/babel.json');

const createTestUser = () => {
  const user = new User({
    uid: 'abcdefghijklmnopqrstuvwxyz',
    email: 'someone@somewhere.com',
    name: 'Someone',
  });
  return user.save();
};

const createTestTopic = () => (new Topic(babelJson)).save();

const createTestCohort = async () => {
  const campusModel = new Campus({
    slug: 'lim',
    name: 'Lima',
    locale: 'es-PE',
    timezone: 'America/Lima',
    active: true,
  });
  const campus = await campusModel.save();

  const cohortModel = new Cohort({
    slug: 'lim-2017-09-bc-core-am',
    campus: campus._id,
    program: 'bc',
    track: 'core',
    name: 'am',
    generation: 9,
    start: new Date(),
    end: new Date(),
  });

  return cohortModel.save();
};

const createTestCohortTopic = async () => {
  const cohort = await createTestCohort();
  const topic = await createTestTopic();
  return (new CohortTopic({
    cohort: cohort._id,
    topic: topic._id,
  })).save();
};

describe('Progress', () => {
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();
    await Topic.createIndexes();
    await TopicUnit.createIndexes();
  });

  it('should fail when cohort topic does not exist', async () => {
    const user = await createTestUser();
    const progress = new Progress({
      cohortTopic: (new CohortTopic({}))._id,
      user: user._id,
    });

    return progress.save()
      .catch(err => expect(err.message).toBe('Cohort Topic does not exist'));
  });

  it('should fail when user does not exist', async () => {
    const cohortTopic = await createTestCohortTopic();
    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: (new User({}))._id,
    });

    return progress.save()
      .catch(err => expect(err.message).toBe('User does not exist'));
  });

  it('should fail when unit does not exist', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();
    const nonexistentUnit = (new TopicUnit({}))._id;

    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
      units: [
        { unit: nonexistentUnit },
      ],
    });

    return progress.save()
      .catch(err => expect(err.message).toBe('Unit id does not exist'));
  });

  it('should fail when part does not exist', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();
    const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });
    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
      units: topic.syllabus.map(unit => ({
        unit: unit._id,
        parts: [{ part: (new TopicUnitPart({}))._id }],
      })),
    });

    return progress.save()
      .catch(err => expect(err.message).toBe('Part id does not exist'));
  });

  it('should save progress', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();

    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
    });

    await progress.save();
    const doc = await Progress.findById(progress._id);

    expect(doc.toJSON()).toMatchSnapshot({
      _id: expect.any(Object),
      cohortTopic: expect.any(Object),
      user: expect.any(Object),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should update a progress', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();

    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
    });

    await progress.save();
    await Progress.update({ _id: progress._id }, { percent: 5 });
    const updatedProgress = await Progress.findById(progress._id);

    expect(updatedProgress.percent).toBe(5);
    expect(updatedProgress.updatedAt).not.toBe(progress.updatedAt);
  });

  it('should add a reading part to a unit', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();
    const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });

    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
      units: [{
        unit: topic.syllabus[0]._id,
        parts: topic.syllabus[0].parts.map(part => ({ part: part._id })),
      }],
    });

    await progress.save();
    const newProgress = await Progress.findById(progress._id);

    const partIdToAdd = topic.syllabus[1].parts[0]._id;
    newProgress.units[0].parts.push({ part: partIdToAdd });
    await newProgress.save();
    const updatedProgress = await Progress.findById(newProgress._id);
    const obj = updatedProgress.toJSON();

    expect(obj.units[0].parts.length).toBe(4);
    expect(obj.units[0].parts[3].part).toEqual(partIdToAdd);
  });

  it('should add a unit with part included', async () => {
    const user = await createTestUser();
    const cohortTopic = await createTestCohortTopic();
    const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });

    const progress = new Progress({
      cohortTopic: cohortTopic._id,
      user: user._id,
    });

    await progress.save();
    const newProgress = await Progress.findById(progress._id);

    newProgress.units.push({
      unit: topic.syllabus[1]._id,
      parts: topic.syllabus[1].parts.map(part => ({ part: part._id, completedAt: Date.now() })),
    });
    await newProgress.save();
    const updatedProgress = await Progress.findById(newProgress._id);
    const { units } = updatedProgress.toJSON();

    expect(units.length).toBe(1);
    expect(units[0].unit).toEqual(topic.syllabus[1]._id);
    expect(units[0].parts[0].part).toEqual(topic.syllabus[1].parts[0]._id);
  });

  describe('Completeness', () => {
    it('should add completeness keys when a part is gonna be completed', async () => {
      const user = await createTestUser();
      const cohortTopic = await createTestCohortTopic();
      const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });

      const progress = new Progress({
        cohortTopic: cohortTopic._id,
        user: user._id,
        units: [{
          unit: topic.syllabus[0]._id,
          parts: [{
            part: topic.syllabus[0].parts[0]._id,
            completedAt: Date.now(),
          }],
        }],
      });

      await progress.save();
      const newProgress = await Progress.findById(progress._id);
      const obj = newProgress.toJSON();

      expect({
        completedUnits: obj.completedUnits,
        completedDuration: obj.completedDuration,
        completedAt: null,
        percent: obj.percent,
      }).toMatchSnapshot('Overall Completeness');

      expect({
        completedParts: obj.units[0].completedParts,
        completedDuration: obj.units[0].completedDuration,
        completedAt: null,
        percent: obj.units[0].percent,
      }).toMatchSnapshot('Completeness over unit');
    });

    it('should complete unit when all its parts are gonna be completed', async () => {
      const user = await createTestUser();
      const cohortTopic = await createTestCohortTopic();
      const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });

      const progress = new Progress({
        cohortTopic: cohortTopic._id,
        user: user._id,
        units: [{
          unit: topic.syllabus[1]._id,
          parts: [{
            part: topic.syllabus[1].parts[0]._id,
            completedAt: Date.now(),
          }],
        }],
      });

      await progress.save();
      const newProgress = await Progress.findById(progress._id);
      const obj = newProgress.toJSON();

      expect({
        completedParts: obj.units[0].completedParts,
        completedDuration: obj.units[0].completedDuration,
        completedAt: expect.any(Date),
        percent: 100,
      }).toMatchSnapshot('Completeness over unit');
    });

    it('should complete progress when all its units are gonna be completed', async () => {
      const user = await createTestUser();
      const cohortTopic = await createTestCohortTopic();
      const topic = await Topic.findOnePopulated({ _id: cohortTopic.topic });

      const progress = new Progress({
        cohortTopic: cohortTopic._id,
        user: user._id,
        units: [{
          unit: topic.syllabus[0]._id,
          parts: topic.syllabus[0].parts.map(part => ({ part: part._id, completedAt: Date.now() })),
        }],
      });

      await progress.save();
      const newProgress = await Progress.findById(progress._id);

      newProgress.units.push({
        unit: topic.syllabus[1]._id,
        parts: topic.syllabus[1].parts.map(part => ({ part: part._id, completedAt: Date.now() })),
      });
      await newProgress.save();
      const updatedProgress = await Progress.findById(newProgress._id);
      const obj = updatedProgress.toJSON();

      expect({
        completedUnits: obj.completedUnits,
        completedDuration: obj.completedDuration,
        completedAt: expect.any(Date),
        percent: 100,
      }).toMatchSnapshot('Overall Completeness');
    });
  });
});
