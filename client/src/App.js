import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "react-apollo";
import MovieList from './components/MovieList';
import NewMovieForm from './components/NewMovieForm';
import  "./App.css";
import "antd/dist/antd.css";
const client=new ApolloClient({
  uri:"http://localhost:5000/graphql"
})
function App() {
  return (
      <ApolloProvider client={client}>
    <div className="App">
    <MovieList/>
    <NewMovieForm/>
    </div>
    </ApolloProvider>
  );
}

export default App;
