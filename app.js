const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const cookieparser = require('cookie-parser')
const homepageRoute = require('./routes/homepage')
const registerRoute = require('./routes/register')
const adminHomeRoute = require('./routes/adminHome')
const coursesRoute = require('./routes/courses')
const departmentsRoute = require('./routes/departments')
const degreesRoute = require('./routes/degrees')
const studentsRoute = require('./routes/students')
const instructorRoute = require('./routes/instructors')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cookieparser())

app.use('/',homepageRoute)
app.use('/register',registerRoute)
app.use('/adminHome', adminHomeRoute)
app.use('/courses', coursesRoute)
app.use('/departments',departmentsRoute)
app.use('/degrees',degreesRoute)
app.use('/students',studentsRoute)
app.use('/instructors',instructorRoute)

module.exports = app