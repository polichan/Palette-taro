import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
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
    const tipComponent = null;
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
        {this.renderTip()}
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
                {item.order}
              </View>
              <View className='option-container'>{item.label}</View>
            </View>
          );
        })}
      </View>
    );
  }
}
