import React, { Component } from 'react';

import { Router, Stack, Scene, Actions, Tabs } from 'react-native-router-flux';
React.Component.prototype.Actions = Actions;

import Main from './components/Main';
import MovieList from './components/movie/MovieList';

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
                </Stack>
            </Router>
        );
    }
}