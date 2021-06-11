import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(state => state)
class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  getData = () => {
    this.props.dispatch({type: 'login/user', payload: {}});
  }

  render() {
    const {login, user} = this.props;
    return (
      <div>
        <div>登录页面。</div>
        <div>model传过来的数据：{login.title}</div>
        <div>user传过来的数据：{user.count}</div>
        <Button type="primary" onClick={this.getData}>发送请求获取数据</Button>
      </div>
    )
  }
}

export default Login;