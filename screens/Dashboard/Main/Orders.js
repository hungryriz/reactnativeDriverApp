import React, {Component, useState, useEffect} from 'react';
import { Platform, StyleSheet, AsyncStorage , Image, FlatList, View, TouchableHighlight, Text} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Right, Title, Footer, FooterTab } from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';
import moment from "moment";
import clsx from "clsx";


function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState(null);

  const getOrders = (token) => {

    let bearer = 'Bearer ' + token;
    console.log('getOrder');
    console.log(page);
    console.log('getOrder');
    fetch("http://192.168.1.243/hellodrive/public/api/shop/orders/list" + '?page=' + page, {
      method: 'GET',
      headers: {
        'Authorization': bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      if(responseData.error) {
        console.log(responseData);
        authContext.signOut();
      } else {
        console.log(responseData);
        setOrders(responseData);
        if(page >= responseData.lastPage) {
          setPage(responseData.lastPage);
        } else {
          setPage(page+1);
        }
      }
    })
    .done();
  }

  const showOrderDetails  = (order) => {
    alert('Order');
  }
  useEffect(() => {
    // Update the document title using the browser API
    AsyncStorage.getItem('token')
    .then((token) => {
      if(token) {
        getOrders(token);
        setToken(token);
      } else {
        authContext.signOut();
      }
    }) 
  }, []);

  return (
      <View style={styles.container}>
        <FlatList
          ListEmptyComponent={<Text style={styles.emptyText}>No Orders found</Text>}
          numColumns={1}
          onEndReached={() => {
            getOrders(token);
          }}
          onEndReachedThreshold={5}
          data={orders.data}
          renderItem={({item, index, separators}) => (
            <TouchableHighlight
              onPress={() => showOrderDetails(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={styles.row}>
                <Text style={styles.column}>{ item.id }</Text>
                <Text style={styles.column}>{ moment(item.created_at).format('DD/MM/YYYY, h:mm') }</Text>
                <Text style={styles.column}>{item.address.landmark ? item.address.landmark : 'No address given' }</Text>
                <Text style={[styles.column, styles.amount]}>{(item.invoice && item.invoice.payable) ? item.invoice.payable : 'No invoice'}</Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
    width: '100%'
  },
  emptyText: {
    paddingTop: 20,
  },
  amount: {
    fontWeight: 'bold',
    textAlign: 'left'
  },
  row: {
    flex: 1, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor : 'white'
  },
  column: {
    flexWrap: 'wrap',
    fontSize: 14
  }
});

export default Orders;
