import React from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      age
      username
      nationality
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      name
    }
  }
`;

// the name in query need to match the function name, e.g "Movie" needs to match "movie"
const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DisplayData = () => {
  const [movieSearched, setMovieSearched] = React.useState('');

  // Create User States
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [nationality, setNationality] = React.useState('');

  const { loading, error, data, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  const [
    fetchMovie,
    { data: movieSearchedData, error: movieError },
  ] = useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>DATA IS LOADING....</h1>;
  }
  if (data) {
    console.log('data=', data);
  }
  if (error) {
    console.log('error=', error);
  }
  if (movieSearchedData) {
    console.log('movieSearchedData=', movieSearchedData);
  }
  if (movieError) {
    console.log('movieError=', movieError);
  }

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name...'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='number'
          placeholder='Age...'
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <input
          type='text'
          placeholder='Nationality...'
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: { input: { name, username, age, nationality } },
            });

            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <hr />

      {data &&
        data.users.map((user, index) => {
          return (
            <div key={index}>
              <h1>Name: {user.name}</h1>
              <h1>UserName: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      <hr />
      {movieData &&
        movieData.movies.map((movie, index) => {
          return <h1 key={index}>Movie Name: {movie.name}</h1>;
        })}
      <hr />

      <div>
        {/* You can enter 'Interstellar' into input field and try. Remember need to case match */}
        <input
          type='text'
          name=''
          id=''
          placeholder='Interstellar...'
          onChange={(event) => setMovieSearched(event.target.value)}
        />
        <button
          type='button'
          onClick={() => fetchMovie({ variables: { name: movieSearched } })}
        >
          Fetch Data
        </button>
        {movieSearchedData && (
          <div>
            <h1>MovieName: {movieSearchedData.movie.name}</h1>
            <h1>
              Year Of Publication: {movieSearchedData.movie.yearOfPublication}
            </h1>
          </div>
        )}
        {movieError && <h1>There was an error fetching the data </h1>}
      </div>
    </div>
  );
};

export default DisplayData;
