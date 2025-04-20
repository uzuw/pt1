//mongoose models 
const Project=require('../models/Project')


//importing the things required fot the graphqltypes
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLEnumType,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    graphql,
}=require('graphql');


//making the project type
const ProjectType=new GraphQLObjectType({
    name:'project',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString}
    })

})


//root query
const RootQuery =new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        projects:{
            type:GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find()
            }
        },

        project:{
            type:ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.findById(args.id)
            }
        }
    }
});


module.exports=new GraphQLSchema({
    query:RootQuery,
    // mutation
});
