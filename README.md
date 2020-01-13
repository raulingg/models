# Laboratoria/models

[![Build Status](https://travis-ci.com/Laboratoria/models.svg?branch=master)](https://travis-ci.com/Laboratoria/models)

This module is meant to be used with Node.js and expects the Node.js version of
the [`mongoose`](https://mongoosejs.com/) module as an argument. If you are
looking for _schemas_ to be used in the front-end please check
[`Laboratoria/schemas`](./src/schemas/README.md).

## Installation

```sh
npm install --save Laboratoria/models
```

Or add it in your `package.json` and then `npm install`:

```json
{
  "dependencies": {
    "models": "Laboratoria/models#v1.0.0-alpha.1"
  }
}
```

## Usage

For more detailed information, please check the
[official `mongoose` docs](https://mongoosejs.com/docs/guide.html)

Creating and saving a model:

```js
const mongoose = require('mongoose');
const { Project } = require('models')(mongoose);

const project = new Project({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

project.save()
  .then(console.log)
  .catch(console.error);
```

Finding models:

```js
// Querying for all documents in collection
Project.find({}, (err, docs) => {
  if (err) {
    console.error(err);
  }
  // doc something with `docs`...
});

// Alternatively using a promise
Project.find({})
  .then(console.log)
  .catch(console.error);
```

Using `Model.validate` as a `Promise`:

```js
const mongoose = require('mongoose');
const { Project } = require('models')(mongoose);

const project = new Project({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

project.validate()
  .then(() => {
    // Validation succeeded ;-)
  })
  .catch((err) => {
    // Validation failed :-(
  });
```

Using `Model.validate` with a _callback_:

```js
const mongoose = require('mongoose');
const { Project } = require('models')(mongoose);

// Creating a new instance of a Model
const project = new Project({
  slug: 'cipher',
  repo: 'Laboratoria/curricula-js',
  path: 'projects/01-cipher',
  // ...
});

// Validating model instance
project.validate((err) => {
  // ...
});
```

## Testing

Unit tests (and linter):

```sh
yarn test
```

End-to-end tests:

```sh
yarn e2e
```

***

## Models

### Application

* [`Application`](./src/Application.js)

### Campuses

* [`Campus`](./src/Campus.js)

### Cohorts

* [`Cohort`](./src/Cohort.js)
* [`CohortMembership`](./src/CohortMembership.js)
* [`CohortTopic`](./src/CohortTopic.js)
* [`CohortTopicSettings`](./src/CohortTopicSettings.js)
* [`CohortProject`](./src/CohortProject.js)
* [`CohortPlatziCourse`](./src/CohortPlatziCourse.js) (deprecated)

### Endorsement

* [`Endorsement`](./src/Endorsement.js)

### Graduates

* [`GraduateProfile`](./src/GraduateProfile.js)
* [`GraduateProfileEndorsement`](./src/GraduateProfileEndorsement.js)
* [`GraduateProfileProject`](./src/GraduateProfileProject.js)
* [`GraduateProfileLifeSkill`](./src/GraduateProfileLifeSkill.js) (deprecated)

### Organizations

* [`Organization`](./src/Organization.js)
* [`OrganizationMembership`](./src/OrganizationMembership.js)

## Placement

* [`JobOpportunity`](./src/JobOpportunity.js)
* [`HiringProcess`](./src/HiringProcess.js)

### Projects

* [`Project`](./src/Project.js)
* [`ProjectFeedback`](./src/ProjectFeedback.js)
* [`ReviewerSurvey`](./src/ReviewerSurvey.js)
* [`ReviewQuestion`](./src/ReviewQuestion.js)

### Tags

* [`Tag`](./src/Tag.js)

### Topics

* [`Topic`](./src/Topic.js)
* [`TopicUnit`](./src/TopicUnit.js)
* [`TopicUnitPart`](./src/TopicUnitPart.js)
* `TopicProgress` (TBD)

### Users

* [`User`](./src/User.js)
* [`UserActivityFeedEvent`](./src/UserActivityFeed.js)
* [`AcademicProfileCommentEvent`](./src/UserActivityFeed.js)
* [`AcademicProfileTagAssignedEvent`](./src/UserActivityFeed.js)
* [`AcademicProfileTagRemovalEvent`](./src/UserActivityFeed.js)
* [`ReviewAnswerEvent`](./src/UserActivityFeed.js)

## Schemas

See [`Laboratoria/schemas`](./src/schemas/README.md).
