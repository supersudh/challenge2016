import React from 'react';
import Radio from './radio';

export default class RadioLink extends React.Component {
  static defaultProps = {
    prefixCls: 'shield-radio-link',
  }
  render() {
    return (
      <Radio {...this.props} />
    );
  }
}
