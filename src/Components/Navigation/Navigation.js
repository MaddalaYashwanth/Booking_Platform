import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../HomeScreen/home"
import Seat from "../HomeScreen/seats"
// import Book from "../BookingScreen/Booking"
import Book1 from "../BookingScreen/BookingWSBT"
import Payment1 from "../Payment Screen/BookedDetails"
// import Payment from "../Payment Screen/Payment"
import QRCode1 from "../Payment Screen/QRCode"







function Navigation (){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/Seats" Component={Seat}></Route>
                    {/* <Route path="/Booking/:qty" Component={Book}></Route> */}
                    <Route path="/Booking/:qty" Component={Book1}></Route>
                    {/* <Route path="/Payment/:price" Component={Payment}></Route> */}
                    <Route path="/Qrcode/:price" Component={QRCode1}></Route>
                    <Route path="/Payment/:price" Component={Payment1}></Route>
                    
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default Navigation