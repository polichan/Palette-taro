import Taro, { Component } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import Article from "@/components/Article";
import StepPage from '@/components/StepPage';

export default class Characteristic extends Component {

    state = {
        data: {
            title: '什么是特征向量和特征值?',
            sections: ['假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大']
        }
    }
    config = {
        navigationBarTitleText: ''
    }

    render() {
        const { data } = this.state
        return (
            <StepPage>
                <View style='margin-bottom:20px'>
                    <Article title={data.title} sections={data.sections}></Article>
                </View>
            </StepPage>
        );
    }
}