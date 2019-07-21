import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
    gridList: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    gridItem: {
        width: '33.333%',
        alignItems: 'center',
        paddingVertical: 20
    },
    gridImg: {
        width: 60,
        height: 60,
        marginBottom: 10
    },
    gridTxt: {
        fontSize: 12
    }
});

export default class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                {/* 小屏装不下时需要 ScrollView 进行滚动 */}
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
                    <View style={styles.gridList}>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/calendar.png')} />
                            <Text>天降正义</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/draw.png')} />
                            <Text>法老之鹰</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/files-and-folders.png')} />
                            <Text>末日铁拳</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/print.png')} />
                            <Text>士兵 76</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/setup.png')} />
                            <Text>秩序之光</Text>
                        </View>
                        <View style={styles.gridItem}>
                            <Image style={styles.gridImg} source={require('../../images/telegram.png')} />
                            <Text>奥丽莎</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}