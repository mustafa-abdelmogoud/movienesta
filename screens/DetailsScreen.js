import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  StyleSheet,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Swiper from "react-native-swiper";

import config from "../config";
import VideoPlayer from "../components/video-player";

const { width, height } = Dimensions.get("window");

export default function({ route }) {
  // directed_by, writer, catagory, cast, duration
  const {
    movie: {
      id,
      title,
      overview,
      vote_average,
      release_date,
      adult,
      backdrop_path
    }
  } = route.params;

  const [state, setState] = useState({
    playVideo: false,
    videos: null,
    genre: null,
    runtime: 0
  });

  useEffect(() => {
    fetch(
      `http://api.themoviedb.org/3/movie/${id}?api_key=${config.API_KEY}&append_to_response=videos`
    )
      .then(response => response.json())
      .then(res => {
        const { videos, genres, runtime } = res;
        setState({
          ...state,
          videos: videos.results,
          genre: genres[0].name,
          runtime
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <ScrollView style={styles.container}>
      {state.videos ? (
        state.videos.length > 1 ? (
          <Swiper height={height / 2} showsButtons={true}>
            {state.videos.map(video => (
              <VideoPlayer
                key={video.key}
                uri={`https://www.youtube.com/embed/${video.key}`}
              />
            ))}
          </Swiper>
        ) : state.videos[0] ? (
          <VideoPlayer
            uri={`https://www.youtube.com/embed/${state.videos[0].key}`}
          />
        ) : (
          <Image
            style={{ width, height: height / 2 }}
            source={{ uri: `https://image.tmdb.org/t/p/w400/${backdrop_path}` }}
          />
        )
      ) : null}
      <View
        style={{
          padding: 5,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        {state.genre && (
          <Text
            style={{
              padding: 10,
              marginRight: 10,
              fontWeight: "500",
              backgroundColor: "yellow",
              borderRadius: 20,
              overflow: "hidden"
            }}
          >
            {state.genre}
          </Text>
        )}

        <Text style={styles.title}>{title}</Text>
      </View>

      <View
        style={{
          marginTop: 5,
          paddingLeft: 10,
          paddingRight: 15,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Icon
            style={{
              marginRight: 5
            }}
            color="yellow"
            name="star-outline"
            size={20}
          />
          <Text style={{ color: "#fff", fontSize: 18, opacity: 0.7 }}>
            {vote_average}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            style={{
              marginRight: 5
            }}
            color="yellow"
            name="clock-outline"
            size={20}
          />
          <Text style={{ color: "#fff", fontSize: 18, opacity: 0.7 }}>
            {state.runtime} min
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Icon
            color="yellow"
            name="calendar-clock"
            size={20}
            style={{
              marginRight: 5
            }}
          />
          <Text style={{ color: "#fff", fontSize: 18, opacity: 0.7 }}>
            {release_date}
          </Text>
        </View>
      </View>

      <View style={{ marginTop: 15, padding: 15 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {adult && (
            <Text
              style={{
                color: "yellow",
                padding: 7,
                marginRight: 10,
                borderWidth: 1,
                borderRadius: 15,
                borderColor: "yellow"
              }}
            >
              18+
            </Text>
          )}
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 24
            }}
          >
            What's the movie about?
          </Text>
        </View>

        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            marginTop: 10,
            opacity: 0.8
          }}
        >
          {overview}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000"
  },
  image: {
    width: width,
    height: 400,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600"
  }
});
