import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Button, Platform, KeyboardAvoidingView  } from 'react-native';
import { Bubble, GiftedChat } from 'react-native-gifted-chat'

const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
      },
    };

    const firebaseConfig = {
      apiKey: "AIzaSyAkBB2lbq9JtfKti4JIzNlZDYJNR88-7EM",
      authDomain: "chatapp-449d9.firebaseapp.com",
      projectId: "chatapp-449d9",
      storageBucket: "chatapp-449d9.appspot.com",
      messagingSenderId: "98996944686",
      appId: "1:98996944686:web:7e9cf2ccf8ccdce0eec4bf",
      measurementId: "G-GEP7ZXBW9F"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.referenceChatMessages = firebase.firestore().collection('messages');

  } 

    onCollectionUpdate = (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        messages.push({
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: {
            _id: data.user._id,
            name: data.user.name,
          },
        });
      });
      this.setState({
        messages,
      });
    };


    componentDidMount() {
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });
        this.referenceChatMesssages = firebase.firestore().collection('messages');
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
            },
        });
        this.unsubscribe = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
        });      
    }

    componentWillUnmount() {
      this.unsubscribe();
    }


    onSend(messages = []) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
        }),
          () => {
            this.addMessages(this.state.messages[0]);
          }
        );
    }

    addMessages = (message) => {
      this.referenceChatMessages.add({
        uid: this.state.uid,
        _id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        user: message.user,
      });
    };

    renderBubble(props) {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#000'
              }
            }}
            />
        )
}

    
    render() {
      const { color, name } = this.props.route.params;

        return (
          <View style={[{ backgroundColor: color }, styles.outerView ]}>            
            <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              user={{
                _id: this.state.user._id, name: name }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            </View>

        );
    }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#a1278c',
  },
  outerView: {
    flex: 1,
  }
})