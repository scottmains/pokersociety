import axios from "../../api/axios";
import useAuth from "../../context/Auth/useAuth";

const useLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {

    setAuth({});
        try {
            const response = await axios('api/user/logout', {
                withCredentials: true
            });
        } catch(err) {
            console.log(err);
        }
    }
    return logout;
}

export default useLogout;