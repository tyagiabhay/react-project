import Modal from "../Layout/Modal";
import { Typography } from "@mui/material";
import styled from "./ChangePlan.module.css";
import { useEffect, useState } from "react";

const ChangePlan = (props) => {
  const [showPlan, setShowPlan] = useState([]);

  let empCurrentPlan = localStorage.getItem('Plan');
  let email = (localStorage.getItem('EmailId'));

  const onSendPlanId = async(requestdetails,email) => {
         try{
          const response = await fetch('http://localhost:8080/insertplanrequest',{
            method:'POST',
            body: JSON.stringify({
              requestdetails,
              email,
            }),
            headers: { "content-type": "application/json" },
          });
          if (!response.ok) {
            const data = await response.json();
            // console.log(data);
            throw new Error(data.message);
          }
          if (response.ok) {
            const data = await response.json();
            alert('Request for Plan Change sent Successfully......');//use prompt instead of this?
            props.onClose();
            // history.replace('/'+planName+'PolicyDetails' );
          }
         }catch(error){
          console.log(error);
          alert(error);
  }
  }

  useEffect(() => {
    const onFetchData = async () => {

      try {
        const response = await fetch('http://localhost:8080/fetchplans');
        if (!response.ok) {
          throw new Error("Something Went Wrong!!");
        }
        if (response.ok) {
          const data = await response.json();
          const AllPlans = [];
          for (const key in data) {
            AllPlans.push(({ planeName: data[key].planname, planId: data[key].planid }));//imp
          }
          setShowPlan(AllPlans);
        }

      } catch (error) {
        console.log(error);
        alert(error);
      }
    }

    onFetchData();
  }, []);
  


  return (
    <Modal onClose={props.onClose}>
      <Typography gutterBottom variant="h4" align="center">
        ChangePlan
      </Typography>
      <Typography color="primary" gutterBottom variant="h6" align="center">
        Choose Your Plan to get to know its details
      </Typography>
      <ul className={styled.decor} >
        {
          showPlan.map((row) => {
            return (
              <li key={row.planId} onClick={() => {
                onSendPlanId(row.planId,email);
              }}
                className={empCurrentPlan === row.planeName ? styled.disablePlan : styled.listDecoration} ><b>{row.planeName}</b></li>
            )
          })

        }
      </ul>
    </Modal>
  );
};
export default ChangePlan;
