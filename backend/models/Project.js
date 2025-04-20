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
    }},
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