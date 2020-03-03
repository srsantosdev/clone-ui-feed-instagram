import React from 'react';
import { View, Image } from 'react-native';
import logo from '~/assets/instagram.png';

const Header = props => {
  return <Image source={logo} />;
};

export default Header;
