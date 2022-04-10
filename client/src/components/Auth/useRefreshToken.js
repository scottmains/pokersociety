import axios from '../../api/axios'
import useAuth from "../../context/Auth/useAuth";


const useRefreshToken = () => {
    const { setAuth, setUserDetails} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/api/user/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            
            return { ...prev,
                roles: response.data.roles,
                 accessToken: response.data.accessToken};
        });
        setUserDetails(prev => {
            return { ...prev, studentid: response.data.studentid, name: response.data.name, email: response.data.email, wins: response.data.wins, losses: response.data.losses};
        })
       

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;