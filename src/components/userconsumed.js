import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchConsumed } from '../actions/index';
import { bindActionCreators } from 'redux';

class UserConsumed extends Component {

    componentWillMount() {
        this.props.fetchConsumed();
    }

    renderConsumed() {
        var colorClass;
        if (this.props.userconsumed >= 500) {
          colorClass = 'red';
        } else if (this.props.userconsumed >= 300) {
          colorClass = 'orange';
        } else {
          colorClass = 'green';
        }
        const spanStyle = {
          color: colorClass
        }
        return <span style={spanStyle} className="consumed-count">{this.props.userconsumed}</span>;
    }

    render() {
        if (!this.props.userconsumed && this.props.userconsumed !== 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
              <strong>Caffeine Consumed:</strong> {this.renderConsumed()} / 500mg
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { userconsumed: state.userconsumed.userConsumed }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchConsumed: fetchConsumed }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserConsumed);
