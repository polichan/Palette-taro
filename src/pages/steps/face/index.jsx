import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import { getSrc } from "@/utils/utils";
import { AtTabs, AtTabsPane } from "taro-ui";
import EmptyData from "@/components/EmptyData";
import "./index.scss";

@connect(({ face, loading }) => ({
  face,
  loading
}))
export default class Face extends Component {
  state = {
    current: 0,
    tabList: [{ title: "吴彦祖" }, { title: "陈鹏宇" }]
  };
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
      .then();
  }

  handleNextClick(callback) {
    callback(true);
  }

  handleTabClick(targetIndex) {
    this.setState({
      current: targetIndex
    });
  }

  render() {
    const { faceList } = this.props.face;
    const { current, tabList } = this.state;
    let faces = null;
    if (faceList.list == null || faceList.list.length == 0) {
      faces = (
        <EmptyData
          nothingText='这里空空如也'
        ></EmptyData>
      );
    } else {
      faces = faceList.list.map(item => {
        return (
          <View className='face-item' key={item.id}>
            <Image src={getSrc(item.Media.cdnUrl)} className='face-img'></Image>
          </View>
        );
      });
    }

    return (
      <View>
        <StepPage onNext={this.handleNextClick.bind(this)}>
          <AtTabs
            current={current}
            tabList={tabList}
            scroll
            onClick={this.handleTabClick.bind(this)}
          >
            {tabList.map((item, index) => {
              return (
                <AtTabsPane current={current} index={index} key={item.title}>
                  <View className='face-container'>{faces}</View>
                </AtTabsPane>
              );
            })}
          </AtTabs>
        </StepPage>
      </View>
    );
  }
}
