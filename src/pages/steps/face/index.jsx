import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facesList: [],
    };
  }

  componentWillMount()
  {
    
  }


  config = {
    navigationBarTitleText: "选择人脸图像"
  };

  handleCloseFloatLayout(){
      
  }
  
  render() {
    // 脸部
    const faces = this.state.facesList.map(item => {
      return (
        <View className='at-col' key={item.id}>
          <Image src={item.url} ></Image>
        </View>
      );
    });
    return (
      <View className='container'>
        <View className='at-row'>{faces}</View>
      </View>
    );
  }
}
