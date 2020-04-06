import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Spinner } from 'native-base';
import { Modal } from 'react-native'

export class Camera extends PureComponent {
    callback = null

    state = {
      processing: false,
      visible: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // console.log(this.callback)
    }
  
  show() {
    this.setState({
      visible: true
    })
  }

  hide() {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <Modal style={{flex: 1}} transparent={false} visible={!!this.state.visible}>
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
      {this.state.processing === true && <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black',
          position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}>
          <Text style={{color: 'white'}}>Saving image</Text>
          <Text style={{color: 'white'}}>Please wait</Text>
          <Spinner color='white' style={{marginTop: 10}} />
      </View>}
      </Modal>
    );
  }

  takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: false };
      this.setState({
        processing: true
      })
      this.camera.takePictureAsync(options).then(data => {
        this.setState({
          processing: false,
          visible: false
        })

        if (this.props.onCapture != null) {
          this.props.onCapture(data.uri)
        }

        if (this.props.onClose != null) {
          this.props.onClose()
        }
        // if (this.callback == null) {
        //     console.log('No callback')
        //     this.props.navigation.navigate('NewNote', {
        //         file: data.uri
        //     })
        // } else {
        //     console.log('Call back found')
        //     this.callback(data.uri)
        //     this.props.navigation.goBack()
        // }
        // this.camera.pausePreview()
        
      }).catch(() => {
        this.setState({
          processing: false
        })
      })
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});