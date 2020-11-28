const express = require('express')
const request = require('request')
const router = express.Router()
/**
 * Enter target link here
 */
var message
const URL = 'http://localhost:8888/students'
router.get('/', (req, res) => {
    var token = req.cookies.token
    if (token == null || req.cookies.type != 'admin')
        res.redirect('/')
    else {
        request.get(URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }, (err, resp, body) => {
            if (resp.statusCode == 200) {
                res.render('students', { data: JSON.parse(body), Message: message })
            }
            else
                res.send('Something went wrong')
        })
    }
})
/**
 * Enter the link of post route
 */

router.get('/add', (req, res) => {
    var degrees
    var depts
    var token = req.cookies.token
    request.get('http://localhost:8888/degrees', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }, (err, resp2, body) => {
        degrees = JSON.parse(body)
        request.get('http://localhost:8888/departments', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }, (err, resp3, body2) => {
            depts = JSON.parse(body2)
            res.render('students_add', { Message: message, Degrees: degrees, Depts: depts })
            message = ''
        })
    })
})
router.post('/add', (req, res) => {

    var token = req.cookies.token
    console.log(token)
    request.post(URL + '/add', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        form: {
            /**
             * enter form data here
             */
            fname: req.body.fname,
            lname: req.body.lname,
            roll: req.body.roll,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            department: req.body.department,
            degreeType: req.body.degreeType,
            degree: req.body.degree,
            batch: req.body.batch,
        }
    }, (err, resp, body) => {
        /**
         * Enter status codes and logic to handle each status code
         */
        console.log(body)
        if (resp.statusCode == 200)
            res.redirect('/students')
        else if (resp.statusCode == 409) {
            message = 'Error: Student email already exists'
            res.redirect('back')
        }
        else if (resp.statusCode == 400) {
            message = 'Error: Invalid Degree. Select a degree from the selected department.'
            res.redirect('back')
        }

        else
            res.send('Something unexpected happened')
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    var token = req.cookies.token
    console.log(URL + '/' + id)
    request.get(URL + '/' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }, (err, resp, body) => {
        var deg
        var dept
        var studentData = JSON.parse(body)
        request.get('http://localhost:8888/departments/' + studentData.department,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }, (err, resp2, body2) => {
                console.log(body2)
                dept = JSON.parse(body2)
                console.log(studentData.degree)
                request.get('http://localhost:8888/degrees/' + studentData.degree,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + token
                        }
                    }, (err, resp3, body3) => {
                        deg = JSON.parse(body3)
                        console.log(body3)
                        res.render('student_data', {data: studentData, dept : dept, deg : deg})
                    })
            })
    })
})

module.exports = router