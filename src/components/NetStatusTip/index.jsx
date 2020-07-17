import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";

import "./index.scss";

/**
 * @description：网络状态组件：网络断开、弱网络状态下做出反应
 * @author huangkh
 */
class netstatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
      weak: false
    };
  }

  componentWillMount() {
    let _this = this;
    Taro.getNetworkType({
      success: function(res) {
        let msg = "";
        let weak = false;
        if (res.networkType === "2g" || res.networkType === "3g") {
          weak = true;
          msg = "网络信号比较弱，请检查网络连接";
        } else if (
          res.networkType === "4g" ||
          res.networkType === "5g" ||
          res.networkType === "wifi"
        ) {
          weak = false;
          msg = "网络信号强";
        } else if (res.networkType === "none") {
          weak = true;
          msg = "网络已断开,请检查网络连接";
        }
        _this.setState({
          weak: weak,
          msg: msg
        });
      }
    });
  }

  componentDidMount() {
    let _this = this;
    Taro.onNetworkStatusChange(function(res) {
      let msg = "";
      let weak = false;
      if (res.isConnected) {
        if (res.networkType === "2g" || res.networkType === "3g") {
          weak = true;
          msg = "网络信号比较弱，请检查网络连接";
        } else if (
          res.networkType === "4g" ||
          res.networkType === "5g" ||
          res.networkType === "wifi"
        ) {
          weak = false;
          msg = "网络信号强";
        }
      } else {
        weak = true;
        msg = "网络已断开,请检查网络连接";
      }
      _this.setState({
        weak: weak,
        msg: msg
      });
    });
  }

  componentWillUnmount() {
    Taro.offNetworkStatusChange();
  }

  config = {
    navigationBarTitleText: "网络状态栏"
  };

  render() {
    return (
      <View className={this.state.weak ? "ns_container" : "ns_container_none"}>
        <View className='ns_left'>
          <View className='ns_round'>
            <Text className='ns_round_text'>!</Text>
          </View>
        </View>
        <View className='ns_right'>
          <Text class='ns_right_text'>{this.state.msg}</Text>
        </View>
      </View>
    );
  }
}

export default netstatus;
