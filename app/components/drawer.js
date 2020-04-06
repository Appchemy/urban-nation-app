import React from 'react'
import { Container, View, Button, Icon, Text } from 'native-base'
import { Image, Alert } from 'react-native'
import { UserService } from '../services/user-service'
import { StackActions, NavigationActions } from 'react-navigation';

function MenuItem(props) {
    return (
        <Button style={{marginBottom: 10}} transparent onPress={() => {
            if (props.onPress != null) {
                console.log('onPress is not null')
                props.onPress()
            } else {
                console.log('onPress is null')
            }
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name={props.icon} style={{color: 'white', fontSize: 20, marginRight: 20}} />
                <Text style={{color: 'white', fontSize: 16}}>{props.text}</Text>
            </View>
        </Button>
    )
}

export class Drawer extends React.Component {
    avatar = require('../../assets/imgs/avatar.png')
    state = {
        profile: null
    }

    logout() {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            {
                text: 'Yes',
                onPress: () => {
                    UserService.logout()
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Auth' })],
                      });
                      this.props.navigation.dispatch(resetAction);
                }
            },
            {
                text: 'No'
            }
        ])
    }

    componentDidMount() {
        UserService.user().then(user => {
            this.setState({
                profile: user
            })
            console.log(user)
        })
    }

    render() {
        return (
            <Container>
                <View style={{backgroundColor: '#232325', flex: 1, padding: 20}}>
                    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 30, marginBottom: 20}}>
                        <Image source={this.state.profile && this.state.profile.photo ? {uri:this.state.profile.photo} : this.avatar} style={{
                            width: 100,
                            height: 100,
                            borderRadius: 100,
                            borderColor: 'white',
                            borderWidth: 3
                        }}/>
                        <Text style={{color: 'white', marginTop: 20}}>{this.state.profile ? `${this.state.profile.firstname} ${this.state.profile.lastname}` : ''}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <MenuItem {...this.props} icon='person' text='Profile' onPress={() => {
                        this.props.navigation.navigate('Profile')
                    }} />
                        <MenuItem {...this.props} icon='notifications' text='Notifications' onPress={() => {
                            this.props.navigation.navigate('Notifications')
                        }} />
                        <MenuItem {...this.props} icon='notifications' text='Job Alerts' onPress={() => {
                            this.props.navigation.navigate('JobAlerts')
                        }} />
                        <MenuItem {...this.props} icon='settings' text='Settings' />
                    </View>
                    <View>
                        <MenuItem {...this.props} icon='exit' text='Logout' onPress={() => {
                            this.logout()
                        }} />
                    </View>
                </View>
            </Container>
        )
    }
}