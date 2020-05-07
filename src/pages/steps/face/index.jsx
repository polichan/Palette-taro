import Taro, { Component } from "@tarojs/taro";
import { View, Text, Button, Image } from "@tarojs/components";
import FloatLayout from './../../../components/FloatLayout/index'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facesList: [],
    };
  }
  
  componentDidMount() {}


  config = {
    navigationBarTitleText: "人脸图像"
  };

  handleCloseFloatLayout(){
      console.log(1)
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
          <FloatLayout isOpened onClose={()=>{this.handleCloseFloatLayout()}} title='你好' type='patch'></FloatLayout>
        <View className='at-row'>{faces}</View>
      </View>
    );
  }
}
