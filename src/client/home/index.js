import React, {Component} from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import cn from 'classnames';

import './index.less';
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
      <div className={cn('home')}>
        <div className={cn('page')}>这是首页。111</div>
        <Button type="primary" onClick={() => this.getData('get')}>获取（/get）请求数据</Button><br />
        <Button type="primary" onClick={() => this.getData('post')}>获取（/post）请求数据</Button><br />
      </div>
    )
  }
}
export default Home;