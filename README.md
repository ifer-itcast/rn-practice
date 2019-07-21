# rn-practice

## 初始化项目

```javascript
react-native init rn --version react-native@0.59.4
```

```javascript
react-native run-android
```

```javascript
react-native start
```

## 配置路由

```javascript
// 每次安装新包需要重新编译或Start
yarn add react-native-router-flux
```

**App.js** 中导入并配置

```javascript
import React, { Component } from 'react';

// 导入
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
React.Component.prototype.Actions = Actions;

import Main from './components/Main';

export default class App extends Component {
    render() {
        return (
            <Router>
                {/* 配置 */}
                <Stack>
                    <Scene key="main" component={Main} hideNavBar={true} />
                </Stack>
            </Router>
        );
    }
}
```

## Main.js 中配置 TabBar

```javascript
yarn add react-native-tab-navigator
```

```javascript
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
                    {/* ... */}
                </TabNavigator>
            </View>
        );
    }
}
```

## 配置 TabBar 的 Icon

- 安装

```javascript
yarn add react-native-vector-icons
```

- link

```javascript
react-native link
```

- 打开`android/app/build.gradle`，定位到第`81行`，添加如下代码

```javascript
// 自定义项目用用到的 字体文件
project.ext.vectoricons = [
    iconFontNames: ['Ionicons.ttf'] // Name of the font files you want to copy
]

// 应用导入的字体文件
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

- 重新编译

```javascript
react-native run-android
```

- 使用

```javascript
import Icon from 'react-native-vector-icons/Ionicons';
```

```javascript
<TabNavigator.Item
    selected={this.state.selectedTab === 'home'}
    title="首页"
    onPress={() => this.setState({ selectedTab: 'home' })}
    renderIcon={() => <Icon name="md-home" size={22} color="#900" />}
    renderSelectedIcon={() => <Icon name="md-home" size={22} color="#0078d7" />}
>
    <Home></Home>
</TabNavigator.Item>
```