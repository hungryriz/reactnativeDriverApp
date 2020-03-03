import React, {Component, useState, useEffect, useContext} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { AuthContext } from '../../Context/AuthContext';
import SafeAreaView from 'react-native-safe-area-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Orders from './Main/Orders';
import Address from './Main/Address';
import Maps from './Main/Maps';

const MainTabs = createMaterialTopTabNavigator();

function Main({ ...props }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const authContext = useContext(AuthContext);
  
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen name="Orders" component={Orders} />
      <MainTabs.Screen name="Address" component={Address} />
      <MainTabs.Screen name="Maps" component={Maps} />
    </MainTabs.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  redBorder: {
    borderBottomColor: 'red',
  },
  textInput: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    borderBottomWidth: 1,
    fontSize: 16,
    width: 150,
    textAlign: 'center'
  },
  loginButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 5,
    minWidth: 120,
    marginTop: 20
  },
  loginButtonDisabled: {
    opacity: 0.5,
  }

});

export default Main;
