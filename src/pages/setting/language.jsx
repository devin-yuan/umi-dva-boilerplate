/**
 * 切换语言
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import intl from 'react-intl-universal';
import { Helmet } from 'react-helmet';
import { List, Radio } from 'antd-mobile';
import moment from 'moment';
import localeConfig from 'config/config.locale';

import Navigation from 'components/Navigation';

const { RadioItem } = Radio;

class SwitchLanguage extends PureComponent {
  // 设置语言
  setLanguage = (data) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'global/switchLanguage',
      payload: {
        language: data,
      },
    });
  }

  render() {
    const { language } = this.props;
    const pageTitle = intl.get('app.page.setting.language.title');

    return (
      <Navigation title={pageTitle}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        <List>
          {localeConfig.languages.map((data, index) => {
            const key = `language_item_${index}`;

            return (
              <RadioItem
                key={key}
                checked={language === data}
                onChange={() => this.setLanguage(data)}
              >
                {intl.get(`app.language.${data}`)}
              </RadioItem>
            );
          })}
        </List>

        {intl.get('app.page.setting.language.time', {
          time: moment().format('YYYY-MM-DD HH:mm:ss'),
        })}
      </Navigation>
    );
  }
}

SwitchLanguage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default connect(({ global }) => ({
  language: global.language,
}))(SwitchLanguage);
