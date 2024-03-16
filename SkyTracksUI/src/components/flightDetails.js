import React, { Component } from "react";
import CreateBooking from './CreateBooking';
import "../App.css";
import GetFlights from './GetFlights';

export default class FlightDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            flightData:this.props.flightData,
            availableFlights: this.props.availableFlights,
            bookingDetails:null,
            errorMessage:"",
            
        }
    }
    setBookingDetails = (flightId, flightTime, fare) =>{
        console.log("in setbookingDetails",flightId,flightTime,fare)
        this.setState({
            bookingDetails: {
                origin: this.state.flightData.origin,
                destination: this.state.flightData.destination,
                departureDate: this.state.flightData.departureDate,
                noOfTickets: this.state.flightData.noOfTickets,
                flightId: flightId,
                timing: flightTime,
                charges: Number(fare) * Number(this.state.flightData.noOfTickets)
            }
        })
    }
    // minData=(avlFlight,newkey)=>{
    //     const {bookingDetails,flightData}=this.state;
    //     console.log("inside minData",avlFlight,"booking details", bookingDetails,"noOfTICKETS",flightData.noOfTickets);
    //     const arr=[];
    //     const flightTimings= avlFlight.flightTimings;
    //     const flightIds=avlFlight.flightIds;
    //     const prices=avlFlight.prices;
    //     // const fare=0;
    //     for(let i=0;i<flightIds.length;i++){
    //         const fare=prices[i]*flightData.noOfTickets;
    //         arr.push(
    //             <div className="row" key={newkey++}>
    //                 <div className="card custom-card bg-card text-light" >
    //                     <div className="card-body">
    //                         <div className="row text-center">
    //                             <div className="col-md-3">
    //                                 <h4>{flightTimings[i]}</h4>
    //                                 <div className="text-custom">Non Stop</div>
    //                             </div>
    //                             <div className="col-md-3">
    //                                 <h4>{flightIds[i]}</h4>
    //                                 <div className="text-custom">Flight Id</div>
    //                             </div>
    //                             <div className="col-md-3">
    //                                 <h4>{prices[i]}</h4>
    //                                 <div className="text-custom">Fare per seat</div>
    //                             </div>
    //                             <div className="col-md-3">
    //                                 <h4>Total Fare: {fare} </h4>
    //                                 <button className="btn btn-primary text-custom" onClick={()=>this.setBookingDetails(flightIds[i],flightTimings[i],prices[i])} >Add Personal Details</button>
    //                             </div>
    //                         </div>

    //                     </div>
    //                 </div>
    //             </div> )}
    //     return arr;

    // }
    render(){
        const {availableFlights}=this.state;
        console.log("in render",availableFlights);
        if(this.state.availableFlights==null){
            // Display the GetFlights page by rendering the GetFlights component
            return <GetFlights/>
        }
        else if(this.state.bookingDetails!=null){
            // Display the CreateBooking page by rendering the CreateBooking component and pass the bookingDetails as props
            return <CreateBooking bookingDetails={this.state.bookingDetails}/>
        } else{
            return(
                <React.Fragment>
                    {/* {JSON.stringify(this.state)} */}
                <div className="container mt-5">
                    <div className="row">
                        <div className="card custom-card bg-card text-light">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.departureDate}</h4>
                                        <div className="text-custom">Departure Date</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.origin} - {this.state.flightData.destination}</h4>
                                        <div className="text-custom">Origin - Destination</div>
                                    </div>
                                    <div className="col-md-4">
                                        <h4>{this.state.flightData.noOfTickets} Adult(s)</h4>
                                        <div className="text-custom">Passengers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <div className="float-right">
                            {/* Add proper event handlers to the back button */}
                            <button className="btn btn-warning" onClick={()=>this.setState({availableFlights:null})}>Go Back</button>
                        </div >
                        <h2>Available Flights:</h2>
                        {/* iterate over the available flights and display them in cards here */}
                        {/* {availableFlights && availableFlights.map((data,key)=>( this.minData(data,key)))} */}
                            {availableFlights && availableFlights.map((data, key) => (
                                <div key={key}>
                                    { data.flightIds.map((flight, newKey) => (
                                        <div key={newKey}>
                                            <div className="row" >
                                                <div className="card custom-card bg-card text-light" >
                                                    <div className="card-body">
                                                        <div className="row text-center">
                                                            <div className="col-md-3">
                                                                <h4>{data.flightTimings[newKey]}</h4>
                                                                <div className="text-custom">Non Stop</div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h4>{flight}</h4>
                                                                <div className="text-custom">Flight Id</div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h4>{data.prices[newKey]}</h4>
                                                                <div className="text-custom">Fare per seat</div>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h4>Total Fare: {data.prices[newKey] * this.state.flightData.noOfTickets} </h4>
                                                                <button className="btn btn-primary text-custom" onClick={() => this.setBookingDetails(flight, data.flightTimings[newKey], data.prices[newKey])} >Add Personal Details</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                        </div>

                                    ))}

                                </div>



                            ))}
                        </div>
                    </div>
            </React.Fragment>
            )
        }
    }

}