/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, { useState, useEffect, useReducer, useMemo } from 'react';
import LoginForm from './screens/LoginForm';
import Dashboard from './screens/Dashboard';
import Splash from './screens/Splash';
import { Platform, StyleSheet, Text,  View, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, reducer, prevState } from './Context/AuthContext';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import { DrawerActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';
// import from '@react-native-firebase/notitfications';


messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});


const Stack = createStackNavigator();

const App = (props) => {
 
  const [state, dispatch] = useReducer(reducer, prevState);

// demo2@foodie.com
// 123456

  const registerAppWithFCM = async () => {
    try {
      await messaging().registerDeviceForRemoteMessages()
    } catch(error) {
      console.log(error);
    }
    
  }



  const createNotificationListeners = () => {
    
  }

  const authContext = useMemo(
      () => ({
        signIn: async (email, password) => {
          await fetch("http://192.168.1.243/hellodrive/public/api/shop/login", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: password,
            })
          })
          .then((response) => response.json())
          .then((responseData) => {
              console.log(responseData);
              if(responseData && responseData.access_token) {
                dispatch({ type: 'SIGN_IN', token: responseData.access_token, isLoading: false});
                AsyncStorage.setItem('token', responseData.access_token);
              }
          })
          .done();
        },
        signOut: async data => {
          dispatch({ type: 'SIGN_OUT', token: null, isLoading: false});
          AsyncStorage.removeItem('token');
        },
        saveToken: (token) => {
          dispatch({ type: 'SAVE_TOKEN', token: token, isLoading: false});
          AsyncStorage.setItem('token', token);
        },
        resetState: () => {
          dispatch({ type: 'RESET' });
        }
      }),
      []
    );



  const unsubscribe = () => {
    registerAppWithFCM();


    messaging().onNotificationOpenedApp((remoteMessage) => {
      alert('onNotificationOpenedApp');
      console.log('onNotificationOpenedApp', remoteMessage);
      //navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available

    messaging().onMessage((remoteMessage) => {
        alert('onMessage');
        console.log('onMessage', remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
          
        // }
        
      })
      .catch((error)=>{
        console.log(error);
      });

  }




  useEffect(() => {
    // Update the document title using the browser API
    let mounted = true;
    unsubscribe();

    if(mounted) {

      // registerAppWithFCM();
      //checkPermission();

      AsyncStorage.getItem('token')
      .then((token) => {
        if(token) {
          authContext.saveToken(token);
        } else {
          authContext.signOut();
        }
      })
      .catch((error)=>{
        console.log(error);
      });
    }

    return () => {
      mounted = false;
      unsubscribe();
    }
  }, []);

  if(state.isLoading) {
    return (
        <Splash />
      )
  }

  const DrawerButton = (props) => {
  return (
    <View>
      <Button onPress={() => {props.navigation.openDrawer()}} title="Menu"/>
    </View>
  );
};


  return (
      <AuthContext.Provider value={ authContext }>
        <NavigationContainer>
          <Stack.Navigator mode="modal">
          { state.loggedIn ? (
              <>
                <Stack.Screen name="Dashboard" component={Dashboard}
                  options={({ navigation, route }) => ({
                    headerTitle: "Order Title",
                    headerLeft: () => (
                      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }>
                        <Icon name='menu' />
                      </Button>
                    )
                })}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="LoginForm" component={LoginForm} options={{title:'Login'}} />
              </>
            )
          }
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
  );
};


export default App;
