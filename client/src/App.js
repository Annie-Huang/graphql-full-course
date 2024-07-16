import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './DisplayData';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:1338/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
