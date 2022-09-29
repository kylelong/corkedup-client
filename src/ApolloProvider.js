import React from 'react';
import App from './App';
import { InMemoryCache, createHttpLink, ApolloClient, ApolloProvider } from '@apollo/client';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000' // change in prod
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