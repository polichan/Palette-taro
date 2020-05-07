import Taro, { Component } from "@tarojs/taro";
import { View , Text} from "@tarojs/components";
import { AtFloatLayout } from "taro-ui";
import "./index.scss";
import * as Explain from "./../../constants/explain";

export default class FloatLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      content: null
    };
  }

  componentDidMount() {
    switch (this.props.type) {
      case "patch":
        this.setState({
          title: Explain.PATCH_EXPLAIN.name,
          content: Explain.PATCH_EXPLAIN.content
        });
        break;
      case "eigenvector":
        this.setState({
          title: Explain.EIGENVECTOR_EXPLAIN.name,
          content: Explain.EIGENVECTOR_EXPLAIN.content
        });
        break;
      case "convolution":
        this.setState({
          title: Explain.CONVOLUTION_EXPLAIN.name,
          content: Explain.CONVOLUTION_EXPLAIN.content
        });
        break;
      case "binaryzation":
        this.setState({
          title: Explain.BINARYZATION_EXPLAIN.name,
          content: Explain.BINARYZATION_EXPLAIN.content
        });
      case "block":
        this.setState({
          title: Explain.BLOCK_EXPLAIN.name,
          content: Explain.BLOCK_EXPLAIN.content
        });
        break;
      case "histogram":
        this.setState({
          title: Explain.HISTOGRAM_EXPLAIN.name,
          content: Explain.HISTOGRAM_EXPLAIN.content
        });
      default:
        break;
    }
  }

  static options = {
    addGlobalClass: true
  }

  /**
   * close 浮动层
   */
  handleClose() {
    this.props.onClose();
  }

  render() {
    const { isOpened } = this.props;
    const { title, content } = this.state;
    return (
      <AtFloatLayout
        className='custom-float-layout'
        isOpened={isOpened}
        title={title}
        onClose={this.handleClose.bind(this)}
      >
        <View>
          <Text className='content-text'>{content}</Text>
        </View>
      </AtFloatLayout>
    );
  }
}
