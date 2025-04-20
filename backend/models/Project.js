const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    description:{
        type:String,
    },
    stauts:{
        type:String,
        enum:['Not Started','In Progress','Completed']
    }
})

module.exports= mongoose.model('Project',ProjectSchema);


// we could do this too
// module.exports=mongoose.model('Project',new mongoose.Schema({
//     name:{
//         type:String
//     },
// }))