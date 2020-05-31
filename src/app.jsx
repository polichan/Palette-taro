import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'
import store from './utils/store/store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const reduxStore = store

class App extends Component {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  config = {
    pages: [
      'pages/index/index',
      'pages/login/index',
      'pages/steps/face/index',
      'pages/steps/patch/index',
      'pages/steps/filter/index',
      'pages/steps/convolution/index',
      'pages/steps/block/index',
      'pages/steps/workflow/index',
      'pages/license/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={reduxStore}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
