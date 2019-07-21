import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <View>
                <View style={{ height: 200 }}>
                    <Swiper showsButtons={false} autoplay={true}>
                        {/* resizeMode="contain" */}
                        <Image source={{
                            uri: 'http://overwatch.nos.netease.com/2/media/artwork/Roadhog_artwork.jpg'
                        }} style={{ width: '100%', height: '100%' }} />
                        <Image source={{
                            uri: 'http://overwatch.nos.netease.com/2/media/artwork/hanzo-concept.49XGv.jpg'
                        }} style={{ width: '100%', height: '100%' }} />
                        <Image source={{
                            uri: 'http://overwatch.nos.netease.com/2/media/artwork/soldier-76-concept.40OZx.jpg'
                        }} style={{ width: '100%', height: '100%' }} />
                    </Swiper>
                </View>
            </View>
        );
    }
}