import Taro, { Component } from '@tarojs/taro';
import { } from '@tarojs/components';
import StepPage from "@/components/StepPage"
import './index.scss';

export default class Paper extends Component {
    state = {

    }

    handleNextClick = (callback) => {
        callback(true)
    }

    render() {
        return (
            <StepPage onNext={this.handleNextClick} showPanel>
            </StepPage>
        )
    }
}