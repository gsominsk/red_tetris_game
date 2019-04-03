import React        from 'react'
import { connect }  from 'react-redux'
import PropTypes    from 'prop-types'

import SideMenu     from './sidemenu'

import Loading      from "../components/Loading"
import Io           from '../components/Socket'

import {
    ratesFetchData
}                   from "../actions/rates";

export const RatesTest = () => {
    return (
        <Rates/>
    )
};

class Rates extends React.Component {
    static propTypes = {
        rates       : PropTypes.object
    };

    constructor (props) {
        super(props);

        this.state = ({
            open: false
        });
    }

    componentDidMount() {
        this.props.ratesFetchData(Io.socket);
    }

    menuBtnClick = () =>
        this.setState({open: !this.state.open});

    render () {
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
                        <Loading loading={this.props.rates.isLoading} alreadyLoaded={this.props.rates && this.props.rates.data.length != 0}/>
                        {
                            this.props.rates.data.map((rate, index) => {
                                return (
                                    <li className="rl-item" key={index}>
                                        <span className="rl-item-num">{`${rate.num}.`}</span>
                                        <span className="rl-item-login">{`${rate.login}`}</span>
                                        <span className="rl-item-score">{`${rate.score}`}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        rates: state.rates,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ratesFetchData: (url) => dispatch(ratesFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);