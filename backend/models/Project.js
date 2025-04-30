const { urlencoded } = require('express');
const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        default:""
    },
    status:{
        type:String,
        enum:['Not Started','In Progress','Completed'],
        default:'Not Started'
    },
    startDate:{
        type:Date,
        default:Date.now //setting current date when the db model is created 
    },
    githubRepoUrl: {
        type: String,
        validate: {
          validator: function(v) {
            return /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(v);
          },
          message: props => `${props.value} is not a valid GitHub repo URL!`
        }
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags:{
        type:[String],
        enum:['Backend','Frontend','Devops','Other'],
        default:undefined
    },
},
    {
        timestamps:true //to add the createdAt and udatedAt
    }
);

module.exports= mongoose.model('Project',ProjectSchema);


// we could do this too
// module.exports=mongoose.model('Project',new mongoose.Schema({
//     name:{
//         type:String
//     },
// }))