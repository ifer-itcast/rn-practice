import React, { Component } from 'react';
import { View, Text, ActivityIndicator, Image, ScrollView } from 'react-native';

export default class MovieDetail extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            mdetail: {}
        };
    }
    componentWillMount() {
        this.getMovieDetail();
    }
    render() {
        const { mdetail, isLoading } = this.state;
        return (
            <View style={{flex: 1}}>
                {
                    isLoading
                        ?
                        <ActivityIndicator size="large" />
                        :
                        <ScrollView style={{flex: 1, paddingHorizontal: 6}}>
                            <View>
                                <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                                    <Image source={{
                                        uri: mdetail.images.large
                                    }} style={{ width: 200, height: 250 }} />
                                </View>
                                <Text style={{ lineHeight: 30 }}>        {mdetail.summary}</Text>
                            </View>
                        </ScrollView>
                }
            </View>
        );
    }
    getMovieDetail = async () => {
        const res = await fetch(`${this.baseURL}/v2/movie/subject/${this.props.id}?apikey=${this.apikey}`);
        const data = await res.json();
        this.setState({
            mdetail: data,
            isLoading: false
        });
    }
}