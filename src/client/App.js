import React from 'react';
import { Switch, Link } from 'dva/router';
import { Button } from 'antd';
import renderRoutes from '../utils/renderRoutes';
import routes from '../routes/index';

class App extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/login">登陆</Link>
          </li>
          <li>
            <Link to="/user">用户</Link>
          </li>
        </ul>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <Switch>
          {renderRoutes(routes)}
        </Switch>
      </div>
    )
  }
}
export default App;