import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Article from '@/components/Article'
import * as CONSTANTS from '@/constants'
import "./index.scss";

export default class License extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseType: "user",
      data:[
        {
          key: CONSTANTS.LICENSE_TYPE.USER_LICENSE,
          title: "用户协议",
          sections: []
        },
        {
          key: CONSTANTS.LICENSE_TYPE.OPEN_SOURCE_LICENSE,
          title: "开源协议",
          sections: []
        }
      ]
    };
  }
  
  componentWillMount() {
    const licenseType = this.$router.params.type;
    this.setState({
      licenseType: licenseType
    });
    Taro.setNavigationBarTitle({
      title: licenseType
    });
  }

  render() {
    const { licenseType, data } = this.state;
    const license = data.filter((item) => { return item.key == licenseType})
    console.log(license)
    return (
      <View className='license-page'>
      </View>
    );
  }
}
