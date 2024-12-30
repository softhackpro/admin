import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const storeTokenInLs = (servertoken) => {
          return localStorage.setItem("token", servertoken);
    };
  let isLoggedIn = !!token;
    // Logout Ka Function 
     const LogoutUser = ()=>{
        setToken("");
        return localStorage.removeItem("token");
     };

     const userAuthentication = async ()=>{
      try {
        const response = await fetch("http://localhost:5000/api/auth/user",{
          method: "GET",
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
        if(response.ok){
          const data = await response.json();
          // console.log("user data", data.userData);
          setUser(data.userData);
        }
      } catch (error) {
        console.log("fetching user data");
      }
     };
     useEffect(()=>{
      userAuthentication();
     },[]);

    return( <AuthContext.Provider value={{isLoggedIn, storeTokenInLs, LogoutUser, user}}>
        
         {children}
        
    </AuthContext.Provider>
    )
}
export const useAuth = ()=>{
    return useContext(AuthContext)
}