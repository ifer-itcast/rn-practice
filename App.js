import React, { Component } from 'react';

import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
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
                    <Scene key="in_theaters" component={MovieList} />
                </Stack>
            </Router>
        );
    }
}