import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import {createRenderer} from 'react-addons-test-utils'

import {GameMapTest} from '../src/client/components/GameMap'
import GameMap from '../src/client/components/GameMap'

import {ErrorTest} from '../src/client/components/Error'
import Error from '../src/client/components/Error'

import {LoadingTest} from '../src/client/components/Loading'
import Loading from '../src/client/components/Loading'

import {LogBtnTest} from '../src/client/components/LogBtn'
import LogBtn from '../src/client/components/LogBtn'

import {MapItemTest} from '../src/client/components/MapItem'
import MapItem from '../src/client/components/MapItem'

import {NewPassFormCodeTest} from '../src/client/components/NewPassFormCode'
import NewPassFormCode from '../src/client/components/NewPassFormCode'

import {NewPassFormEmailTest} from '../src/client/components/NewPassFormEmail'
import NewPassFormEmail from '../src/client/components/NewPassFormEmail'

import {SuccessTest} from '../src/client/components/Success'
import Success from '../src/client/components/Success'

import {SideMenuTest} from '../src/client/containers/sidemenu'
import SideMenu from '../src/client/containers/sidemenu'

import {RatesTest} from '../src/client/containers/rates'
import Rates from '../src/client/containers/rates'

chai.should()
chai.use(equalJSX)

describe('Fake react test', function() {
    it('should work game map', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(GameMapTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<GameMap/>);
    });

    it('should work Error', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(ErrorTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<Error/>);
    });

    it('should work Loading', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(LoadingTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<Loading/>);
    });

    it('should work Log Btn', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(LogBtnTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<LogBtn/>);
    });

    it('should work Map Item', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(MapItemTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<MapItem/>);
    });

    it('should work new pass form code', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(NewPassFormCodeTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<NewPassFormCode/>);
    });

    it('should work new pass form email', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(NewPassFormEmailTest));
        const output = renderer.getRenderOutput();
        <NewPassFormEmail/>.should.equalJSX(<NewPassFormEmail/>);
    });

    it('should work success', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(SuccessTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<Success/>);
    });

    it('should work side menu', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(SideMenuTest));
        const output = renderer.getRenderOutput();
        <SideMenu/>.should.equalJSX(<SideMenu/>);
    });

    it('should work rates', function() {
        const renderer = createRenderer();
        renderer.render(React.createElement(RatesTest));
        const output = renderer.getRenderOutput();
        output.should.equalJSX(<Rates/>);
    });
});