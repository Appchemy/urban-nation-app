import React from 'react'
import { Container, Content, View, Button, Icon, Text, Spinner } from 'native-base';
import { Image, Linking, Alert } from 'react-native'
import {Dimensions } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { TasksService } from '../../services/tasks-service';
import { ClockInService } from '../../services/clockin-service';
import { Camera } from './camera';
import App from '../../../App';
import { StackActions, NavigationActions } from 'react-navigation';

function User(props) {
    const {name} = props

    return (
        <Button rounded small style={{backgroundColor: '#b0b9c2', marginRight: 10, marginBottom: 10}}>
            <Text style={{textTransform: 'capitalize'}}>{name}</Text>
        </Button>
    )
}

export class VenuePage extends React.Component {
    static navigationOptions = {
        header: null
    }

    state = {
        liked: false,
        likesCount: 45,
        task: this.props.navigation.getParam('task'),
        loading: true,
        closeCamera: false,
        team: [],
        posts: []
    }
    camera

    constructor(props) {
        super(props)
        this.comments = this.comments.bind(this)
        this.capture = this.capture.bind(this)
        this.onCapture = this.onCapture.bind(this)
        this.closeCamera = this.closeCamera.bind(this)
        this.viewPosts = this.viewPosts.bind(this)
        this.clockout = this.clockout.bind(this)
    }

    clockout() {
        console.log('Clock out')
        Alert.alert('Clock out', 'Are you sure you want to clock out?', [
            {
                text: 'Yes',
                onPress: () => {
                    App.showLoading()
                    ClockInService.clockout().then(() => {
                        App.stopLoading()
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'App' })],
                          });
                          this.props.navigation.dispatch(resetAction);
                    }).catch(err => {
                        App.stopLoading()
                        Alert.alert('Error', err.message, [{text: 'Ok'}])
                    })
                }
            },{
                text: 'No'
            }
        ])
    }

    navigate() {
        const task = this.state.task
        const lat = task.position._latitude
        const lng = task.position._longitude
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = task.store;
        const url = Platform.select({
        ios: `${scheme}${label}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
        });

        Linking.openURL(url); 
    }

    viewPosts() {
        this.props.navigation.navigate('Posts', {
            taskId: this.state.task.id
        })
    }

    componentDidMount() {
        if (this.state.task == null) { 
            console.log('Finding clockin')
            ClockInService.currentClockIn().then(clockin => {
                console.log(clockin)
                if (clockin) {
                    console.log('Found clockin')
                    TasksService.task(clockin.taskId).then(task => {
                        console.log('Found task')
                        console.log(task)
                        TasksService.teamByIds(task.members).then(team => {
                            return TasksService.posts(task.id).then(posts => {
                                this.setState({
                                    task: task,
                                    loading: false,
                                    team: team,
                                    posts: posts
                                })
                            })
                        })
                        
                    }).catch(err => {
                        console.log('No task found')
                        console.log(err)
                    })
                } else {
                    console.log('No clockin found')
                    this.props.navigation.navigate('App')
                }
            })
            
        } else{
            console.log('No need to find clock in')
            this.setState({
                loading: false
            })
            TasksService.teamByIds(this.state.task.members).then(team => {
                this.setState({
                    team: team
                })
            })
        }
    }

    drinks() {

    }

    closeCamera() {
        this.setState({
            showCamera: false
        })
    }

    capture() {
        // console.log(this.camera)
        this.camera.show()
        // this.props.navigation.navigate('Camera')
    }

    comments() {
        this.props.navigation.navigate('Comments')
    }

    onCapture(file) {
        this.props.navigation.navigate('NewNote', {
            file: file,
            taskId: this.state.task.id
        })
    }

    render() {
        const screenWidth = Math.round(Dimensions.get('window').width);

        return (
            <Container>
                {this.state.loading === false ? <Content>
                    <View style={{
                        height: 350,
                        flex: 1,
                        position: 'relative',
                        alignItems: 'flex-start'
                    }}>
                        <Button transparent style={{zIndex: 100, position: 'absolute', left: 10, top: 10}} onPress={() => this.props.navigation.toggleDrawer()}>
                            <Icon name='md-menu' style={{color: 'white'}} />
                        </Button>
                        <Button transparent style={{zIndex: 100, position: 'absolute', right: 10, top: 10}} onPress={() => this.navigate()}>
                            <Icon name='md-pin' style={{color: 'white'}} />
                        </Button>
                        <View style={{width: '100%', height: '100%'}}>
                            <Image resizeMode='cover' style={{width: '100%', height: '100%'}} source={{uri: this.state.task.image}} />
                        </View>
                        
                        {/* <Image resizeMode='cover' style={{width: '100%', height: '100%'}} source={require('../../assets/imgs/samples/bar1.jpg')} /> */}
                        
                        <View pointerEvents='none' style={{
                            backgroundColor: '#000000',
                            opacity: 0.5,
                            height: '100%',
                            width: '100%',
                            position: 'absolute',
                        }} />
                        <View style={{
                            position: 'absolute',
                            bottom: 60,
                            left: 20
                        }}>
                            <Text style={{color: 'white', fontSize: 26}}>{this.state.task.store}</Text>
                            <View style={{width: 60, height: 2, marginTop: 10, marginBottom: 10, backgroundColor: '#f0643b'}} />
                            <Text style={{color: 'white', fontSize: 13}}>{this.state.task.address}</Text>
                            <Button onPress={() => this.clockout()} bordered rounded style={{borderColor: 'white', height: 40, width: 100, marginTop: 10, justifyContent: 'center'}}><Text style={{textTransform: 'capitalize', color: 'white', fontSize: 10}}>Clock Out</Text></Button>
                        </View>
                        <View style={{
                            borderRightWidth: screenWidth,
                            borderRightColor: 'white',
                            borderTopWidth: 80,
                            borderTopColor: '#00000000',
                            opacity: 1,
                            position: 'absolute',
                            bottom: 0,
                            right: 0
                        }} />
                        <View style={{position: 'absolute', right: 20, bottom: 10, alignItems: 'center'}}>
                            <Button style={{backgroundColor: '#f0643b', borderRadius: 60, width: 60, height: 60, alignItems: 'center', justifyContent: 'center'}} onPress={this.invite}>
                                <Icon name='add' style={{color: 'white'}} onPress={this.capture} />
                            </Button>
                            <Text style={{marginTop: 10}}>Share Something</Text>

                            
                        </View>
                    </View>  

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 15}}>
                        <View style={{alignItems: 'center', flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <Icon onPress={this.viewPosts} style={{color: '#000000', marginRight: 10}} type='Ionicons' name='md-camera' />
                                <Text>{this.state.posts.length}</Text>
                            </View>
                            {/* <View style={{flexDirection: 'row', paddingLeft: 20}}>
                                <Icon onPress={this.comments} style={{marginRight: 10}} name='md-chatboxes' />
                                <Text>12</Text>
                            </View> */}
                        </View>                          
                         
                        <Text style={{marginTop: 15}}>{this.state.task.description}</Text>   

                        <Text style={{marginTop: 20, fontWeight: 'bold'}}>Team</Text>
                        <View style={{marginTop: 10, paddingBottom: 10, flexDirection: 'row', flexWrap: 'wrap'}}>
                            {this.state.team.map((member, index) => {
                                return <User key={index} name={`${member.firstname} ${member.lastname}`} />
                            })}
                        </View>
                    </View>
                </Content> : <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color='black' />
                </View>}
                <Camera ref={ref => this.camera = ref} onCapture={this.onCapture} />
            </Container>
        )
    }
}