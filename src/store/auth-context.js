import React from 'react';
const AuthContext = React.createContext({
    emailId: '',
    isLoggedIn:false,
     login: (emailId)=> {},
     logout:()=>{}
});
export default AuthContext;