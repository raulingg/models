# Laboratoria/schemas


This repository contains the shared _entities_ used throughout the different
Laboratoria systems (`curriculum-parser`, `api.laboratoria.la`,
`lms.laboratoria.ls`, ...).

This module is designed to work both in the browser and with Node.js.

In order to use the module, you will need to provide an instance of `mongoose`
or `mongoose/browser`.


## Usage

### Browser

```js
import mongoose from 'mongoose/browser';
import schemas from 'schemas';

const { CampusSchema } = schemas(mongoose);

const doc = new mongoose.Document({}, CampusSchema);

doc.validate()
  .then(console.log)
  .catch(console.error);
```

### Node.js


```js
const mongoose = require('mongoose');
const { ProjectSchema } = require('schemas')(mongoose);

const Project = mongoose.model('Project', ProjectSchema);

const project = new Project({});

project.validate()
  .then(console.log)
  .catch(console.error);
```

## Common types

* `slug`
* `locale`
* `program`
* `track`
* `semverVersion`

[View source](./common.js).

## Schemas

### Application

* [`ApplicationSchema`](./ApplicationSchema.js)

### Campuses

* [`CampusSchema`](./CampusSchema.js)

### Cohorts

* [`CohortSchema`](./CohortSchema.js)
* [`CohortMembershipSchema`](./CohortMembershipSchema.js)
* [`CohortProjectSchema`](./CohortProjectSchema.js)
* [`CohortTopicSchema`](./CohortTopicSchema.js)
* [`CohortTopicSettingsSchema`](./CohortTopicSettingsSchema.js)
* [`CohortPlatziCourseSchema`](./CohortPlatziCourseSchema.js)

### Graduates

* [`GraduateProfileSchema`](./GraduateProfileSchema.js)
* [`GraduateProfileEndorsementSchema`](./GraduateProfileEndorsementSchema.js)
* [`GraduateProfileProjectSchema`](./GraduateProfileProjectSchema.js)
* [`GraduateProfileLifeSkillSchema`](./GraduateProfileLifeSkillSchema.js)

### Organizations

* [`OrganizationSchema`](./OrganizationSchema.js)

### Projects

* [`ProjectSchema`](./ProjectSchema.js)
* [`ProjectFeedbackSchema`](./ProjectFeedbackSchema.js)
* [`ReviewerSurveySchema`](./ReviewerSurveySchema.js)
* [`ReviewQuestionSchema`](./ReviewQuestionSchema.js)
* [`ReviewAnswerSchema`](./ReviewAnswerSchema.js)

### AcademicProfile

* [`AcademicProfileSchema`](./AcademicProfileSchema.js)
* [`AcademicProfileTagSchema`](./AcademicProfileTagSchema.js)
* [`TagSchema`](./TagSchema.js)
* [`AcademicProfileEndorsementSchema`](./AcademicProfileEndorsementSchema.js)
* [`EndorsementSchema`](./EndorsementSchema.js)
* [`AcademicProfileCommentSchema`](./AcademicProfileCommentSchema.js)

### Topics

* [`TopicSchema`](./TopicSchema.js)
* [`TopicUnitSchema`](./TopicUnitSchema.js)
* [`TopicUnitPartSchema`](./TopicUnitPartSchema.js)
* `TopicProgressSchema` (TBD)

### Users

* [`UserSchema`](./UserSchema.js)

### OrganizationMembership

* [`OrganizationMembershipSchema`](./OrganizationMembershipSchema.js)

### JobOpportunity

* [`JobOpportunity`](./JobOpportunitySchema.js)

### HiringProcess

* [`HiringProcessSchema`](./HiringProcessSchema.js)
