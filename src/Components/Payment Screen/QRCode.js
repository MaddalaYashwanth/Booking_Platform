import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import QRCode from "qrcode.react";



function QRCode1() {
    const { price } = useParams();
    // const Total=useParams();
    const navigate=useNavigate();
    const handleConfirm=()=>{
      navigate(`/Payment/${price}`)
      const BookingSeats=JSON.parse(localStorage.getItem("Booking"))
      // After buying only i am passing the selected seats to Another variable in the local Storage.
      localStorage.setItem("BuyedTicketsArray",JSON.stringify(BookingSeats))
    }
  
    return (
      <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "20px" }}>
        {/* <h5>Total Price: Rs.{price}</h5> */}
        <QRCode value={`Total Price: ${price}`} />
        {/* <QRCode value={`/checkout/${Total.price}`} /> */}
        <p>Scan the QR code to get the total amount</p>
        <button onClick={handleConfirm}>Buy</button>
      </div>
      </>
    );
  }

  export default QRCode1;
