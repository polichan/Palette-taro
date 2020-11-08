function getOption(xData, yData) {
    return {
        // title: {
        //     show: true,
        //     text: '测试下面legend的红色区域不应被裁剪',
        //     left: 'center'
        // },
        color: ['#1890ff'],
        // legend: {
        //     show: true,
        //     data: ['A', 'B', 'C'],
        //     top: 50,
        //     left: 'center',
        //     backgroundColor: 'red',
        //     z: 100
        // },
        grid: {
            // show: true,
            containLabel: true,
            top: 10,
            left: 2,
            right: 25,
            bottom: 10,
            // borderColor: '#ff0000'
        },
        xAxis: {
            type: 'category',
            // boundaryGap: false,
            // axisLine: {
            //     show: false,
            // },
            // axisTick: {
            //     show: false,
            // },
            // axisLabel: {
            //     color: '#5E5E5E',
            // },
            data: xData,
            // show: false
        },
        yAxis: {
            x: 'center',
            type: 'value',
            // axisLine: {
            //     show: false,
            // },
            // axisTick: {
            //     show: false,
            // },
            // axisLabel: {
            //     color: '#5E5E5E',
            // },
            // splitLine: {
            //     lineStyle: {
            //         color: '#C2C0C0',
            //         type: 'dashed',
            //     },
            // },
            // show: false
        },
        series: [
            {
                name: 'A',
                type: 'bar',
                smooth: true,
                data: yData,
            }
            ,
        ],
    };
}

export default getOption