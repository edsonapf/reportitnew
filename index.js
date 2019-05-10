/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import TestMap2 from './TestMap2';
import Routes from './src/Routes'
import {name as appName} from './app.json';
import configureStore from './src/store';
import { Provider } from 'react-redux';

const store = configureStore();

const App = () => (
    <Provider store = { store }>    
        <Routes/>
    </Provider>    
);

AppRegistry.registerComponent(appName, () => App);

