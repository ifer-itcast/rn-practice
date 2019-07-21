import React, { Component } from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import Home from './tabs/Home';
import Cart from './tabs/Cart';
import Member from './tabs/Member';

export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            selectedTab: 'home'
        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="首页"
                        onPress={() => this.setState({ selectedTab: 'home' })}
                    >
                        <Home></Home>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'cart'}
                        title="购物车"
                        onPress={() => this.setState({ selectedTab: 'cart' })}
                    >
                        <Cart></Cart>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'member'}
                        title="会员"
                        onPress={() => this.setState({ selectedTab: 'member' })}
                    >
                        <Member></Member>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}