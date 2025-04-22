//mongoose models 
const Project=require('../models/Project')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const generateToken=require('../utils/generateToken')

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
    NoUnusedFragmentsRule,
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
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addProject: {
        type: ProjectType,
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
          status: {
            type: new GraphQLEnumType({
              name: 'ProjectStatus',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' },
              },
            }),
          },
          startDate: { type: GraphQLString },
        },
        resolve(parent, args) {
          const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            startDate: args.startDate || new Date().toISOString(),
          });
          console.log(`added proj ${args.name}`.green.bold);
          return project.save();
        },
      },
  
      deleteProject: {
        type: ProjectType,
        args: { id: { type: GraphQLNonNull(GraphQLID) } },
        resolve(parent, args) {
          console.log(`deleted proj ${args.id}`.red.bold); // fixed `args.i` to `args.id`
          return Project.findByIdAndDelete(args.id);
        },
      },
  
      updateProject: {
        type: ProjectType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) },
          name: { type: GraphQLString },
          description: { type: GraphQLString },
          status: {
            type: new GraphQLEnumType({
              name: 'UpdatedProjectStatus',
              values: {
                new: { value: 'Not Started' },
                progress: { value: 'In Progress' },
                completed: { value: 'Completed' },
              },
            }),
            defaultValue: 'Not Started',
          },
        },
        resolve(parent, args) {
          console.log(`updated project ${args.name}`.yellow.bold);
          return Project.findByIdAndUpdate(
            args.id,
            {
              $set: {
                name: args.name,
                description: args.description,
                status: args.status,
              },
            },
            { new: true }
          );
        },
      },
  
      register: {
        type: GraphQLString,
        args: {
          username: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
          const { username, email, password } = args;
          const existing = await User.findOne({ email });
          if (existing) throw new Error('User already exists');
  
          const hashedPassword = await bcrypt.hash(password, 10);
  
          const newUser = new User({
            username,
            email,
            password: hashedPassword,
          });
  
          const savedUser = await newUser.save();
          const token = generateToken(savedUser);
  
          return token;
        },
      },
  
      login: {
        type: GraphQLString,
        args: {
          email: { type: GraphQLNonNull(GraphQLString) },
          pass: { type: GraphQLNonNull(GraphQLString) },
        },
        async resolve(parent, args) {
          const { email, pass } = args;
          const user = await User.findOne({ email });
          if (!user) throw new Error('Invalid credentials');
  
          const isMatch = await bcrypt.compare(pass, user.password);
          if (!isMatch) throw new Error('Password does not match');
  
          const token = generateToken(user);
          return token;
        },
      },
    },
  });
  



module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation,
});
