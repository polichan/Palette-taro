import Taro, { Component } from "@tarojs/taro";
import StepPage from "@/components/StepPage";
import { View, Text } from "@tarojs/components";
import { AtInput, AtForm } from 'taro-ui'
import { connect } from "@tarojs/redux";
import "./index.scss";

@connect(({ histogram }) => ({
    histogram,
}))
export default class HistogramQuestion extends Component {
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
    }

    handleNextClick(callback) {
        let hasInputWrongValue = false
        for (let index = 0; index < this.state.fieldData.length; index++) {
            const element = this.state.fieldData[index];
            if (element.value == "") {
                hasInputWrongValue = true
                break
            }
        }
        if (hasInputWrongValue) {
            Taro.showToast({
                icon: 'none',
                title: "请先填写个数"
            })
            callback(false)
            return
        }
        // 进入下一步之前，传递 chart 数据
        this.props.dispatch({
            type: 'histogram/saveChartYData',
            payload: this.getYData()
        }).then(() => {
            callback(true)
        })
    }

    handleInputChange(index, value) {
        if (value != null) {
            this.setState((state => {
                return {
                    fieldData: Object.assign(state.fieldData, Object.assign(this.state.fieldData[index], { value: value })),
                }
            }))
        }
    }

    getYData() {
        let yData = []
        this.state.fieldData.forEach(element => {
            yData.push(element.value)
        });
        return yData
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
        return (
            <StepPage onNext={this.handleNextClick.bind(this)} ref={this.refStepPage}>
                <View className='histogram-container'>
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