import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CMS from './components/cms/cms.js';

// Styles
import './styles/reset.scss';
import './styles/login.scss';

// Auth
import Auth from "./components/auth/auth.js";
import Login from "./components/auth/login.js";
import LoginContext from "./components/auth/context.js";

// Redux
import createStore from './store/';
const store = createStore();

function App() {
  return (
    <div className='main-container'>
      <Provider store={store}>
        <BrowserRouter>
          <LoginContext>
            <Login />
            <hr />
            <Auth capability="read">
              <CMS />
            </Auth>
          </LoginContext>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
