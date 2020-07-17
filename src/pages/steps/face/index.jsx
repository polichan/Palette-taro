import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import { getSrc } from "@/utils/utils";
import "./index.scss";

@connect(({ face, loading }) => ({
  face,
  loading
}))
export default class Face extends Component {
  componentWillMount() {
    this.props
      .dispatch({
        type: "face/getFaceList",
        payload: {
          data: {
            page: 1,
            pageSize: 10
          }
        }
      })
      .then(res => {});
  }

  handleCloseFloatLayout() {}

  handleNextClick(callback) {
    callback(true);
  }

  render() {
    const { faceList } = this.props.face;
    // 脸部
    const faces =
      faceList.list &&
      faceList.list.map(item => {
        return (
          <View className='face-item' key={item.id}>
            <Image src={getSrc(item.Media.cdnUrl)} className='face-img'></Image>
          </View>
        );
      });
    return (
      <StepPage onNext={this.handleNextClick.bind(this)}>
        <View className='face-container'>{faces}</View>
      </StepPage>
    );
  }
}
