const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
     name: {
        type:String,
        unique:true,
        required:true
        },

         fullName: {
             type:String,
            required:true
        },

         logoLink: {
             type:String,
             requred:true,
            },

        

         isDeleted: {
                   type:Boolean,
                    default: false
                 } 
 },{timestamps:true});

 module.exports =mongoose.model('College',collegeSchema)//college