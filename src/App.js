import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import './App.css';
import HomePage from "./pages/homepage/homepae.component";
import ShopPage from "./pages/shop/shop.component";
import './pages/homepage/homepage.styles.scss';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDoc} from "./firebase/firebase.util";

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          }, () => {
            console.log(this.state);  // setState is async, hence console.log has to be passed in as 2nd fund
          })
        })
      }
      this.setState({currentUser: userAuth});
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser = {this.state.currentUser} />
          <Switch>
            <Route exact path={'/'} component={HomePage}/>
            <Route exact path={'/shop'} component={ShopPage}/>
            <Route exact path={'/signin'} component={SignInAndSignUpPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
