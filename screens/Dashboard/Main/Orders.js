import React, {Component, useState, useEffect} from 'react';
import { Platform, StyleSheet, AsyncStorage ,  Image} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';


function Orders({ ...props }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState();
  
  return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section This is Content Section 
            This is Content Section This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
            This is Content Section This is Content Section This is Content Section
          </Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
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

export default Orders;
