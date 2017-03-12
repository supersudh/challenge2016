import React, { Component } from 'react';
import { Link } from 'react-router';

import ManageDistributorPermissions from './manage_permissions';

export default class App extends Component {
    render() {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link to={'/create_distributor'}>
                            Create Distributor
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to={'/manage_distributors'}>
                            Manage Distributors
                        </Link>
                    </li>
                </ul>
                {this.props.children}
            </div>
        );
    }
}