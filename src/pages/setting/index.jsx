/**
 * 设置中心
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';
import { List, Modal } from 'antd-mobile';

import Navigation from 'components/Navigation';

const { Item } = List;
const { alert } = Modal;

class Setting extends PureComponent {
  // 注销
  logout = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'setting/submitLogout',
    });
  }

  render() {
    const { language, user } = this.props;
    const pageTitle = intl.get('app.page.setting.title');

    return (
      <Navigation title={pageTitle}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        <List>
          <Item
            arrow="horizontal"
            extra={intl.get(`app.language.${language}`)}
            onClick={() => {
              router.push('/setting/language');
            }}
          >
            {intl.get('app.page.setting.language.title')}
          </Item>
          {
            user.logged
              ? (
                <Item
                  arrow="horizontal"
                  onClick={() => {
                    alert(
                      intl.get('app.page.setting.logout.title'),
                      intl.get('app.page.setting.logout.Modal.message'),
                      [
                        {
                          text: intl.get('app.components.Modal.cancel'),
                        },
                        {
                          text: intl.get('app.components.Modal.ok'),
                          onPress: () => this.logout(),
                        },
                      ],
                    );
                  }}
                >
                  {intl.get('app.page.setting.logout.title')}
                </Item>
              )
              : null
          }
        </List>
      </Navigation>
    );
  }
}

Setting.propTypes = {
  dispatch: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(({ global }) => ({
  language: global.language,
  user: global.user,
}))(Setting);
