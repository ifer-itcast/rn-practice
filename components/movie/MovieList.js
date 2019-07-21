import React, { Component } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    ActivityIndicator,
    FlatList
} from 'react-native';

export default class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            nowPage: 1,
            pageSize: 10,
            mlist: []
        };
    }
    componentWillMount() {
        this.getMovieListByType();
    }
    render() {
        return (
            <View>
                {
                    this.state.isLoading
                        ?
                        <ActivityIndicator size="large" />
                        :
                        <FlatList
                            data={this.state.mlist}
                            renderItem={({ item, index }) => this.renderMovieItem(item)}
                            keyExtractor={item => item.id + ''}
                            ItemSeparatorComponent={() => <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, marginHorizontal: 10 }}></View>}
                        />
                }
            </View>
        );
    }
    getMovieListByType = async () => {
        // APP 中不存在跨域的问题！
        const { nowPage, pageSize } = this.state;
        const start = (nowPage - 1) * pageSize;
        const res = await fetch(this.baseURL + `/v2/movie/${this.props.mtype}?${start}=0&count=${pageSize}&apikey=${this.apikey}`);
        const data = await res.json();
        this.setState({
            mlist: data.subjects,
            isLoading: false
        });
    }
    renderMovieItem = (item) => {
        return <View style={{ flexDirection: 'row', margin: 10 }}>
            <Image source={{
                uri: item.images.small
            }} style={{ width: 120, height: 160, marginRight: 10 }} />
            <View style={{ justifyContent: 'space-around' }}>
                <Text>电影名称：{item.title}</Text>
                <Text>电影类型：{item.genres.join(', ')}</Text>
                <Text>上映年份：{item.year}年</Text>
                <Text>豆瓣评分：{item.rating.average}</Text>
            </View>
        </View>
    }
}