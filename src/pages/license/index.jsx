import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ login }) => ({
  login
}))
export default class License extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseType: "user"
    };
  }
  
  componentWillMount() {
    const licenseType = this.$router.params.type;
    this.setState({
      licenseType: licenseType
    });
    Taro.setNavigationBarTitle({
      title: licenseType === "user" ? "用户协议" : "开源协议"
    });
  }

  renderUserLicense() {
    return <Text>用户协议</Text>;
  }

  renderOpenSourceLicense() {
    return <Text>开源协议</Text>;
  }

  render() {
    const { licenseType } = this.state;
    return (
      <View className='license-page'>
        {licenseType === "user"
          ? this.renderUserLicense()
          : this.renderOpenSourceLicense()}
      </View>
    );
  }
}
