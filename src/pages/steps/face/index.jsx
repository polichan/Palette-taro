import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import { getSrc } from "@/utils/utils";
import { AtTabs, AtTabsPane } from "taro-ui";
import EmptyData from "@/components/EmptyData";
import Skeleton from "taro-skeleton";
import "./index.scss";

@connect(({ face, loading }) => ({
  face,
  loading
}))
export default class Face extends Component {
  state = {
    current: 0
  };
  componentWillMount() {
    this.props
      .dispatch({
        type: "face/getFaceCategoryList"
      })
      .then(res => {
        console.log(res);
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
      });
  }

  handleNextClick(callback) {
    callback(true);
  }

  handleTabClick(targetIndex) {
    this.setState({
      current: targetIndex
    });
  }

  handleFaceImageClick(face){
    Taro.showModal({
      title: "提示",
      content: "是否选择此人脸为实验图片",
      success: (res)=>{
        if(res.confirm){
          Taro.showToast({
            title: '设置成功',
            icon: 'none'
          })
        }
      }
    })
  }

  renderFacePanel() {
    const { current } = this.state;
    const { face } = this.props;
    const { faceList, faceCategoryList } = face;

    const faces =
      faceList.list &&
      faceList.list.map(item => {
        return (
          <View className='face-item' key={item.id}>
            <Image src={getSrc(item.Media.cdnUrl)} className='face-img' onClick={this.handleFaceImageClick.bind(this, item)}></Image>
          </View>
        );
      });

    return faceCategoryList.map((item, index) => {
      return (
        <AtTabsPane current={current} index={index} key={item.title}>
          <View className='face-container'>
            {faceList.list == null || faceList.list.length == 0 ? (
              <EmptyData nothingText='这里空空如也~'></EmptyData>
            ) : null}
            <View className='face-list-container'>{faces}</View>
          </View>
        </AtTabsPane>
      );
    });
  }

  render() {
    const { faceCategoryList } = this.props.face;
    const { current } = this.state;
    const faceCategoryLoading = this.props.loading.effects[
      "face/getFaceCategoryList"
    ];
    const faceLoading = this.props.loading.effects["face/getFaceList"];

    return (
      <View>
        <StepPage onNext={this.handleNextClick.bind(this)}>
          <Skeleton
            animateName='elastic'
            title
            row={2}
            rowWidth={["100%", "50%"]}
            loading={faceCategoryLoading}
          >
            <AtTabs
              current={current}
              tabList={faceCategoryList}
              scroll
              onClick={this.handleTabClick.bind(this)}
            >
              {faceLoading ? (
                <View className='column-skeleton'>
                  <Skeleton type='column' avatar></Skeleton>
                  <Skeleton type='column' avatar></Skeleton>
                  <Skeleton type='column' avatar></Skeleton>
                  <Skeleton
                    type='column'
                    avatar
                    contentAlignStyle='right'
                  ></Skeleton>
                  <Skeleton type='column' avatar></Skeleton>
                </View>
              ) : (
                this.renderFacePanel()
              )}
            </AtTabs>
          </Skeleton>
        </StepPage>
      </View>
    );
  }
}
