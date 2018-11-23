/**
 * 设置中心
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';
import { List } from 'antd-mobile';

import Navigation from 'components/Navigation';

const { Item } = List;

class Setting extends PureComponent {
  render() {
    const { language } = this.props;
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
        </List>
      </Navigation>
    );
  }
}

Setting.propTypes = {
  language: PropTypes.string.isRequired,
};

export default connect(({ global }) => ({
  language: global.language,
}))(Setting);
