const express = require('express')
const request = require('request')
const router = express.Router()
/**
 * Enter target link here
 */
var message
const URL = 'http://localhost:8888/departments'
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
                res.render('departments',{data: JSON.parse(body), Message : message})
                message = ''
            }
            else
                res.send('Something went wrong')
        })
    }
})
/**
 * Enter the link of post route
 */
router.post('/',(req,res)=>{

    var token = req.cookies.token
    console.log(token)
    request.post(URL+'/add',{ headers: {
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ token},
        form: {
            /**
             * enter form data here
             */
            name: req.body.dept_name
        }
    }, (err, resp, body)=>{
        /**
         * Enter status codes and logic to handle each status code
         */
        if(resp.statusCode == 200)
            res.redirect('back')
        else if (resp.statusCode == 409)
        {
            message = 'Error: Department name already exists'
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