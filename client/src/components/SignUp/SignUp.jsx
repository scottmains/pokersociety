
import React from "react";
import { NavLink ,useNavigate} from "react-router-dom";
import './signup.css'
import handleValidation from "../FormValidation/FormValidation"
import axios from "axios";
import Login from "../Login/Login";

class SignUp extends React.Component {


    constructor(props) {
        super(props);
        this.state = { 
            authenticated: false, 
            token:null,
            submitted: "",
            fields: {},
            errors: {},
            existingemail: "",
            creationSuccess: ""
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
      }

      signupSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
          console.log("SUCCESS")
        } else {
          console.log("Form has errors.");
        }
      }
      
    handleSignUpClick = () => {
        let url = "http://localhost:5000/api/user/register" 

        const name = this.state.fields["name"];
        const email = this.state.fields["email"];
        const studentid = this.state.fields["studentid"];
        const password = this.state.fields["password"];
   

        axios.post(url, {
            name: name,
            email: email,
            studentid: studentid,
            password: password
        }) .then((response) => {
            if ((response.status === 200) || (response.status === 204)) {
                console.log("SUCCESS") 
                this.setState({ 
                    creationSuccess: "Account Created successfully"
                })
                } 
                else if (response.status === 400) {
                    this.setState({ 
                        existingemail: "Email is already taken"
                    })
                }   else {
                    throw Error(response.statusText);
                }
        }) .catch ((err) => {
            console.log("something went wrong ", err)
            });
            
           

        }
        
    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }
        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf("@");
            let lastDotPos = fields["email"].lastIndexOf(".");
            if (
                !(
                    lastAtPos < lastDotPos &&
                    lastAtPos > 0 && 
                    fields["email"].indexOf("@@") == -1 &&
                    lastDotPos > 2 &&
                    fields["email"].length - lastDotPos > 2
                )
            ) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (!fields["studentid"]) {
            formIsValid = false;
            errors["studentid"] = "Cannot be empty";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-z A-Z]+$/)) {
            formIsValid = false;
            errors["name"] = "Only letters";
            }
        }
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        if (!fields["passwordconfirm"]) {
        formIsValid = false;
        errors["passwordconfirm"] = "Cannot be empty";
    }
        if (typeof fields["password"] !== "undefined" && typeof fields["passwordconfirm"] !== "undefined") {
            if (fields["password"] != fields["passwordconfirm"]) {
                formIsValid = false;
                errors["passwordconfirm"] = "Passwords don't match.";
            }
            }
        if (!fields["phonenumber"]) {
                formIsValid = false;
                errors["phonenumber"] = "Cannot be empty";
            }
        this.setState({errors: errors});
        return formIsValid;
        };


    render() {
        console.log("phonenumber is:", this.state.fields["phonenumber"]);
        console.log("fullname is", this.state.fields["fullname"]);
        console.log("email is:", this.state.fields["email"]);
        console.log("password is", this.state.fields["password"]);
        console.log("password confirm is", this.state.fields["passwordconfirm"]);
        console.log(this.state.existingemail);

        return (

            <div className="section__padding">
            <div className="signup-box ">
            <form
            name="signupform"
            className="slice__signup-form"
            onSubmit={this.signupSubmit.bind(this)}
            >
           <div> 
               <h1> SIGN-UP </h1>
              <input
                ref="name"
                type="text"
                size="30"
                placeholder="Full Name"
                onChange={this.handleChange.bind(this, "name")}
                value={this.state.fields["name"]}
              />
              <span  className="form-errors" style={{ color: "red" }}>{this.state.errors["name"]}</span>
              <input
                refs="email"
                type="text"
                size="30"
                placeholder="Email"
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
              />
              <span  className="form-errors" style={{ color: "red" }}>{this.state.errors["studentid"]}</span>
              <input
                refs="studentid"
                type="text"
                size="30"
                placeholder="Student ID"
                onChange={this.handleChange.bind(this, "studentid")}
                value={this.state.fields["studentid"]}
              />
              <span className="form-errors" style={{ color: "red" }}>{this.state.errors["studentid"]} {this.state.existingemail} </span>
              <input
                refs="password"
                type="password"
                size="15"
                placeholder="Password"
                onChange={this.handleChange.bind(this, "password")}
                value={this.state.fields["password"]}
              />
              <span  className="form-errors"  style={{ color: "red" }}>{this.state.errors["password"]}</span>
              <input
                refs="passwordconfirm"
                type="password"
                size="15"
                placeholder="Password Confirm"
                onChange={this.handleChange.bind(this, "passwordconfirm")}
                value={this.state.fields["passwordconfirm"]}
              />
              <span className="form-errors" style={{ color: "red" }}>{this.state.errors["passwordconfirm"]}</span>
              <button onClick={this.handleSignUpClick} id="submit" value="Submit">Sign Up</button>
              <span className="form-errors" style={{ color: "green" }}>{this.state.creationSuccess}</span>
              </div>
       </form>
       <div className="create-account">
    <NavLink to ="/"> 
    <p> Log In </p> 
    </NavLink>
    </div>
       </div> 
       </div>
          
        )
    }
}
  
  export default SignUp
  