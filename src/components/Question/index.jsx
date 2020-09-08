import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import RichTextParser from "@/components/RichTextParser";
import "./index.scss";

export default class Question extends Component {
  static defaultProps = {
    content: ""
  };

  options = {
    addGlobalClass: true
  };

  render() {
    const { content } = this.props;
    return (
      <View className='question'>
        <View className='at-article__content'>
          <View className='parser'>
            <RichTextParser content={content}></RichTextParser>
          </View>
        </View>
      </View>
    );
  }
}
