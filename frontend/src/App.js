import React, { Component } from 'react';
import './App.css';
import Phonewords from './components/Phonewords';
import Keyboard from './components/Keyboard';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = { response: [] , text:[[]], number: [""], n: 0};
    this.handleKeyPress = this.handleKeyPress.bind(this);
      this.setLetter = this.setLetter.bind(this);
      this.handleMyKeyPress = this.handleMyKeyPress.bind(this);

  }
  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(response => this.setState({ response }));
  }

    setLetter(key) {

        let number = this.state.number;
        let text = this.state.text;
        console.log(key);
        let n = this.state.n;
        if (key === "Backspace") {
            if (n > 0 && number[n] === "") {
                number.splice(n, 1);
                text.splice(n, 1);
                n--;
            } else if (number[n].length > 0) {
                number[n] = number[n].substring(0, number[n].length - 1);
            }
        } else if (key === " " || key === "Enter") {
            if (number[n] !== "") {
                n++;
                number[n] = "";
            }

        } else if (Number.isInteger(parseInt(key, 10))) {
            number[n] += key;
        }


        this.setState({
            number: number,
            n: n
        });

        if (number[n] === "") {
            text[n]=[];
            this.setState({text});
        } else {
            fetch('/api?dialed=' + number[n])
                .then(res => res.json())
                .then(response => {
                        text[this.state.n] = response;
                        this.setState({text})
                    }
                );
        }
        console.log(text);

    }

    handleKeyPress(e) {
        this.setLetter(e.key);
    }
    handleMyKeyPress(e) {
      console.log(e.target.getAttribute('data-key'));

        let key=e.target.getAttribute('data-key');
        if(key===11) key=" ";

        this.setLetter(key);
    }


  render() {
    return (
      <div className="App">

        <h1>T9 Emulator</h1>

        <input type="text" value={this.state.number.join(" ")} name="fname" onKeyDown={this.handleKeyPress} /><br />

        <div tabIndex="0" onKeyDown={this.handleKeyPress} >: {this.state.number.join(" ")} </div><br />

          <p>
            {
              this.state.text[this.state.n].map((res,index) => <span key={index}> {res}, </span>)
          }
  </p>
         <br />


             <Phonewords input={["exrfjg","rdtgfhgdu ijf","3w54erydtf"]}/>

          <Keyboard handleMyKeyPress={this.handleMyKeyPress} />


      </div>
        );
      }
    }

    export default App;
