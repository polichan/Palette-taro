import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import StepPage from "@/components/StepPage";
import { AtRadio } from "taro-ui";
import Panel from "@/components/Panel/index";
import './index.scss';

@connect(({ step, loading }) => ({
  step,
  loading
}))
export default class Params extends Component {
  state = {
    patchSize: null,
    blockSize: null,
    kSize: null,
  }

  handleNextClick(callback) {
    console.log(this.props.step.params)

    const params = {
      patchSize: this.state.patchSize,
      blockSize: this.state.blockSize,
      kSize: this.state.kSize
    }

    this.props.dispatch({
      type: 'step/saveParams',
      payload: params
    }).then(() => {
      console.log(this.props.step.params)
      // callback()
    })
  }

  handlePatchSizeChange(patchSize) {
    this.setState({
      patchSize: patchSize
    })
  }

  handleBlockSizeChange(blockSize) {
    this.setState({
      blockSize: blockSize
    })
  }

  handleKSizeChange(kSize) {
    this.setState({
      kSize: kSize
    })
  }

  render() {
    const { patchSize, blockSize, kSize } = this.state
    return (
      <StepPage onNext={this.handleNextClick.bind(this)} showPanel={false}>
        <Panel
          title='请选择 Patch 大小'
        >
          <AtRadio
            options={[
              {
                label: "A. 5x5",
                value: "5x5"
              },
              {
                label: "B. 7x7",
                value: "7x7"
              },
              {
                label: "C. 9x9",
                value: "9x9"
              }
            ]}
            value={patchSize}
            onClick={this.handlePatchSizeChange.bind(this)}
          />
        </Panel>
        <Panel
          title='请选择 Block 大小'
        >
          <AtRadio
            options={[
              {
                label: "A. 16x16",
                value: "16x16"
              },
              {
                label: "B. 32x32",
                value: "32x32"
              },
              {
                label: "C. 64x64",
                value: "64x64"
              }
            ]}
            value={blockSize}
            onClick={this.handleBlockSizeChange.bind(this)}
          />
        </Panel>
        <Panel
          title='请选择 KNN 中参数 K'
        >
          <AtRadio
            options={[
              {
                label: "A. 3",
                value: "3"
              },
              {
                label: "B. 5",
                value: "5"
              },
              {
                label: "C. 7",
                value: "7"
              }
            ]}
            value={kSize}
            onClick={this.handleKSizeChange.bind(this)}
          />
        </Panel>
      </StepPage>
    )
  }
}
