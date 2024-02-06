import {useNavigate} from "react-router-dom"
import React from "react"
import { FaSmile } from 'react-icons/fa';
import image1 from "../Assets/images13.jpg"
import { useState } from "react";



function Home (){
    const navigate=useNavigate()
    const[btnStyle,SetbtnStyle]=useState({width:"150px",height:"50px",borderRadius:"50%",border:"1px solid blue"})
    const handleClick=()=>{
        navigate("/Seats")
    }
    const backgroundStyle={
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        alignContent:"center",
        height:"100vh",
        flexDirection:"column",
        // backgroundImage:`URL(${image1})`,
        // backgroundSize:"cover",  // Adjust size
        backgroundRepeat: "no-repeat",
        backgroundColor:"grey" 
    }
    const handlebtn=()=>{
        SetbtnStyle({
            width:"150px",
            height:"50px",
            borderRadius:"50%",
            backgroundColor:"blue",
            border:"1px solid blue"
        })
    }
    const handlebtn1=()=>{
        SetbtnStyle({width:"150px",height:"50px",borderRadius:"50%",border:"1px solid blue"})
    }
    const h1Style={
            textAlign: "center",
            position: "absolute",
            top: "55px",
            color: "red",
            whiteSpace: "nowrap", // Prevent line breaks
            overflow: "hidden", // Hide overflow
            animation: "slide 5s linear infinite", // Slide animation
            // backgroundColor:"white"
    }
    return(
        <>
            {/* <h1 style={{textAlign:"center",backgroundColor:"cornflowerblue"}}>Ticket Booking</h1> */}
                <style>
                    {`
                    @keyframes slide {
                        from {
                        transform: translateX(100%);
                        }
                        to {
                        transform: translateX(-100%);
                        }
                    }
                    `}
                </style>
                <div style={backgroundStyle}>
                        <h1 style={h1Style}>MOVIE TICKET BOOKING PLATFORM</h1>
                    <button onClick={handleClick} onMouseEnter={handlebtn} style={btnStyle} onMouseLeave={handlebtn1}>Start Booking</button>
                    <FaSmile style={{width:"20px",height:"30px",color:"red"}}/>   
                </div>
        </>
    )
}
export default Home