import React, { useState, useEffect } from 'react'
import { Container, View, Spinner, List, ListItem, Card, CardItem, Text, Button, Right, Body } from 'native-base';
import { JobsService } from '../../services/jobs-service';
import { Alert } from 'react-native'
import App from '../../../App';

export const JobAlertPage = () => {
    const [alerts, setAlerts] = useState(null)

    useEffect(() => {
        JobsService.jobAlerts().then(jobs => {
            setAlerts(jobs)
        })
    }, [])

    return (
        <Container style={{flex: 1}}>
            {alerts ? (
                alerts.length == 0 ? <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>There are no job requests</Text></View> :
                <View style={{padding: 10}}>
                        {alerts.map((alert, index) => {
                            return (
                                <Card key={index}>
                                    <CardItem header>
                                        <Text>New Job in {alert.provinces}</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Text>{alert.description}</Text>
                                    </CardItem>
                                    <CardItem footer>
                                        <Body />
                                        <Right>
                                            <Button transparent onPress={() => {
                                                Alert.alert('Confirm', 'Are you sure you want to send your application?', [{
                                                    text: 'Yes',
                                                    onPress: () => {
                                                        App.showLoading('Sending application...')
                                                        Alert.alert('Success', 'Application Sent')
                                                        JobsService.apply(alert).then(() => {
                                                            setAlerts(null)
                                                            JobsService.jobAlerts().then(jobs => {
                                                                setAlerts(jobs)
                                                            })
                                                        }).catch(err => {
                                                            Alert.alert('Error', err.message)
                                                        }).finally(() => {
                                                            App.stopLoading()
                                                        })
                                                    }
                                                }, {
                                                    text: 'No'
                                                }])
                                            }}>
                                                <Text>Send Application</Text>
                                            </Button>
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

JobAlertPage.navigationOptions = {
    title: 'Job Alerts'
}