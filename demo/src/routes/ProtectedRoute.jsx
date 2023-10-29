import { Navigate, Outlet } from "react-router-dom";
import axios from 'axios';
const ProtectedRoute = () => {
    let validToken = localStorage.getItem('token');
    let valid = false;
    const validJson = {
      token: validToken
    };
    this.state = {
      isValid: false,
    };
    console.log("HERE22222")
    axios.defaults.headers.common["Authorization"] = "Bearer " + validToken;
    axios
    .post('http://localhost:3005/api/v1/users/validateToken', validJson)
    .then(res=> {
      console.log(res)
      
        if(res.status == 200){
          console.log("VALI TOKD ")
          this.setState({ isValid: true})

        }
        else{
          this.setState({ isValid: true})
        }
    })
    .catch(err => {
      console.error(err);
    });
    console.log(valid)
      if (!this.state.isValid) {
        console.log("ERROR TOKD ")

        return <Navigate to = {{ pathname: "/login" }} />
      }
      return (

            <Outlet />

      );
    };
  
export default ProtectedRoute;
  