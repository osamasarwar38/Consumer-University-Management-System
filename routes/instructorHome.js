const express = require('express')
const request = require('request')

const router = express.Router()

const URL = 'http://localhost:8888/instructorProfile'

router.get('/',(req,res)=>{
    //access cookie token
    var token = ''
    if (req.cookies.token != null)
        token = req.cookies.token
    request.get(URL,{ headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    }}, (err, resp, body)=>{
        if (resp.statusCode == 401)
            res.redirect('/')
        else if (resp.statusCode == 200)
            console.log(body)
            res.render('instructorHome')
    })
})

module.exports = router