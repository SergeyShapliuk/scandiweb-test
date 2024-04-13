import { ApolloClient, InMemoryCache } from '@apollo/client';

const url =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/'
    : 'https://shop-back-fix.onrender.com';
export const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'ignore',
    },
  },
});
