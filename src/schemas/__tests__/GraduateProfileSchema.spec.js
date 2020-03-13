const mongoose = require('mongoose/browser');

const { Schema } = mongoose;

const { GraduateProfileSchema, UserSchema } = require('../')(mongoose);

describe('GraduateProfileSchema', () => {
  it('should fail validation when fields missing', () => {
    const doc = new mongoose.Document({}, GraduateProfileSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should successfully validate with proper values with HubspotReference', (done) => {
    const user = new mongoose.Document({}, UserSchema);
    const WorkReferenceSchema = new Schema({
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      url: {
        type: String,
        trim: true,
        required: true,
      },
    });
    const createdBy = new mongoose.Document({
      uid: 'xxxxxxxxxx',
      email: 'foo@bar.baz',
    }, UserSchema);

    const workReference = new mongoose.Document({
      createdBy: createdBy._id,
      url: 'https://www.hubspot.com/test',
    }, WorkReferenceSchema);

    const graduateProfile = new mongoose.Document({
      user: user._id,
      workReferences: [workReference],
    }, GraduateProfileSchema);

    graduateProfile.validate((err) => {
      expect(err).toBe(null);
      done();
    });
  });
});
