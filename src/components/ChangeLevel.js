import Modal from "../Layout/Modal";
import { Typography } from "@mui/material";
import { useEffect, useState,useContext } from 'react';
import styled from  './ChangeLevel.module.css' ;

const ChangeLevel = (props) => {
  const [showLevel, setLevel] = useState([]);
  let empCurrentLevel = localStorage.getItem('Level');
  let email = (localStorage.getItem('EmailId'));

  const onSendLevelId = async(requestdetails,email) => {
    // console.log(requestdetails);
    // console.log(email);
         try{
          const response = await fetch('http://localhost:8080/insertcoveragerequest',{
            method:'POST',
            body: JSON.stringify({
              requestdetails,
              email,
            }),
            headers: { "content-type": "application/json" },
          });
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
          }
          if (response.ok) {
            const data = await response.json();
            // Console.log(data);
            alert('Request for Level Change sent Successfully......');//use prompt instead of this?
            props.onClose();
          }
         }catch(error){
          console.log(error);
          alert(error);
  }
  }

  useEffect(() => {
    const onFetchData = async () => {

      try {
        const response = await fetch('http://localhost:8080/fetchlevels');
        if (!response.ok) {
          throw new Error("Something Went Wrong!!");
        }
        if (response.ok) {
          const data = await response.json();
          const AllLevels = [];
          for (const key in data) {
            AllLevels.push(({levelName : data[key].coveragelevel, levelId: data[key].coverageid}));//imp
          }
          setLevel(AllLevels);
        }

      } catch (error) {
        console.log(error);
        alert(error);
      }
    }


    onFetchData();
  }, []);


  return (<Modal onClose={props.onClose}  >
    <Typography gutterBottom variant="h4" align="center" >
      ChangeLevel
    </Typography>
      <ul className={styled.decor} >

          {  showLevel.map((item) => {
            return(
            <li key={item.levelId} onClick={()=>{
              onSendLevelId(item.levelId,email);
            }} className={empCurrentLevel === item.levelName ? styled.disablePlan : styled.listDecoration}  ><b>{item.levelName}</b></li>
            
          )}) }
         

        </ul>

  </Modal>);
}
export default ChangeLevel;