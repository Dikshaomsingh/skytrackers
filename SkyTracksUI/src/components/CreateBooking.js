import React, { Component } from "react";
import axios from "axios";
import GetFlights from './GetFlights';
import BookingDetailsCard from './BookingDetailsCard';

const url = "http://localhost:1050/bookFlight/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails:this.props.bookingDetails,
      passengerData:[],
      form: {
        firstName: "",
        lastName:"",
        title: "",
        age:""
      },
      formErrorMessage: {
        firstNameError: "",
        lastNameError:"",
        ageError:""
      },
      formValid: {
        firstName: false,
        lastName:false,
        age:false,
        buttonActive:false
      },
      errorMessage: "",
      successMessage: "",
      goBack: false
    };
  }

  book = () => {
    let bookingData = this.state.bookingDetails;
    bookingData.passengerDetails = this.state.passengerData;

    // Make axios post request to post the bookingData to the given URL
    // populate the successMessage object or the errorMessage
    console.log("in book");
    axios.post(url,bookingData)
    .then((res)=>{
      this.setState({
        successMessage:res.data,
        errorMessage:""
      })

    }).catch((e)=>{
      this.setState({
        successMessage:"",
        errorMessage:e.response.data.message
      })
    })
  };

  handleChange = event => {
    // Get the names and values of the input fields
    // Update the formValue object in state
    // Call the validateField method by passing the name and value of the input field
    const name=event.target.name;
    const value=event.target.value;
    const {form} =this.state;
    form[name]=value;
    this.setState({form:form});
    this.validateField(name,value)

  };

  validateField = (fieldName, value) => {
    // Validate the values entered in the input fields
    // Update the formErrorMessage and formValid objects in the state
    const newFormErrorMessage=this.state.formErrorMessage;
    const newFormValid=this.state.formValid;
    switch(fieldName){
      case "firstName":(value!=='')?((value.match(/^[A-Za-z]{1,15}$/))?
                     newFormErrorMessage.firstNameError="":
                     newFormErrorMessage.firstNameError="Please enter a valid first name"):
                     newFormErrorMessage.firstNameError="field required";
                     (value.match(/^[A-Za-z]{1,15}$/))?
                     newFormValid.firstName=true:
                     newFormValid.firstName=false;
           break;
      case "lastName":(value!=='')?((value.match(/^[A-Za-z]{1,15}$/))?
                     newFormErrorMessage.lastNameError="":
                     newFormErrorMessage.lastNameError="Please enter a valid last name"):
                     newFormErrorMessage.lastNameError="field required";
                     (value.match(/^[A-Za-z]{1,15}$/))?
                     newFormValid.lastName=true:
                     newFormValid.lastName=false;
            break;
      case "age":(value!=='')?((value>=1 && value<=70)?
                     newFormErrorMessage.ageError="":
                     newFormErrorMessage.ageError="Sorry,age should be more than 1 year and less than 70 years"):
                     newFormErrorMessage.ageError="field required";
                     (value>=1 && value<=70)?
                     newFormValid.age=true:
                     newFormValid.age=false;
            break;
      default: break;
    }
    newFormValid.buttonActive=newFormValid.firstName && newFormValid.lastName && newFormValid.age;
    this.setState({formErrorMessage:newFormErrorMessage,formValid:newFormValid})
  };
  setPassengerData = ()=>{
    // Update the passengerData array in state
    // reset the form and the formValid object in state
    //console.log("before set passData",this.state.form,"and",this.state.passengerData.length, "and valid is",this.state.formValid)
   
    const newPassengerData=this.state.passengerData;
    newPassengerData.push(this.state.form);
    const newForm = { firstName:"", lastName:"",title:"",age:""};
    const newFormValid={ firstName:false,lastName:false,age:false,buttonActive:false};
    
    this.setState({passengerData:newPassengerData,form:newForm,formValid:newFormValid});
  
  }
  getPassengerData = ()=>{
    if(this.state.passengerData.length<Number(this.state.bookingDetails.noOfTickets)){
      return(
        <React.Fragment>
          <div className="card bg-card text-light mb-4">
          <div className="card-body">
            <h6>Passenger {this.state.passengerData.length+1}</h6>
              <div className="row">

                {/* Add name, value, placeholder attributes to the below select dropdown, inputs and button */}
                {/* Also add appropriate event handlers */}

                <div className="col-md-8">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select name="title" id="title" value={this.state.form.title} className="btn btn-light" onChange={(e)=>this.handleChange(e)}>
                        <option value="" disabled>Title</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                      </select>
                    </div>
                    <input type="text" name="firstName" id="firstName" value={this.state.form.firstName} placeholder="First Name" className="form-control"  onChange={(e)=>this.handleChange(e)}/>
                    <input type="text" name="lastName" id="lastName" value={this.state.form.lastName} placeholder="Last Name" className="form-control"  onChange={(e)=>this.handleChange(e)}/>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <input type="number" name="age" id="age" value={this.state.form.age} placeholder="Age" className="form-control"  onChange={(e)=>this.handleChange(e)}/>
                  </div>
                </div>
                <div className="col-md-2 text-center">
                  <button type="button" name="addPassenger" disabled={!this.state.formValid.buttonActive} className="btn btn-primary font-weight-bolder" onClick={()=>this.setPassengerData()}>Add</button>
                </div>
              </div>
              <div className="text-danger">

                {/* Display the formErrorMessages here */}
                {this.state.formErrorMessage.firstNameError}
                {this.state.formErrorMessage.lastNameError}
                {this.state.formErrorMessage.ageError}
              </div>
          </div>
        </div>
        </React.Fragment>
      )
    }
  }
  displayBookingSuccess=()=>{
    console.log("in createBooking displayBookingSuccess" , this.state.bookingDetails)
    return(
      <React.Fragment>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="card bg-card custom-card text-light">
                <div className="card-body">

                  {/* Add the booking ID to the below heading, from the successMessage object */}
                  <h4 className="text-success">Booking successful with booking ID: {this.state.successMessage.bookingId} </h4>

                  {/* Display the booking details here by rendering the BookingDetailsCard component and passing successMessage as props*/}
                  <BookingDetailsCard bookingDetails={this.state.bookingDetails}/>

                </div>
                <div className="card-footer">

                  {/* Add the Home button here */}
                  <button type="button" name="homeButton" className="btn btn-primary" onClick={()=>this.setState({goBack:true})}>Home</button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
  render() {
    if(this.state.goBack){
      // Display the GetFlights page by rendering the GetFlights component
      return <GetFlights></GetFlights>
    }
    if(this.state.successMessage===""){
      return(
        <div className="container mt-5">
            <div className="row">
              <div className="col-lg-7">
                {
                  this.state.passengerData.length>0 ? (
                    this.state.passengerData.map((passenger,index)=>{
                      return(
                        <div className="card bg-card text-light mb-4" key={index}>
                          <div className="card-body">
                            <div className="text-custom">Passenger {index+1}</div>
                            <h4>{passenger.title} {passenger.firstName} {passenger.lastName}, {passenger.age}</h4>
                          </div>
                        </div>
                      )
                    })
                  ): null
                }
                {this.getPassengerData()}
              </div>
              <div className="col-lg-4 offset-lg-1">
                <div name="flightDetails" className="card bg-card text-light">
                  <div className="card-body">
                    
                    {/* Display the booking details here by rendering the BookingDetailsCard component and passing bookingDetails in state as props*/}
                    <BookingDetailsCard bookingDetails={this.state.bookingDetails}/>

                  </div>
                  <div className="card-footer">

                    {/* Add the book, home buttons here and display axios error messages here */}
                    <button className="btn btn-primary btn-block" type="button" disabled= {(this.state.passengerData.length===Number(this.state.bookingDetails.noOfTickets))?false:true}  name="bookButton" onClick={()=>this.book()}>Book</button>
                    <button className="btn btn-warning btn-block" type="button" name="goBack" onClick={()=>this.setState({goBack:true})}>Home</button>
                    <span className="text-danger">{this.state.errorMessage}</span>

                  </div>
                </div>
              </div>
            </div>
        </div>
      )
    } else{
        return this.displayBookingSuccess();
    }
  }
}

export default CreateBooking;
