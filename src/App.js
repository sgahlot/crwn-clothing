import React, {Component} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {connect} from "react-redux";

import './App.css';
import HomePage from "./pages/homepage/homepae.component";
import ShopPage from "./pages/shop/shop.component";
import './pages/homepage/homepage.styles.scss';
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import {auth, createUserProfileDoc} from "./firebase/firebase.util";
import {setCurrentUser} from "./redux/user/user-actions";

class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }, () => {
            console.log(this.state);  // setState is async, hence console.log has to be passed in as 2nd fund
          })
        })
      }
      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header/>
          <Switch>
            <Route exact path={'/'} component={HomePage}/>
            <Route exact path={'/shop'} component={ShopPage}/>
            <Route exact path={'/signin'}
                   render={
                     () => this.props.currentUser
                       ? (<Redirect to='/'/>)
                       : (<SignInAndSignUpPage/>)
                   }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
});


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
