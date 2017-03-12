import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

import AutoComplete from 'material-ui/AutoComplete';

import * as actions from '../actions';

class DistributorProfile extends Component {

  constructor(props) {
    super(props);
    this.renderStatesSelect = this.renderStatesSelect.bind(this);
    this.renderCitiesSelect = this.renderCitiesSelect.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectState = this.selectState.bind(this);
    this.selectCity = this.selectCity.bind(this);
  }


  componentWillMount() {
    if (this.props.user_pool.length === 0 || this.props.user_pool.length === 0)
      browserHistory.push("/create_distributor");
    let id = parseInt(this.props.params.id);
    let current_user = this.props.user_pool.filter(user => user.id === id)[0];
    this.state = { current_user,
                   country_selected: { country_name: '', country_code: '' },
                   state_selected: { province_name: '', province_code: '' },
                   city_selected: { city_name: '', city_code: '' } 
                 };
  }
  
  componentDidUpdate (prevProps, prevState) {
    if(this.props.adding_permission == false && prevProps.adding_permission == true )
    {
      let current_user = this.props.user_pool.filter(user => user.id === this.state.current_user.id)[0];
      let autos = {country_selected: { country_name: '', country_code: '' },
                   state_selected: { province_name: '', province_code: '' },
                   city_selected: { city_name: '', city_code: '' }};
      this.setState({...this.state, ...autos, current_user});
    }
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
      include += country_name ? country_name: '';
      include += province_name ? ' > ' + province_name: '';
      include += city_name ? ' > ' + city_name : '';
      return include;
    });

    let banned = current_user.banned.map(t => {
      let { country_name, province_name, city_name } = t;
      let exclude = '';
      exclude += country_name ? country_name: '';
      exclude += province_name ? ' > ' + province_name: '';
      exclude += city_name ? ' > ' + city_name : '';
      return exclude;
    });

    permissions = permissions.map((t,i) => {
      return (
        <p key={i}>INCLUDE: {t}</p>
      );
    });

    banned = banned.map((t,i) => {
      return (
        <p key={i}>EXCLUDE: {t}</p>
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

  renderStatesSelect() {
    if(this.props.loading_states || !(this.props.states)) {
      return (<p>Loading States for {this.state.country_selected.country_name}</p>);
    }
    else {
      return (
        <AutoComplete
            hintText="Select a Province"
            dataSource={this.props.states}
            dataSourceConfig={{ text: 'province_name', value: 'province_code' }}
            maxSearchResults={10}
            searchText={this.state.state_selected.province_name}
            onNewRequest={this.selectState}
            onUpdateInput={(evt) => this.setState({...this.state,state_selected: { province_name: evt, province_code: '' }, city_selected: { city_name: '', city_code: '' }  })}
          />
      );
    }
  }

  renderCitiesSelect() {
    if(this.props.loading_cities || (!this.props.cities)) {
      return (<p>Loading Cities for {this.state.state_selected.province_name}</p>);
    }
    else {
      return (
        <AutoComplete
            hintText="Select a City"
            dataSource={this.props.cities}
            dataSourceConfig={{ text: 'city_name', value: 'city_code' }}
            maxSearchResults={10}
            searchText={this.state.city_selected.city_name}
            onNewRequest={this.selectCity}
          />
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
      let country_select = (
          <AutoComplete
            hintText="Select a Country"
            dataSource={this.props.countries}
            dataSourceConfig={{ text: 'country_name', value: 'country_code' }}
            maxSearchResults={10}
            searchText={this.state.country_selected.country_name}
            onNewRequest={this.selectCountry}
            onUpdateInput={(evt) => this.setState({...this.state, country_selected: { country_name: evt, country_code: '' }  ,state_selected: { province_name: '', province_code: '' }, city_selected: { city_name: '', city_code: '' }  })}
          />
      );
      let { country_selected, state_selected } = this.state;
      let state_select = country_selected.country_code == '' ?  '' :  this.renderStatesSelect();
      let city_select =  state_selected.province_code == '' ? '' : this.renderCitiesSelect();
      return (
        <div>
          <div className="col-md-4">
            {country_select}
          </div>
          <div className="col-md-4">
            {state_select}
          </div>
          <div className="col-md-4">
            {city_select}
          </div>
        </div>
      );
    }
    else {
      return '';
    }
  }

  addPermission() {
    return (
      <button
        className="btn btn-primary"
        disabled={this.state.country_selected.country_code === ''}
        onClick={this.submitPermission.bind(this)}>Add Permission</button>  
    );
  }

  submitPermission() {
    let country_code = this.state.country_selected.country_code;
    let province_code = this.state.state_selected.province_code === '' ? null : this.state.state_selected.province_code;
    let city_code = this.state.city_selected.city_code === '' ? null : this.state.city_selected.city_code;
    let { id } = this.state.current_user;
    let { country_name } = this.state.country_selected;
    let province_name = this.state.state_selected.province_name === '' ? null : this.state.state_selected.province_name;
    let city_name = this.state.city_selected.city_name === '' ? null : this.state.city_selected.city_name;
    this.props.dispatch(actions.addPermission({country_code, province_code, city_code, id, country_name, province_name, city_name}));
  }

  render() {
    if (this.state.current_user) {
      return (
        <div className="row">
          <div className="col-md-12">
            {this.renderDistributorDetails.call(this)}
            <h2>Add Permissions :</h2>
            {this.props.adding_permission ? <p>Adding Permissions...</p> : this.renderDistributorOperations.call(this)}
          </div>
          {this.props.adding_permission ? <p>Adding Permissions...</p> : this.addPermission.call(this)}
        </div>
      );
    }
    else {
      return <div></div>;
    }

  }

  selectCountry(evt) {
    this.setState({ ...this.state, country_selected: evt });
    this.props.dispatch(actions.fetchStates(evt.country_code));
  }

  selectState(evt) {
    this.setState({ ...this.state, state_selected: evt });
    this.props.dispatch(actions.fetchCities({country_code: this.state.country_selected.country_code ,province_code: evt.province_code}));
  }

  selectCity(evt) {
    this.setState({ ...this.state, city_selected: evt });
  }

}

function mapStateToProps(state) {
  console.log("DistributorProfile component", state);
  let { user_pool,
        countries,
        states,
        cities,
        loading_states,
        loading_cities,
        adding_permission
       } = state.distributor;
  return {
    user_pool,
    countries,
    states,
    cities,
    loading_states,
    loading_cities,
    adding_permission
  }
}

export default connect(mapStateToProps)(DistributorProfile);