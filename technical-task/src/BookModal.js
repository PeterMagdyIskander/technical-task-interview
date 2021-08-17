import React, { Component } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export class BookModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(process.env.REACT_APP_API + "Booking", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingQuantity: this.state.quantity,
        resourceId: this.props.resid,
        dateFrom: event.target.dateFrom.value,
        dateTo: event.target.dateTo.value,
        quantity: this.state.quantity,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  onclick(type) {
    if(this.state.quantity>0){
        this.setState((prevState) => {
            return {
              quantity: (type === "add" ) ? prevState.quantity + 1 : prevState.quantity - 1,
            };
          });}
    
  }

increment(){
    this.setState((prevState) => {
        return {
          quantity: prevState.quantity +1,
        };
      })
}
decrement(){
    this.setState((prevState) => {
        let val=prevState.quantity - 1
        return {
          quantity: val<0 ? 0: val,
        };
      })
}

  render() {
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
              Booking Resource {this.props.resid}
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
                   <h5 controlid="bookingQuantity" name='bookingQuantity'>
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
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
