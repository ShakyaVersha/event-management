import { Navigate } from "react-router-dom";

const protectedRoute = ({children ,role})=>{
    console.log(" rolis",role)
    const isToken = localStorage.getItem("token");
    const userRole = localStorage.getItem("role"); 
    console.log("userRole is",userRole)
    if (role && role !== userRole) {
        return (
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h2>⚠️ Access Denied</h2>
              <p>You do not have permission to view this page.</p>
            </div>
          );
       
        
      }
    
    
    
    return isToken? children:<Navigate to ="/"/>

}
export default protectedRoute;
