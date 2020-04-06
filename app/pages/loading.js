import React from 'react'
import { View, Spinner } from 'native-base'
import { Image } from 'react-native'
import { UserService } from '../services/user-service'
import { ClockInService } from '../services/clockin-service'
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

export class LoadingPage extends React.Component {
    componentDidMount() {
        UserService.currentUser().then(user => {
            if (user) {
                UserService.subscribeToJobAlerts()
                UserService.registerFCMToken(user.uid)
                console.log('Getting clock in')
                ClockInService.currentClockIn().then(clockin => {
                    let page
                    if (clockin) {
                        page = 'AppVenue'
                        // this.props.navigation.navigate('AppVenue')
                    } else {
                        page = 'App'
                        // this.props.navigation.navigate('App')
                    }

                    console.log('Page: ' + page)
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: page })],
                      });
                      this.props.navigation.dispatch(resetAction);
                    
                })
                
            } else {
                this.props.navigation.navigate('Auth')
            }
        })
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image resizeMethod='auto' resizeMode='contain' source={require('../../assets/imgs/logo.png')} style={{width: 250, resizeMode: 'contain', marginBottom: 20}} />
                <Spinner color='black' />
            </View>
        )
    }
}