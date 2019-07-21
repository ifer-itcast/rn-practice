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

## Home.js 中添加轮播

```javascript
yarn add react-native-swiper@nightly
```

```javascript
import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {};
    }
    render() {
        return (
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
            </View>
        );
    }
}
```

## Home.js 六宫格布局

```javascript
<ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
    {/* 小屏装不下时需要 ScrollView 进行滚动 */}
    <View>
        <View style={styles.gridList}>
            <View style={styles.gridItem}>
                {/* 注意引入本地图片直接 require，不再需要 uri 了 */}
                <Image style={styles.gridImg} source={require('../../images/calendar.png')} />
                <Text>天降正义</Text>
            </View>
            {/* ... */}
        </View>
    </View>
</ScrollView>
```

## 编程式导航跳转电影列表

**App.js**

```javascript
<Router>
    {/* 配置 */}
    <Stack>
        <Scene key="main" component={Main} hideNavBar={true} />
        <Scene key="in_theaters" component={MovieList} />
    </Stack>
</Router>
```

**Home.js**

```javascript
<TouchableOpacity style={styles.gridItem} onPress={() => this.Actions.in_theaters()}>
    <View>
        <Image style={styles.gridImg} source={require('../../images/files-and-folders.png')} />
        <Text>电影列表</Text>
    </View>
</TouchableOpacity>
```

## 电影列表 TabBar

```javascript
<Router>
    {/* 配置 */}
    <Stack>
        <Scene key="main" component={Main} hideNavBar={true} />
        <Tabs
            {/* tabBarPosition="top" 有个警告待解决！ */}
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
```

## 电影列表 FlatList

```javascript
<FlatList
    data={this.state.mlist}
    renderItem={({ item, index }) => this.renderMovieItem(item)}
    keyExtractor={item => item.id + ''}
    ItemSeparatorComponent={() => <View style={{ borderTopColor: '#ccc', borderTopWidth: 1, marginHorizontal: 10 }}></View>}
/>
```

## 上拉加载更多

```javascript
loadMore = () => {
    // 先判断还有更多吗
    // nowPage * pageSize >= totalSize 证明没有下一页了
    const {nowPage, pageSize, totalSize} = this.state;
    if(nowPage * pageSize >= totalSize) {
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
```

## 电影详情

**App.js** 中配置路由

```javascript
<Scene key="moviedetail" component={MovieDetail} hideNavBar={true} />
```

