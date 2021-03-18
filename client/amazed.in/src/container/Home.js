import React from 'react';
import Category from '../components/Category';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { categories } from '../actions/actionfile';

class Home extends React.Component {
    componentDidMount() {
        this.props.dispatch(categories());
    }

    render() {
        return (
            <React.Fragment>
                <Category cData={this.props.catData.Categories}/>
            </React.Fragment>
        );
    }
}

Home.prototypes = {
    dispatch: propTypes.func
}

const mapStateToProps = (state) => {
    return {
        catData: state.category
    }
}

export default connect(mapStateToProps)(Home);