const express=require('express')
const app=express();
const cors=require('cors');
const dotenv=require('dotenv').config()
const Mongoose=require('mongoose')
const {FormModel,FormAnswerModel} = require("../Models/FormModel.js");


//cors config
app.use(cors({origin:true,credentials:true}))
//express json
app.use(express.json())
//url encode
app.use(express.urlencoded({extended:false}));

//Profile
// app.use('/user',profileRoute)

Mongoose.connect(process.env.DB_URL)

//creating a new form
app.post('/creates',(req,res)=>{
    FormModel.create({
        FormTitle:'',
    Categorize:[
        {
            Description:'',
            Categories: [{
                value:''
            }],
            Items: [{
                Value:'',
                Category:''
            }]
        }
    ],
    Cloze:[
        {
            Sentence: '',
            Preview: '',
            Options: ['']
        }
    ],
    Comprehension:[
        {
            Passage: '',
            Questions: [{
                number: '',
                questions: '',
                options: [{
                    value:''
                }]
            }]
        }
    ]
    })
    .then(result=>{
        res.json(result._id)
    })
})


//getting the forms
app.get('/getforms',(req,res)=>{
    FormModel.find()
    .select('FormTitle _id')
    .then(result=>{
         res.json(result)
    })
}) 


//getting the details of all submitted answers
app.get('/getformanswers',(req,res)=>{
    FormAnswerModel.find()
    .select('FormTitle _id UserName')
    .then(result=>{
         res.json(result)
    })
}) 


//getting the form design data
app.get('/getformdata',(req,res)=>{
    FormModel.findById(req.query.id)
    .then(result=>{
         res.json(result)
    })
}) 

//getting a submitted answer
app.get('/answerdata',(req,res)=>{
    FormAnswerModel.findById(req.query.id)
  .populate('FormId')
  .then( answer => {
      // Books with populated author details
       res.json(answer);
    
  });
})  


//submitting the form structure
app.post('/submitform',(req,res)=>{
    FormModel.findByIdAndUpdate(req.body.id, req.body.data, { new: true })
  .then(result => {
    res.json( "successful");
  })
  .catch(error => {
    console.error('Error updating book:', error);
  });
 })


//submitting a form answer
 app.post('/submitanswer',(req,res)=>{
     FormAnswerModel.create(req.body)
     .then(result=>{
        res.json("successful")
     })
        .catch(err=>{
            console.log(err)
        })
    
 })


app.listen(process.env.PORT,()=>{
    console.log("listening at 3001 ")
})