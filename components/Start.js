import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity, ImageBackground} from 'react-native';


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
        <ImageBackground>
          <Text style={styles.title}>Title</Text>
          <View style={styles.box1}>
            <TextInput style={styles.input}
              placeholder='Name'
              value={thos.state.name}
              onChangeText={(name) => this.setState({ name })} />
          <View style={styles.colorWrapper}>
            <Text>Choose your color!</Text>
            <View>
              <TouchableOpacity style={[styles.color, styles.color1]} onPress={() => this.setState ({ color: '#AB2328' })} />
              <TouchableOpacity style={[styles.color, styles.color2]} onPress={() => this.setState ({ color: '#FFB81C' })} />
              <TouchableOpacity style={[styles.color, styles.color3]} onPress={() => this.setState ({ color: '#66FFFF' })} />
              <TouchableOpacity style={[styles.color, styles.color4]} onPress={() => this.setState ({ color: '#66FF66' })} />
            </View>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color})}>
              <Text style={styles.buttontText}>Go to Chat</Text>
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
    flex: 1,
    resizeMode: 'cover',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    padding: '30%',
    fontSize: 30,
    fontWeight: 500,
    color: '',
  },
  box1: {
    flex: 1,
    width: '70%',
    height: '30%',
    backgroundColor: '#DDFFCC',
    marginBottom: '10%',
    paddingTop: '10%',
    paddingBottom: '6%',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: '3%',
    height: 40,
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: 3,
  },
  colorWrapper: {
    width: '70%',
    height: '30%',
    justifyContent: 'center',
    marginLeft: '5%',
  },
  colors: {
    flexDirection: 'row',
  },
  color: {
    borderRadius: '30%',
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
    height: '30%',
    width: '70%',
    backgroundColor: '#F0F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  buttontext: {
    color: '#00664D',
    fontSize: 12,
    fontWeight: 500,
  },
})