import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { response: [] , text: "", word: []};
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(response => this.setState({ response }));
  }

  handleKeyPress(e){
       let key=e.key;
       let text =this.state.text;

       if(Number.isInteger(parseInt(key,10))){
       text = this.state.text + key;
     }else if(key === "Backspace"){
       text = text.substring(0, text.length-1);
     }
       this.setState({
           text:text,
       })

       fetch('/api?dialed='+text)
         .then(res => res.json())
         .then(response => this.setState({ response }));

   }


  render() {
    return (
      <div className="App">

        <h1>T9 Emulator</h1>

        <input type="text" value={this.state.text} name="fname" onKeyDown={this.handleKeyPress} /><br />

<div>{this.state.text}</div>

<p>
            {
              this.state.response.map((res,index) => <span key={index}> {res}, </span>)
          }
  </p>
      </div>
        );
      }
    }

    export default App;
