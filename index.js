const app = require('express')()
const bodyParser = require('body-parser')
const joi = require('joi')
joi.objectId = () => joi.string().hex().length(24)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./middleware/auth'))

app.use('/', require('./router'))

app.listen(3001, () => console.log('express api server listening on 3001'))
