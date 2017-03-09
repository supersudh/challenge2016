import RcCheckbox from 'rc-checkbox';
import React from 'react';
import CheckboxGroup from './Group';
import classNames from 'classnames';
import { pureRender } from '../../utils';
import './style';

@pureRender
export default class Checkbox extends React.Component {
  static Group = CheckboxGroup;
  static defaultProps = {
    prefixCls: 'shield-checkbox',
  }
  render() {
    const { prefixCls, style, children, className, ...restProps } = this.props;
    const classString = classNames({
      [className]: !!className,
      [`${prefixCls}-wrapper`]: true,
    });
    return (
      <label className={classString} style={style}>
        <RcCheckbox {...restProps} prefixCls={prefixCls} children={null} />
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    );
  }
}
