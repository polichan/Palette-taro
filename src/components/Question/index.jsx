import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default class Question extends Component {
  static defaultProps = {
    title: "",
    subTitle: "",
    sections: ""
  };
  state = {};

  render() {
    const { title, subTitle, sections } = this.props;
    const section = sections.map((item, index) => {
      return (
        <View className='at-article__p' key={index}>
          {item}
        </View>
      );
    });
    return (
      <View className='question'>
        <View className='at-article__h1'>{title}</View>
        <View className='at-article__info'>{subTitle}</View>
        <View className='at-article__content'>
          <View className='at-article__section'>{section}</View>
        </View>
      </View>
    );
  }
}
