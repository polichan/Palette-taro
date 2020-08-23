import Taro, { Component } from "@tarojs/taro";
import { View, Block } from "@tarojs/components";
import "./index.scss";

export default class WaveLoading extends Component {
  static defaultProps = {
    percentage: 80,
    dropColor: "#18bff6",
    percentageColor: "white",
    onRetry: () => {},
    animate: true,
    errorTip: null
  };

  handleRetryClick() {
    this.props.onRetry();
  }
  render() {
    const { percentage, dropColor, percentageColor, animate, errorTip } = this.props;

    return (
      <View className='wave-loading-container' onClick={this.handleRetryClick.bind(this)}>
        {animate ? (
          <Block>
            <View
              className='drop'
              style={{ backgroundColor: dropColor }}
            ></View>
            <View
              className='drop'
              style={{ backgroundColor: dropColor }}
            ></View>
            <View
              className='drop'
              style={{ backgroundColor: dropColor }}
            ></View>
          </Block>
        ) : null}
        <View
          className='collection'
          style={{
            backgroundColor: dropColor,
            animation: animate ? "3s collection linear infinite" : "none"
          }}
        ></View>
        <View className='percentage' style={{ color: percentageColor }}>
          {errorTip !== null ? errorTip : percentage + '%'}
        </View>
      </View>
    );
  }
}
