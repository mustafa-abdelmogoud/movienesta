import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import MovieCard from "../components/movie-card";
import config from "../config";

const TrendyScreen = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${config.API_KEY}`
    )
      .then(response => response.json())
      .then(({ results }) => {
        setMovies(results);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: "transparent"
      }}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
      }}
    >
      {movies.map(movie => {
        return (
          <MovieCard key={movie.id} navigation={navigation} movie={movie} />
        );
      })}
    </ScrollView>
  );
};

export default TrendyScreen;
