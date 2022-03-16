import {React, useState} from 'react';
import './Auth.css';


const initialState = {studentid: '', password: ''}

const Auth = () => {

    const [formData, setFormData] = useState(initialState);

const handleLoginClick = (e) => {
    e.preventDefault();
    console.log(formData);
}

const handleChange = (e) => {
    setFormData({... formData, [e.target.name]: e.target.value})
}

  return (

    <div className="login">
    <div className="login-box">
        <div>
            <h1>LOGIN</h1>
            <div>
                <div className="">
                    <input name="studentid" className="" type="text" placeholder="Student ID" handleChange={handleChange}/>
                </div>
                <div>
                    <input name="password" className="" type="password" placeholder="Password" handleChange={handleChange} />
                </div>

                <button onClick={handleLoginClick}>Log in</button>
            </div>
        </div>
    </div>
</div>
      

  );
}

export default Auth