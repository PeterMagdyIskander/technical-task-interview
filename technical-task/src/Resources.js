import React, { Component } from "react";
import { Table,Button,ButtonToolbar } from "react-bootstrap";
import { BookModal } from './BookModal';

export class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = { resources: [],BookModalShow:false };
  }

  
  componentDidMount() {
    fetch(process.env.REACT_APP_API + "Resource")
      .then((response) => response.json())
      .then((data) => {
          console.log(data)
        this.setState({ resources: data, selectedResourceIndex:0 });
      });
  }
  bookModalClose = () => this.setState({ BookModalShow: false, selectedResourceIndex:0 });
  showModal=()=>{
      if(this.state.BookModalShow===true){
          return(
            <BookModal resource={this.state.resources[this.state.selectedResourceIndex-1]} show={this.state.BookModalShow} onHide={this.bookModalClose} />
          )
      }
  }

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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => 
              (<tr key={res.resourceId}>
                <td>{res.resourceId}</td>
                <td>{res.resourceName}</td>
                <td>
                  <ButtonToolbar>
                    <Button
                    className="mr-2"
                      variant="info"
                      onClick={() =>
                        this.setState({
                            BookModalShow: true,
                            selectedResourceIndex:res.resourceId,
                        })
                      }
                      >
                      Book Here
                    </Button>
                  </ButtonToolbar>
                  
                  
                </td>
              </tr>)
            )
            }
          </tbody>
        </Table>
        {
            this.showModal()
        }
      </div>
    );
  }
}
