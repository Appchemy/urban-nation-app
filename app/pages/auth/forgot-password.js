import React from 'react'
import { Image } from 'react-native'
import { Container, View, Text, Form, Item, Label, Input, Button } from 'native-base';
import { TouchableNativeFeedback, TouchableHighlight } from 'react-native-gesture-handler';
import { Formik } from 'formik';
import App from '../../../App';
import firebase from 'react-native-firebase';
import { UserService } from '../../services/user-service';
import { Alert } from 'react-native'

export class ForgotPasswordPage extends React.Component {
    static navigationOptions = {
        title: 'Login'
    }

    constructor(props) {
        super(props)

        this.resetPassword = this.resetPassword.bind(this)

        
    }

    resetPassword(data) {
        App.showLoading('Resetting your password')
        UserService.resetPassword(data.email).then(() => {
            App.stopLoading()
            this.props.navigation.goBack()
            Alert.alert("You've got mail", "We have sent you an email on instruction for resetting your password", [
                {
                    text: 'Ok'
                }
            ])
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
                            this.resetPassword(values)
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
                            <Text style={{marginLeft: 20, textAlign: 'center'}}>Please enter your email address below and we will assist you with resetting your password</Text>
                            <Item floatingLabel>
                                <Label>Email</Label>
                                <Input style={inputStyle} autoCapitalize='none' name='email' returnKeyLabel='Next' returnKeyType='next' keyboardType='email-address' value={values.email} onChangeText={handleChange('email')} onBlur={handleBlur('email')} />
                            </Item>
                            <Button onPress={handleSubmit} block style={{marginTop: 20}}><Text>Reset Password</Text></Button>
                        </Form>
                    )}    
                    </Formik>
                    
                </View>
            </Container>
        )
    }
}