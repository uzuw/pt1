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
    GraphQLInputObjectType,
}=require('graphql');


//making the project type
const ProjectType=new GraphQLObjectType({
    name:'Project',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        startDate: { type: GraphQLString },
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

//mutaion is a object type
const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addProject:{
            type:ProjectType,
            args:{
                name:{type:GraphQLNonNull(GraphQLString)},
                description:{type:GraphQLNonNull(GraphQLString)},
                status:{type:new GraphQLEnumType({
                    name: 'ProjectStatus',
                    values:{
                        'new':{value:'Not Started'},
                        'progress':{value:'In Progress'},
                        'completed':{value:'Completed'},
                    },}),},
                startDate: { type: GraphQLString },
            },
            //resolver function 
            resolve(parent,args){
                const project=new Project({
                    name:args.name,
                    description:args.description,
                    status:args.status,
                    startDate: args.startDate || new Date().toISOString(),
                }); //new Project instance 
                console.log(`addeed proj ${args.name}`.green.bold)
                return project.save();

                
            },
        },

        deleteProject:{
            type:ProjectType,
            args:{id:{type:GraphQLNonNull(GraphQLID)}},
            resolve(parent,args){
                console.log(`deleted proj ${args.i}`.red.bold);
                return Project.findByIdAndDelete(args.id)
            }
        },

        updateProject:{
            type:ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type:GraphQLString},
                description:{type:GraphQLString},
                status:{
                    type:new GraphQLEnumType({
                        name:"UpdatedProjectStatus",
                        values:{
                            'new': {value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        }
                    }),defaultValue:'Not Started'
                }

            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(args.id,
                    {
                        $set:{
                            name:args.name,
                            description:args.description,
                            status:args.status,
                        }
                    },
                    {
                        new:true //if doesnot exist then it creates a new obj
                    },console.log(`updated project ${args.name}`.yellow.bold),
                )
            }
        }






    }

});



module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation,
});
