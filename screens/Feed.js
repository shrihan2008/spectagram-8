import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "../screens/PostCard";

import { FlatList } from "react-native-gesture-handler";
import PostScreen from '../screens/PostScreen'

let post = require("../temp_post.json");

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      light_theme:true,
      posts:[]
    };
  }

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let stories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              stories.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ posts: post });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
           console.log("The read failed: " + errorObject.code);
        }
      );
  };
  componentDidMount() {
    this.fetchStories()
  }
  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation.navigate}/>;
  };

  keyExtractor = (item, index) => index.toString();

  render() {
        return (
        <View style={this.state.light_theme
          ?styles.containerLight
          :styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme
              ?styles.appTitleTextLight
              :styles.appTitleText}>Spectagram</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={post}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
   
  },

  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
   
  },
  cardContainer: {
    flex: 0.93
  }
});