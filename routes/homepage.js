const express = require('express')
const request = require('request')
const router = express.Router()

const URL = 'http://localhost:8888/'
router.get('/', (req,res)=>{
    if (req.cookies.type == 'admin')
        res.redirect('/adminHome')
    else if (req.cookies.type == 'student')
        res.redirect('/studentHome')
    else if (req.cookies.type == 'instructor')
        res.redirect('/instructorHome')
    else
    {
        var str = ''
        if (req.query.new_account == '')
            str = 'Account created successfully. You can now sign in.'
        res.render('homepage',{ message : str })
    }
})

router.post('/', (req,res)=>{
    
    request.post(URL,
        {
            form: {
                loginType: req.body.loginType,
                email: req.body.email,
                password: req.body.password
            }
        },
        (err, resp, body)=>{

            if (resp.statusCode == 401)
            {
                res.render('homepage',{message : 'Invalid Login'})
            }
            else if (resp.statusCode == 403)
            {
                res.render('homepage',{message : 'Please select a valid login type.'})
            }
            else if (resp.statusCode == 200)
            {
                //store token in cookie
                res.cookie('token',JSON.parse(body).token)
                //redirect to home page
                if (req.body.loginType == 'admin')
                {
                    res.cookie('type', 'admin')
                    res.redirect('/adminHome')
                }
                else if (req.body.loginType == 'student')
                {
                    res.cookie('type', 'student')
                    res.redirect('/studentHome')
                }
                else if (req.body.loginType == 'instructor')
                {
                    res.cookie('type', 'instructor')
                    res.redirect('/instructorHome')
                }
            }
        })
})

module.exports = router