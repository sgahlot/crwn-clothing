import React, {Component} from "react";

import './sign-in.styles.scss';
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({email: '', password: ''})
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
          <CustomButton type={'submit'}>Sign In</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignIn;