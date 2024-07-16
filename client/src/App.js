import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:1338/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className='App'>Hello world</div>
    </ApolloProvider>
  );
}

export default App;
