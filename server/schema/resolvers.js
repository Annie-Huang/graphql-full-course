const { UserList, MovieList } = require('../FakeData');
const _ = require('lodash');

const resolvers = {
  Query: {
    // USER RESOLVERS
    // users: () => {
    users: (parent, args, context, info) => {
      console.log('context=', context.req.headers);
      // info contains some request info but it is not exactly like request
      console.log('info=', info);
      return UserList;

      // // If you do it with the union type:
      // if (UserList) return { users: UserList };
      // return { message: 'Yo, there was an error' };
    },
    // there are 4 input: parent, args, context, info
    user: (parent, args) => {
      const id = args.id;
      const user = _.find(UserList, { id: Number(id) });
      return user;
    },

    // MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, { name });
      return movie;
    },
  },
  User: {
    // favoriteMovies: () => {
    favoriteMovies: (parent) => {
      console.log('parent=', parent);
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  UsersResult: {
    __resolveType: (obj) => {
      if (obj.users) {
        return 'UsersSuccessfulResult';
      }

      if (obj.message) {
        return 'UsersErrorResult';
      }

      return null;
    },
  },
};

module.exports = { resolvers };
