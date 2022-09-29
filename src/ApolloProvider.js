import React from 'react';
import App from './App';
import { InMemoryCache, createHttpLink, ApolloClient, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'https://frozen-peak-56140.herokuapp.com/' // change in prod to heroku link
})

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>

)