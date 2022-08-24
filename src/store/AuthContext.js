
import AuthContext from './auth-context';
import { useState } from 'react';
import { Cookies} from "react-cookie";

const AuthContextProvider = (props) => {
    const initialEmailId = localStorage.getItem('EmailId');
    const [userEmailId,setUserEmailId] = useState(initialEmailId);
    //  console.log(userEmailId);
    //  console.log(initialEmailId);
    const userIsLoggedIn = !!userEmailId;
    //  console.log(userIsLoggedIn);

const loginHandler = (emailId) => {
    setUserEmailId(emailId);
    localStorage.setItem('EmailId',emailId);
}

const logoutHandler = () => {
    setUserEmailId(null);
    localStorage.removeItem('Role');
    localStorage.removeItem('id');
    localStorage.removeItem('EmailId');
    localStorage.removeItem('Plan');
    localStorage.removeItem('Level');
    localStorage.removeItem('FirstName');
    localStorage.removeItem('LastName');
    localStorage.removeItem('EMailId');
    localStorage.removeItem('PremiumId');
    localStorage.removeItem('Text');
    // Cookies.removeItem('ID',{path:'/',domain: 'localhost'})
}

const contextValue = {
    userEmailId:userEmailId,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler
};
return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>

}
export default AuthContextProvider;