import { createContext, useState } from "react";
export const AuthContext=createContext();

const users=[
    {
        role:"admin",
        email:"admin@gmail.com",
        password:"admin1234",
    },
    {
        role:"customer",
        email:"customer@gmail.com",
        password: "customer1234",
    },

];

export const AuthProvider=({ children})=>{
    const [auth, setAuth]=useState(
        JSON.parse(localStorage.getItem("auth")) || null
    );

    const login=(email,password)=>{
        const user=user.find(
            (u)=>u.email === email && u.password === password
        );
        if (!user){
            alert("Invalid Credentials");
            return false;
        }
        setAuth(user);
        localStorage.setItem("auth",JSON.stringify(user));
        return true;
    };

    const logout=()=>{
        setAuth(null);
        localStorage.removeItem("auth");
    };
    return(
        <AuthContext.Provider value={{auth,login,logout}}>
            {children}

        </AuthContext.Provider>
    );
};