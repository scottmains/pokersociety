import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid'
import { NavLink} from "react-router-dom";
import pokerlogo  from '../../assets/pokerlogo.svg'
import axios from '../../api/axios';
import jwt_decode from "jwt-decode";
import useAuth from '../../context/Auth/useAuth'
import Newsfeed from '../../pages/Newsfeed/Newsfeed'
const LOGIN_URL = '/api/user/login';


const Auth = () => {

    let navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [studentid, setStudentId] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
   
    const {setUserDetails, setAuth, persist, setPersist } = useAuth();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [studentid, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ studentid, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        const accessToken = response?.data?.accessToken;
        setAuth({ user, pwd, accessToken });
        setUserDetails(studentid);
        setUser('')
        setPwd('');
        navigate("/newsfeed", { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Student ID or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    console.log(user)

    const togglePersist = () => {
      setPersist(prev => !prev);
    }

    useEffect(() => {
      localStorage.setItem("persist", persist);
    }, [persist])

    return (
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <img className="mx-auto  w-40 " src={pokerlogo} alt="Workflow" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Northumbria Poker Society</h2>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen" } aria-live="assertive">{errMsg}</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="studentid">Student ID:</label>
            <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 
            placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" 
            type="text" id="studentid" ref={userRef} autoComplete="off" onChange={(e)=> setStudentId(e.target.value)} value={studentid} required />
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <label htmlFor="password">Password:</label>
            <input className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 
            text-gray-900 rounded-t-md focus:outline-none focus:ring-rose-500 focus:border-rose-500 focus:z-10 sm:text-sm" type="password" 
            id="password" onChange={(e)=> setPassword(e.target.value)} value={password} required />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" onChange={togglePersist} checked={persist} 
              className="h-4 w-4 text-rose-300 focus:ring-rose-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Trust this device </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-rose-600 hover:text-rose-500"> Forgot your password? </a>
            </div>
          </div>
          <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon className="h-5 w-5 text-rose-200 group-hover:text-rose-400" aria-hidden="true" />
            </span> Sign in </button>
          <div className="text-sm text-center">
            <p> Don't have an account? <NavLink to="/sign-up">
                <a href="#" className="font-medium text-rose-600 hover:text-rose-500">Sign up </a>
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
         )
}


export default Auth