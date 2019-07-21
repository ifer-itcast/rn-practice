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
// 安装
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

