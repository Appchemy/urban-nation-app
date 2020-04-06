import React from 'react'
import { Container, Content, Text, Button, Icon, View, Spinner, Card, CardItem, Left, Thumbnail, Body, Right } from 'native-base'
import { TasksService } from '../../services/tasks-service'
import { Image } from 'react-native'
import moment from 'moment'
import { Linking } from 'react-native'

export class HomePage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Upcoming Promotions',
            headerLeft: (
                <Button transparent onPress={() => {navigation.toggleDrawer()}}>
                    <Icon name='menu' style={{color: 'white'}} />
                </Button>
            )
        }
    }

    state = {
        tasks: [],
        loading: true
    }

    componentDidMount() {
        return TasksService.tasks().then(tasks => {
            console.log(tasks)
            this.setState({
                tasks: tasks,
                loading: false
            })
        })
    }

    checkIn(task) {
        this.props.navigation.navigate('CheckIn', {
            task: task
        })
    }

    navigate(task) {
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

    renderTasks() {
        
        return (
            <View>
                {/* <Text style={{marginBottom: 10, fontSize: 18}}>Upcoming Promotions</Text> */}
                {this.state.tasks.map(task => {
                    return (
                        <Card key={task.id}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri: task.storeLogo}} />
                                    <Body>
                                        <Text>{task.store}</Text>
                                        <Text note>{moment(task.startsAt.seconds * 1000).format('MMMM DD, YYYY')} at {moment(task.startsAt.seconds * 1000).format('HH:mm')}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Body>
                                    <Image resizeMode='cover' style={{width: '100%', height: 180}} source={{uri: task.image}} />
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text style={{fontSize: 20}}>{task.title}</Text>
                                    <Text>{task.description}</Text>
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Left>
                                    {/* <Text note>14km away</Text> */}
                                </Left>
                                <Right>
                                    <View style={{flexDirection: 'row'}}>
                                        <Button transparent onPress={() => this.navigate(task)}><Text>Navigate</Text></Button>
                                        <Button transparent onPress={() => this.checkIn(task)}><Text>Check In</Text></Button>
                                    </View>
                                </Right>
                            </CardItem>
                        </Card>
                    )
                })}
            </View>
            
        )
    }

    renderLoading() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Spinner color='black' />
            </View>
        )
    }

    render() {
        return (
            <Container>
                <Content style={{padding: 10}}>
                    {this.state.loading === false ? this.renderTasks() : this.renderLoading()}
                </Content>
            </Container>
        )
    }
}