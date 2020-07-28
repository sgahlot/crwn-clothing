import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/homepage/homepae.component";
import ShopPage from "./pages/shop/shop.component";
import './pages/homepage/homepage.styles.scss';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route exact path={'/shop'} component={ShopPage} />
          <Route exact path={'/signin'} component={SignInAndSignUpPage} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
