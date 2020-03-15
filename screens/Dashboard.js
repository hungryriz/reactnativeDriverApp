import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItems, DrawerItem } from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { Icon, Button } from 'native-base';
import { View, Text } from 'react-native';
import Main from './Dashboard/Main';
import Contactus from './Dashboard/Contactus';

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

const toggleDrawer = (navigation) => {
    navigation.toggleDrawer();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer()) }>
          <Icon name='menu' />
        </Button>
      ),
      headerTitle: "This is Orders page"
    });
  }, [navigation]);

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



