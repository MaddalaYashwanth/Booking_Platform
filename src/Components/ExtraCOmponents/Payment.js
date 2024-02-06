

import { useParams } from "react-router-dom"





function Payment(){
    const Total=useParams()
    // console.log(Total)
    
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"20px"}}>
            <h5>Total Price: Rs.{Total.price}</h5>
        </div>
    )
}
export default Payment