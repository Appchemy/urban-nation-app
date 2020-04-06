import React, { useState, useEffect } from 'react'
import { Container, Content, View } from 'native-base';
import { MessagesService } from '../../services/messages-service';

export const MessagesPage = () => {
    const [messages, setMessages] = useState([])

    const listenMessages = () => {
        MessagesService.messages(messages => {
            setMessages(messages)
        })
    }

    useEffect(() => {
        listenMessages()
    }, [])

    return (
        <Container>
            <Content>
                {messages.map((message, index) => {
                    return (
                        <View key={index} style={{
                            
                        }}>
                            <View>
                                <Text>{message.message}</Text>
                            </View>
                        </View>
                    )
                })}
            </Content>
        </Container>
    )
}