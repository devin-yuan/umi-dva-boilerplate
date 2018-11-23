/**
 * 画廊组件
 * 核心插件：PhotoSwipe
 * 地址：https://github.com/dimsemenov/PhotoSwipe
 */

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PhotoSwipe } from 'react-photoswipe';
import styles from './index.less';
import 'react-photoswipe/lib/photoswipe.css';

class Gallery extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    const { data } = this.props;
    const { isOpen } = this.state;
    const options = {
      loop: true, // 开启循环
      closeOnVerticalDrag: false,
      history: false, // 开启该功能会改变Url，再关闭时触发到 React 生命周期
      fullscreenEl: false, // 关闭全屏
      zoomEl: true,
      shareEl: false, // 关闭分享
    };

    let main = null;

    if (data && data.length > 0) {
      let items = [];

      if (data) {
        if (typeof data === 'string') {
          items = [{
            src: data,
            w: 1200,
            h: 900,
          }];
        } else {
          for (const i in data) {
            items.push({
              src: data[i],
              w: 1200,
              h: 900,
            });
          }
        }
      }

      main = (
        <Fragment>
          <div
            className={styles.wrap}
            style={{ backgroundImage: `url(${items[0].src})` }}
            onClick={() => {
              this.setState({ isOpen: true });
            }}
          />

          <PhotoSwipe
            isOpen={isOpen}
            items={items}
            options={options}
            onClose={() => {
              this.setState({ isOpen: false });
            }}
          />
        </Fragment>
      );
    }

    return main;
  }
}

Gallery.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
};

export default Gallery;
