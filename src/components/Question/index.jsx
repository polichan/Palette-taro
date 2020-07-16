import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import 'taro-parse/dist/style/main.scss';
import TaroParser from "taro-parse";
import "./index.scss";

export default class Question extends Component {
  static defaultProps = {
    content: ""
  };
  state = {};

  options = {
    addGlobalClass: true
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
              latexApi='https://md.werfei.com/?tex'
              content={content}
            />
          </View>
        </View>
      </View>
    );
  }
}
