import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      color: '#E6E600',
    };
  }

  render() {
    return (
      <View styles={styles.container}>
        <ImageBackground source={require('../assets/BackgroundImage.png')} style={styles.image}>
          <Text style={styles.title}>Hello-World Chat App</Text>
          <View style={styles.box}>
            <TextInput style={styles.textStuff}
              placeholder='Please write your name'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })} />
          <View style={styles.colorWrapper}>
            <Text style={styles.textStuff}>Choose your color!</Text>
            <View style={styles.colors}>
              <TouchableOpacity style={[styles.color, styles.color1]} onPress={() => this.setState ({ color: '#AB2328' })} />
              <TouchableOpacity style={[styles.color, styles.color2]} onPress={() => this.setState ({ color: '#FFB81C' })} />
              <TouchableOpacity style={[styles.color, styles.color3]} onPress={() => this.setState ({ color: '#66FFFF' })} />
              <TouchableOpacity style={[styles.color, styles.color4]} onPress={() => this.setState ({ color: '#66FF66' })} />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color})}>
              <Text style={styles.buttontext}>Go to Chat</Text>
            </TouchableOpacity>
          </View>
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    // flex: 1,
    // resizeMode: 'cover',
    // flexDirection: 'column',
    alignItems: 'center',
    width: "100%",
    height: '100%',
    justifyContent: "center",
  },
  title: {
    flex: 1,
    padding: '30%',
    fontSize: 20,
    color: '#007B5F',
  },
  box: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    width: '60%',
    height: '60%',
    // backgroundColor: '#DDFFCC',
    marginBottom: 30,
    // paddingTop: '10%',
    // paddingBottom: '6%',
    alignItems: 'center',
    minHeight: 260,
    maxHeight: 400,
    justifyContent: "space-evenly",
  
  },
  input: {
    width: '80%',
    padding: '2%',
    height: 30,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 2,
    
  },
  colorWrapper: {
    width: '60%',
    height: '50%',
    // justifyContent: 'center',
    marginLeft: '5%',
  },
  colors: {
    flexDirection: 'row',
  },
  color: {
    // borderRadius: '2',
    width: 35,
    height: 35,
  },
  color1: {
    backgroundColor: '#AB2328',
  },
  color2: {
    backgroundColor: '#FFB81C',
  },
  color3: {
    backgroundColor: '#66FFFF',
  },
  color4: {
    backgroundColor: '#66FF66',
  },
  button: {
    height: 30,
    width: '80%',
    backgroundColor: '#F0F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    
  },
  buttontext: {
    color: '#00664D',
    fontSize: 16,
    
  },
  textStuff: {
    fontSize: 15,
    fontWeight: '300',
    color: '#000000',
  },
  buttonWrapper: {
    width: '88%',
    flex: 1,
  },
})  