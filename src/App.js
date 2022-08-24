import "./App.css";
import { useState, useContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import { Switch, Route, Redirect,useHistory } from "react-router-dom";
import CopyRight from "./components/CopyRight";
import HomePage from "./components/HomePage";
import ChangePlan from "./components/ChangePlan";
import ChangeLevel from "./components/ChangeLevel";
import CancelPolicy from "./components/CancelPolicy";
import Notification from './components/Notification';
import AddEmployee from './components/AddEmployee';
import AuthContext from "./store/auth-context";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const [ChangePlanShown, setChangePlanShown] = useState(false);
  const [ChangeLevelShown, setChangeLevelShown] = useState(false);
  const [CancelPolicyShown, setCancelPolicyHandlerShown] = useState(false);
  const [numberOfNotification, setNumberOfNotification] = useState(null);
  const [AllData, setAllData] = useState([]);
 
  const AuthCtx = useContext(AuthContext);
  let LoggedIn = AuthCtx.isLoggedIn;

const history = useHistory();
  const role = localStorage.getItem('Role');
  // console.log(role);
  let RoleAdmin;
  if (role === 'ADMIN') {
    RoleAdmin = true;
  }
  else {
    RoleAdmin = false;
  }


  const hideShownHandler = () => {
    setChangePlanShown(false);
    setChangeLevelShown(false);
    setCancelPolicyHandlerShown(false);
  };

  const changePlanShowModal = (yes) => {
    setChangePlanShown(yes);
  };

  const ShowLevelHandler = (yes) => {
    setChangeLevelShown(yes);
  };

  const ShowCancelPolicyHandler = (yes) => {
    setCancelPolicyHandlerShown(yes);
  };


  const onFetchDataRequests = async () => {
    try {
      const response = await fetch('http://localhost:8080/pendingrequest');
      if (!response.ok) {
        throw new Error('Not Fetching Data Notification');
      }
      if (response.ok) {
        const data = await response.json();
        const alldata = []
        for (let key in data) {
          alldata.push({ id: data[key].requestid, employeename: (data[key].employeeinformation.firstname + ' ' + data[key].employeeinformation.lastname), requestdescription: data[key].requestdescription, requestdetails: data[key].requestdetailsdescription })
        }
        // console.log(alldata);        
        setAllData(alldata);
        setNumberOfNotification(alldata.length);



      }
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    onFetchDataRequests();
  }, [])





  return (
    <div className="App">
      <Switch>
        {!LoggedIn && <Route path="/" exact>
          <SignIn fetchingNotification={onFetchDataRequests} />
        </Route>}
        {!LoggedIn && <Route path="/ForgotPassword" exact>
          <ForgotPassword/>
        </Route>}
        {/* <Route path="/SignUp" exact>
          <SignUp />
        </Route> */}
        {}
        {LoggedIn && <Route path="/HomePage">
          <HomePage
            ShowChangePlan={changePlanShowModal}
            ShowLevel={ShowLevelHandler}
            ShowCancelPolicy={ShowCancelPolicyHandler}
            val="600"
            NotificationNumber={numberOfNotification}
          />
        </Route>}
        {RoleAdmin && LoggedIn && <Route path="/Notification" exact>
          <Notification NotificationData={AllData} fetchingNotification={onFetchDataRequests} />
        </Route>}
        {RoleAdmin && LoggedIn && <Route path='/AddEmployee' exact>
          <AddEmployee />
        </Route>}
        {/* <Route path ='/ChangePlan' >
         {changePlanShown && <ChangePlan onClose = {hideShownHandler} />}
       </Route> */}
        {!LoggedIn && <Route path="*">
          <Redirect to='/' />
        </Route>}
        {LoggedIn && <Route path="*">
          <Redirect to='/HomePage' />
        </Route>}
      </Switch>
      {ChangePlanShown && LoggedIn && <ChangePlan onClose={hideShownHandler}></ChangePlan>}
      {ChangeLevelShown && LoggedIn && (
        <ChangeLevel onClose={hideShownHandler}></ChangeLevel>
      )}
      {CancelPolicyShown && LoggedIn && (
        <CancelPolicy onClose={hideShownHandler}></CancelPolicy>
      )}
      <CopyRight sx={{ mt: 8, mb: 4 }} />
    </div>
  );
}

export default App;
