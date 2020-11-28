const express = require('express')
const request = require('request')
const router = express.Router()
/**
 * Enter target link here
 */
var message
const URL = 'http://localhost:8888/degrees'
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
            {
                res.render('degrees',{data: JSON.parse(body), Message: message})
            }
            else
                res.send('Something went wrong')
        })
    }
})
/**
 * Enter the link of post route
 */

router.get('/add',(req, res)=>{
    var depts
    var token = req.cookies.token
    request.get('http://localhost:8888/departments',{headers: {
            'Content-Type':'application/json',
            'Authorization':'Bearer '+ token}
        },(err, resp2, body)=>{
            depts = JSON.parse(body)
            res.render('degrees_add',{Message: message, Depts:depts})
            message = ''
        })

})
router.post('/add',(req,res)=>{

    var token = req.cookies.token
    console.log(token)
    request.post(URL+'/add',{ headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token},
        form: {
            /**
             * enter form data here
             */
            degreeType: req.body.degreeType,
            degreeName: req.body.degreeName,
            department: req.body.department
        }
    }, (err, resp, body)=>{
        /**
         * Enter status codes and logic to handle each status code
         */
        console.log(req.body.degreeType)
        console.log(body)
        if(resp.statusCode == 200)
            res.redirect('/degrees')
        else if (resp.statusCode == 409)
        {
            message = 'Error: Degree already exists'
            res.redirect('back')
        }
        else
            res.send('Something unexpected happened')        
    })
})

router.get('/delete/:id', (req, res)=>{
    const id = req.params.id
    var token = req.cookies.token
    console.log(URL+'/'+id)
    request.delete(URL+'/'+id, {headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token
    }},(err, resp, body)=>{
        console.log(body)
        res.redirect('back')
    })
})

module.exports = router