import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AutoComplete from 'material-ui/AutoComplete';

class DistributorProfile extends Component {

  constructor(props) {
    super(props);
  }


  componentWillMount() {
    if (this.props.user_pool.length === 0 || this.props.user_pool.length === 0)
      browserHistory.push("/create_distributor");
    let id = parseInt(this.props.params.id);
    let current_user = this.props.user_pool.filter(user => user.id === id)[0];
    this.state = { current_user };
  }


  renderDistributorDetails() {
    let {current_user} = this.state;
    let distributor_name = current_user.name;
    let child_of = [];
    if (current_user.is_child) {
      child_of = this.props.user_pool.filter(user => user.id === current_user.is_child_of)[0];
    }

    let permissions = current_user.permissions.map(t => {
      let { country_name, province_name, city_name } = t;
      let include = '';
      include += country_name ? country_name + ' > ' : '';
      include += province_name ? province_name + ' > ' : '';
      include += city_name ? city_name : '';
      return include;
    });

    let banned = current_user.banned.map(t => {
      let { country_name, province_name, city_name } = t;
      let exclude = '';
      exclude += country_name ? country_name + ' > ' : '';
      exclude += province_name ? province_name + ' > ' : '';
      exclude += city_name ? city_name : '';
      return exclude;
    });

    permissions = permissions.map(t => {
      return (
        <p>INCLUDE: {t}</p>
      );
    });

    banned = banned.map(t => {
      return (
        <p>EXCLUDE: {t}</p>
      );
    });

    if (child_of === true) {
      return (
        <div>
          <p>Distributor Name : {distributor_name}> {child_of.name}</p>
          <p>{distributor_name}is child of {child_of.name}</p>
          {permissions}
          {banned}
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Distributor Name : {distributor_name}</p>
          {permissions}
          {banned}
        </div>
      );
    }
  }

  renderDistributorOperations() {
    let {current_user} = this.state;
    let child_of = [];
    if (current_user.is_child) {
      child_of = this.props.user_pool.filter(user => user.id === current_user.is_child_of)[0];
    }
    if (!current_user.is_child) {

    }
    else {
      return '';
    }
  }

  render() {
    if (this.state.current_user) {
      return (
        <div>
          {this.renderDistributorDetails.call(this)}
          {this.renderDistributorOperations.call(this)}
        </div>
      );
    }
    else {
      return <div></div>;
    }

  }
}

function mapStateToProps(state) {
  console.log("DistributorProfile component", state);
  let { user_pool, countries, states, cities } = state.distributor;
  return {
    user_pool,
    countries,
    states,
    cities
  }
}

export default connect(mapStateToProps)(DistributorProfile);