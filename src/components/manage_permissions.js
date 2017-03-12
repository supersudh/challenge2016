import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import AutoComplete from 'material-ui/AutoComplete';

class ManageDistributorPermissions extends Component {

  constructor(props) {
    super(props);
    
  }

  keyUp(evt) {
    this.setState({name: evt.target.value});
  }

  render() {
    const distributors = this.props.user_pool.map(t => {
      return (
        <li key={t.id} className="list-group-item"><Link to={`distributor_profile/${t.id}`} >{t.name}</Link></li>
      )
    });
    return (
      <div className="col-md-6">
        <ul className="list-group">
          {distributors}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("ManageDistributorPermissions component",state);
  let { user_pool, countries } = state.distributor;
  return {
    user_pool,
    countries
  }
}

export default connect(mapStateToProps)(ManageDistributorPermissions);