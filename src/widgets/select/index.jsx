import React from 'react';
import RcSelect, { Option, OptGroup } from 'rc-select';
import classNames from 'classnames';
import './style';
import { pureRender } from '../../utils';

@pureRender
export default class Select extends React.Component {
  static Option = Option;
  static OptGroup = OptGroup;

  static defaultProps = {
    prefixCls: 'shield-select',
    transitionName: 'slide-up',
    choiceTransitionName: 'zoom',
    showSearch: false,
  }

  static contextTypes = {
    shieldLocale: React.PropTypes.object,
  }

  render() {
    let {
      size, className, combobox, notFoundContent, prefixCls, showSearch, optionLabelProp,
    } = this.props;

    const cls = classNames({
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-sm`]: size === 'small',
      [className]: !!className,
      [`${prefixCls}-show-search`]: showSearch,
    });

    const { shieldLocale } = this.context;
    if (shieldLocale && shieldLocale.Select) {
      notFoundContent = notFoundContent || shieldLocale.Select.notFoundContent;
    }

    if (combobox) {
      notFoundContent = null;
      // children 带 dom 结构时，无法填入输入框
      optionLabelProp = optionLabelProp || 'value';
    }

    return (
      <RcSelect {...this.props}
        className={cls}
        optionLabelProp={optionLabelProp || 'children'}
        notFoundContent={notFoundContent} />
    );
  }
}
