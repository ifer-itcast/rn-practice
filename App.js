import React, { Component } from 'react';

import { Router, Stack, Scene, Actions, Tabs } from 'react-native-router-flux';
React.Component.prototype.Actions = Actions;
// https://api.douban.com
// http://www.liulongbin.top:3005
React.Component.prototype.baseURL = 'https://api.douban.com';
React.Component.prototype.apikey = '0df993c66c0c636e29ecbb5344252a4a';

import Main from './components/Main';
import MovieList from './components/movie/MovieList';
import MovieDetail from './components/movie/MovieDetail';

export default class App extends Component {
    render() {
        return (
            <Router>
                {/* 配置 */}
                <Stack>
                    <Scene key="main" component={Main} hideNavBar={true} />
                    <Tabs
                        tabBarPosition="top"
                        hideNavBar={true}
                        // 启动Scene的懒加载效果，知道对应的路由被激活时，才会创建对应的组件
                        lazy={true}
                    >
                        <Scene
                            key="in_theaters" 
                            component={MovieList} 
                            title="正在热映" 
                            hideNavBar={true} 
                            mtype="in_theaters"
                        />
                        <Scene 
                            key="coming_soon" 
                            component={MovieList} 
                            title="即将上映" 
                            hideNavBar={true} 
                            mtype="coming_soon"
                        />
                        <Scene 
                            key="top250" 
                            component={MovieList} 
                            title="Top250" 
                            hideNavBar={true} 
                            mtype="top250"
                        />
                    </Tabs>
                    <Scene
                        key="moviedetail"
                        component={MovieDetail}
                        title="电影详情"
                        navigationBarStyle={{backgroundColor: '#1f96f1', height: 50}}
                        titleStyle={{color: '#fff', fontSize: 14}}
                        // 颜色修改没作用？
                        backButtonTintColor='#fff'
                    />
                </Stack>
            </Router>
        );
    }
}