import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/index'
import store from './utils/store/store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }


class App extends Component {

  componentDidMount() {
    if (Taro.env == 'weapp') {
      this.updateWeapp()
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  updateWeapp = () => {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(() => {
        console.log('检查更新中...')
      })
      updateManager.onUpdateReady(() => {
        // noinspection JSIgnoredPromiseFromCall
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            Taro.setStorageSync('updateDone', false);
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          },
        })
      })
      updateManager.onUpdateFailed(() => {
        // noinspection JSIgnoredPromiseFromCall
        Taro.showModal({
          title: '更新提示',
          content: '新版本下载失败，请检查你的微信',
          showCancel: false,
        })
      })
    } else {
      // noinspection JSIgnoredPromiseFromCall
      Taro.showModal({
        title: '微信升级',
        content: '当前微信版本过低，部分功能无法使用，请升级到最新版本',
        showCancel: false,
      })
    }
  }

  config = {
    pages: [
      'pages/index/index',
      'pages/cache/index',
      'pages/login/index',
      'pages/license/index',
      'pages/about/index',
      'pages/thanks/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      navigationStyle: "custom",
    },
    subPackages: [
      {
        "root": "pages/questions/",
        "pages": [
          "paper/index",
          "binarization_question/index",
          "histogram_chart/index",
          "histogram_question/index",
        ]
      },
      {
        "root": "pages/steps/",
        "pages": [
          "binarization/index",
          "characteristic/index",
          "convolution/index",
          "convolution_visual/index",
          "face/index",
          "histogram/index",
          "intro/index",
          "knn/index",
          "params/index",
          "patch/index",
          "workflow/index",
          "result/index"
        ]
      },
    ]
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
