import React from 'react'
import { Text, View } from 'native-base';
import { Root } from 'native-base';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      // <View><Text>Hey</Text></View>
      <Root>
        <AppNavigator />
      </Root>
    )
  }
}