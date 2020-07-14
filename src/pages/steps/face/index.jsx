import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facesList: []
    };
  }

  componentWillMount() {}

  handleCloseFloatLayout() {}

  handleNextClick(callback)
  {
    callback(true)
  }

  render() {
    // 脸部
    const faces = this.state.facesList.map(item => {
      return (
        <View className='at-col' key={item.id}>
          <Image src={item.url}></Image>
        </View>
      );
    });
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='at-row'>{faces}</View>
      </StepPage>
    );
  }
}
