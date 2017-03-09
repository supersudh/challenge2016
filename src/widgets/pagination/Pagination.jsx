import React from 'react';
import RcPagination from 'rc-pagination';
import Select from '../select';
import MiniSelect from './MiniSelect';
import zhCN from './locale/zh_CN';
import { pureRender } from '../../utils';

@pureRender
export default class Pagination extends React.Component {
  static defaultProps = {
    locale: zhCN,
    className: '',
    prefixCls: 'shield-pagination',
  }

  static contextTypes = {
    shieldLocale: React.PropTypes.object,
  }

  render() {
    let className = this.props.className;
    let selectComponentClass = Select;

    let locale;
    if (this.context.shieldLocale && this.context.shieldLocale.Pagination) {
      locale = this.context.shieldLocale.Pagination;
    } else {
      locale = this.props.locale;
    }

    if (this.props.size === 'small') {
      className += ' mini';
      selectComponentClass = MiniSelect;
    }

    return (
      <RcPagination selectComponentClass={selectComponentClass}
        selectPrefixCls="shield-select"
        {...this.props}
        locale={locale}
        className={className} />
    );
  }
}
