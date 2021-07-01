import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import StepPage from "@/components/StepPage"
import { connect } from "@tarojs/redux";
import { AtTextarea } from 'taro-ui'
import './index.scss';

@connect(({ user, step, loading }) => ({
    user,
    step,
    loading
}))
export default class Paper extends Component {
    state = {
        value: "",
        placeholder: "经过以上实验，同学你有什么想法呢？清在这里撰写你的实验报告，字数 150 字以内。"
    }

    handleNextClick = async (callback) => {
        if (this.state.value == null || this.state.value == "") {
            Taro.showToast({
                icon: 'none',
                title: "请填写实验报告"
            })
            callback(false)
            return
        }
        await this.endExperiment()
        this.saveExperimentLog().then(() => {
            callback(true)
        }).catch(() => {
            callback(false)
        })
    }

    async endExperiment() {
        await this.props
            .dispatch({
                type: "step/endExperiment",
                payload: {
                    userExperiment: Object.assign(this.props.step.userExperiment, {
                        log: JSON.stringify(this.props.step.stepQueue.exportAll()),
                        paper: this.state.value
                    })
                }
            })
            .then(() => { });
    }

    saveExperimentLog() {
        const logs = JSON.parse(this.props.step.userExperiment.log)
        const errorCount = logs.filter(item => item.error != null).length
        const score = 100 - errorCount * 10 < 0 ? 0 : 100 - errorCount * 10
        return new Promise((resolve, reject) => {
            this.props
                .dispatch({
                    type: "step/saveExperimentLog",
                    payload: {
                        params: Object.assign(this.props.step.userExperiment, {
                            score: score
                        })
                    }
                })
                .then((res) => {
                    const { data, err } = res
                    if (err == null) {
                        Taro.showToast({
                            icon: "none",
                            title: "提交试验记录成功"
                        });
                        resolve()
                        return
                    }
                    Taro.hideToast()
                    Taro.showToast({
                        icon: "none",
                        title: err
                    });
                    reject()
                });
        })
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    render() {
        const { value, placeholder } = this.state
        const isSaveExperimentLogLoading = this.props.loading.effects[
            "step/saveExperimentLog"
        ];
        return (
            <StepPage onNext={this.handleNextClick} showPanel
                nextButtonLoading={isSaveExperimentLogLoading}
            >
                <View className='paper-container'>
                    <AtTextarea
                        value={value}
                        onChange={this.handleChange.bind(this)}
                        maxLength={150}
                        showConfirmBar
                        placeholder={placeholder}
                        height={300}
                    />
                </View>

            </StepPage>
        )
    }
}
