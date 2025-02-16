const movies = [
    { id: "1", name: "Inception", director_name: "Christopher Nolan", production_house: "Warner Bros.", release_date: "2010-07-16", rating: 8.8 },
    { id: "2", name: "Interstellar", director_name: "Christopher Nolan", production_house: "Paramount", release_date: "2014-11-07", rating: 8.6 },
  ];
  
  const resolvers = {
    Query: {
      getAllMovies: () => movies,
      getMovieById: (_, { id }) => movies.find(movie => movie.id === id),
    },
    Mutation: {
      insertMovie: (_, { name, director_name, production_house, release_date, rating }) => {
        const newMovie = {
          id: String(movies.length + 1),
          name,
          director_name,
          production_house,
          release_date,
          rating,
        };
        movies.push(newMovie);
        return newMovie;
      },
      updateMovie: (_, { id, name, director_name, production_house, release_date, rating }) => {
        const movie = movies.find(movie => movie.id === id);
        if (!movie) throw new Error("Movie not found");
  
        if (name) movie.name = name;
        if (director_name) movie.director_name = director_name;
        if (production_house) movie.production_house = production_house;
        if (release_date) movie.release_date = release_date;
        if (rating) movie.rating = rating;
  
        return movie;
      },
      deleteMovie: (_, { id }) => {
        const index = movies.findIndex(movie => movie.id === id);
        if (index === -1) throw new Error("Movie not found");
  
        movies.splice(index, 1);
        return "Movie deleted successfully";
      },
    },
  };
  
  module.exports = resolvers;
  