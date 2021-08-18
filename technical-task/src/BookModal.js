import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { validateDate } from "./validateDates";

export class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,//quantity that the user is going to pick
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    //we make sure that the resource has sufficient quantity
    if (this.props.resource.resourceQuantity >= this.state.quantity) {
     this.callApiToInsertNewRecordInDB(this.state.quantity,this.props.resource.resourceId,event.target.dateFrom.value,event.target.dateTo.value);
      
    } else {
      alert("Quantity of resource is too low");
    }
  }

  //API call to edit quantity of a resource in a record in the db, called inside insert new record API
  callApiToUpdateTheResourceQuantity(originalQuantity,quantityThatTheUserWants,resourceId){

    fetch(process.env.REACT_APP_API + "Resource", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resourceQuantity:originalQuantity-quantityThatTheUserWants,
        resourceId:resourceId,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed to update");
        }
      );

  }

  //API call to insert new record in db
  callApiToInsertNewRecordInDB(quantity,resId,DateFrom,DateTo){

    if(validateDate(DateFrom,DateTo)){
      fetch(process.env.REACT_APP_API + "Booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookedQuantity:quantity ,
          resourceId:resId ,
          dateFrom: DateFrom,
          dateTo: DateTo,
        }),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert("Booked Successfully");
            console.log(
              `EMAIL SENT TO admin@admin.com FOR CREATED BOOKING WITH ID ${result["0"].bookingId}`
            );
          },
          (error) => {
            alert("Failed to book");
          }
        );
        //calling the api from here to make sure that the date is correct
        this.callApiToUpdateTheResourceQuantity(this.props.resource.resourceQuantity , this.state.quantity, this.props.resource.resourceId);
    }else{
      alert("Failed to book please pick valid dates (click on the today button)");
    }
    
  }

  //increment quantity
  increment() {
    this.setState((prevState) => {
      return {
        quantity: prevState.quantity + 1,
      };
    });
  }

  //decrement the quantity, but it never goes less than 0
  decrement() {
    this.setState((prevState) => {
      let val = prevState.quantity - 1;
      return {
        quantity: val < 0 ? 0 : val,
      };
    });
  }

  render() {
    const{resourceName}=this.props.resource;
    const {onHide}=this.props;
    return (
      <div className="container">
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Booking {resourceName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col sm={4}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlid="dateFrom">
                    <Form.Label>DateFrom</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateFrom"
                      required
                      placeholder="Date From"
                    />
                  </Form.Group>
                  <Form.Group controlid="dateTo">
                    <Form.Label>DateTo</Form.Label>
                    <Form.Control
                      type="date"
                      name="dateTo"
                      required
                      placeholder="Date To"
                    />
                  </Form.Group>
                  <div>
                    <Button
                      type="button"
                      onClick={this.decrement.bind(this)}
                      value="dec"
                    >
                      -
                    </Button>
                    <h5 controlid="bookingQuantity" name="bookingQuantity">
                      {this.state.quantity}
                    </h5>
                    <Button
                      type="button"
                      onClick={this.increment.bind(this)}
                      value="inc"
                    >
                      +
                    </Button>
                  </div>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Book
                    </Button>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
