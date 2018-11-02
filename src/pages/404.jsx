/**
 * 404页面
 */
import React, { PureComponent } from 'react';
import router from 'umi/router';
import classNames from 'classnames';
import { NavBar, Result, Icon } from 'antd-mobile';

class NotFound extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bgKey: Math.floor((Math.random() * 7) + 1),
    };
  }

  render() {
    const { bgKey } = this.state;

    return (
      <div className={classNames('not-found-wrap', `bg${bgKey}`)}>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            router.replace('/');
          }}
        >
          Not Found
        </NavBar>

        <Result
          img={(
            <Icon
              type="cross-circle-o"
              className="not-found-icon"
            />
          )}
          title="404"
          message="Not Found"
        />
      </div>
    );
  }
}

export default NotFound;
