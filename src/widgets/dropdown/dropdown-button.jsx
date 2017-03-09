import React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';
import { pureRender } from '../../utils';

@pureRender
export default class DropdownButton extends React.Component {
  static defaultProps = {
    align: {
      points: ['tl', 'bl'],
      overlay: {
        adjustX: 1,
        adjustY: 1,
      },
      offset: [0, 0],
      targetOffset: [0, 0],
    },
    type: 'default',
  }

  render() {
    const { type, overlay, trigger, align, children, className, onClick, size, ...restProps } = this.props;
    const cls = classNames({
      'shield-dropdown-button': true,
      className: !!className,
    });
    return (
      <ButtonGroup {...restProps} className={cls}>
        <Dropdown align={align} overlay={overlay} trigger={trigger}>
          <Button type={type} size={size}>
            <span>{children}</span><span><Icon type="down" /></span>
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
