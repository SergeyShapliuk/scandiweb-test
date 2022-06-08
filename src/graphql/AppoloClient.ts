import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/' || process.env.REACT_APP_PUBLIC_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
  },
});
