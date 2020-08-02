import Taro, { Component } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import { connect } from "@tarojs/redux";
import { getSrc } from "@/utils/utils";
import { AtTabs, AtTabsPane } from "taro-ui";
import EmptyData from "@/components/EmptyData";
import Skeleton from "taro-skeleton";
import SelectedImage from "../../../assets/imgs/selected.png";
import "./index.scss";

@connect(({ face, loading }) => ({
  face,
  loading
}))
export default class Face extends Component {
  state = {
    current: 0,
    hasLoadedTabList: [0],
    selectedFaceID: null
  };

  componentWillMount() {
    this.props
      .dispatch({
        type: "face/getFaceCategoryList"
      })
      .then(res => {
        const categoryId = res.length == 0 ? 1 : res[0].id
        this.getFaceList(categoryId, 0).then()
      });
  }

  handleNextClick(callback) {
    if (this.state.selectedFaceID == null) {
      Taro.showToast({
        icon: 'none',
        title: "请先选择一张人脸图像"
      })
    } else {
      callback(true);
    }
  }

  handleTabClick(targetIndex) {
    if (this.state.hasLoadedTabList.indexOf(targetIndex) == -1) {
      this.setState({
        current: targetIndex,
        hasLoadedTabList: this.state.hasLoadedTabList.concat([targetIndex])
      }, () => {
        Taro.nextTick(() => {
          const { faceCategoryList } = this.props.face;
          this.getFaceList(faceCategoryList[targetIndex].id, targetIndex).then()
        })
      })
    } else {
      this.setState({
        current: targetIndex
      })
    }
  }

  getFaceList(categoryId, targetIndex) {
    return new Promise(resolve => {
      this.props
        .dispatch({
          type: "face/getFaceList",
          payload: {
            targetIndex: targetIndex,
            data: {
              category: categoryId
            }
          }
        })
        .then(() => {
          resolve()
        });
    })
  }

  handleFaceImageClick(face) {
    const faceID = face.ID
    if (this.state.selectedFaceID == faceID) {
      // 反选
      this.setState({
        selectedFaceID: null
      })
    } else {
      this.setState({
        selectedFaceID: faceID
      })
    }
  }

  renderFacePanel() {
    const { current } = this.state;
    const { face } = this.props;
    const { faceCategoryList } = face;
    return faceCategoryList.map((item, index) => {
      return (
        <AtTabsPane current={current} index={index} key={item.title}>
          {
            item.loading ? (
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
            )
              : (
                <View className='face-container'>
                  {item.list == null || item.list.length == 0 ? (
                    <EmptyData nothingText='这里空空如也~'></EmptyData>
                  ) : null}
                  <View className='face-list-container'>{this.renderFaces(item.list)}</View>
                </View>
              )
          }
        </AtTabsPane>
      );
    });
  }

  renderFaces(itemList) {
    const { selectedFaceID } = this.state
    return itemList.map(item => {
      return (
        <View className={`${selectedFaceID == item.ID ? 'face-item face-mask' : 'face-itgem'}`} key={item.ID}>
          {
            selectedFaceID == item.ID ? (<Image src={SelectedImage} className='selected-img'></Image>) : null
          }
          <Image src={getSrc(item.Media.cdnUrl)} className='face-img' onClick={this.handleFaceImageClick.bind(this, item)}></Image>
        </View>
      )
    })
  }

  render() {
    const { faceCategoryList } = this.props.face;
    const { current } = this.state;
    const faceCategoryLoading = this.props.loading.effects[
      "face/getFaceCategoryList"
    ];
    return (
      <View>
        <StepPage onNext={this.handleNextClick.bind(this)} nextButtonDisabled={faceCategoryLoading}>
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
              {this.renderFacePanel()}
            </AtTabs>
          </Skeleton>
        </StepPage>
      </View>
    );
  }
}
