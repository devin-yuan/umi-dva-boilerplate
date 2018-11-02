/**
 * 全局Layout
 */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'umi/withRouter';
import { connect } from 'dva';
import commonConfig from 'config/config.common';
import NProgress from 'nprogress';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { LocaleProvider } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

class BasicLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.lastHref = '';
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;

    // 切换路由时，滚动条至顶
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children, loading, location } = this.props;

    // 不显示滚动条边上那个转的小圈圈
    NProgress.configure({ showSpinner: false });

    if (this.lastHref !== location.pathname) {
      NProgress.start();

      if (!loading.global) {
        NProgress.done();

        this.lastHref = location.pathname;
      }
    }

    return (
      <Fragment>
        <LocaleProvider locale={enUS}>
          {commonConfig.mobile && commonConfig.routerTransition ? (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                classNames="fade"
                timeout={300}
              >
                {children}
              </CSSTransition>
            </TransitionGroup>
          ) : children}
        </LocaleProvider>
      </Fragment>
    );
  }
}

BasicLayout.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  loading: PropTypes.object.isRequired,
};

export default connect(({ loading }) => ({
  loading,
}))(withRouter(BasicLayout));
