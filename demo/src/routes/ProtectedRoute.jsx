import { Navigate, Outlet } from "react-router-dom";
import React, { Component, useEffect, useRef, useState } from 'react';
import axios from 'axios';
const ProtectedRoute = () => {
  const isValid = useRef(false);
  
  
  useEffect(()=>{
    let validToken = localStorage.getItem('token');
      
    const validJson = {
      token: validToken
    };
    axios.defaults.headers.common["Authorization"] = "Bearer " + validToken;
    axios
    .post('http://localhost:3005/api/v1/users/validateToken', validJson)
    .then(res=> {
      console.log(res)
      
        if(res.status == 200){
              isValid.current = true;
              console.log(isValid.current);
        }
        else{
            isValid.current = false;
        }
    })
    .catch(err => {
      console.error(err);
    })
  }, [])
  
  if (isValid.current) {
    return <Navigate to = {{ pathname: "/events" }} />;
    console.log("THIS SHOULDNT BE HERE222222222")

  }
  return (

    <Outlet />

);
}

export default ProtectedRoute;
  