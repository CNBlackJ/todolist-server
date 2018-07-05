const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const bluebird = require('bluebird')

mongoose.Promise = bluebird

const connectionStr = `mongodb://localhost/vue-todo`
const option = {
  user: '',
  pass: ''
}

const dbConnection = mongoose.createConnection(connectionStr, option)
mongoose.connection.on('error', (err) => {
  console.error('mongodb connect error:' + err)
})

console.info('mongodb connection: ' + connectionStr)

const modelsPath = path.join(process.cwd(), '/server/model')

const models = fs.readdirSync(modelsPath)

const db = {}

for (const model of models) {
  if (model.startsWith('.')) {
    continue
  }
  const modelName = model.match(/^[^.]+/)[0]
  const modelSchema = require(path.join(modelsPath, model))
  db[ modelName ] = dbConnection.model(modelName, modelSchema)
}

module.exports = db
