import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchDrink, addConsumed } from '../actions/index';
import { bindActionCreators } from 'redux';
import UserConsumed from './userconsumed';

class Drink extends PureComponent {

    componentWillMount() {
        this.props.fetchDrink();
    }

    renderDrink() {
        return this.props.drinks.map(drink => {
            var two_servings_button;
            if (drink.servings === 2) {
              two_servings_button = <button onClick={() => this.props.addConsumed(drink.id, drink.servings)} type="button" className="btn btn-primary">2 Servings</button>;
            }
            return (
              <div
                className="card col-sm-4"
                key={drink.name}>
                <div className="card-body">
                    <h3 className="card-title">{drink.name}</h3>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {drink.servings} serving{(drink.servings === 1) ? <span></span> : <span>s</span>} per container
                    </h6>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {drink.caffeine_per_serving}mg per serving
                    </h6>
                    {two_servings_button}&nbsp;
                    <button onClick={() => this.props.addConsumed(drink.id, 1)} type="button" className="btn btn-primary">1 Serving</button>
                </div>
              </div>
            );
        })
    }

    render() {
        if (!this.props.drinks) {
            return <div>Loading...</div>;
        }

        const rowStyle = {
          marginBottom: "50px"
        }

        return (
          <div>
            <div className="row" style={rowStyle}>
              <div className="col-sm-12 text-center">
                <UserConsumed />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="row">
                    {this.renderDrink()}
                </div>
              </div>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { drinks: state.drinks.homePageDrinks }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ fetchDrink: fetchDrink, addConsumed: addConsumed }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Drink);

//export default connect(mapStateToProps, actions)(Drink);
