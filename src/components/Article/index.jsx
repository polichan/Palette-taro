import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button } from "@tarojs/components";
import "./index.scss"

export default class Article extends Component {
  static defaultProps = {
    title: "",
    sections: []
  };

  render() {
    const { title, sections } = this.props;
    const section = sections.map((item, index) => {
      return (
        <View className='at-article__p' key={index}>
          {item}
        </View>
      );
    });
    return (
      <View className='article'>
        <View className='at-article'>
          <View className='at-article__h1'>{title}</View>
          <View className='at-article__content'>
            <View className='at-article__section'>{section}</View>
          </View>
        </View>
      </View>
    );
  }
}
