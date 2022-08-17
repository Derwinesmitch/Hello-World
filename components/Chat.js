import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Button, Platform, KeyboardAvoidingView  } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from  'react-native-maps';
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
      isConnected: null,
      image: null,
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
          image: data.image || null,
          location: data.location || null,
        });
      });
      this.setState({
        messages,
      });
    };
    
    async saveMessages() {
      
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
      } catch (error) {
        console.log(error.message);
      }
    }
    
    async getMessages() { 
      let messages = '';
      try { 
        messages = await AsyncStorage.getItem('messages') || [];
        this.setState({
          messages: JSON.parse(messages)
        });
      } catch (error) {
        console.log(error.message);
      }
    };



    async deleteMessages() {
      try {
        await AsyncStorage.removeItem('messages');
        this.setState({
          messages: []
        })
      } catch (error) {
        console.log(error.message);
      }
    }


    componentDidMount() {
        // this.deleteMessages();
        // this.getMessages();
        let { name } = this.props.route.params;
        this.props.navigation.setOptions({ title: name });

        NetInfo.fetch().then((connection) => {
          if (connection.isConnected) {
           this.setState({
            isConnected: true,
           });
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
          } else {
            this.setState({
              isConnected: false,
            }); 
            this.getMessages();
          }
        });
      }


    componentWillUnmount() {
      if (this.isConnected) {
        this.unsubscribe();
        this.authUnsubscribe();
      }
    }



    onSend(messages = []) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
        }),
          () => {
            this.saveMessages();
            if (this.state.isConnected === true){
              this.addMessages(this.state.messages[0]);
            }
          }
        );
    }

  
  
    addMessages= (message) => {
      this.referenceChatMessages.add({
        uid: this.state.uid,
        _id: message._id,
        text: message.text || '', 
        createdAt: message.createdAt,
        user: message.user,
        image: message.image || null,
        location: message.location || null,
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
        );
      }


      renderInputToolbar(props) {
        if (this.state.isConnected === false){
        } else {
          return <InputToolbar {...props} />;
        }
      }

      renderCustomActions = (props) => <CustomActions {...props} />;

      renderCustomView (props) {
        const { currentMessage} = props;
        if (currentMessage.location) {
          return (
              <MapView
                style={{width: 150,
                  height: 100,
                  borderRadius: 13,
                  margin: 3}}
                region={{
                  latitude: currentMessage.location.latitude,
                  longitude: currentMessage.location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
          );
        }
        return null;
      }


    
    render() {
      let { color, name } = this.props.route.params;

        return (
          <>
            <View style={[{ backgroundColor: color }, styles.outerView ]}>            
              <GiftedChat
                renderBubble={this.renderBubble.bind(this)}
                renderInputToolbar={this.renderInputToolbar.bind(this)}
                renderActions={this.renderCustomActions.bind(this)}
                renderCustomView={this.renderCustomView}
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                  _id: this.state.user._id, name: name }}
              />
              { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
              </View>
            </>
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