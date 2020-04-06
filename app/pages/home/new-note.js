import React from 'react'
import { Container, View, Text, Icon, Input, Item, Textarea, Button, Form } from 'native-base'
import {Image} from 'react-native'
import { TouchableOpacity, Alert } from 'react-native'
import { Formik } from 'formik'
import App from '../../../App'
import { TasksService } from '../../services/tasks-service'
import { Camera } from './camera'

export class NewNotePage extends React.Component {
    static navigationOptions = {
        title: 'Share a Note'
    }

    camera = null
    state = {
        files: [],
        camera: null,
        showCamera: false,
        taskId: this.props.navigation.getParam('taskId')
    }

    constructor(props) { 
        super(props)

        this.onCapture = this.onCapture.bind(this)
        this.closeCamera = this.closeCamera.bind(this)
        this.takePicture = this.takePicture.bind(this)
    }

    takePicture() {
        this.camera.show()
    }

    closeCamera() {
        this.setState({
            showCamera: false
        })
    }

    onCapture(file) {
        console.log(file)
        const files = this.state.files
        files.push(file)
    
        console.log('Setting state')
        this.setState({
            files: files
        }, () => {
            console.log(this.state.files)
        })
    }

    upload(values) {
        console.log(values)
        App.showLoading('Uploading... Please wait')
        TasksService.uploadFile(this.state.taskId, values.message, this.state.files).then(() => {
            App.stopLoading()
            this.props.navigation.goBack()
        }).catch(err => {
            Alert.alert('Error', err.message, [{
                text: 'Ok'
            }])
            App.stopLoading()
        })
    }

    render() {
        return (
            <Container style={{padding: 10}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.state.files.map((file, index) => {
                        return (
                            <View key={index} style={{marginRight: 10, marginBottom: 10}}>
                                <Image style={{
                                    width: '100%',
                                    height: 100,
                                    width: 100,
                                    borderRadius: 10,
                                    resizeMode: 'cover'
                                }}
                                source={{uri: file}} />
                            </View>
                        )
                    })}

                    {/* <TouchableOpacity > */}
                        <TouchableOpacity onPress={this.takePicture} style={{
                            width: 100, 
                            height: 100, 
                            borderColor: 'black', 
                            borderWidth: 3, 
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10}}>
                                <Icon name='add' />
                            </TouchableOpacity>
                    {/* </TouchableOpacity> */}
                </View>
                
                <Formik initialValues={{message: ''}} onSubmit={(values) => {
                    this.upload(values)
                }}>
                    {({
                        values,
                        handleBlur,
                        handleChange,
                        handleSubmit
                    }) => {
                        return (
                            <Form>
                                <Textarea value={values.message} onChangeText={handleChange('message')} onBlur={handleBlur('message')} rowSpan={5} bordered placeholder="Type message (optional)" />
                                <View style={{alignItems: 'flex-end', marginTop: 10}}>
                                    <Button onPress={() => {handleSubmit()}} bordered rounded small><Text>Send</Text></Button>
                                </View>
                            </Form>
                        )
                    }}
                </Formik>
                <Camera ref={ref => this.camera = ref} onCapture={this.onCapture} />
            </Container>
        )
    }
}