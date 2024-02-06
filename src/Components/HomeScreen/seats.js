import { useNavigate } from "react-router-dom"
import { FaFilm } from 'react-icons/fa';
import { useRef } from "react";
import { useState } from "react";
import image from "../Assets/images4.jpg";



function Seat(){
    const data=useRef(null)
    // data={current:null}
    const navigate=useNavigate()
    const[btnStyle1,SetbtnStyle1]=useState({width:"50px",height:"50px"})
    var arr=[1,2,3,4,5,6,7]
    var colors=["violet","indigo","blue","green","yellow","orange","red"]
    const handleBook=(val)=>{
        navigate(`/Booking/${val}/`)
    }
    const handleSubmit=()=>{
        navigate(`/Booking/${data.current.value}`)
    }
    const backgndStyle={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        height:"100vh",
        flexDirection:"column",
        backgroundImage:`URL(${image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover"
    }
    return(
        <>
            <div  style={backgndStyle}>
                <h6 style={{color:"blueviolet"}}>Please Select Number of Seats <FaFilm style={{color:"red"}}/></h6>
                <div>
                    {
                        arr.map((val,ind)=>{
                            return(
                                    // <button onClick={()=>handleBook(val)} style={{width:"50px",height:"50px"}}>{val}</button>
                                    <button onClick={()=>handleBook(val)} style={btnStyle1}>{val}</button>
                            )
                        })
                    }
                </div>
                <i>Or Enter Manually</i>
                <div style={{marginTop:"10px"}}>
                    {/* <label>No. of Seats: </label> */}
                    <input type="number" ref={data}></input> 
                    <button onClick={handleSubmit} style={{marginLeft:"5px"}}>Submit</button>
                </div>
            </div>
        </>
    )
}
export default Seat