const express=require('express');
const {graphqlHTTP}=require('express-graphql');
const cors=require('cors')
const schema=require('./schema/schema')
const colors=require('colors')
const connectDB=require('./config/db')

//importing the enviroment varibles
require('dotenv').config();
const PORT=process.env.PORT || 5000;

//express app instance
const app=express();

//connecting to the database
connectDB();

//cors setup
app.use(cors());

//graphql endpoint
// app.use('/graphql',graphqlHTTP({
//     schema,
//     graphiql:process.env.NODE_ENV==='development'
// }))



app.listen(PORT,console.log(`Server is now running in the port ${PORT}`));
