const express = require('express')
const request = require('request')
const router = express.Router()

const URL = 'http://localhost:8888/instructors'
router.get('/', (req,res)=>{
    var token = req.cookies.token
    if (token == null || req.cookies.type != 'admin')
        res.redirect('/')
    else
    {
        request.get(URL,{headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ token
        }},(err, resp, body)=>{
            if (resp.statusCode == 200)
                res.render('instructors',{data: body})
            else
                res.send('Something went wrong')
        })
    }
})

module.exports = router