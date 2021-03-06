import Taro, { Component } from "@tarojs/taro";
import { View, Image, Block } from "@tarojs/components";
import { getSrc } from "@/utils/utils";
import Article from "@/components/Article";
import RightArrowImage from "../../assets/imgs/right-arrow.png"
import "./index.scss";

class FaceRecognitionErrorRecord extends Component {
    static defaultProps = {
        data: []
    };

    state = {
        articleData: {
            sections: [
                '识别错误的图片：'
            ]
        }
    }

    renderItem(item) {
        return (
            <View className='frer-item-container flex flex-center flex-direction-row'>
                <Image src={getSrc(item.targetFace.Media.path)} className='item-img' mode='aspectFit'></Image>
                <Image src={RightArrowImage} className='item-arrow-img'></Image>
                <Image src={getSrc(item.resultFace.Media.path)} className='item-img' mode='aspectFit'></Image>
            </View>
        )
    }
    render() {
        const { data } = this.props
        const { articleData } = this.state
        return (
            <View className='frer-wrapper'>
                {data.length && (
                    <Block>
                        <Article sections={articleData.sections}></Article>
                        <View className='frer-container'>
                            {
                                data.map((item) => {
                                    return (
                                        <Block key={item.ID}>
                                            {
                                                this.renderItem(item)
                                            }
                                        </Block>
                                    )
                                })
                            }
                        </View>
                    </Block>
                )}
            </View>
        );
    }
}

export default FaceRecognitionErrorRecord;
