import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import NavBar from "@/components/NavBar";
import WaveLoading from "@/components/WaveLoading";
import * as Utils from "@/utils/utils";
import Queue from "@/utils/queue";
import _isFunction from "lodash/isFunction";
import { CDN_IMAGE } from "../../constants/index";
import "./index.scss";

export default class Cache extends Component {
  state = {
    totalFileNum: 0,
    queue: new Queue(),
    loadingPercentage: 0
  };

  componentDidMount() {
    this.startCachingFile();
  }

  startCachingFile() {
    this.generateQueueForCache(() => {
      const addPercentage = Math.trunc(100 / this.state.queue.size());
      this.setState({
        totalFileNum: this.state.queue.size()
      });
      // while for caching files
      while (!this.state.queue.isEmpty()) {
        const element = this.state.queue.pop();
        Taro.downloadFile({
          url: element.url,
          filePath: `${Taro.env.USER_DATA_PATH}/${element.fileName}`,
          success: res => {
            if (res.statusCode == 200) {
              this.setState(prevState => {
                return {
                  totalFileNum: prevState.totalFileNum - 1,
                  loadingPercentage: prevState.loadingPercentage + addPercentage
                };
              });
              console.log("图片下载成功", res.filePath);
            }
          },
          fail: () => {
            this.state.queue.push(element);
          }
        });
      }
      //   // when downloading task has finished
      //   Taro.showToast({
      //     icon: "none",
      //     title: "资源下载完毕，即将进行实验。",
      //     duration: 1500,
      //     success: () => {
      //       setTimeout(() => {
      //         Taro.navigateTo({
      //           url: "/pages/steps/workflow/index"
      //         });
      //       }, 1500);
      //     }
      //   });
    });
  }

  generateQueueForCache(callback) {
    const cacheObject = CDN_IMAGE;
    for (const key in cacheObject) {
      if (cacheObject.hasOwnProperty(key)) {
        const element = cacheObject[key];
        const url = Utils.getSrc(element, false);
        const e = element.split("/");
        this.state.queue.push({ url: url, fileName: e[e.length - 1] });
      }
    }
    if (_isFunction(callback)) {
      callback();
    }
  }

  render() {
    const { totalFileNum, loadingPercentage } = this.state;
    return (
      <View className='cache-container'>
        <NavBar background='#fff' title='资源包加载' />
        <View className='loading-container'>
          <WaveLoading percentage={loadingPercentage}></WaveLoading>
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
