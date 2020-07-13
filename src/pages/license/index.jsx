import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Article from '@/components/Article'
import * as CONSTANTS from '@/constants'
import "./index.scss";

export default class License extends Component {
  constructor(props) {
    super(props);
    this.state = {
      licenseType: "user",
      data:[
        {
          key: CONSTANTS.LICENSE_TYPE.USER_LICENSE,
          title: "用户协议",
          sections: [
            "欢迎您使用人脸识别虚拟仿真实验", 
            "重要提示：请您仔细阅读以下条款，并确认您已完全理解本协议之规定，尤其是免除及限制责任的条款、知识产权条款、法律适用及争议解决条款。",
            "若您对本声明或本协议任何条款有异议，请停止注册或使用人脸识别虚拟仿真实验（下称“仿真实验”）所提供的全部服务。",
            "一、协议的接受、变更与补充",
            "1、勾选本协议前选项框并点击“登陆”，将视为您签署了本协议，表明您自愿接受本协议全部条款的约束。",
            "2、仿真实验有权利对本协议进行修改，协议修改后，仿真实验将通过在相关页面公告或发送通知等方式公布修改的内容，修改后的协议一经公布即有效的代替原协议。如果您不同意本协议的修改，请立即停止访问或使用本网站或取消已经获得的服务；如果您选择继续访问或使用本网站，则视为您已接受本协议的修改。",
            "3、签署的本协议所列明的条款，并不能完全涵盖您与仿真实验之间所有的权利和义务。因此，仿真实验不定期公布的其他声明、规则等均视为本协议之补充协议，为本协议不可分割的组成部分，与本协议具有同等法律效力。",
            "4、如本协议与仿真实验平台其它协议条款不一致，以其它协议条款内容为准。",
            "二、帐号密码与注册、登录",
            "1、帐号的取得",
            "(1)您确认，在您开始登陆使用仿真实验前，已经具备中华人民共和国法律规定的与您行为相适应的民事行为能力。若您不具备前述与您行为相适应的民事行为能力，则您及您的监护人应依照法律规定承担因此而导致的一切后果。",
            "(2)您的账号由校园官方提前为您注册发布，您使用此账户登录后，即成为仿真实验注册用户。",
            "2、请您妥善保管为您分发的用户帐号和密码，不要将帐号密码告知他人，因用户原因导致帐号或密码泄露而造成的法律后果由用户负责。同时，用户还应当对以此帐号登录进行的所有活动和事件承担全部后果与法律责任。",
            "3、若您的帐号或密码遗失，请联系校园官方为您找回。若您发现账号遭到未授权的使用或存在其他安全漏洞的情况，应立即告知仿真实验。"
          ]
        },
        {
          key: CONSTANTS.LICENSE_TYPE.OPEN_SOURCE_LICENSE,
          title: "开源许可协议",
          sections: [
            "NervJs/Taro",
            "MIT License",
            "Copyright © 2018",
            "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:",
            "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
            "THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.",
            "NervJs/taro-ui",
            "MIT License",
            "Copyright © 2018 koppt",
            "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:",
            "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.",
            "THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT"
          ]
        }
      ]
    };
  }
  
  componentWillMount() {
    const licenseType = this.$router.params.type;
    this.setState({
      licenseType: licenseType
    });
    Taro.setNavigationBarTitle({
      title: licenseType
    });
  }

  render() {
    const { licenseType, data } = this.state;
    const license = data.filter((item) => { return item.key == licenseType})
    return (
      <View className='license-page'>
        {
          license.length == 0 ? null : (
            <Article title={license[0].title} sections={license[0].sections}></Article>
          )
        }
      </View>
    );
  }
}
