import React, { Component } from "react";
import axios from "axios";
import "../App.css";
import FlightDetails from './flightDetails';


const url = "http://localhost:1050/getFlights/";

export default class GetFlights extends Component {
    constructor(props){
        super(props);
        this.state = {
            availableFlights:null,
            form:{
                origin: "",
                destination: "",
                departureDate: "",
                noOfTickets: 0
            },
            formErrorMessage:{
                originError: "",
                destinationError: "",
                departureDateError: "",
                noOfTicketsError: ""
            },
            formValid:{
                originfield: false,
                destinationfield: false,
                departureDatefield: false,
                noOfTicketsfield: false,
                buttonActive:true,
            },
            errorMessage:"",
            
        }
    }
    submitBooking = () => {
        // Make an axios get request to get the flights in the specified route
        // populate the availableFlights or errorMessage appropriately
        const newUrl= url + this.state.form.origin +"/" + this.state.form.destination;
        console.log("in submitBooking",newUrl)
        axios.get(newUrl).then((res)=>{
            console.log(res.data);
            this.setState({availableFlights:res.data,errorMessage:""})
        }).catch((e)=>{
            console.log(e.response.data);
            this.setState({availableFlights:null,errorMessage:e.response.data.message})
        })
    };
    handleSubmit = event => {
        // Prevent the default behaviour of form submission
        // Call appropriate method to make the axios get request
        event.preventDefault();
        this.submitBooking();
    };
    handleChange = event => {
        // Get the names and values of the input fields
        // Update the formValue object in state
        // Call the validateField method by passing the name and value of the input field
        const name=event.target.name;
        const value=event.target.value;
        const {form}=this.state;
        form[name]=value;
        this.setState({form:form});
        this.validateField(name,value);
    };
    validateField = (fieldName, value) => {
        // Validate the values entered in the input fields
        // Update the formErrorMessage and formValid objects in the state
        const newFormErrorMessage=this.state.formErrorMessage;
        const newFormValid=this.state.formValid;
        const cDate=new Date();
        const dDate=new Date(value);
        console.log(cDate,"dDate",new Date(value) )
        switch(fieldName){
            case "origin":(value!=='')?((value.match(/^[A-Za-z]{1,15}$/))?
                           newFormErrorMessage.originError="":
                           newFormErrorMessage.originError="Please enter a valid origin city"):
                           newFormErrorMessage.originError="field required";
                           (value.match(/^[A-Za-z]{1,15}$/))?
                           newFormValid.originfield=true:
                           newFormValid.originfield=false;
                 break;
            case "destination":(value!=='')?((value.match(/^[A-Za-z]{1,15}$/))?
                               newFormErrorMessage.destinationError="":
                               newFormErrorMessage.destinationError="Please enter a valid destination city"):
                               newFormErrorMessage.destinationError="field required";
                               (value.match(/^[A-Za-z]{1,15}$/))?
                               newFormValid.destinationfield=true:
                               newFormValid.destinationfield=false; 
                 break;
            case "departureDate":(value!=='')?((dDate>=cDate)?
                                  newFormErrorMessage.departureDateError="":
                                  newFormErrorMessage.departureDateError="Departure date cannot be before today"):
                                  newFormErrorMessage.departureDateError="field required";
                                  (dDate>=cDate)?
                                  newFormValid.departureDatefield=true:
                                  newFormValid.departureDatefield=false;
                 break;
            case "noOfTickets":(value!=='')?((value>=1)?((value<=5)?
                               newFormErrorMessage.noOfTicketsError="":
                               newFormErrorMessage.noOfTicketsError="Number of tickets cannot be greater than 5"):
                               newFormErrorMessage.noOfTicketsError="Number of tickets cannot be less than 1"):
                               newFormErrorMessage.noOfTicketsError="field required";
                               (value>=1 &&value<=5)?
                               newFormValid.noOfTicketsfield=true:
                               newFormValid.noOfTicketsfield=false; 
                 break;
            default: break;
        }
        if(newFormValid.originfield && newFormValid.destinationfield && newFormValid.departureDatefield && newFormValid.noOfTicketsfield){
            newFormValid.buttonActive= false; 
        }
        this.setState({formErrorMessage:newFormErrorMessage,formValid:newFormValid})
    };
    render(){
        const {availableFlights,form, formErrorMessage,formValid,errorMessage}=this.state;
        console.log("in render avlflight",availableFlights)
        if(this.state.availableFlights!=null){
            // Pass appropriate props to the FlightDetails component below
            return <FlightDetails flightData={form} availableFlights={availableFlights}></FlightDetails>
        } else{
            return(
                <React.Fragment>
                    <div className="container">
                        <div className="row mt-5">
                            <div className="col-lg-4 offset-lg-1">
                                <div className="card bg-card text-light ">
                                    <div className="card-body">
                                        {/* Create the form here */}
                                        {/* {JSON.stringify(this.state)} */}
                                        <form className="form" onSubmit={(e) => { this.handleSubmit(e) }}>
                                            <div className="form-group">
                                                <label htmlFor="origin">Origin</label>
                                                <input id="origin" name="origin" type="text" value={form.origin} placeholder="Origin" className="form-control" onChange={(e) => this.handleChange(e)}></input>
                                                <span name="originError" className="text-danger">{formErrorMessage.originError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="destination">Destination</label>
                                                <input id="destination" name="destination" type="text" value={form.destination} placeholder="Destination" className="form-control" onChange={(e) => this.handleChange(e)}></input>
                                                <span name="destinationError" className="text-danger">{formErrorMessage.destinationError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="departureDate">Departure Date</label>
                                                <input id="departureDate" name="departureDate" type="date" value={form.departureDate}  className="form-control" onChange={(e) => this.handleChange(e)}></input>
                                                <span name="departureDateError" className="text-danger">{formErrorMessage.departureDateError}</span>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="noOfTickets">Number of Tickets</label>
                                                <input id="noOfTickets" name="noOfTickets" type="number" value={form.noOfTickets} placeholder="No Of Tickets" className="form-control" onChange={(e) => this.handleChange(e)}></input>
                                                <span name="noOfTicketsError" className="text-danger">{formErrorMessage.noOfTicketsError}</span>
                                            </div>
                                            <button type="submit" name="viewFlightsButton" disabled={formValid.buttonActive} className="btn btn-block btn-primary" >View Flight</button>
                                            <br />
                                            <span name="errorMessage" className="text-danger">{errorMessage}</span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

}