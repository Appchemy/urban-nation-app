import React from 'react'
import { Image } from 'react-native'
import { Container, View, Text, Form, Item, Label, Input, Button } from 'native-base';
import { TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import App from '../../../App';
import firebase from 'react-native-firebase';
import { UserService } from '../../services/user-service';
import { Alert } from 'react-native'

export class RegisterPage extends React.Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props)

        this.signIn = this.signIn.bind(this)
        this.signUp = this.signUp.bind(this)
    }

    signIn() {
        this.props.navigation.goBack()
    }

    signUp(data) {
        const toSend = JSON.parse(JSON.stringify(data))
        delete toSend.password
        App.showLoading('Creating your account')
        UserService.signup(data.email, data.password, toSend).then(() => {
            App.stopLoading()
        }).catch(err => {
            App.stopLoading()
            Alert.alert('Error', err.message, [
                {
                    text: 'Ok'
                }
            ])
        })
    }

    render() {
        return (
            <Container>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Image width={100} resizeMethod='auto' resizeMode='contain' style={{
                        width: 250
                    }} source={require('../../../assets/imgs/logo.png')}/>
                </View>
                <View style={{
                    paddingBottom: 20,
                    paddingRight: 10,
                    paddingLeft: 10,
                }}>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values) => {
                            this.signUp(values)
                        }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <Form>
                            <Item floatingLabel>
                                <Label>FIRSTNAME</Label>
                                <Input returnKeyLabel='Next' returnKeyType='next' value={values.firstname} onChangeText={handleChange('firstname')} onBlur={handleBlur('firstname')} style={{marginTop: 10}} />
                            </Item>
                            <Item floatingLabel>
                                <Label>LASTNAME</Label>
                                <Input returnKeyLabel='Next' returnKeyType='next' value={values.lastname} onChangeText={handleChange('lastname')} onBlur={handleBlur('lastname')} style={{marginTop: 10}} />
                            </Item>
                            <Item floatingLabel>
                                <Label>EMAIL</Label>
                                <Input autoCapitalize='none' returnKeyLabel='Next' returnKeyType='next' keyboardType='email-address' value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} style={{marginTop: 10}} />
                            </Item>
                            <Item floatingLabel>
                                <Label>PASSWORD</Label>
                                <Input secureTextEntry={true} value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} />
                            </Item>
                            <Item floatingLabel>
                                <Label>CONFIRM PASSWORD</Label>
                                <Input secureTextEntry={true} value={values.password2} onChangeText={handleChange('password2')} onBlur={handleBlur('password2')} />
                            </Item>
                            <Button onPress={handleSubmit} block style={{marginTop: 20}}><Text>Sign Up</Text></Button>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{padding: 5}}>
                                    <Text style={{textAlign: 'center'}}>Already have an account?</Text>
                                </View>
                                <Button transparent small onPress={this.signIn}><Text>Sign In</Text></Button>
                            </View> 
                        </Form>
                    )}    
                    </Formik>
                    
                </View>
            </Container>
        )
    }
}