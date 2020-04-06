import React from 'react'
import { UserService } from '../../services/user-service'
import { Container, View, Spinner, Content, Text, Button, Item, Label, Input, Form } from 'native-base'
import { Image } from 'react-native'
import { Formik } from 'formik'

export class ProfilePage extends React.Component {
    static navigationOptions = {
        title: 'Profile'
    }
    state = {
        profile: null,
        loading: true
    }
    avatar = require('../../../assets/imgs/avatar.png')

    componentDidMount() {
        UserService.user().then(profile => {
            this.setState({
                profile: profile,
                loading: false
            })
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.loading === false ? 
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            <View style={{backgroundColor: 'black', alignItems: 'center', padding: 20}}>
                                <Image style={{
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    borderColor: 'white',
                                    borderWidth: 3
                                }} source={this.state.profile && this.state.profile.photo ? {uri: this.state.profile.photo} : this.avatar} />
                                <Text style={{color: 'white', marginTop: 20}}>{this.state.profile ? `${this.state.profile.firstname} ${this.state.profile.lastname}` : ''}</Text>
                                <Text style={{color: 'white'}}>{this.state.profile.email}</Text>
                            </View>
                            <Formik initialValues={this.state.profile}>
                                {({
                                    values,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit
                                }) => {
                                    return (
                                        <Form>
                                            <Item floatingLabel>
                                                <Label>First Name</Label>
                                                <Input value={values.firstname} onChange={handleChange('firstname')} onBlur={handleBlur('firstname')} />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>Last Name</Label>
                                                <Input value={values.lastname} onChange={handleChange('lastname')} onBlur={handleBlur('lastname')} />
                                            </Item>
                                            <Item floatingLabel>
                                                <Label>Phone Number</Label>
                                                <Input value={values.phone} onChange={handleChange('phone')} onBlur={handleBlur('phone')} />
                                            </Item>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </View>
                        <View style={{padding: 10}}>
                            <Button block><Text>Save</Text></Button>
                        </View>
                    </View> :
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color='black' />
                    </View>}
            </View>
        )
    }
}