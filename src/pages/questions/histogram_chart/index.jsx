import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import StepPage from "@/components/StepPage";
import Echart from "@/components/Echart";
import echarts from "@/components/Echart/echarts";
import { connect } from "@tarojs/redux";
import getOption from "./getOption"
import "./index.scss";


@connect(({ histogram }) => ({
    histogram,
}))
export default class HistogramChart extends Component {
    handleNextClick(callback) {
        const rightYData = this.props.histogram.rightYData
        const userInputYData = this.props.histogram.chartYData
        if (rightYData.toString() != userInputYData.toString()) {
            // 如果两个数组不相同，则用户填写不正确
            Taro.showToast({
                icon: 'none',
                title: '直方图有误哦~请返回上一步填写正确数据~',
                duration: 2000
            })
            callback(false)
            return
        }
        callback(true);
    }

    setChartRef = node => {
        this.chart = node;
    };

    onInit = (canvas, width, height, dpr) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height,
            devicePixelRatio: dpr, // new
        });
        canvas.setChart(chart);
        chart.setOption(getOption(this.props.histogram.chartXData, this.props.histogram.chartYData));
        return chart; // 必须return
    };

    render() {
        return (
            <StepPage onNext={this.handleNextClick.bind(this)} showPanel>
                <View className='histogram-chart-container'>
                    <Text className='field-text'>所填数据渲染直方图：</Text>
                    <View className='line-container'>
                        <View className='line-chart'>
                            <Echart echarts={echarts} ref={this.setChartRef} onInit={this.onInit} disableTouch />
                        </View>
                    </View>
                </View>
            </StepPage>
        );
    }
}
