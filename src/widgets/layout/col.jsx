import React, { PropTypes } from 'react';
import { pureRender } from '../../utils';
import _ from 'lodash';

const stringOrNumber = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);
const objectOrNumber = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);
function genClassObj(size, props) {
  let sizeProps = {};
  if (typeof props[size] === 'number') {
    sizeProps.span = props[size];
  } else if (typeof props[size] === 'object') {
    sizeProps = props[size] || {};
  }
  return {
    [`col-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
    [`col-${size}-order-${sizeProps.order}`]: sizeProps.order,
    [`col-${size}-offset-${sizeProps.offset}`]: sizeProps.offset,
    [`col-${size}-push-${sizeProps.push}`]: sizeProps.push,
    [`col-${size}-pull-${sizeProps.pull}`]: sizeProps.pull,
  };
}

@pureRender
export default class Col extends React.Component {
  static propTypes = {
    span: stringOrNumber,
    order: stringOrNumber,
    offset: stringOrNumber,
    push: stringOrNumber,
    pull: stringOrNumber,
    className: PropTypes.string,
    children: PropTypes.node,
    xs: objectOrNumber,
    sm: objectOrNumber,
    md: objectOrNumber,
    lg: objectOrNumber,
  }

  render() {
    const { span, order, offset, push, pull, className, children, ...others } = this.props;
    const sizeClassObj = {
      ...genClassObj('xs', this.props),
      ...genClassObj('sm', this.props),
      ...genClassObj('md', this.props),
      ...genClassObj('lg', this.props),
      [`col-${span}`]: span !== undefined,
      [`col-order-${order}`]: order,
      [`col-offset-${offset}`]: offset,
      [`col-push-${push}`]: push,
      [`col-pull-${pull}`]: pull,
      [className]: !!className,
    };
    const classes = _(sizeClassObj).keys().filter(key => !!sizeClassObj[key]).value().join(' ');

    return <div {...others} className={classes}>{children}</div>;
  }
}
