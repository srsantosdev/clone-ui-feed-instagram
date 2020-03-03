import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Header from '~/components/Header';

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
export default Routes;
