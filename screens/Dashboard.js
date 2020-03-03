import React, { useState } from 'react';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItems } from '@react-navigation/drawer';
import { View } from 'react-native';

import Main from './Dashboard/Main';
import Contactus from './Dashboard/Contactus';

// const Drawer = createDrawerNavigator();

// const CustomDrawerNavigator = props => (
//   <View>
//     <DrawerItems
//      {...props}
//     />
//   </View>
// );

// function Dashboard({ ...props }) {
//   return (
//       <Drawer.Navigator initialRouteName="Main">
//         <Drawer.Screen name="Main" component={Main} />
//         <Drawer.Screen name="Contactus" component={Contactus} />
//       </Drawer.Navigator>
//   );
// }


import { DrawerNavigator } from 'react-navigation';

export default DrawerNavigator({
  Main: {
    screen: Main
  },
  Contactus: {
    screen: Contactus
  }
}, {
  drawerWidth: 300
});



