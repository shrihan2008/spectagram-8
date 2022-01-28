import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import AppLoading from 'expo-app-loading';
export default class CreatePost extends Component{
  constructor(props) {
    super(props);
    this.state = {
      previewImage: 'image_1',
      dropdownHeight: 40,
    };
  }
  async addPost() {
    if (
      this.state.title &&
      this.state.description &&
      this.state.post &&
      this.state.moral
    ) {
      let storyData = {
        previewImage: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        post: this.state.post,
        moral: this.state.moral,
        author: firebase.auth().currentUser.displayName,
        created_on: new Date(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 19027458596398567389673486757,
      };
      await firebase
        .database()
        .ref('/post/' + Math.random().toString(50).slice(2))
        .set(storyData)
        .then(function (snapshot) {});
      this.props.navigation.navigate('Feed');
    } else {
      Alert.alert(
        'error',
        'all fields required enter all fields ',
        [{ text: 'ok', onPress: () => console.log('Press OK') }],
        { cancelable: false }
      );
    }
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      let preview_images = {
        image_1: require('../image_1.jpg'),
        image_2: require('../image_2.jpg'),
        image_3: require('../image_3.jpg'),
        image_4: require('../image_4.jpg'),
        image_5: require('../image_5.jpg'),
      };
      return (
        <View style={ this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../logo.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                source={preview_images[this.state.previewImage]}
                style={styles.previewImage}></Image>
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'Image 1', value: 'image_1' },
                    { label: 'Image 2', value: 'image_2' },
                    { label: 'Image 3', value: 'image_3' },
                    { label: 'Image 4', value: 'image_4' },
                    { label: 'Image 5', value: 'image_5' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({ dropdownHeight: 170 });
                  }}
                  onClose={() => {
                    this.setState({ dropdownHeight: 40 });
                  }}
                  style={{ backgroundColor: 'transparent' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{ backgroundColor: '#2f345d' }}
                  labelStyle={{
                    color: 'white',
                    fontFamily: 'Bubblegum-Sans',
                  }}
                  arrowStyle={{
                    color: 'white',
                    fontFamily: 'Bubblegum-Sans',
                  }}
                  onChangeItem={(item) =>
                    this.setState({
                      previewImage: item.value,
                    })
                  }
                />
                 <TextInput style={styles.textInput} onChangeText={caption=>this.setState({
                  caption
              })} placeholder={"Caption"}/>
              </View>
              <View>
                <Button
                  onPress={() => this.addPost()}
                  title="Submit"
                  color="red"
                />
              </View>
            </ScrollView>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15193c',
  },
  containerLight: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
textInput:{
    backgroundColor:"yellow",
    alignSelf:"center",
    height:RFValue(50),
    borderBottomColor:"yellow",
    borderWidth:20,
    
  }
});
