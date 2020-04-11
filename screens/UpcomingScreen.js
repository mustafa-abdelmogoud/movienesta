import React, { useEffect, useState } from "react";
import { View } from "react-native";

import MovieCard from "../components/movie-card";
import config from "../config";
import { ScrollView } from "react-native-gesture-handler";

const TrendyScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.API_KEY}`
    )
      .then(response => response.json())
      .then(({ results }) => {
        setMovies(results);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {movies.map(movie => (
        <MovieCard key={movie.id} navigation={navigation} movie={movie} />
      ))}
    </ScrollView>
  );
};

export default TrendyScreen;
