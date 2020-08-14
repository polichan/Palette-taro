import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "taro-parse/dist/style/main.scss";
import TaroParser from "taro-parse";
import {MD_RENDER_API} from "../../config/config";
import "./index.scss";

export default class Question extends Component {
  static defaultProps = {
    content: "",
    options: [],
    rightOption: []
  };

  options = {
    addGlobalClass: true
  };

  handleImgClick(src, imgList) {
    Taro.previewImage({ urls: imgList, current: src })
  }

  handleLinkClick(href) {
    Taro.setClipboardData({ data: href }).then(() => {
      Taro.showToast({ title: '链接已复制' }).then(() => {
      })
    })
  }

  render() {
    const { content } = this.props;
    return (
      <View className='question'>
        <View className='at-article__content'>
          <View className='parser'>
            <TaroParser
              type='markdown'
              theme='light'
              latexApi={MD_RENDER_API}
              content={content}
              onImgClick={this.handleImgClick.bind(this)}
              onLinkClick={this.handleLinkClick.bind(this)}
            />
          </View>
        </View>
      </View>
    );
  }
}
