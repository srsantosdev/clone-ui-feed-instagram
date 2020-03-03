import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '~/components/Header';

import logo from '~/assets/instagram.png';

import Feed from '~/pages/Feed';

const { Navigator, Screen } = createStackNavigator();

const Routes = () => (
  <Navigator
    screenOptions={{
      headerTitleAlign: 'center',
      headerTitle: <Header />,
      headerStyle: {
        backgroundColor: '#f5f5f5',
      },
    }}>
    <Screen name="Feed" component={Feed} />
  </Navigator>
);

/* const Routes = createAppContainer(
  createStackNavigator(s
    { Feed },
    {
      headerLayoutPreset: 'center',
      defaultNavigationOptions: {
        headerTitle: <Image source={logo} />,
        headerStyle: {
          backgroundColor: '#f5f5f5',
        },
      },
    },
  ),
); */

export default Routes;
