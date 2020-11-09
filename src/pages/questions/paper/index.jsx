import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import StepPage from "@/components/StepPage"
import { AtTextarea } from 'taro-ui'
import './index.scss';

export default class Paper extends Component {
    state = {
        value: "",
        placeholder: "经过以上实验，同学你有什么想法呢？清在这里撰写你的实验报告，字数 150 字以内。"
    }

    handleNextClick = (callback) => {
        callback(true)
    }

    handleChange(value) {
        this.setState({
            value
        })
    }

    render() {
        const { value, placeholder } = this.state
        return (
            <StepPage onNext={this.handleNextClick} showPanel>
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
