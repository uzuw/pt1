//mongoose models 
const Project=require('../models/Project')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const generateToken=require('../utils/generateToken')

//importing the things required for the graphqltypes
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



const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    startDate: { type: GraphQLString }, // dates are usually returned as strings in GraphQL
    githubRepoUrl: { type: GraphQLString },
    user: { type: GraphQLID }, // just return user id
    tags: { type: new GraphQLList(GraphQLString) },
    completedDate: { type: GraphQLString },
    createdAt: { type: GraphQLString }, // timestamps true -> this will be automatically added
    updatedAt: { type: GraphQLString },
  })
});

module.exports = ProjectType;


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
          startDate: { type: GraphQLString }, // optional, if not provided => default to now
          githubRepoUrl: { type: GraphQLString }, // new field
          tags: { type: new GraphQLList(GraphQLString) }, // new field
          completedDate: { type: GraphQLString }, // new field
          userId: { type: GraphQLNonNull(GraphQLID) }, // to link the user who created the project
        },
        async resolve(parent, args) {
          const project = new Project({
            name: args.name,
            description: args.description,
            status: args.status,
            startDate: args.startDate || new Date().toISOString(),
            githubRepoUrl: args.githubRepoUrl,
            tags: args.tags,
            completedDate: args.completedDate,
            user: args.userId, // setting the user
          });
      
          console.log(`added project ${args.name}`.green.bold);
          return await project.save();
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
          },
          startDate: { type: GraphQLString },
          githubRepoUrl: { type: GraphQLString },
          tags: { type: new GraphQLList(GraphQLString) },
          completedDate: { type: GraphQLString },
        },
        async resolve(parent, args) {
          console.log(`updating project ${args.id}`.yellow.bold);
      
          const updateFields = {};
      
          if (args.name !== undefined) updateFields.name = args.name;
          if (args.description !== undefined) updateFields.description = args.description;
          if (args.status !== undefined) updateFields.status = args.status;
          if (args.startDate !== undefined) updateFields.startDate = args.startDate;
          if (args.githubRepoUrl !== undefined) updateFields.githubRepoUrl = args.githubRepoUrl;
          if (args.tags !== undefined) updateFields.tags = args.tags;
          if (args.completedDate !== undefined) updateFields.completedDate = args.completedDate;
      
          return await Project.findByIdAndUpdate(
            args.id,
            { $set: updateFields },
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
