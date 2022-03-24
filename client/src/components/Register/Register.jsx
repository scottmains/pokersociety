import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink} from "react-router-dom";
import axios from 'axios';
import  './register.css'

const USER_REGEX = /^[a-zA-Z ,.'-]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const STUDENTID_REGEX = /w[0-9]+/

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [studentid, setStudentId] = useState('');
    const [validStudentId, setValidStudentId] = useState(false);
    const [studentIdFocus, setStudentIdFocus] = useState(false);

    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(name));
    }, [name])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidStudentId(STUDENTID_REGEX.test(studentid));
    }, [studentid])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [name, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(name);
        const v2 = PWD_REGEX.test(password);
        let url = "https://northumbria-poker-society.herokuapp.com//api/user/register";
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(url,
                JSON.stringify({ name, email, studentid, password}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log(response?.accessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setName('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 418) {
                setErrMsg('Student ID already in use');
            } else if (err.response?.status === 419) {
                setErrMsg('Email Address already in use');
            }
                else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Success!</h1>
      <NavLink to="/">
        <p className="text-center">
          <a href="#" className="font-medium text-rose-600 hover:text-rose-500 "> Sign In </a>
        </p>
      </NavLink>
    </div>
  </div>
            ) : (
                <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <label htmlFor="username"> Full Name:
                        <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide" } />
                        <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid" } />
                      </label>
                      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="text" id="name" ref={userRef} autoComplete="off" onChange={(e)=> setName(e.target.value)} value={name} required aria-invalid={validName ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setNameFocus(true)} onBlur={() => setNameFocus(false)} /> <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen" }>
                        <FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters. <br /> Must begin with a letter. <br /> Letters, numbers, underscores, hyphens allowed.
                      </p>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <label htmlFor="email"> Email:
                        <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide" } />
                        <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid" } />
                      </label>
                      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="text" id="email" ref={userRef} autoComplete="off" onChange={(e)=> setEmail(e.target.value)} value={email} required aria-invalid={validEmail ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} /> <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen" }>
                        <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid email <br />
                      </p>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <label htmlFor="studentId"> Student ID:
                        <FontAwesomeIcon icon={faCheck} className={validStudentId ? "valid" : "hide" } />
                        <FontAwesomeIcon icon={faTimes} className={validStudentId || !studentid ? "hide" : "invalid" } />
                      </label>
                      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="text" id="studentid" ref={userRef} autoComplete="off" onChange={(e)=> setStudentId(e.target.value)} value={studentid} required aria-invalid={validStudentId ? "false" : "true"} aria-describedby="uidnote" onFocus={() => setStudentIdFocus(true)} onBlur={() => setStudentIdFocus(false)} /> <p id="uidnote" className={studentIdFocus && studentid && !validStudentId ? "instructions" : "offscreen" }>
                        <FontAwesomeIcon icon={faInfoCircle} /> Must be a valid Student ID <br />
                      </p>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <label htmlFor="password"> Password:
                        <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide" } />
                        <FontAwesomeIcon icon={faTimes} className={validPwd || !password ? "hide" : "invalid" } />
                      </label>
                      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="password" id="password" onChange={(e)=> setPwd(e.target.value)} value={password} required aria-invalid={validPwd ? "false" : "true"} aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} /> <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen" }>
                        <FontAwesomeIcon icon={faInfoCircle} /> 8 to 24 characters. <br /> Must include uppercase and lowercase letters, a number and a special character. <br /> Allowed special characters: <span aria-label="exclamation mark">!</span>
                        <span aria-label="at symbol">@</span>
                        <span aria-label="hashtag">#</span>
                        <span aria-label="dollar sign">$</span>
                        <span aria-label="percent">%</span>
                      </p>
                    </div>
                    <div className="rounded-md shadow-sm -space-y-px">
                      <label htmlFor="confirm_pwd"> Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide" } />
                        <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid" } />
                      </label>
                      <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="password" id="confirm_pwd" onChange={(e)=> setMatchPwd(e.target.value)} value={matchPwd} required aria-invalid={validMatch ? "false" : "true"} aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} /> <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen" }>
                        <FontAwesomeIcon icon={faInfoCircle} /> Must match the first password input field.
                      </p>
                    </div>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" disabled={!validName || !validPwd || !validMatch ? true : false}>
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span> Sign Up </button>
                  </form>
                  <div className="text-sm text-center">
                    <p> Already registered? <NavLink to="/">
                        <a href="#" className="font-medium text-rose-600 hover:text-rose-500">Login here </a>
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            )}
        </>
    )
}

export default Register