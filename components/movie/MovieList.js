import React, { Component } from 'react';
import {
    View,
    Image,
    Text,
    ActivityIndicator,
    FlatList,
    TouchableNativeFeedback
} from 'react-native';

export default class MovieList extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            nowPage: 1,
            pageSize: 10,
            mlist: [],
            isOver: false,
            totalSize: 0
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
                            onEndReachedThreshold={0.3}
                            onEndReached={() => this.loadMore()}
                            ListFooterComponent={() => this.state.isOver ? null : <ActivityIndicator />}
                        />
                }
            </View>
        );
    }
    getMovieListByType = async () => {
        // APP 中不存在跨域的问题！
        const { nowPage, pageSize } = this.state;
        const start = (nowPage - 1) * pageSize;
        const res = await fetch(this.baseURL + `/v2/movie/${this.props.mtype}?start=${start}&count=${pageSize}&apikey=${this.apikey}`);
        const data = await res.json();
        this.setState({
            mlist: this.state.mlist.concat(data.subjects),
            isLoading: false,
            totalSize: data.total
        });
    }
    renderMovieItem = (item) => {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}
                onPress={() => this.Actions.moviedetail({
                    id: item.id,
                    title: item.title
                })}
            >
                <View style={{ flexDirection: 'row', margin: 10 }}>
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
            </TouchableNativeFeedback>
        );
    }
    loadMore = () => {
        // 先判断还有更多吗
        // nowPage * pageSize >= totalSize 证明没有下一页了
        const { nowPage, pageSize, totalSize } = this.state;
        if (nowPage * pageSize >= totalSize) {
            this.setState({
                isOver: true // 数据加载完了把 loading 干掉
            });
        } else {
            this.setState({
                nowPage: nowPage + 1
            }, () => {
                this.getMovieListByType();
            });
        }
    }
}