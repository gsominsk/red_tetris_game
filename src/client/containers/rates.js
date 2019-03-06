import React                    from 'react'
import { connect }              from 'react-redux'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { ratesFetchData } from "../actions/rates";

import SideMenu from './sidemenu'

class Rates extends React.Component {
    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    componentDidMount() {
        this.props.fetchData('http://599167402df2f40011e4929a.mockapi.io/items');
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    render () {
        console.log('[+] Rates | props : ', this.props);

        return (
            <div className="rates-container">
                <SideMenu
                    open={this.state.open}
                    onClick ={this.menuBtnClick}
                />
                <div className={`rates-wrap ${this.state.open ? 'opacity-zero-point-two' : ''}`}>
                    <span className="rates-info">RATES</span>
                    <span className="split"></span>
                    <ul className="rates-list">
                        <li className="rl-item">
                            <span className="rl-item-num">
                                1.
                            </span>
                            <span className="rl-item-login">
                                Some Login
                            </span>
                            <span className="rl-item-score">
                                10000
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rates: state.rates,
        hasErrored: state.ratesHasErrored,
        isLoading: state.ratesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(ratesFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);