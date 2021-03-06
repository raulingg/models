//
// This script is run once before each test suite
//

const path = require('path');
const fs = require('fs');
const NodeEnvironment = require('jest-environment-node');


const globalConfigPath = path.join(__dirname, 'globalConfig.json');


class MongoEnvironment extends NodeEnvironment {
  async setup() {
    // console.log('Setup MongoDB Test Environment');
    const globalConfig = JSON.parse(fs.readFileSync(globalConfigPath, 'utf-8'));
    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;
    await super.setup();
  }

  async teardown() {
    // console.log('Teardown MongoDB Test Environment');
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}


module.exports = MongoEnvironment;
