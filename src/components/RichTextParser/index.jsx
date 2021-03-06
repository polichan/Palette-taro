import Taro, { Component } from "@tarojs/taro";
import "taro-parse/dist/style/main.scss";
import TaroParser from "taro-parse";
import { MD_RENDER_API } from "../../config/config";

export default class RichTextParser extends Component {
  static defaultProps = {
    content: ""
  };
  options = {
    addGlobalClass: true
  };

  handleImgClick = (src, imgList) => {
    Taro.previewImage({ urls: imgList, current: src }).then(() => {});
  }

  handleLinkClick(href) {
    Taro.setClipboardData({ data: href }).then(() => {
      Taro.showToast({ title: "链接已复制" }).then(() => {});
    });
  }
  render() {
    const { content } = this.props;
    return (
      <TaroParser
        type='markdown'
        theme='light'
        latexApi={MD_RENDER_API}
        content={content}
        onImgClick={this.handleImgClick}
        onLinkClick={this.handleLinkClick.bind(this)}
      />
    );
  }
}
