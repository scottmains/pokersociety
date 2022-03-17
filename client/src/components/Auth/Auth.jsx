import React from "react";
import './Auth.css';
import axios from "axios";

class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            authenticated: false, 
            studentid: "", 
            password: "",
            token:null,
            studentIdValid: "",
            passwordValid: "",
            fields: {},
            errors: {}
        }
    }

    componentDidMount() {
        if(localStorage.getItem('auth-token')) {
            this.setState(
                {authenticated:true,
                 token: localStorage.getItem('auth-token')
                });
        }
    }
    
    handlePassword = (e) => {
        const value = e.target.value
        this.setState({password:value})   
    }
    handleStudentId = (e) => {
        const value = e.target.value
        this.setState({studentid:value})
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
      }

      signupSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
          console.log("SUCCESS");
        } else {
          console.log("Form has errors.");
        }
      }

      handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["studentid"]) {
            formIsValid = false;
            errors["studentid"] = "Cannot be empty";
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

      

        this.setState({errors: errors});
        return formIsValid;
      }

    
    handleLoginClick = async (e) => {
        let url = "http://localhost:5000/api/user/login" 
       
        const studentid = this.state.fields["studentid"];
        const password = this.state.fields["password"];
       
  
        axios.post(url, {
            studentid: studentid,
            password: password
        }) .then((response) => {
            if ((response.status === 200) || (response.status === 204)) {
            console.log("Success");
            this.setState({ 
                authenticated: true,
                token: response.data
                 })
                 localStorage.setItem('auth-token', response.data); 
                 window.location.reload();
                } else if (response.status === 418) {
                    this.setState({ 
                       studentIdValid: "Student ID doesn't exist"
                    }) 
                } else if (response.status === 419) {
                    this.setState({ 
                        passwordValid: "Password is incorrect"
                     }) 
                }
                
        }) .catch ((err) => {
            console.log("something went wrong ", err)
            });   
    }

   render() {

    console.log(this.state.studentIdValid)
    console.log(this.state.authenticated)


  return (
            <form onSubmit={this.signupSubmit.bind(this)}>
                <div className="mb-3">
                    <input type="text" placeholder="Student ID" onChange={this.handleChange.bind(this, "studentid")}
                value={this.state.fields["studentid"]}/>
                </div>
                <span className="form-errors" style={{ color: "red" }}>{this.state.errors["studentid"]} {this.state.studentIdValid} </span>
                <div className="mb-3">
                    <input className ="form-label" type="password" placeholder="Password" onChange={this.handleChange.bind(this, "password")}
                value={this.state.fields["password"]}/>
                </div>
                <span className="form-errors" style={{ color: "red" }}>{this.state.errors["password"]} {this.state.passwordValid} </span>
                <button type="Submit" onClick={this.handleLoginClick}>Log in</button>
            </form> 
  );
   }
}

export default Auth;