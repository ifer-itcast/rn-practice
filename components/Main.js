import React, { Component } from 'react';
import { View } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

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
                        renderIcon={() => <Icon name="md-home" size={22} color="#900" />}
                        renderSelectedIcon={() => <Icon name="md-home" size={22} color="#0078d7" />}
                    >
                        <Home></Home>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'cart'}
                        title="购物车"
                        onPress={() => this.setState({ selectedTab: 'cart' })}
                        renderIcon={() => <Icon name="md-cart" size={22} color="#900" />}
                        renderSelectedIcon={() => <Icon name="md-cart" size={22} color="#0078d7" />}
                        badgeText="0"
                    >
                        <Cart></Cart>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'member'}
                        title="会员"
                        onPress={() => this.setState({ selectedTab: 'member' })}
                        renderIcon={() => <Icon name="md-contact" size={22} color="#900" />}
                        renderSelectedIcon={() => <Icon name="md-contact" size={22} color="#0078d7" />}
                    >
                        <Member></Member>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
}