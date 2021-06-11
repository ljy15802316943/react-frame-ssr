import React, {Component} from 'react';
import { connect } from 'dva';
import { Button } from 'antd';

@connect(state => state)
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch({type: 'home/getInfo', payload: {}});
  }

  getData = (api) => {
    this.props.dispatch({ type: `home/${api}`, payload: {}});
  }

  render() {
    return (
      <div>
        <div>这是首页。</div>
        <Button type="primary" onClick={() => this.getData('get')}>获取（/get）请求数据</Button><br />
        <Button type="primary" onClick={() => this.getData('post')}>获取（/post）请求数据</Button><br />
      </div>
    )
  }
}
export default Home;