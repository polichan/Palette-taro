import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import NavBar from "@/components/NavBar";
import WaveLoading from "@/components/WaveLoading";
import * as Utils from "@/utils/utils";
import Queue from "@/utils/queue";
import _isFunction from "lodash/isFunction";
import { CDN_IMAGE } from "../../constants/index";
import "./index.scss";

export default class Cache extends Component {
  state = {
    queue: new Queue()
  };

  componentDidMount() {
    this.generateQueueForCache(() => {
      this.state.queue.list.forEach(element => {
        Taro.downloadFile({
          url: element.url,
          filePath: `${Taro.env.USER_DATA_PATH}/${element.fileName}`,
          success: res => {
            if (res.statusCode == 200) {
              console.log("图片下载成功", res.filePath);
            }
          },
          fail: () => {
            Taro.showToast({
                icon: 'none',
                title: '下载异常，即将重试。'
            })
          }
        });
      });
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
    return (
      <View>
        <NavBar background='#fff' title='首次加载' />
        <WaveLoading></WaveLoading>
        <Text>正在努力下载资源文件...</Text>
      </View>
    );
  }
}
