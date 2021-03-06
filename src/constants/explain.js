export const PATCH_EXPLAIN = {
    name: '什么是 Patch？',
    content: '在人脸识别的过程中，我们要做的第一步就是把输入的原始图像分成很多个小patch，然后再进行接下来训练。'
}
export const EIGENVECTOR_EXPLAIN = {
    name: '什么是特征向量和特征值？ ',
    content: '假设我们取到的是第i张图片，那么我们上一步进行了对图片分块（取patch）的过程，每一个patch对应一个矩阵，然后将矩阵变成列向量，减去对应每一列的均值，得到了一个X矩阵，然后求解X乘上X的转置。得出的矩阵的解就是我们要求的特征值和特征向量。我们可以从接下来的特征值和特征向量可视化中看出在前面的特征值和特征向量能量占比很大。'
}
export const CONVOLUTION_EXPLAIN = {
    name: '什么是卷积？',
    content: '对图像做卷积操作其实就是利用卷积核（即滤波器）在图像上滑动，将图像点上的像素灰度值与对应的卷积核上的数值相乘，然后将所有相乘后的值相加作为卷积核中间像素对应的图像上像素的灰度值，并最终滑动完所有图像的过程。'
}
export const BINARYZATION_EXPLAIN = {
    name: '什么是二值化？',
    content: '我们对第一层的每个输出矩阵都进行二值处理，得到的结果中只包含整数和零（大于等于零的数取1，小于零的数取0），然后在对其进行二值化哈希编码，编码位数与第一层的滤波器个数相同。'
}
export const BLOCK_EXPLAIN = {
    name: '什么是 Block？',
    content: '在将每个卷积结果做二转十进制的操作后输出的图片进行分块。'
}
export const HISTOGRAM_EXPLAIN = {
    name: '什么是直方图？',
    content: '对block里的每个像素值进行统计，绘制直方图，横轴表示像素值，纵轴表示block中该像素值的分布情况。'
}
export const FILTER_EXPLAIN = {
    name: "filter 个数的选择",
    content: "这里我们选取对应特征值排在前8个的特征向量来构造滤波器，即将一维的特征向量排列成与前面Patch相同大小的二维矩阵，即构成了滤波器。"
}