import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Components/Main';
import StreetLamp from './Components/StreetLamp';
import data from './Components/data';

export default class App extends React.Component {
  render() {
    return (
      <Main />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
