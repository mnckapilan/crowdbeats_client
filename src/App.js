import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

const APIurl = "https://crowdbeats-host.herokuapp.com/";
// const APIurl = "http://localhost:8888/";

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

  fetchPlaylist(){
    fetch(APIurl+"playlist").then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        this.setState({playlists:response, authFinished:true});
      }
    )
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
        this.fetchPlaylist();
      }
    )
  }



  
  updateSearchQuery(event){
    this.setState({searchQuery:event.target.value})
  }

  submitSearchQuery(){
    fetch(APIurl+"search?party_id="+this.state.partyCode+"&search="+this.state.searchQuery)
    .then(function(response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(
      (response) => {
        // console.log(response);
        this.setState({searchResults:response});
      }

        )
      }

  
  updateVote(id){
    fetch(APIurl+"vote?id="+id).then(function(response){
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

  addsong(id){
    fetch(APIurl+"addsong?id="+id).then(function(response){
      return response.json();
    })
    .then(
      (response) => {
        alert("added song");
        this.fetchPlaylist();
      }
    )
    }

  render() {
    return (
      <div className="App">
      {!this.state.authFinished ? 
      <Fragment>
         <h1>Please Enter Party Code:.</h1>
          <input placeholder="Party Code" value={this.state.partyCode} onChange={(event) => this.updatePartyCode(event)} />
          <button onClick={() => {this.submitPartyCode()}}>Submit</button>
      </Fragment>
      :
      <Fragment>
        {this.state.playlists.map((item) => (
          <div>
            <h2>{item.name}</h2>
            <h2>Votes: {item.votes}</h2>
            <h3>by {item.artist}</h3>
            <button onClick={ () => {this.updateVote(item.id)} }>VOTE</button>
          </div>
        ))
        }
            <input placeholder="Search" value={this.state.searchQuery} onChange={(event) => this.updateSearchQuery(event)} />
            <button onClick={() => {this.submitSearchQuery()}}>Search</button>

        {this.state.searchResults.map((item) => (
          <div>
            <h2>{item.name}</h2>
            <h3>by {item.artist}</h3>
            <button onClick={() => {this.addsong(item.id)}}>Add Song</button>

          </div>
        ))
        }
        </Fragment>
    }
         
      </div>
    );
  }
}

export default App;
