const Mongoose=require('mongoose')


//schema for form
const FormSchema= new Mongoose.Schema({
    FormTitle:String,
    Categorize:[
        {
            Description:String,
            Categories: [{
                value:String
            }],
            Items: [{
                value:String,
                category:String
            }]
        }
    ],
    Cloze:[
        {
            Sentence: String,
            Preview: String,
            Options: [String]
        }
    ],
    Comprehension:[
        {
            Passage: String,
            Questions: [{
                number: Number,
                questions: String,
                options: [{
                    value:String
                }]
            }]
        }
    ]
})

const FormModel=Mongoose.model("Form",FormSchema)


//schema for form answers
const FormAnswerSchema= new Mongoose.Schema({
    FormId:{ type: Mongoose.Schema.Types.ObjectId, ref: 'Form' },
    FormTitle:String,
    UserName:String,
    Categorize:[
        {
            Item: [{
                value:String,
                category:String
            }],
            ItemAnswers: [{
                value:String,
                category:String
            }]
        }
    ],
    Cloze:[
        {
            option: [String],
            selectedOption:[String]
        }
    ],
    Comprehension:[
        {
            selectedOption: [String]
        }
    ]
})

 const FormAnswerModel=Mongoose.model("FormAnswer",FormAnswerSchema)

module.exports={FormModel,FormAnswerModel}
