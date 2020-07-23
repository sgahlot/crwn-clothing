import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/homepage/homepae.component";
import ShopPage from "./pages/shop/shop.component";
import './pages/homepage/homepage.styles.scss';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path={'/shop'} component={ShopPage} />
        </Switch>
      </BrowserRouter>

      {/*<BrowserRouter>*/}
      {/*  <HomePage/>*/}
      {/*</BrowserRouter>*/}
    </div>
  );
}

export default App;
