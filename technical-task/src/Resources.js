import React, { Component } from "react";
import { Table, Button, ButtonToolbar } from "react-bootstrap";
import { BookModal } from "./BookModal";

export class Resources extends Component {

  constructor(props) {
    super(props);
    this.state = { resources: [], //all the resource table from the db
      BookModalVisible: false,       //the state of the modal
      selectedResourceIndex: 0,    //which resource is showing in the modal window, assigned to zero initially    
     };
  }

  //getting the resource table from db
  componentDidMount() {
    fetch(process.env.REACT_APP_API + "Resource")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ 
          resources: data,
        });
      });
  }


  //the selected index is the resource showing on the modal

  //this function closes the modal, rather make it not visible by setting its state to false
  //resets the selected index to be 0
  bookModalClose = () => this.setState({ BookModalVisible: false, selectedResourceIndex: 0 }); 

  //this function turn the state of the modal to true,
  //and sets the state of the selected index at the time to be the selected index in the list
  bookModalOpen = index => {this.setState({ BookModalVisible: true, selectedResourceIndex: index })}; 

  /*
  checks if the state of the model is true, and if it is, it return a modal component and this modal's props are the selected resource
  and the index is not zero-based so we have to decrement 1 from it
  */

  bookModalVisible = () => {
    if (this.state.BookModalVisible === true) {
      return (
        <BookModal
          resource={this.state.resources[this.state.selectedResourceIndex -1]}
          show={this.state.BookModalVisible}
          onHide={this.bookModalClose} //to hide
        />
      );
    }
  };

  render() {
    const { resources } = this.state;
    return (
      <div>
        <h1 className="m-3 d-flex justify-content-center">Resources</h1>
        <Table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Book a Resource</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr key={res.resourceId}>
                <td>{res.resourceId}</td>
                <td>{res.resourceName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                      className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.bookModalOpen(res.resourceId)
                      }
                    >
                      Book Here
                    </Button>
                  </ButtonToolbar>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          //call this function to always check whenever the state changes whether to make the modal compoenent visible or not
          this.bookModalVisible()
        } 
      </div>
    );
  }
}
