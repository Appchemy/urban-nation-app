import React from 'react'
import { Text, View, Spinner } from 'native-base';
import { Root } from 'native-base';
import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  static currentApp
  static showLoading(message) {
    App.currentApp.setState({
      loading: true,
      message: message
    })
  }

  static stopLoading() {
    App.currentApp.setState({
      loading: false,
      message: null
    })
  }

  constructor(props) {
    super(props)
    App.currentApp = this
  }

  state = {
    loading: false,
    message: null
  }

  render() {
    return (
      <Root>
        <AppNavigator />
        {this.state.loading && <View style={{
          position: 'absolute',
          zIndex: 10000,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 8,
            minWidth: 250,
            maxWidth: 250,
            padding: 20
          }}>
            <Text style={{textAlign: 'center'}}>{this.state.message ? this.state.message : 'Please wait'}</Text>
            <Spinner color='black' style={{marginTop: 10}} />
          </View>
        </View>}
      </Root>
    )
  }
}