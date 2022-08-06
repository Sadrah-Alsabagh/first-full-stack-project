  import './App.css';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Form from 'react-bootstrap/Form';
  import Button from 'react-bootstrap/Button';
  import axios from 'axios';
  import { Component } from 'react';
  

  class  App extends Component{
  constructor(props){
    super(props);
    this.state ={
      userInput:'',
      photoArr:[],
    }
  }
  updateUserInput=(e)=>{
    this.setState({
      userInput:e.target.value
    })
  }


//send a req to my server to recieve the photo array
  handleSubmit= async (e)=>{
    e.preventDefault();
    console.log('Submitted');
    
    const url=`http://localhost:3000/photos?photoName=${this.state.userInput}`;
//https://api.unsplash.com/search/photos/?client_id=${process.env.REACT_APP_SERVER_URL}&query=${this.userInput}
//MFmwAhYdl1GdMd6qT-sCEdprWz23G9lyTJnBPgx5aSo
    const serverResponse = await axios.get(url);
    console.log(serverResponse.data);

    this.setState({
      photoArr:serverResponse.data,
    })
  }

    render(){

      return (
        <>
      <div className="App">  
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
          <Form.Label>Find photos about</Form.Label>
          <Form.Control 
          onChange={this.updateUserInput} 
          type="text" placeholder="What do you want to see? " />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
        </Form>
      </div>

      <div>

{
  this.state.photoArr.length >0 &&(
  this.state.photoArr.map(object =>{
    return(
      <>
      <img src ={object.img_url } alt={object.name} width='30%' height='30%'/>
      <p>{object.description}</p>
      <h6>{object.name}</h6>    
      <p>{object.bio}</p>
      </>
    )
  })

  )

}
      </div>
      </>

    );
    } 
  }

  export default App;
