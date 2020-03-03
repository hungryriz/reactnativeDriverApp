import React, {Component, useState, useEffect} from 'react';
import { Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { AuthContext } from '../Context/AuthContext';

function LoginForm({ ...props }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [token, setToken] = useState();
  const [TouchableOpacityDisabled, setTouchableOpacityDisabled] = useState(false);

  const authContext  = React.useContext(AuthContext);

// demo2@foodie.com
// 123456

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

    if(reg.test(text) === false) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
    setEmail(text);
  }
  const Login =  async () => {
    //let email = 'demo2@foodie.com', password = '123456';
        // send email and password and get the response
        setTouchableOpacityDisabled(true);
        authContext.signIn(email, password);
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={ isEmailValid ? styles.textInput : [styles.textInput, styles.redBorder] }
          placeholder="Your Email"
          onChangeText={ (text) => {validate(text)} }
          value={email}
          autoCompleteType="email"
          autoFocus="true"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={(pass) => setPassword(pass)}
          value={password}
          secureTextEntry={true}
        />
        <Text>
          {token}
        </Text>
        <TouchableOpacity
          onPress={ () =>  Login() }
          disabled={ (!TouchableOpacityDisabled && isEmailValid && password) ? false : true }
        	style={ (isEmailValid && password) ? styles.loginButton : [styles.loginButton, styles.loginButtonDisabled] }>
        	<Text style={styles.loginButtonText}>Login</Text>
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

export default LoginForm;
