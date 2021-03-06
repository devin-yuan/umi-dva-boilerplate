/**
 * 资讯详情
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { WingBlank, WhiteSpace } from 'antd-mobile';

import Navigation from 'components/Navigation';
import GoToTop from 'components/GoToTop';
import NoResult from 'components/NoResult';
import {
  ArticleTitle,
  ArticleContent,
  ArticleSource,
} from 'components/Article';
import Gallery from 'components/Gallery';

class NewsDetail extends PureComponent {
  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'newsDetail/updateState',
      payload: {
        result: {},
      },
    });
  }

  render() {
    const { result, loading } = this.props;
    const { code, data } = result;
    const pageTitle = '资讯详情';
    const showContent = !loading && code === __SUCCESS__;

    let main = (
      <Fragment>
        <ArticleTitle
          text={showContent ? data.title : undefined}
        />

        <div style={{ width: '70%' }}>
          <ArticleSource
            data={showContent ? data : undefined}
          />
        </div>

        <WingBlank>
          {
            showContent && data.imageUrls.length > 0
              ? (<WhiteSpace size="lg" />)
              : null
          }

          <Gallery data={showContent ? data.imageUrls : undefined} />
        </WingBlank>

        <ArticleContent
          content={showContent ? data.content : undefined}
        />

        <GoToTop />
      </Fragment>
    );

    if (Object.keys(result).length > 0 && code !== __SUCCESS__) {
      main = (<NoResult height="100%" text={result.message} />);
    }

    return (
      <Navigation title={pageTitle}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        {main}
      </Navigation>
    );
  }
}

NewsDetail.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  result: PropTypes.object.isRequired,
};

export default connect(({ loading, newsDetail }) => ({
  loading: loading.effects['newsDetail/fetchNewsDetail'],
  result: newsDetail.result,
}))(NewsDetail);
