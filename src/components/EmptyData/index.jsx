import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import PropTypes from "prop-types";
import "./index.scss";
import nothingIcon from "../../assets/imgs/icon_nothing.png";
/**
 * 空结果组件
 * @author huangkh
 */
class Nothing extends Component {
  render() {
    const { nothingText, hasGuideBtn, guideText, onGuideHandle } = this.props;
    return (
      <View className='nothing_container'>
        <Image className='nothing_icon' src={nothingIcon}></Image>
        <Text className='nothing_text'>{nothingText}</Text>
        {hasGuideBtn && (
          <View className='nothing_guide' onClick={onGuideHandle()}>
            <Text>{guideText}</Text>
          </View>
        )}
      </View>
    );
  }
}

Nothing.propTypes = {
  placeholder: PropTypes.string,
  hasGuideBtn: PropTypes.bool,
  guideText: PropTypes.string,
  onGuideHandle: PropTypes.func
};

Nothing.defaultProps = {
  nothingText: "空空如也~",
  hasGuideBtn: false,
  guideText: "立即创建",
  onGuideHandle: () => {}
};

export default Nothing;
