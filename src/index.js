import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route,Switch , BrowserRouter} from 'react-router-dom';
 import History from './history';


const Main = () => (
    <BrowserRouter>
        <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/history" component={History}/>
        </Switch>
    </BrowserRouter>
  );


ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
