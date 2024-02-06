
// Actually Confirmation page after buyed Tickets.

import { useParams } from "react-router-dom"
import { useState,useEffect } from "react"





function Payment1(){
    const Total=useParams()
    // console.log(Total)
    var temp=JSON.parse(localStorage.getItem("BookedArray"))
    if(temp===null){
        temp=[]
    }
    const[ResArray,SetResArray]=useState(temp)
    var SeatsDetails=JSON.parse(localStorage.getItem("BuyedTicketsArray"))      
    console.log(SeatsDetails)
    if(SeatsDetails==null){
        SeatsDetails=[]
    }
    // const handleBuy=()=>{
    //     // ResArray.push(SeatsDetails)
    //     // SetResArray(ResArray)
    //     // console.log(ResArray)
    //     const newArray = [...ResArray, SeatsDetails];
    //     SetResArray(newArray,()=>{localStorage.setItem("Final",JSON.stringify(newArray))})
    //     // localStorage.setItem("Final",JSON.stringify(ResArray))
    // }
    // useEffect(()=>{
    //     const newResArray=[...ResArray,SeatsDetails]
    //     SetResArray(newResArray)
    //     // Now storing this array in our localStorage
    //     localStorage.setItem("BookedArray",JSON.stringify(newResArray))
    // },[])
    // useEffect(()=>{
    //     SetResArray(prevResArray=>[...prevResArray,SeatsDetails])
    // },[SeatsDetails])
    // useEffect(()=>{
    //     localStorage.setItem("BookedArray",JSON.stringify(ResArray))
    // },[ResArray])
    useEffect(() => {
        // Update state and local storage together
        SetResArray((prevResArray) => {
          const newResArray = [...prevResArray, SeatsDetails];
          console.log(newResArray)
          localStorage.setItem("BookedArray", JSON.stringify(newResArray));
          return newResArray;
        });
      }, []);
    return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginTop:"20px"}}>
            <h5>Total Price: Rs.{Total.price}</h5>
            <h6>Buyed Tickets</h6>
            {/* Since i mentioned as price in the url of Navigation page */}
                {
                    SeatsDetails.length>0?
                    SeatsDetails.map((val)=>{
                        if (val.seatType === "Balcony") {
                            val.seatType = val.seatNumber < 15 ? "Balcony-A" : "Balcony-B";
                          }
                        else if(val.seatType === "Firstclass"){
                            val.seatType = val.seatNumber < 15 ? "Firstclass-C" : "Firstclass-D";
                        }
                        else{
                            val.seatType = val.seatNumber < 15 ? "Secondclass-E" : "Secondclass-F";
                        }
                        return(
                                //  <p>{val.seatType}:{val.seatNumber}</p>
                                <span>{`${val.seatType}: ${val.seatNumber}`}</span>
                        )
                    }):
                    <p>No Seats</p>
                }
        </div>
    )
}
export default Payment1