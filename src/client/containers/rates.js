import React                    from 'react'
import { connect }              from 'react-redux'
import PropTypes                from 'prop-types'

import { ratesFetchData }   from "../actions/rates";

import Loading              from "../components/Loading"
import SideMenu             from './sidemenu'

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
                        <Loading loading={this.props.isLoading} alreadyLoaded={this.props.rates && this.props.rates.length != 0}/>
                        {
                            this.props.rates.map((rate, index) => {
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
        hasErrored: state.ratesHasErrored,
        isLoading: state.ratesIsLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(ratesFetchData(url))
    };
};

Rates.propTypes = {
    hasErrored  : PropTypes.bool,
    isLoading   : PropTypes.bool,
    rates       : PropTypes.array
};

export default connect(mapStateToProps, mapDispatchToProps)(Rates);