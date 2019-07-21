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

## 修改应用图标和名称

- android/app/src/main/res/values/strings.xml`修改应用名称
- android\app\src\main\res\mipmap-xxxxxx`修改图标

## 签名打包

1. 先保证自己正确配置了所有的 RN 环境

2. 在 cmd 命令行中，运行这一句话`keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

- 其中： `my-release-key.keystore` 表示你一会儿要生成的那个 签名文件的 名称【很重要，要找个小本本记下来】
- `-alias` 后面的东西，也很重要，需要找个小本本记下来，这个名称可以根据自己的需求改动`my-key-alias`
- 当运行找个命令的时候，需要输入一系列的参数，找个口令的密码，【一定要找个小本本记下来】

3. 当生成了签名之后，这个签名，默认保存到了自己的用户目录下`C:\Users\liulongbin\my-release-key.keystore`

4. 将你的签名证书copy到 android/app目录下。

5. 编辑 `android` -> `gradle.properties`文件，在最后，添加如下代码：

```
MYAPP_RELEASE_STORE_FILE=your keystore filename
MYAPP_RELEASE_KEY_ALIAS=your keystore alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```

6. 编辑 android/app/build.gradle文件添加如下代码：

```
...
android {
    ...
    defaultConfig { ... }
    + signingConfigs {
    +    release {
    +        storeFile file(MYAPP_RELEASE_STORE_FILE)
    +        storePassword MYAPP_RELEASE_STORE_PASSWORD
    +        keyAlias MYAPP_RELEASE_KEY_ALIAS
    +        keyPassword MYAPP_RELEASE_KEY_PASSWORD
    +    }
    +}
    buildTypes {
        release {
            ...
    +        signingConfig signingConfigs.release
        }
    }
}
...
```

7. 进入项目根目录下的`android`文件夹，打开终端，然后输入`./gradlew assembleRelease`开始发布APK的Release版；

8. 当发行完毕后，进入自己项目的`android\app\build\outputs\apk`目录中，找到`app-release.apk`，这就是我们发布完毕之后的完整安装包；就可以上传到各大应用商店供用户使用啦；

> 注意：请记得妥善地保管好你的密钥库文件，不要上传到版本库或者其它的地方。