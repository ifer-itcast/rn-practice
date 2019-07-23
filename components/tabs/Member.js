import React, { Component } from 'react';
import { View, Button, Image } from 'react-native';

import ImagePicker from 'react-native-image-picker'
var photoOptions = {
    //底部弹出框选项
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    quality: 0.75,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
}

export default class Member extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgURL: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3441742992,2765570575&fm=27&gp=0.jpg'
        }
    }
    render() {
        return (
            <View style={{alignItems: 'center', paddingTop: 150}}>
                <Image source={{ uri: this.state.imgURL }} style={{ width: 200, height: 200, marginBottom: 20, borderRadius: 100 }}></Image>
                <Button title="开始拍照" onPress={this.cameraAction}></Button>
            </View>
        );
    }
    cameraAction = () => {
        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('response' + response);
            if (response.didCancel) {
                return
            }
            this.setState({
                imgURL: response.uri
            });
        })
    }
}