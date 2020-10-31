import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import RichTextParser from "@/components/RichTextParser";
import CheckBoxUnselected from "../../assets/imgs/checkbox_unselected.png";
import CheckBoxSelected from "../../assets/imgs/checkbox_selected.png";
import "./index.scss";

export default class ProblemOptions extends Component {
  static defaultProps = {
    optionList: [],
    onSelect: v => {
      v;
    },
    value: [],
    showTip: false
  };

  state = {
    list: [],
    orderList: ["A", "B", "C", "D"],
    selectedValue: null
  };

  componentWillMount() {
    this.buildOptions();
  }

  buildOptions() {
    const temp = [];
    this.props.optionList &&
      this.props.optionList.forEach((element, index) => {
        temp.push({
          label: element.content,
          value: element.ID.toString(),
          order: this.state.orderList[index]
        });
      });
    this.setState({
      list: temp
    });
  }

  handleChange(value) {
    this.props.onSelect([value[value.length - 1]]);
  }

  handleOptionChange(value) {
    this.setState({
      selectedValue: value
    });
    this.props.onSelect(value);
  }

  renderTip() {
    const { showTip } = this.props;
    let tipComponent = null;
    if (showTip) {
      tipComponent = (
        <View className='tip-container'>
          <View className='tip'>
            <Text className='tip-text'>选择有误</Text>
          </View>
        </View>
      );
    }
    return tipComponent;
  }

  render() {
    const { list, selectedValue } = this.state;
    return (
      <View className='problem-options-container'>
        {list.map(item => {
          return (
            <View
              className='option-box'
              key={item.value}
              onClick={this.handleOptionChange.bind(this, item.value)}
            >
              <View
                className={`${
                  item.value == selectedValue
                    ? "option-order option-order-selected"
                    : "option-order"
                }`}
              >
                {item.value == selectedValue ? (
                  <Image
                    src={CheckBoxSelected}
                    className='checkbox-img'
                  ></Image>
                ) : (
                  <Image
                    src={CheckBoxUnselected}
                    className='checkbox-img'
                  ></Image>
                )}
                <Text className='order-num'>{item.order}选项</Text>
              </View>
              <View className='option-container'>
                <View className='option-text'>
                  <RichTextParser content={item.label}></RichTextParser>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    );
  }
}
