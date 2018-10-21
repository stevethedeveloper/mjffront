import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Drink extends PureComponent {

    componentWillMount() {
        this.props.fetchDrink();
    }

    renderDrink() {
        return this.props.drinks.map(drink => {
            return <li onClick={actions.addConsumed(drink.id, drink.servings)} key={drink.name}>{drink.name}</li>;
        })
    }

    render() {
        if (!this.props.drinks) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h4>Drinks</h4>
                <ul>
                    {this.renderDrink()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { drinks: state.drinks.homePageDrinks }
}

export default connect(mapStateToProps, actions)(Drink);
