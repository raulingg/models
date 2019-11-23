const mongoose = require('mongoose/browser');
const ApplicationSchema = require('../ApplicationSchema')(mongoose);
const CohortSchema = require('../CohortSchema')(mongoose);

describe('ApplicationSchema', () => {
  it('should fail validation when fields are missing', () => {
    const doc = new mongoose.Document({}, ApplicationSchema);
    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should fail validation when some of fields are invalid', () => {
    const cohort = new mongoose.Document({}, CohortSchema);
    const doc = new mongoose.Document(
      {
        cohort: cohort._id,
        email: 'test@example.com',
        identificationNumber: '45487844',
        name: 'Test',
        familyName: 'Laboratoria',
        appliedAt: 'notDate',
        referralSource: 'Facebook',
        passed: 'notBoolean',
        mobileNumber: '45254778',
      },
      ApplicationSchema,
    );

    expect(doc.validateSync().errors).toMatchSnapshot();
  });

  it('should pass validation when fields are valid', () => {
    const cohort = new mongoose.Document({}, CohortSchema);
    const doc = new mongoose.Document(
      {
        cohort: cohort._id,
        email: 'test@example.com',
        identificationNumber: '45487844',
        name: 'Test',
        familyName: 'Laboratoria',
        appliedAt: new Date('2019-06-06'),
        referralSource: 'Facebook',
        passed: true,
        mobileNumber: '45254778',
        isReturningApplicant: false,
      },
      ApplicationSchema,
    );

    return doc.validate();
  });
});
