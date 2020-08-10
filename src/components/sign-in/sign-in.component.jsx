import React, {Component} from "react";

import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../firebase/firebase.util";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {email, password} = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({email: '', password: ''})
    } catch(error) {
      console.error();
    }
  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({[name]: value})    // name will be either email or password
  }

  render() {
    return (
      <div className={'sign-in'}>
        <h2>Account exists</h2>
        <span>Sign in using email/password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name={'email'}
            type={'email'}
            label={'email'}
            value={this.state.email}
            handleChange={this.handleChange}
            required={true}/>
          <FormInput
            name={'password'}
            type={'password'}
            label={'password'}
            value={this.state.password}
            handleChange={this.handleChange}
            required={true}/>
          <div className={'buttons'}>
            <CustomButton type={'submit'}>Sign In</CustomButton>
            <CustomButton type={'button'} onClick={signInWithGoogle} isGoogleSignIn>
              Sign In with Google
            </CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn;