const express = require('express')
const request = require('request')

const router = express.Router()

const URL = 'http://localhost:8888/adminHome'

router.get('/',(req,res)=>{
    //access cookie token
    var token = req.cookies.token
    if (token == null || req.cookies.type != 'admin')
        res.redirect('/')
    else 
    {
        request.get(URL,{ headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ token
        }}, (err, resp, body)=>{
            if (resp.statusCode == 401)
                res.redirect('/')
            else if (resp.statusCode == 200)
                res.render('adminHome',{name :JSON.parse(body)[0].institute_name})
        })
    }
})

module.exports = router