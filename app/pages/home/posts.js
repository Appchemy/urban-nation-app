import React from 'react'
import { Container, Card, CardItem, Body, View, Spinner, Text, Left, Thumbnail, Content } from 'native-base'
import { TasksService } from '../../services/tasks-service'
import Swiper from "react-native-web-swiper";
import {Image} from 'react-native'
import moment from 'moment'

export class PostsPage extends React.Component {
    static navigationOptions = {
        title: 'Media'
    }

    state = {
        posts: [],
        loading: true
    }

    componentDidMount() {
        TasksService.posts(this.props.navigation.getParam('taskId')).then(posts => {
            console.log(posts)
            this.setState({
                posts: posts,
                loading: false
            })
        })
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
            <Container style={{padding: 10}}>
                <Content showsVerticalScrollIndicator={false}>
                {this.state.posts.map((post, index) => {
                    return (
                        <Card key={index}>
                            <CardItem>
                                <Left>
                                    <Thumbnail source={{uri: post.profile.photo}} />
                                    <Body>
                                        <Text>{post.profile.firstname} {post.profile.lastname}</Text>
                                        <Text note>{moment(post.createdAt.seconds * 1000).format('MMMM DD, YYYY')} at {moment(post.createdAt.seconds * 1000).format('HH:mm')}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <Body>
                                    <Image style={{
                                        width: '100%',
                                        height: 220
                                    }} source={{uri: post.files[0]}} />
                                {/* <Swiper buttonsEnabled={false}>
                                    {post.files.map((file, index) => {
                                        console.log(file)
                                        return (
                                            <View style={{width: '100%', height: 180}} key={index}>
                                                <Image style={{
                                                    width: 180,
                                                    height: 180
                                                }} source={{uri: file}} />
                                            </View>
                                        )
                                    })}
                                </Swiper> */}
                                </Body>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text style={{fontSize: 14}}>{post.text}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    )
                })}
                {this.state.posts.length == 0 && <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1
                    }}>
                    <Text>There is currently no media</Text>
                </View>}
                </Content>
                {this.state.loading && this.renderLoading()}
            </Container>
        )
    }
}