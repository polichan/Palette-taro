import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import NavBar from "../steps/intro/node_modules/@/components/NavBar";
import WaveLoading from "@/components/WaveLoading";
import * as Utils from "@/utils/utils";
import Queue from "@/utils/queue";
import { CDN_IMAGE } from "../../constants/index";
import "./index.scss";

export default class Cache extends Component {
  state = {
    totalFileNum: 0,
    queue: new Queue(),
    loadingPercentage: 0,
    addPercentage: 0,
    downloadError: false,
    loading: true,
    errorTip: null
  };

  async componentDidMount() {
    await this.startCachingTask();
  }

  finishCachingTask() {
    Taro.showToast({
      icon: "none",
      title: "资源下载完毕，即将返回首页。",
      duration: 1500,
      success: () => {
        setTimeout(() => {
          Taro.reLaunch({
            url: "/pages/index/index"
          });
        }, 1500);
      }
    });
  }

  async startCachingTask() {
    this.generateQueueForCache();
    this.setState({
      totalFileNum: this.state.queue.size()
    });
    try {
      while (!this.state.queue.isEmpty()) {
        const element = this.state.queue.pop();
        await this.generateDownLoadFilePromise(
          element.url,
          `${Taro.env.USER_DATA_PATH}/${element.fileName}`
        )
          .then(res => {
            if (res.statusCode == 200) {
              this.addPercentageAndMinusTotalFileNum();
            }
          })
          .catch(e => {
            throw e;
          });
      }
      this.finishCachingTask();
    } catch (e) {
      Taro.showToast({
        icon: "none",
        title: "下载失败，请重试。"
      });
      this.setState({
        downloadError: true
      });
    }
  }

  async generateDownLoadFilePromise(url, filePath) {
    return new Promise((resolve, reject) => {
      return Taro.downloadFile({
        url: url,
        filePath: filePath
      })
        .then(res => {
          resolve(res);
        })
        .catch(() => {
          reject(new Error("Download Failed"));
        });
    });
  }

  addPercentageAndMinusTotalFileNum() {
    this.setState(prevState => {
      return {
        totalFileNum: prevState.totalFileNum - 1,
        loadingPercentage:
          prevState.loadingPercentage + this.state.addPercentage
      };
    });
  }

  generateQueueForCache() {
    this.state.queue.clearAll()
    const cacheObject = CDN_IMAGE;
    for (const key in cacheObject) {
      if (cacheObject.hasOwnProperty(key)) {
        const element = cacheObject[key];
        const url = Utils.getSrc(element, false);
        const e = element.split("/");
        this.state.queue.push({ url: url, fileName: e[e.length - 1] });
      }
    }
    this.setState({
      addPercentage: Math.trunc(100 / this.state.queue.size())
    });
  }

  handleLoadingRetry() {
    this.setState(
      {
        downloadError: false
      },
      () => {
        this.startCachingTask();
      }
    );
  }

  render() {
    const {
      totalFileNum,
      loadingPercentage,
      downloadError,
      loading,
      errorTip
    } = this.state;
    if (downloadError) {
      this.setState({
        loadingPercentage: 0,
        totalFileNum: 0,
        addPercentage: 0,
        loading: false,
        errorTip: "重试"
      });
    } else {
      this.setState({
        loading: true,
        errorTip: null
      });
    }
    return (
      <View className='cache-container'>
        <NavBar background='#fff' title='资源包加载' />
        <View className='loading-container'>
          <WaveLoading
            percentage={loadingPercentage}
            onRetry={this.handleLoadingRetry.bind(this)}
            animate={loading}
            errorTip={errorTip}
          ></WaveLoading>
        </View>
        <View className='cache-footer'>
          <Text className='cache-tip'>
            正在努力下载资源文件，剩余 {totalFileNum} 个文件...
          </Text>
        </View>
        <View className='safe-area-block-container'></View>
      </View>
    );
  }
}
