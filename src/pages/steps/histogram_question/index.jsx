import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import Echart from "@/components/Echart";
import * as echarts from "@/components/Echart/echarts";
import getOption from "./getOption"
import { View, Text } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import "./index.scss";

const xData = ['0','1','2','3','5']
const yData = ['2', '3', '1', '2', '1'];

export default class Binarization extends Component {
    state = {
        gridData: [
            1, 2, 4, 1, 5, 4, 0, 1, 0
        ],
        fieldData: [
            {
                name: 'value0',
                title: '0的个数为',
                placeholder: '请填写 0 的总个数',
                value: ""
            },
            {
                name: 'value1',
                title: '1的个数为',
                placeholder: '请填写 1 的总个数',
                value: ""
            },
            {
                name: 'value2',
                title: '2的个数为',
                placeholder: '请填写 2 的总个数',
                value: ""
            },
            {
                name: 'value4',
                title: '4的个数为',
                placeholder: '请填写 4 的总个数',
                value: ""
            },
            {
                name: 'value5',
                title: '5的个数为',
                placeholder: '请填写 5 的总个数',
                value: ""
            },
        ],
        xData,
        yData,
        option: getOption(xData, yData),
    }

    handleNextClick(callback) {
        if (this.problem.isAnswerRight()) {
            callback(true);
        } else {
            this.stepPage
                .reportErrorToCurrentStep(
                    `【实战解答】答案选择错误，正确答案：${this.problem.getRightAnswer()}，用户选择答案：${this.problem.getSelectedAnswer()}`
                )
                .then(() => {
                    Taro.showToast({
                        icon: "none",
                        title: "答案不正确！"
                    });
                });
        }
    }

    handleInputChange(index, value) {
        if (value != null) {
            this.setState((state => {
                return {
                    fieldData: Object.assign(state.fieldData, Object.assign(this.state.fieldData[index], { value: value }))
                }
            }), () => {
                // trigger charts
            })
        }
    }

    renderGrid() {
        const { gridData } = this.state
        return (
            <View className='grid-container'>
                {
                    gridData.map(item => {
                        return (
                            <View className='grid-item-container' key={item}>
                                <Text className='grid-item-text'>{item}</Text>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

    renderInputFields() {
        const { fieldData } = this.state
        return (
            <View className='input-fields-container'>
                <AtForm>
                    {
                        fieldData.map((item, index) => {
                            return (
                                <AtInput name={item.name} title={item.title} type='text' placeholder={item.placeholder} value={item.value} onChange={this.handleInputChange.bind(this, index)} key={item.name}></AtInput>
                            )
                        })
                    }
                </AtForm>
            </View>
        )
    }

    render() {
        const { option } = this.state
        return (
            <StepPage onNext={this.handleNextClick.bind(this)} ref={this.refStepPage}>
                <View className='histogram-container'>
                    <View className='line-container'>
                        <View className="line-chart">
                            <Echart echarts={echarts} option={option} disableTouch />
                        </View>
                    </View>
                    <Text className='field-text'>直方图数据：</Text>
                    {
                        this.renderGrid()
                    }
                    <Text className='field-text'>填写直方图数据：</Text>
                    {
                        this.renderInputFields()
                    }

                </View>
            </StepPage>
        );
    }
}