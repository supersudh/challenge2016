import React, {Component} from 'react';
import echarts from 'echarts';
import { pureRender } from '../utils';
import _ from 'lodash';

@pureRender
export default class ECharts extends Component {

  static propTypes = {
    onInit: React.PropTypes.func,
    option: React.PropTypes.object,
    notMerge: React.PropTypes.bool,
    notRefreshImmediately: React.PropTypes.bool,
    style: React.PropTypes.object,
  };

  static defaultProps = {
    notMerge: false,
    notRefreshImmediately: false,
    style: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.init();
  }

  componentWillReceiveProps({events}) {
    this.bindEvents(events);
  }

  componentDidUpdate() {
    this.setOption();
    this.chart.resize();
  }

  componentWillUnmount() {
    this.dispose();
  }

  getInstance() {
    return this.chart;
  }

  setOption() {
    let {
      option,
      notMerge,
      notRefreshImmediately,
      } = this.props;
    if (option) {
      this.chart.showLoading();
      this.chart.setOption(option, notMerge, notRefreshImmediately);
      this.chart.hideLoading();
    }
  }

  init() {
    this.chart = echarts.init(this.refs.container);
    this.setOption();
    this.bindEvents();
  }

  bindEvents(events) {
    const e = events || this.props.events;
    if (e) {
      this.chart.off();
      _.mapKeys(e, (fn, event) => {
          if (event == 'mousemove') {
              return;
          }
          this.chart.on(event, fn);
      });
    }
  }

  dispose() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }

  render() {
    let {
      option,
      notMerge,
      notRefreshImmediately,
      style,
      events,
      ...other,
      } = this.props;

    let newStyle = Object.assign({
      width: '100%',
      height: '100%',
    }, style);

    return (
      <div ref="container" {...other} style={newStyle}></div>
    );
  }
}
