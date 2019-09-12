import React from 'react'
import { Image } from 'react-native'
import { Container, View, Text, Form, Item, Label, Input, Button } from 'native-base';
import { TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';

export class LoginPage extends React.Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props)

        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
        this.forgotPassword = this.forgotPassword.bind(this)
    }

    signIn() {

    }

    signUp() {
        console.log('Hey')
    }

    forgotPassword() {

    }

    render() {
        return (
            <Container>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image style={{
                        width: 100,
                        height: 100
                    }} image={require('../../../assets/imgs/logo.png')}/>
                </View>
                <View style={{
                    paddingBottom: 20,
                    paddingRight: 10,
                    paddingLeft: 10,
                }}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input style={{marginTop: 10}} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button block style={{marginTop: 20}}><Text>Sign In</Text></Button>
                        <View style={{alignItems: 'center'}}>
                            <Button transparent onPress={this.forgotPassword}><Text>Forgot Password</Text></Button>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}><View style={{padding: 5}}><Text style={{textAlign: 'center'}}>Don't have an account?</Text></View><TouchableHighlight style={{padding: 5}} onPress={this.signUp}><View style={{width: 100, height: 100}}><Text>Sign Up</Text></View></TouchableHighlight></View>
                    </Form>
                </View>
            </Container>
        )
    }
}