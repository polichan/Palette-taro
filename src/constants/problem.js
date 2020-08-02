/*
 * @Autor: 陈鹏宇
 * @Date: 2020-08-02 14:51:50
 * @LastEditTime: 2020-08-02 15:01:47
 * @LastEditors: 陈鹏宇
 * @Description: 通用问题组件常量
 * @Version: 1.0
 */ 

 
 const PROBLEM_CONSTANT = {
    CHARACTERISTIC: {
        DATA:{
            title: "什么是特征向量和特征值?",
            sections: [
              "假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大"
            ]
        },
        QUESTION_API:{
            example: {
                ID: 1
            },
            real:{
                ID: 3
            }
        }
    },
    BINARIZATION:{
        DATA:{
            title: "什么是二值化？为什么要将二进制转化为十进制？",
            sections: [
              "我们对第二层的每个输出图片都进行二值化处理，得到的结果中只包含一和零（大于等于零的数取1，小于零的数取0），于是就得到了二值化的图，然后将二值化的图片乘以不同的权重（例如：2的七次方等于128，2的六次方64。32，16，8，4，2，1）。将每张图片对应位置的像素值相加，这样得到的图片每个像素都由十进制的值来表示。"
            ]
        },
        QUESTION_API:{
            example: {
                ID: 2
            },
            real:{
                ID: 3
            }
        }
    }
 }

 export default PROBLEM_CONSTANT