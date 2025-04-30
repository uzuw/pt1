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

// Mutation for handling user registration, login, and project operations
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
        githubRepoUrl: { type: GraphQLString },
        tags: { type: new GraphQLList(GraphQLString) },
      },
      async resolve(parent, args, context) {
        const userId = context.userId; // Get userId from context
        if (!userId) throw new Error('Unauthorized: No user logged in');
        
        const project = new Project({
          name: args.name,
          description: args.description,
          status: args.status,
          startDate: args.startDate || new Date().toISOString(),
          githubRepoUrl: args.githubRepoUrl,
          tags: args.tags,
          user: userId, // Associate project with authenticated user
        });

        return await project.save();
      },
    },

    deleteProject: {
      type: ProjectType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(parent, args) {
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
      },
      async resolve(parent, args) {
        const updateFields = {};
        if (args.name) updateFields.name = args.name;
        if (args.description) updateFields.description = args.description;
        if (args.status) updateFields.status = args.status;
        if (args.startDate) updateFields.startDate = args.startDate;
        if (args.githubRepoUrl) updateFields.githubRepoUrl = args.githubRepoUrl;
        if (args.tags) updateFields.tags = args.tags;

        return await Project.findByIdAndUpdate(args.id, { $set: updateFields }, { new: true });
      },
    },

    // Register a new user
    register: {
      type: GraphQLString,
      args: {
        username: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { username, email, password } = args;
        const existingUser = await User.findOne({ email });

        if (existingUser) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        const savedUser = await newUser.save();
        const token = generateToken(savedUser);

        return token; // Return the JWT token
      },
    },

    // Login an existing user
    login: {
      type: GraphQLString,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, args) {
        const { email, password } = args;
        const user = await User.findOne({ email });

        if (!user) throw new Error('Invalid credentials');
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Password does not match');

        const token = generateToken(user);
        return token; // Return the JWT token
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});