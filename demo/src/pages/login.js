import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom"
class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          password: '',
          email: '',
          isLoggedIn: false,
        };
      }
      
      
      handleInputChange = e => {
        this.setState({
          [e.target.name]: e.target.value,
        });
      };
    
      handleSubmit = e => {
        e.preventDefault();

        const { password, email } = this.state;
    
        const loginForm = {
          password,
          email,
        };
        axios
          .post('http://localhost:3005/api/v1/users/login', loginForm)
          .then(res=> {
            if(res.status === 200){
              if (res.data.token) {
                  localStorage.setItem('token', res.data.token);
              }
            this.setState({ isLoggedIn: true})
          }})
          .catch(err => {
            console.error(err);
          });
      };
    render() {
        if (this.state.isLoggedIn) {
            return <Navigate to = {{ pathname: "/events" }} />;
          }
        return (
            <div style={{
                display: "flex",
                justifyContent: "centre",
                alignItems: "centre",
                height: "100vh",
            }}       >
              <br />
              <div className="container">
                <h1> Login</h1>
                <form onSubmit={this.handleSubmit}>
                <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <br />
                  <div style={{ width: '30%' }} className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleInputChange}
                    />
                  </div>

                  <br />


                  <div style={{ width: '30%' }}>
                    <button className="btn btn-success" type="submit">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          );
};
}
export default Login;