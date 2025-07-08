import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { children, createContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [token, settoken] = useState("")
    const [userId, setUserID] = useState("")

    const isLoggedIn = async () => {
        try {
            const userToken = await AsyncStorage.getItem('authToken')
            settoken(userToken)
        } catch (error) {
            console.log("error fetching token", error)
        }

    }
    useEffect(() => {
        const fetchUser = async () => {
            const token = await AsyncStorage.setItem('authToken')
            const decodetokken = jwtDecode(token)
            const userId = decodetokken.userId
            setUserID(userId)
            console.log(userId)
        }

        fetchUser()

    }, [])

    useEffect(() => {
       isLoggedIn()
    }, [])

    const logout = async () => {
        await AsyncStorage.removeItem('authToken'); // Clear token on logout
        setUserID(null);
        settoken(null) // Clear user data on logout
      };
    return (
        <AuthContext.Provider value={{ token, settoken, userId, setUserID ,logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext } 