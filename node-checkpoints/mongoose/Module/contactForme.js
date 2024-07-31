import mongoose from "mongoose"

const contactSchema = mongoose.Schema({
    firstname:{
        type: String,
        required : true
    },
    lastname:{        
        type: String,
        required : true},
    age: Number,
    email: string
})

const Contact = mongoose.model("Contact",contactSchema)
export default Contact