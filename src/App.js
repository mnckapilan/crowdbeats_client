import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

// const APIurl = "https://crowdbeats-host.herokuapp.com/";
const APIurl = "https://localhost:8888/";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      partyCode:'',
      authFinished: false,
      playlists: [],
      searchQuery:'',
      searchResults: []
    }
  }

  updatePartyCode(event){
    this.setState({partyCode:event.target.value})
  }
  
  updateSearchQuery(event){
    this.setState({searchQuery:event.target.value})
  }

  submitSearchQuery(){
    fetch(APIurl+"search?party_id="+this.state.partyCode+"search="+this.state.searchQuery)
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        this.setState
      }

        )
      }
  }

  submitPartyCode(){
    fetch(APIurl+"newguest?party_id="+this.state.partyCode)
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        fetch(APIurl+"playlist").then(function(response) {
          // The response is a Response instance.
          // You parse the data into a useable format using `.json()`
          return response.json();
        })
        .then(
          (response) => {
            this.setState({playlists:response, authFinished:true})
          }
        )
      }
    )
  }

  updateVote(id){
    fetch(APIurl+"vote?id="+id).then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        this.setState({playlists:response})
      }
    )
  }


  render() {
    return (
      <div className="App">
      {!this.state.authFinished ? 
      <Fragment>
         <h1>Please Enter Party Code.</h1>
          <input placeholder="Party Code" value={this.state.partyCode} onChange={(event) => this.updatePartyCode(event)} />
          <button onClick={() => {this.submitPartyCode()}}>Submit</button>
      </Fragment>
      :
      <Fragment>
        {this.state.playlists.map((item) => (
          <div>
            <h1>{item.name}</h1>
            <h1>{item.votes}</h1>
            <button onClick={ () => {this.updateVote(item.id)} }>VOTE</button>
          </div>
        ))
        }

            <input placeholder="Search" value={this.state.searchQuery} onChange={(event) => this.updatePartyCode(event)} />
            <button onClick={() => {this.submitSearchQuery()}}>Submit</button>
        </Fragment>
    }
         
      </div>
    );
  }
}

export default App;
