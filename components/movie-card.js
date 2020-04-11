import React from "react";
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";

const { width, height } = Dimensions.get("window");

const MovieCard = ({ movie, navigation }) => {
  const posterURL = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Details", { movie });
      }}
    >
      <View>
        <ImageBackground
          style={styles.image}
          source={{ uri: posterURL }}
          imageStyle={{ borderRadius: 25 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: width / 1.3,
    height: height / 1.5,
    marginTop: 10
  }
});

export default MovieCard;
