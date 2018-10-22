import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import History from '../../history.js';

class Signout extends PureComponent {

    componentWillMount() {
        this.props.signoutUser();
        History.push('/signin')
    }

    render() {
        return (
            <div>Signed out...</div>
        )
    }
}

export default connect(null, actions)(Signout);
