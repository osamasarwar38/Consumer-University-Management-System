const express = require('express')
const request = require('request')
const router = express.Router()

const URL = 'http://localhost:8888/registerInstitute'
var errorMessage = ''

router.get('/', (req,res)=>{
    res.render('register',{
        error_message:errorMessage
    })
})

router.post('/', (req,res1)=>{
    request.post(URL,{
        form: {
            institute_name: req.body.institute_name,
            email: req.body.email,
            password: req.body.password
        }
    }, (err,res,body)=>{
        
        if (res.statusCode == 201)
        {
            res1.redirect('/?new_account')
        }
        else if (res.statusCode == 409)
        {
            //user already exists
            errorMessage = 'Error: User already exists'
            res1.redirect('back')
        }
        else
        {
            //internal server error
            errorMessage = 'Internal server error'
            res1.redirect('back')
        }
    })
})

module.exports = router