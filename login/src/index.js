import React from 'react';
import 'antd/dist/antd.css';
import Routes from './routes'
import ReactDOM from 'react-dom';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:3000/graphiql'
});

const client = new ApolloClient({
  cache,
  link
});

const App = () => (
    <ApolloProvider client={client}>
        <Routes />
    </ApolloProvider>
);



ReactDOM.render(<App />, document.getElementById('root'));


