import {useContext} from 'react'
import { AuthContext } from '../auth.context'
import { login,
  register,
  logout,
  getCurrentUser} from '../services/auth.services.js'






export const useAuth = () => {
    const  context = useContext(AuthContext)  // Access the authentication context
    const {user,setUser,load,setloading} = context  // Destructure the context values

    const handleLogin = async (email,password) => {
        setloading(true)  // Set loading state to true
        try{
            const data = await login({email,password})  // Call the login service
            console.log("Login Response:", data);
            setUser(data.existingUser)  // Set the authenticated user
        setloading(false)  // Set loading state to false
        } catch (error) {
            setloading(false)  // Set loading state to false in case of error
            throw error  // Rethrow the error for further handling
        }
    }


    const handleRegister = async (name,email,password) => {
        setloading(true)  // Set loading state to true
        try{
            const data = await register({name,email,password})  // Call the register service
            setUser(data.user)  // Set the authenticated user
        setloading(false)  // Set loading state to false
        } catch (error) {
            setloading(false)  // Set loading state to false in case of error
            throw error  // Rethrow the error for further handling
        }
    }

    const handleLogout = async () => {
        setloading(true)  // Set loading state to true
        try{
            await logout()  // Call the logout service

            setUser(null)  // Clear the authenticated user

        setloading(false)  // Set loading state to false
        } catch (error) {
            setloading(false)  // Set loading state to false in case of error
            throw error  // Rethrow the error for further handling
        }
    }
    return {
  user,
  load,
  handleLogin,
  handleRegister,
  handleLogout,
};
    
    

}