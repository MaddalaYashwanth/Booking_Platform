
// Booking With Showing already Booked Tickets.(using localStorage)

import { useNavigate, useParams } from "react-router-dom"
import { FaEdit } from 'react-icons/fa';
import { useEffect, useState } from "react";




function Book1 (){
    const[SeatColor,SetSeatColor]=useState({})
    const[FirstSeatColor,SetFirstSeatColor]=useState({})
    const[SecondSeatColor,SetSecondSeatColor]=useState({})
    const Tickets=useParams()
    var Tickets1=Number(Tickets.qty)
    const[NoOfTic,SetTickets]=useState(0)
    const[Price,SetPrice]=useState(0)
    const navigate=useNavigate()
    // Declaring states for hover effects for seats
    const[hoveredSeat,sethoveredSeat]=useState(null)
    const[FirsthoveredSeat,setFirsthoveredSeat]=useState(null)
    const[SecondhoveredSeat,setSecondhoveredSeat]=useState(null)
    // Hover actions for Info
    const[hoverInfo1,SethoverInfo1]=useState({})
    const[hoverInfo2,SethoverInfo2]=useState({})
    const[hoverInfo3,SethoverInfo3]=useState({})
    // intializing empty array for storing selected seats(objects)
    // And after payment I have to change color of seat indicating already booked.
    const[Array,SetArray]=useState([])
    // 
    const[BookedSeats,SetBookedSeats]=useState(null)

    
    // Checking localStorage for already Booked seats:-
    // In my "BookedArray" variable we have array with nested arrays of objects(containing selected seats as seatType:"",seatNumber:"")
    useEffect(()=>{
        // var BookedSeats=JSON.parse(localStorage.getItem("BookedArray"))
        var Temp=JSON.parse(localStorage.getItem("BookedArray"))
        console.log(Temp)
        if(Temp===null){
            Temp=[]
        }
        SetBookedSeats(Temp)
        Temp.length>0?
        Temp.map((val,ind)=>{
            for(var i=0;i<val.length;i++){
                    const seatNumber1=val[i]["seatNumber"];
                    if(val[i]["seatType"]==="Balcony-A" || val[i]["seatType"]==="Balcony-B"){
                        SetSeatColor((prevstate)=>({...prevstate,[seatNumber1]:"aqua"}));
                    }
                    else if(val[i]["seatType"]==="Firstclass-C" || val[i]["seatType"]==="Firstclass-D"){
                        SetFirstSeatColor((prevstate)=>({...prevstate,[seatNumber1]:"aqua"}));
                    }
                    else{
                        SetSecondSeatColor((prevstate)=>({...prevstate,[seatNumber1]:"aqua"}));
                    }
                
            }
        }):
        console.log("No Booked seats")
    },[SetBookedSeats,SetSeatColor])

    

    //Adding hover effects:
    const[ScreenStyle,SetScreen]=useState("white") 

    const handleEdit=()=>{
        navigate("/Seats")
    }
    var seatStyle={
        border:"1px solid lightgreen",
        width:"30px",
        height:"30px",
        padding:"3px"
    }
    // Instead of declaring directly we can use setState hook.
    const AlphaStyle={
        border:"1px solid black",
        backgroundColor:"grey",
        borderRadius:"20%",
        width:"15px",
        color:"white"
    }

    // intializing empty array for storing selected seats(objects)
    // var Array=[]
    // And after payment I have to change color of seat indicating already booked.

    // Function to change bgcolor of seat
    const handleClick=(a)=>{
        // I ----Test
        if (
            SeatColor[a] === "aqua" ||
            FirstSeatColor[a] === "aqua" ||
            SecondSeatColor[a] === "aqua"
        ) {
            // Seat is already booked, do nothing
            return;
        }
        // 

        // Copying the current seatColors state
        const newSeatColors = {...SeatColor};
        // Here in below Condition of NoOfTic<Tickets1 is enough but at the time of unselecting seat at the last seat selection, the event is not happening,so:-
        if(newSeatColors[a]==="green" || NoOfTic<Tickets1){
            // Updating the seat color
            newSeatColors[a] = newSeatColors[a] === 'green' ? 'white' : 'green';
            // Access the property key "a" in the newSeatColors which has the same properties of SeatColor.
            // Updating the SeatColor state
            // newSeatColors looks like:-{1: 'green',2: 'green','3: 'green',// ... other seats}  
            SetSeatColor(newSeatColors)
            // Logic for Selecting and unselecting Tickets
            if(newSeatColors[a]==="green"){
                SetTickets((prevTickets=>prevTickets+1))
                SetPrice((prevPrice)=>prevPrice+225)
                // Array.push({seatType:"Balcony",seatNumber:a})
                // SetArray(Array)
                const newArray = [...Array, { seatType: "Balcony", seatNumber: a }];
                SetArray(newArray)
            }
            else{
                SetTickets((prevTickets=>prevTickets-1))
                SetPrice((prevPrice)=>prevPrice-225)
                Array.filter((val,ind)=>{
                    if(val.seatNumber===a){
                    //   Array.splice(ind,1)
                    //   SetArray(Array)
                    const newArray = [...Array.slice(0, ind), ...Array.slice(ind + 1)];
                    SetArray(newArray)
                    }
                  })
            }
        }
        else{
            alert(`Exceeded..! Please Select ${Tickets1} Seats only.`)
        }
    }
    //  Hover effects for seats:  
    const handlehover1=(a)=>{
        sethoveredSeat(a)
    }
    const handlehoverleave1=()=>{
        sethoveredSeat(null)
    }
    // Hover effects for Info:
    const handleInfo1=()=>{
        SethoverInfo1(
            {
                color:"red",
                backgroundColor:"orange"
            }
        )
    }
    const handleInfoleave1=()=>{
        SethoverInfo1({})
    }


    // 
    const handleClick1=(a)=>{
        var newSeatColors1 = {...FirstSeatColor};
        if(newSeatColors1[a]==="green" || NoOfTic<Tickets1){
            newSeatColors1[a] = newSeatColors1[a] === 'green' ? 'white' : 'green';
            // Access the property key "a" in the newSeatColors1 which has the same properties of FirstSeatColor.
            SetFirstSeatColor(newSeatColors1)
            // newSeatColors1 lokks like:-{1: 'green',2: 'green','3: 'green',// ... other seats}  
            // Logic for Selecting and unselecting Tickets            
            if((newSeatColors1[a]==="green")){
                SetTickets((prevTickets=>prevTickets+1))
                SetPrice((prevPrice)=>prevPrice+175)
                // Array.push({seatType:"Firstclass",seatNumber:a})
                // SetArray(Array)
                var newArray = [...Array, { seatType: "Firstclass", seatNumber: a }];
                SetArray(newArray)
            }
            else{
                SetTickets((prevTickets=>prevTickets-1))
                SetPrice((prevPrice)=>prevPrice-175)
                Array.filter((val,ind)=>{
                    if(val.seatNumber===a){
                    //   Array.splice(ind,1)
                    //   SetArray(Array)
                    var newArray = [...Array.slice(0, ind), ...Array.slice(ind + 1)];
                    SetArray(newArray)
                    }
                })
            }
        }
        else{
            alert(`Exceeded..! Please Select ${Tickets1} Seats only.`)
        } 
    }
    // Hover effects: -
    const handlehover2=(a)=>{
        setFirsthoveredSeat(a)
    }
    const handlehoverleave2=()=>{
        setFirsthoveredSeat(null)
    }
    // Hover effects for Info:
    const handleInfo2=()=>{
        SethoverInfo2(
            {
                color:"red",
                backgroundColor:"orange"
            }
        )
    }
    const handleInfoleave2=()=>{
        SethoverInfo2({})
    }

    // 
    const handleClick2=(a)=>{
        const newSeatColors2 = {...SecondSeatColor};
        if(newSeatColors2[a]==="green" || NoOfTic<Tickets1){
            // To use a number as a key in an object, square brackets ([]) rather than dot notation.
            newSeatColors2[a] = newSeatColors2[a] === 'green' ? 'white' : 'green';
            SetSecondSeatColor(newSeatColors2)
            // 
            if(newSeatColors2[a]==="green"){
                SetTickets((prevTickets=>prevTickets+1))
                SetPrice((prevPrice)=>prevPrice+100)
                // Array.push({seatType:"Secondclass",seatNumber:a})
                //  console.log(Array)
                // SetArray(Array)
                const newArray = [...Array, { seatType: "Secondclass", seatNumber: a }];
                SetArray(newArray)
            }
            else{
                SetTickets((prevTickets=>prevTickets-1))
                SetPrice((prevPrice)=>prevPrice-100)
                Array.filter((val,ind)=>{
                    if(val.seatNumber===a){
                    //   Array.splice(ind,1)
                    //    console.log(Array)
                    // SetArray(Array)
                    const newArray = [...Array.slice(0, ind), ...Array.slice(ind + 1)];
                    SetArray(newArray)
                    }
                })
            }
        }
        else{
            alert(`Exceeded..! Please Select ${Tickets1} Seats only.`)
        }  
    }
    //  Hover effects :  
    const handlehover3=(a)=>{
        setSecondhoveredSeat(a)
    }
    const handlehoverleave3=()=>{
        setSecondhoveredSeat(null)
    }

    // 
    const handlePay=()=>{
        // Storing the Array which contain selected seats of 3 types and we can access this array in the other page.
        if(NoOfTic<Tickets1){
            alert("Please Select required Number of seats..!")
        }
        else{
            localStorage.setItem("Booking",JSON.stringify(Array))
            // navigate(`/Payment/${Price}`)
            navigate(`/Qrcode/${Price}`)
        } 
    }
    // Hover effects for Info:
    const handleInfo3=()=>{
        SethoverInfo3(
            {
                color:"red",
                backgroundColor:"orange"
            }
        )
    }
    const handleInfoleave3=()=>{
        SethoverInfo3({})
    }

    // Adding hover effect for screen
    const handleScreen=()=>{
        SetScreen("blue")
    }
    const handleScreenLeave=()=>{
        SetScreen("white")
    }
    return(
        <>
            <h2 style={{textAlign:"center",color:"mediumvioletred"}}>Please Select your Seats</h2>
            <h5 style={{color:"grey",textAlignLast:"center"}}><FaEdit onClick={handleEdit} style={{color:"red"}}/> {Tickets.qty} Tickets</h5>
            <div className="Container" style={{border:"2px solid black",padding:"10px"}}>
                <p><span onMouseEnter={handleInfo1} onMouseLeave={handleInfoleave1} style={hoverInfo1}>Rs.225 BALCONY</span></p>
                <hr></hr>
                <div className="MainContainer1" style={{display:"flex",alignContent:"center",justifyContent:"center",flexWrap:"wrap"}}>
                    {/* Balcony Seats */}
                    <div style={{display:"flex",flexDirection:"row",gap:"300px"}}>
                        <div style={{display:"flex",gap:"5px",flexDirection:"column"}}>
                            <div style={AlphaStyle}>A</div>
                            <div style={AlphaStyle}>B</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SeatColor[1],border: hoveredSeat === 1 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[1] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(1)} onMouseEnter={()=>handlehover1(1)} onMouseLeave={handlehoverleave1}>1</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[2],border: hoveredSeat === 2 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[2] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(2)} onMouseEnter={()=>handlehover1(2)} onMouseLeave={handlehoverleave1}>2</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[3],border: hoveredSeat === 3 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[3] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(3)} onMouseEnter={()=>handlehover1(3)} onMouseLeave={handlehoverleave1}>3</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[4],border: hoveredSeat === 4 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[4] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(4)} onMouseEnter={()=>handlehover1(4)} onMouseLeave={handlehoverleave1}>4</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[5],border: hoveredSeat === 5 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[5] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(5)} onMouseEnter={()=>handlehover1(5)} onMouseLeave={handlehoverleave1}>5</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[6],border: hoveredSeat === 6 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[6] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(6)} onMouseEnter={()=>handlehover1(6)} onMouseLeave={handlehoverleave1}>6</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[7],border: hoveredSeat === 7 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[7] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(7)} onMouseEnter={()=>handlehover1(7)} onMouseLeave={handlehoverleave1}>7</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SeatColor[15],border: hoveredSeat === 15 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[15] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(15)} onMouseEnter={()=>handlehover1(15)} onMouseLeave={handlehoverleave1}>15</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[16],border: hoveredSeat === 16 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[16] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(16)} onMouseEnter={()=>handlehover1(16)} onMouseLeave={handlehoverleave1}>16</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[17],border: hoveredSeat === 17 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[17] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(17)} onMouseEnter={()=>handlehover1(17)} onMouseLeave={handlehoverleave1}>17</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[18],border: hoveredSeat === 18 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[18] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(18)} onMouseEnter={()=>handlehover1(18)} onMouseLeave={handlehoverleave1}>18</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[19],border: hoveredSeat === 19 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[19] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(19)} onMouseEnter={()=>handlehover1(19)} onMouseLeave={handlehoverleave1}>19</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[20],border: hoveredSeat === 20 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[20] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(20)} onMouseEnter={()=>handlehover1(20)} onMouseLeave={handlehoverleave1}>20</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[21],border: hoveredSeat === 21 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[21] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(21)} onMouseEnter={()=>handlehover1(21)} onMouseLeave={handlehoverleave1}>21</div>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SeatColor[8],border: hoveredSeat === 8 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[8] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(8)} onMouseEnter={()=>handlehover1(8)} onMouseLeave={handlehoverleave1}>8</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[9],border: hoveredSeat === 9 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[9] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(9)} onMouseEnter={()=>handlehover1(9)} onMouseLeave={handlehoverleave1}>9</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[10],border: hoveredSeat === 10 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[10] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(10)} onMouseEnter={()=>handlehover1(10)} onMouseLeave={handlehoverleave1}>10</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[11],border: hoveredSeat === 11 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[11] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(11)} onMouseEnter={()=>handlehover1(11)} onMouseLeave={handlehoverleave1}>11</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[12],border: hoveredSeat === 12 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[12] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(12)} onMouseEnter={()=>handlehover1(12)} onMouseLeave={handlehoverleave1}>12</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[13],border: hoveredSeat === 13 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[13] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(13)} onMouseEnter={()=>handlehover1(13)} onMouseLeave={handlehoverleave1}>13</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[14],border: hoveredSeat === 14 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[14] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(14)} onMouseEnter={()=>handlehover1(14)} onMouseLeave={handlehoverleave1}>14</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SeatColor[22],border: hoveredSeat === 22 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[22] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(22)} onMouseEnter={()=>handlehover1(22)} onMouseLeave={handlehoverleave1}>22</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[23],border: hoveredSeat === 23 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[23] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(23)} onMouseEnter={()=>handlehover1(23)} onMouseLeave={handlehoverleave1}>23</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[24],border: hoveredSeat === 24 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[24] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(24)} onMouseEnter={()=>handlehover1(24)} onMouseLeave={handlehoverleave1}>24</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[25],border: hoveredSeat === 25 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[25] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(25)} onMouseEnter={()=>handlehover1(25)} onMouseLeave={handlehoverleave1}>25</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[26],border: hoveredSeat === 26 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[26] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(26)} onMouseEnter={()=>handlehover1(26)} onMouseLeave={handlehoverleave1}>26</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[27],border: hoveredSeat === 27 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[27] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(27)} onMouseEnter={()=>handlehover1(27)} onMouseLeave={handlehoverleave1}>27</div>
                                <div style={{...seatStyle,backgroundColor: SeatColor[28],border: hoveredSeat === 28 ? "2px solid red" : "1px solid lightgreen",cursor: SeatColor[28] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick(28)} onMouseEnter={()=>handlehover1(28)} onMouseLeave={handlehoverleave1}>28</div>
                            </div>
                        </div>
                    </div>
                </div>
                <p><span onMouseEnter={handleInfo2} onMouseLeave={handleInfoleave2} style={hoverInfo2}>Rs.175 FIRST CLASS</span></p>
                <hr></hr>
                <div className="MainContainer2" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                    {/* First Class Seats */}
                    <div style={{display:"flex",flexDirection:"row",gap:"300px"}}>
                        <div style={{display:"flex",gap:"5px",flexDirection:"column"}}>
                            <div style={AlphaStyle}>C</div>
                            <div style={AlphaStyle}>D</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[1],border: FirsthoveredSeat === 1 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[1] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(1)} onMouseEnter={()=>handlehover2(1)} onMouseLeave={handlehoverleave2}>1</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[2],border: FirsthoveredSeat === 2 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[2] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(2)} onMouseEnter={()=>handlehover2(2)} onMouseLeave={handlehoverleave2}>2</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[3],border: FirsthoveredSeat === 3 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[3] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(3)} onMouseEnter={()=>handlehover2(3)} onMouseLeave={handlehoverleave2}>3</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[4],border: FirsthoveredSeat === 4 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[4] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(4)} onMouseEnter={()=>handlehover2(4)} onMouseLeave={handlehoverleave2}>4</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[5],border: FirsthoveredSeat === 5 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[5] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(5)} onMouseEnter={()=>handlehover2(5)} onMouseLeave={handlehoverleave2}>5</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[6],border: FirsthoveredSeat === 6 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[6] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(6)} onMouseEnter={()=>handlehover2(6)} onMouseLeave={handlehoverleave2}>6</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[7],border: FirsthoveredSeat === 7 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[7] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(7)} onMouseEnter={()=>handlehover2(7)} onMouseLeave={handlehoverleave2}>7</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[15],border: FirsthoveredSeat === 15 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[15] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(15)} onMouseEnter={()=>handlehover2(15)} onMouseLeave={handlehoverleave2}>15</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[16],border: FirsthoveredSeat === 16 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[16] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(16)} onMouseEnter={()=>handlehover2(16)} onMouseLeave={handlehoverleave2}>16</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[17],border: FirsthoveredSeat === 17 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[17] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(17)} onMouseEnter={()=>handlehover2(17)} onMouseLeave={handlehoverleave2}>17</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[18],border: FirsthoveredSeat === 18 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[18] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(18)} onMouseEnter={()=>handlehover2(18)} onMouseLeave={handlehoverleave2}>18</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[19],border: FirsthoveredSeat === 19 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[19] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(19)} onMouseEnter={()=>handlehover2(19)} onMouseLeave={handlehoverleave2}>19</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[20],border: FirsthoveredSeat === 20 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[20] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(20)} onMouseEnter={()=>handlehover2(20)} onMouseLeave={handlehoverleave2}>20</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[21],border: FirsthoveredSeat === 21 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[21] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(21)} onMouseEnter={()=>handlehover2(21)} onMouseLeave={handlehoverleave2}>21</div>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[8],border: FirsthoveredSeat === 8 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[8] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(8)} onMouseEnter={()=>handlehover2(8)} onMouseLeave={handlehoverleave2}>8</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[9],border: FirsthoveredSeat === 9 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[9] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(9)} onMouseEnter={()=>handlehover2(9)} onMouseLeave={handlehoverleave2}>9</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[10],border: FirsthoveredSeat === 10 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[10] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(10)} onMouseEnter={()=>handlehover2(10)} onMouseLeave={handlehoverleave2}>10</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[11],border: FirsthoveredSeat === 11 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[11] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(11)} onMouseEnter={()=>handlehover2(11)} onMouseLeave={handlehoverleave2}>11</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[12],border: FirsthoveredSeat === 12 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[12] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(12)} onMouseEnter={()=>handlehover2(12)} onMouseLeave={handlehoverleave2}>12</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[13],border: FirsthoveredSeat === 13 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[13] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(13)} onMouseEnter={()=>handlehover2(13)} onMouseLeave={handlehoverleave2}>13</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[14],border: FirsthoveredSeat === 14 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[14] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(14)} onMouseEnter={()=>handlehover2(14)} onMouseLeave={handlehoverleave2}>14</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[22],border: FirsthoveredSeat === 22 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[22] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(22)} onMouseEnter={()=>handlehover2(22)} onMouseLeave={handlehoverleave2}>22</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[23],border: FirsthoveredSeat === 23 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[23] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(23)} onMouseEnter={()=>handlehover2(23)} onMouseLeave={handlehoverleave2}>23</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[24],border: FirsthoveredSeat === 24 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[24] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(24)} onMouseEnter={()=>handlehover2(24)} onMouseLeave={handlehoverleave2}>24</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[25],border: FirsthoveredSeat === 25 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[25] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(25)} onMouseEnter={()=>handlehover2(25)} onMouseLeave={handlehoverleave2}>25</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[26],border: FirsthoveredSeat === 26 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[26] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(26)} onMouseEnter={()=>handlehover2(26)} onMouseLeave={handlehoverleave2}>26</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[27],border: FirsthoveredSeat === 27 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[27] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(27)} onMouseEnter={()=>handlehover2(27)} onMouseLeave={handlehoverleave2}>27</div>
                                <div style={{...seatStyle,backgroundColor: FirstSeatColor[28],border: FirsthoveredSeat === 28 ? "2px solid red" : "1px solid lightgreen",cursor: FirstSeatColor[28] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick1(28)} onMouseEnter={()=>handlehover2(28)} onMouseLeave={handlehoverleave2}>28</div>
                            </div>
                        </div>
                    </div>
                </div>
                <p><span onMouseEnter={handleInfo3} onMouseLeave={handleInfoleave3} style={hoverInfo3}>Rs.100 SECOND CLASS</span></p>
                <hr></hr>
                <div className="MainContainer3" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                    {/* Second Class Seats*/}
                    <div style={{display:"flex",flexDirection:"row",gap:"300px"}}>
                        <div style={{display:"flex",gap:"5px",flexDirection:"column"}}>
                            <div style={AlphaStyle}>E</div>
                            <div style={AlphaStyle}>F</div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[1],border: SecondhoveredSeat === 1 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[1] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(1)} onMouseEnter={()=>handlehover3(1)} onMouseLeave={handlehoverleave3}>1</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[2],border: SecondhoveredSeat === 2 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[2] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(2)} onMouseEnter={()=>handlehover3(2)} onMouseLeave={handlehoverleave3}>2</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[3],border: SecondhoveredSeat === 3 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[3] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(3)} onMouseEnter={()=>handlehover3(3)} onMouseLeave={handlehoverleave3}>3</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[4],border: SecondhoveredSeat === 4 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[4] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(4)} onMouseEnter={()=>handlehover3(4)} onMouseLeave={handlehoverleave3}>4</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[5],border: SecondhoveredSeat === 5 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[5] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(5)} onMouseEnter={()=>handlehover3(5)} onMouseLeave={handlehoverleave3}>5</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[6],border: SecondhoveredSeat === 6 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[6] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(6)} onMouseEnter={()=>handlehover3(6)} onMouseLeave={handlehoverleave3}>6</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[7],border: SecondhoveredSeat === 7 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[7] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(7)} onMouseEnter={()=>handlehover3(7)} onMouseLeave={handlehoverleave3}>7</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[15],border: SecondhoveredSeat === 15 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[15] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(15)} onMouseEnter={()=>handlehover3(15)} onMouseLeave={handlehoverleave3}>15</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[16],border: SecondhoveredSeat === 16 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[16] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(16)} onMouseEnter={()=>handlehover3(16)} onMouseLeave={handlehoverleave3}>16</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[17],border: SecondhoveredSeat === 17 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[17] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(17)} onMouseEnter={()=>handlehover3(17)} onMouseLeave={handlehoverleave3}>17</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[18],border: SecondhoveredSeat === 18 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[18] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(18)} onMouseEnter={()=>handlehover3(18)} onMouseLeave={handlehoverleave3}>18</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[19],border: SecondhoveredSeat === 19 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[19] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(19)} onMouseEnter={()=>handlehover3(19)} onMouseLeave={handlehoverleave3}>19</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[20],border: SecondhoveredSeat === 20 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[20] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(20)} onMouseEnter={()=>handlehover3(20)} onMouseLeave={handlehoverleave3}>20</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[21],border: SecondhoveredSeat === 21 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[21] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(21)} onMouseEnter={()=>handlehover3(21)} onMouseLeave={handlehoverleave3}>21</div>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[8],border: SecondhoveredSeat === 8 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[8] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(8)} onMouseEnter={()=>handlehover3(8)} onMouseLeave={handlehoverleave3}>8</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[9],border: SecondhoveredSeat === 9 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[9] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(9)} onMouseEnter={()=>handlehover3(9)} onMouseLeave={handlehoverleave3}>9</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[10],border: SecondhoveredSeat === 10 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[10] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(10)} onMouseEnter={()=>handlehover3(10)} onMouseLeave={handlehoverleave3}>10</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[11],border: SecondhoveredSeat === 11 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[11] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(11)} onMouseEnter={()=>handlehover3(11)} onMouseLeave={handlehoverleave3}>11</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[12],border: SecondhoveredSeat === 12 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[12] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(12)} onMouseEnter={()=>handlehover3(12)} onMouseLeave={handlehoverleave3}>12</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[13],border: SecondhoveredSeat === 13 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[13] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(13)} onMouseEnter={()=>handlehover3(13)} onMouseLeave={handlehoverleave3}>13</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[14],border: SecondhoveredSeat === 14 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[14] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(14)} onMouseEnter={()=>handlehover3(14)} onMouseLeave={handlehoverleave3}>14</div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",gap:"5px"}}>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[22],border: SecondhoveredSeat === 22 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[22] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(22)} onMouseEnter={()=>handlehover3(22)} onMouseLeave={handlehoverleave3}>22</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[23],border: SecondhoveredSeat === 23 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[23] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(23)} onMouseEnter={()=>handlehover3(23)} onMouseLeave={handlehoverleave3}>23</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[24],border: SecondhoveredSeat === 24 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[24] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(24)} onMouseEnter={()=>handlehover3(24)} onMouseLeave={handlehoverleave3}>24</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[25],border: SecondhoveredSeat === 25 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[25] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(25)} onMouseEnter={()=>handlehover3(25)} onMouseLeave={handlehoverleave3}>25</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[26],border: SecondhoveredSeat === 26 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[26] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(26)} onMouseEnter={()=>handlehover3(26)} onMouseLeave={handlehoverleave3}>26</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[27],border: SecondhoveredSeat === 27 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[27] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(27)} onMouseEnter={()=>handlehover3(27)} onMouseLeave={handlehoverleave3}>27</div>
                                <div style={{...seatStyle,backgroundColor: SecondSeatColor[28],border: SecondhoveredSeat === 28 ? "2px solid red" : "1px solid lightgreen",cursor: SecondSeatColor[28] === "aqua" ? "not-allowed" : "pointer"}} onClick={()=>handleClick2(28)} onMouseEnter={()=>handlehover3(28)} onMouseLeave={handlehoverleave3}>28</div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                {/* For representing Screen */}
                <div style={{display:"flex",flexDirection:"row",gap:"300px"}}>
                        <div></div>
                        <div style={{border:"1px solid black",height:"50px",width:"900px",marginLeft:"60px",display:"flex",alignItems:"center",justifyContent:"center",backgroundColor:ScreenStyle}} onMouseEnter={handleScreen} onMouseLeave={handleScreenLeave}>Screen</div>
                </div>
            </div>
            {/* -----Total Price -----*/}
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"10px",flexDirection:"column"}}>
                <h5>Total Price: Rs.{Price}</h5>
                <button onClick={handlePay}>Proceed to Pay</button>
            </div>
        </>
    )
}
export default Book1