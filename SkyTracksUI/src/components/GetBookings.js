import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import BookingDetailsCard from './BookingDetailsCard';


const url = "http://localhost:1050/viewBookingDetails/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: null,
      bookingId: "",
      errorMessage: "",
    };
  }

  fetchBooking = () => {
    // Make an axios get request to get the booking details for the specified bookingId
    // populate the bookingData or errorMessage appropriately
    console.log("in fetching");
    const newUrl=url + this.state.bookingId;
    console.log(newUrl,"bid",this.state.bookingId)
    axios.get(newUrl).then((res)=>{
      console.log("res ",res)
      this.setState({bookingData:res.data, errorMessage:""})
    }).catch((e)=>{
      this.setState({bookingData:null, errorMessage:e.response.data.message})
    })

  }
  handleSubmit=(event)=>{
    event.preventDefault();
    this.fetchBooking();
  }
  handleChange = event => {
    // const name = event.target.name;
    const value = event.target.value;
    this.setState({ bookingId:value });
  };

  render() {
    console.log("in getBookings", this.state.bookingData)
    return (
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">
                  {/* {JSON.stringify(this.state)} */}
                  <h4>View Booking Details</h4>
                  <form onSubmit={this.fetchBooking}>

                    {/* Create the form here */}
                    <div className="form-group">
                      <input type="number" value={this.state.bookingId} required placeholder="Booking ID" name="bookingId" id="bookingId" className="form-control" onChange={(e)=>this.handleChange(e)}></input>
                    </div>
                    <button className="btn btn-primary btn-block" type="submit" name="viewDetails" onClick={(e)=>this.handleSubmit(e)}>View Details</button>
                  </form>
                  <span name="errorMessage" className="text-danger">{this.state.errorMessage}</span>
                  {
                    this.state.bookingData!=null?(

                      this.state.bookingData.map((data, key) => (
                        <div className="mt-3" key={key}>
  
                          {/* Display the booking details here by rendering the BookingDetailsCard component and passing bookingData as props*/}
                          <BookingDetailsCard bookingDetails={data} />
  
                        </div>  ))
                    ):null 
                     }
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default GetBooking;
