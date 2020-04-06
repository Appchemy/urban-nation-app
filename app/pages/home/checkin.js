import React from 'react'
import { Container, Spinner, View, Text, Button, Thumbnail, Left } from 'native-base'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dimensions } from 'react-native'
import {PermissionsAndroid, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import App from '../../../App';
import { ClockInService } from '../../services/clockin-service';
import { StackActions, NavigationActions } from 'react-navigation';

export class CheckInPage extends React.Component {
    static navigationOptions = {
        title: 'Confirm Check In'
    }

    state = {
        task: this.props.navigation.getParam('task', {}),
        position: null
    }
    watchId

    constructor(props) {
        super(props)

        this.confirm = this.confirm.bind(this)
    }

    listenToLocation() {
        this.watchId = Geolocation.watchPosition(position => {
            this.setState({
                position: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
            })
        })
    }

    componentWillUnmount() {
        Geolocation.stopObserving()
    }

    componentDidMount() {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then(enabled => {
            if (enabled) {
                this.listenToLocation()
            } else {
                return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: 'Location Permission',
                    message: 'Urban Nation Talent App needs your location in order for you to check in'
                }).then(status => {
                    if (status === PermissionsAndroid.RESULTS.GRANTED) {
                        this.listenToLocation()
                    } else {
                        this.props.navigation.goBack()
                    }
                })
            }
        }).catch(err => {
            Alert.alert('Error', err, [{
                text: 'Ok',
                onPress: () => {
                    this.props.navigation.goBack()
                },
                style: 'default'
            }])
        })
        
    }

    confirm() {
        App.showLoading('Confirming your check in')

        ClockInService.clockIn({
            taskId: this.state.task.id,
            location: {
                lat: this.state.position.latitude,
                lng: this.state.position.longitude
            }
        }).then(() => {
            App.stopLoading()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'AppVenue' })],
              });
              this.props.navigation.dispatch(resetAction);
            // this.props.navigation.navigate('Venue', {task: this.state.task})
        }).catch(err => {
            App.stopLoading()
            Alert.alert('Error', err.message, [{
                text: 'Ok'
            }])
        })
        
    }

    render() {
        const screen = Dimensions.get('window')

        return (
            <Container>
                {this.state.position ? <MapView 
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{width: screen.width, height: screen.height}}
                    initialRegion={{
                        latitude: this.state.position.latitude,
                        longitude: this.state.position.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}>

                        <Marker
                            coordinate={{latitude: this.state.task.position._latitude, longitude: this.state.task.position._longitude}}
                            title={this.state.task.store}
                            description={this.state.task.title}
                            key={'venue'}
                            />
                        <Marker
                            coordinate={{latitude: this.state.position.latitude, longitude: this.state.position.longitude}}
                            title={'You are here'}
                            key={'me'}
                            pinColor={'blue'}
                            />
                      </MapView> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>Searching for your location</Text><Spinner color='black' /></View>}

                      {this.state.position && <View style={{
                          position: 'absolute',
                          left: 20,
                          right: 20,
                          bottom: 0,
                          padding: 20,
                          backgroundColor: 'white',
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10
                      }}>
                          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
                                <Thumbnail source={{uri: this.state.task.storeLogo}}></Thumbnail>
                                <View style={{marginLeft: 10}}>
                                    <Text style={{fontSize: 18}}>{this.state.task.store}</Text>
                                    <Text note>{this.state.task.title}</Text>
                                </View>
                          </View>
                          <View style={{alignItems: 'center'}}>
                            <Button onPress={this.confirm} rounded style={{justifyContent: 'center', width: 180, marginBottom: 10}}><Text>Confirm</Text></Button>
                            <Button rounded bordered style={{justifyContent: 'center', width: 180}}><Text>Cancel</Text></Button>
                          </View>
                      </View>}
            </Container>
        )
    }
}