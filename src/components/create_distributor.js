import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'
import { Link } from 'react-router';

import AutoComplete from 'material-ui/AutoComplete';
import * as actions from '../actions';

class CreateDistributor extends Component {

  constructor(props) {
    super(props);
    this.state = { name: "" ,error: "", is_child: false, is_child_of: undefined};
  }

  keyUp(evt) {
    this.setState({name: evt.target.value, error: "", is_child: this.state.is_child});
  }

  renderParents() {
    const distributors = this.props.user_pool.map((t,i) => {
      return (
        <div className="radio" key={t.id}>
          <label>
            <input
              type="radio"
              name="distributor_name"
              value={t.name}
              onChange={(evt) => this.setState({...this.state, is_child_of : t.id})} />
            {t.name}
          </label>
        </div>
      )
    });
    return distributors;
  }

  renderChildrenStrategy() {
    let {user_pool} = this.props;
    if(user_pool.length > 0) {
      return (
        <div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value={this.state.is_child}
                onChange={(evt) => this.setState({...this.state, is_child: !this.state.is_child})} />
              Add a parent Distributor
            </label>
          </div>
          {this.state.is_child ? this.renderParents.call(this) : ''}
        </div>
      );
    }
    else {
      return (
        <div>
        <p>Note: Can't assign Parent Distributor as there are no Distributors present now.</p>
        <p>Create a Distributor initially and you will see relevant options...</p>
        </div>
      )
    }
  }
  
  render() {
    return (
      <div>
        <p>Enter distributor Name: </p>
        <input type="text" onKeyUp={this.keyUp.bind(this)} />
        <button onClick={this.createDistributor.bind(this)} className="btn btn-primary">Create</button>
        {this.state.error ? <p style={{color: 'red'}}>{this.state.error}</p> : ''}
        {this.renderChildrenStrategy.call(this)}
      </div>
    );
  }

  createDistributor() {
    if(this.state.name == "") {
      this.setState({...this.state, error: "Name must not be empty"});
    }
    else if(this.state.is_child && !(this.state.is_child_of)) {
      this.setState({...this.state, error: "Select a Parent Distributor"});
    }
    else {
      let dataForApi = this.state;
      let {dispatch} = this.props;
      dispatch(actions.createDistributor(dataForApi));
    }
  }
}


function mapStateToProps(state) {
  let { user_pool } = state.distributor;
  return {
    user_pool
  }
}

export default connect(mapStateToProps)(CreateDistributor);