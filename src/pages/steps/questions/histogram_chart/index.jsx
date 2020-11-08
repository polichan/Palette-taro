import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
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
            <StepPage onNext={this.handleNextClick.bind(this)} showPanel={true}>
                <View className='histogram-chart-container'>
                    <View className='line-container'>
                        <View className="line-chart">
                            <Echart echarts={echarts} ref={this.setChartRef} onInit={this.onInit} disableTouch />
                        </View>
                    </View>
                </View>
            </StepPage>
        );
    }
}
