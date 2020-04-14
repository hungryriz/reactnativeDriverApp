import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItems, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';
import { View, Text, Platform } from 'react-native';
import Main from './Dashboard/Main';
import Contactus from './Dashboard/Contactus';
import { AuthContext } from '../Context/AuthContext';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();


// const CustomDrawerNavigator = props => (
//   <View>
//     <DrawerItems
//      {...props}
//     />
//   </View>
// );

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => Linking.openUrl('https://mywebsite.com/help')}
      />
    </DrawerContentScrollView>
  );
}

function Dashboard({ navigation }) {

  const authContext  = React.useContext(AuthContext);
  const [deviceTokenUpdated, setDeviceTokenUpdated] = useState(false);

  const toggleDrawer = (navigation) => {
      navigation.toggleDrawer();
  };

  const saveFcmTokenInDB = (fcmToken, token)=> {
    let bearer = 'Bearer ' + token;
    fetch("http://192.168.1.243/hellodrive/public/api/shop/saveFcmToken", {
      method: 'POST',
      headers: {
        'Authorization': bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fcmToken: fcmToken,
        deviceType: Platform.OS
      })
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData);
    })
    .catch((error)=>{
        console.log(error);
    });
  }

 const getFCMTokenValue = ()=> {
  return firebase.messaging().getToken();
 }

  const requestFcmToken = () => {

        AsyncStorage.getItem('token')
        .then((token) => {
          if(token) {
             AsyncStorage.getItem('fcmToken')
             .then((fcmToken)=> {
                if(!fcmToken) {
                  getFCMTokenValue()
                  .then((fcmToken)=>{
                    AsyncStorage.setItem('fcmToken', fcmToken);
                    saveFcmTokenInDB(fcmToken, token);
                  })
                  .catch(()=>{
                    console.log(error);
                  });
                } else {
                  saveFcmTokenInDB(fcmToken, token);
                }
             })
             .catch((error) => {
                console.log('Dasshboard.js');
                console.log(error);
             });
          } else {
            authContext.signOut();
          }
        })
        .catch((error)=>{
          console.log(error);
        });
  }

  const checkPermissionFcm = async () => {
    let enabled = await firebase.messaging().hasPermission();
    if(!enabled) {
      try {
          await firebase.messaging().requestPermission();
          // User has authorised
      } catch (error) {
          // User has rejected permissions signout
          console.log('Permissions rejected');
          authContext.signOut();
      }
    }
  }

  
  const getFCMToken = async () => {
    await checkPermissionFcm();
    console.log(deviceTokenUpdated);
    if(!deviceTokenUpdated) {
      await requestFcmToken();
      setDeviceTokenUpdated(true);
    }
  }


  React.useEffect(() => {
    getFCMToken();
  }, []);

  return (
      <Drawer.Navigator initialRouteName="Main" drawerContent={ ({...navigation}) => CustomDrawerContent(navigation) }>
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Contactus" component={Contactus} />
      </Drawer.Navigator>
  );
}

export default Dashboard;
// import { DrawerNavigator } from 'react-navigation';

// export default DrawerNavigator({
//   Main: {
//     screen: Main
//   },
//   Contactus: {
//     screen: Contactus
//   }
// }, {
//   drawerWidth: 300
// });



