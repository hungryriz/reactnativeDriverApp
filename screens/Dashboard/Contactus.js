import React, {Component, useState} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { AuthContext } from '../../Context/AuthContext';


function Contactus({ ...props }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  const authContext  = React.useContext(AuthContext);
  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
         onPress={ () => { authContext.signOut()} } >
          <Text style={styles.loginButtonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity
         onPress={ () => { props.navigation.openDrawer()} } >
          <Text style={styles.loginButtonText}>Open Menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

export default Contactus;
