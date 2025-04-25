import {ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from "@apollo/client/link/context"
//creating a httplink 
const httplink=createHttpLink({
    uri: 'http;//localhost:5000/graphql',
    credentials:'include',
})

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  


//creating a client 
const client=new ApolloClient({
    link:authLink.concat(httplink),
    cache: new InMemoryCache(),
})


export default client;