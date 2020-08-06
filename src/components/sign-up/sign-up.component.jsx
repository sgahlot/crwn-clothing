import React, {Component} from "react";

import './sign-up.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDoc, signInWithGoogle} from "../../firebase/firebase.util";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const {displayName, email, password, confirmPassword} = this.state;
    //this.setState({email: '', password: '', confirmPassword: ''})
    if (password !== confirmPassword) {
      alert("password don't match");
      return;
    }

    try {
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      await createUserProfileDoc(user, {displayName});
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = event => {
    const {value, name} = event.target;

    this.setState({[name]: value})    // name will be either email or password
  }

  render() {
    const {displayName, email, password} = this.state;
    return (
      <div className={'sign-up'}>
        <h2 className={'title'}>Sign up for a new account</h2>
        <span>Sign up using your email/password</span>

        <form className={'sign-up-form'} onSubmit={this.handleSubmit}>
          <FormInput
            name={'displayName'}
            type={'text'}
            label={'Display Name'}
            value={this.state.displayName}
            handleChange={this.handleChange}
            required={true}/>
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
          <FormInput
            name={'confirmPassword'}
            type={'password'}
            label={'Confirm Password'}
            value={this.state.confirmPassword}
            handleChange={this.handleChange}
            required={true}/>
          <div className={'buttons'}>
            <CustomButton type={'submit'}>Sign Up</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

export default SignUp;