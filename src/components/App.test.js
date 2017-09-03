import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import * as api from '../utils/api'
import configureMockStore from 'redux-mock-store'
import fetchMock from 'fetch-mock'
import App from './App';

const mockStore = configureMockStore([thunk.withExtraArgument(api)])
const store = mockStore({})

fetchMock.mock(`*`, {})

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>, div);
});
