import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { LoginPage } from './app/pages/auth/login';
import { RegisterPage } from './app/pages/auth/register';
import { ForgotPasswordPage } from './app/pages/auth/forgot-password';

// const AppStack = createStackNavigator({

// })

const AuthStack = createStackNavigator({
    Login: LoginPage,
    Register: RegisterPage,
    ForgotPassword: ForgotPasswordPage
}, {
    headerMode: 'none'
})

export default createAppContainer(createStackNavigator(
    {
        Auth: AuthStack
    },
    {
        initialRouteName: 'Auth',
        headerMode: 'none'
    }
))