// eslint-disable-next-line import/no-commonjs
module.exports = {
    PATCH_EXPLAIN : {
        name: '什么是 Patch？',
        content: '在人脸识别的过程中，我们要做的第一步就是把输入的原始图像分成很多个小patch，然后再进行接下来训练。'
    },
    EIGENVECTOR_EXPLAIN: {
        name: '什么是特征向量和特征值？ ',
        content: '假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大。'
    },
     CONVOLUTION_EXPLAIN:{
        name: '什么是卷积？',
        content: '从卷积核开始，这是一个小的权值矩阵。这个卷积核在 2 维输入数据上「滑动」，对当前输入的部分元素进行矩阵乘法，然后将结果汇为单个输出像素。'
    },
    BINARYZATION_EXPLAIN:{
        name: '什么是二值化？',
        content: '我们对第一层的每个输出矩阵都进行二值处理，得到的结果中只包含整数和零（大于等于零的数取1，小于零的数取0），然后在对其进行二值化哈希编码，编码位数与第一层的滤波器个数相同。'
    },
    BLOCK_EXPLAIN:{
        name: '什么是 Block？',
        content: '在将每个卷积结果做二转十进制的操作后输出的图片进行分块。'
    },
    HISTOGRAM_EXPLAIN:{
        name: '什么是直方图？',
        content: '将每个分块后的图片对应的像素值和像素点进行绘制成直方图。'   
    }
}