import React, { useState, useEffect } from 'react'
import { Container, View, Spinner, List, ListItem, Card, CardItem, Text, Button, Right, Body } from 'native-base';
import { NotificationsService } from '../../services/notifications-service';
import moment from 'moment';

export const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(null)

    useEffect(() => {
        NotificationsService.notifications().then(notifications => {
            setNotifications(notifications)
        })
    }, [])

    return (
        <Container style={{flex: 1}}>
            {notifications ? (
                notifications.length == 0 ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>There are no job requests</Text></View> :
                <View style={{padding: 10}}>
                        {notifications.map((notification, index) => {
                            return (
                                <Card key={index}>
                                    <CardItem>
                                        <Text>{notification.message}</Text>
                                    </CardItem>
                                    <CardItem footer>
                                        <Body />
                                        <Right>
                                            <Text>
                                                {moment(notification.postedAt.seconds * 1000).fromNow()}
                                            </Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            )
                        })}
                </View>
            ) : (
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Spinner color='black' />
                </View>
            )}
        </Container>
    )
}

NotificationsPage.navigationOptions = {
    title: 'Broadcasts'
}