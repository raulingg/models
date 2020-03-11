const mongoose = require('mongoose/browser');
const AcademicProfileSchema = require('../AcademicProfileSchema')(mongoose);
const AcademicProfileTagSchema = require('../AcademicProfileTagSchema')(mongoose);
const AcademicProfileCommentSchema = require('../AcademicProfileCommentSchema')(mongoose);
const UserSchema = require('../UserSchema')(mongoose);
const TagSchema = require('../TagSchema')(mongoose);

describe('AcademicProfileSchema', () => {
  it('should fail with empty embedded documents', (done) => {
    const tag = new mongoose.Document({}, AcademicProfileTagSchema);
    const comment = new mongoose.Document({}, AcademicProfileCommentSchema);

    const doc = new mongoose.Document({
      tags: [tag],
      comments: [comment],
    }, AcademicProfileSchema);

    return doc.validate((err) => {
      expect(err).toMatchSnapshot();
      done();
    });
  });

  it('should successfully validate with proper values with tag', (done) => {
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const tag = new mongoose.Document({}, TagSchema);
    const academicProfileTag = new mongoose.Document({
      createdBy: createdBy._id,
      tag: tag._id,
      assignmentReason: 'foo',
    }, AcademicProfileTagSchema);

    const doc = new mongoose.Document({
      tags: [academicProfileTag],
    }, AcademicProfileSchema);

    return doc.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
