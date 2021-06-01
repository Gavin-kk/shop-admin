import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import sagaArr from './root-saga';
import reducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware, thunk)));

sagaArr.forEach((item) => {
  sagaMiddleware.run(item);
});

export default store;
