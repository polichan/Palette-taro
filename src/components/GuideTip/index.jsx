import Taro, { Component } from '@tarojs/taro';
import { View, Image } from '@tarojs/components';
import _isFunction from "lodash/isFunction";
import fingerPng from "../../assets/imgs/finger.png";
import closePng from "../../assets/imgs/close2.png";
import "./index.scss";

export default class GuideTip extends Component {

    static defaultProps = {
        onConfirm: () => { }
    }
    state = {
        height: 300
    }
    componentWillMount() {
        const globalSystemInfo = Taro.globalSystemInfo
        this.setState({
            height: globalSystemInfo.navBarHeight + globalSystemInfo.safeArea.top + 58
        })
    }

    handleConfirmClick() {
        if (_isFunction(this.props.onConfirm)) {
            this.props.onConfirm()
        }
    }

    render() {
        const { height } = this.state
        return (
            <View className='page-cont'>
                <View className='top' style={{ 'margin-top': Taro.pxTransform(height) }}>
                    <Image src={fingerPng}></Image>
                    <View className='p_one'>点击小问号获取详细解释</View>
                </View>
                <View className='bottom'>
                    <Image className='close-img' src={closePng} mode='aspectFit' onClick={this.handleConfirmClick.bind(this)}></Image>
                </View>
            </View>
        );
    }
}