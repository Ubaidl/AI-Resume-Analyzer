import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

 export const register = async ({name, email, password}) => {
    try {
        const response = await axios.post(`${API_URL}/register`, {
            name,
            email,
            password
        },{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }

};
 
export const login = async ({email,password}) =>{

    try{
        const response = await axios .post(`${API_URL}/login`,{
            email,
            password
        },{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const logout = async () =>{
    try{
        const response = await axios.get(`${API_URL}/logout`,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;

    }
};

export const getCurrentUser = async () =>{
    try{
        const response = await axios.get(`${API_URL}/current-user`,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        throw error.response.data;

    }

};
