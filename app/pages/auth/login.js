import React from 'react'
import { Image } from 'react-native'
import { Container, View, Text, Form, Item, Label, Input, Button } from 'native-base';
import { TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import App from '../../../App';
import firebase from 'react-native-firebase';
import { UserService } from '../../services/user-service';
import { Alert } from 'react-native'
import { TasksService } from '../../services/tasks-service';
import { ClockInService } from '../../services/clockin-service';

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

    signIn(data) {
        App.showLoading('Signing in')
        UserService.login(data.email, data.password).then(() => {
            return ClockInService.currentClockIn().then(current => {
                App.stopLoading()
                if (current) {
                    this.props.navigation.navigate('Venue')
                } else {
                    this.props.navigation.navigate('Home')
                }
            })
            
        }).catch(err => {
            App.stopLoading()
            Alert.alert('Error', err.message, [
                {
                    text: 'Ok'
                }
            ])
        })
    }

    signUp() {
        this.props.navigation.navigate('Register')
    }

    forgotPassword() {
        this.props.navigation.navigate('ForgotPassword')
    }

    render() {
        const inputStyle = { marginTop: 10 }
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
                        onSubmit={(values, {setSubmitting}) => {
                            // setSubmitting(true)
                            this.signIn(values)
                            // setTimeout(() => {
                            //     setSubmitting(false)
                            // }, 3000)
                        }}
                    >
                    {({
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    }) => (
                        <Form>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input style={inputStyle} autoCapitalize='none' name='email' returnKeyLabel='Next' returnKeyType='next' keyboardType='email-address' value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input style={inputStyle} secureTextEntry={true} name='password' value={values.password} onChangeText={handleChange('password')} onBlur={handleBlur('password')} />
                            </Item>
                            <Button onPress={handleSubmit} block style={{marginTop: 20}}><Text>Sign In</Text></Button>
                            <View style={{alignItems: 'center'}}>
                                <Button transparent onPress={this.forgotPassword}><Text>Forgot Password</Text></Button>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={{padding: 5}}>
                                    <Text style={{textAlign: 'center'}}>Don't have an account?</Text>
                                </View>
                                <Button transparent small onPress={this.signUp}><Text>Sign Up</Text></Button>
                            </View> 
                        </Form>
                    )}    
                    </Formik>
                    
                </View>
            </Container>
        )
    }
}