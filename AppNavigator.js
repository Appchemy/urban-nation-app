import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { LoginPage } from './app/pages/auth/login';
import { RegisterPage } from './app/pages/auth/register';
import { ForgotPasswordPage } from './app/pages/auth/forgot-password';
import { HomePage } from './app/pages/home/home';
import { LoadingPage } from './app/pages/loading';
import { Drawer } from './app/components/drawer';
import { ProfilePage } from './app/pages/home/profile';
import { CheckInPage } from './app/pages/home/checkin';
import { VenuePage } from './app/pages/home/venue';
import { NewNotePage } from './app/pages/home/new-note';
import { PostsPage } from './app/pages/home/posts';
import { OnBoardingPage } from './app/pages/onboarding/onboarding';
import { JobAlertPage } from './app/pages/home/job-alerts';
import { NotificationsPage } from './app/pages/home/notifications';
import { MessagesPage } from './app/pages/home/messages';

// const AppStack = createStackNavigator({

// })

const AuthStack = createStackNavigator({
    Login: LoginPage,
    Register: RegisterPage,
    ForgotPassword: ForgotPasswordPage
}, {
    headerMode: 'none'
})

const mainScreens = {
    Home: HomePage,
    Profile: ProfilePage,
    CheckIn: CheckInPage,
    Venue: VenuePage,
    NewNote: NewNotePage,
    JobAlerts: JobAlertPage,
    Notifications: NotificationsPage,
    Messages: MessagesPage
}

const AppStack = createStackNavigator({
    ...mainScreens
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff'
    }
  })

const VenueStack = createStackNavigator({
    Venue: VenuePage,
    Profile: ProfilePage,
    CheckIn: CheckInPage,
    NewNote: NewNotePage,
    Posts: PostsPage
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      initialRouteName: 'Venue',
    }
  })

const OnBoardingStack = createStackNavigator({
    OnBoarding: OnBoardingPage
}, {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#000000',
      },
      headerTintColor: '#fff',
      initialRouteName: 'Venue',
    }
  })

const DrawerNavigator = createDrawerNavigator({
    App: AppStack,
  }, {
    contentComponent: Drawer,
    drawerWidth: 300,
    drawerType: 'slide',
  });

  const VenueDrawerNavigator = createDrawerNavigator({
    App: VenueStack,
  }, {
    contentComponent: Drawer,
    drawerWidth: 300,
    drawerType: 'slide',
  });

export default createAppContainer(createStackNavigator(
    {
        Auth: AuthStack,
        App: DrawerNavigator,
        AppVenue: VenueDrawerNavigator,
        Loading: LoadingPage,
        OnBoarding: OnBoardingStack
    },
    {
        initialRouteName: 'Loading',
        headerMode: 'none'
    }
))