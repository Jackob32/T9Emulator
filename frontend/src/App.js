import React, {Component} from 'react';
import './App.css';
import Keyboard from './components/Keyboard';


function handleError(res) {
    if (!res.ok) {
        throw Error(res.statusText);
    }
    return res.json();
}

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {response: [], text: [[]], number: [""], autoT9: true, t9: [], n: 0};
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.setLetter = this.setLetter.bind(this);
        this.handleMyKeyPress = this.handleMyKeyPress.bind(this);
        this.switchAutoT9 = this.switchAutoT9.bind(this);
        this.applyT9 = this.applyT9.bind(this);

    }

    //Loading statrup ssettings for the future, language, keyboard settings etc
    componentDidMount() {
        fetch('/api')
            .then(handleError)
            .then(response => this.setState({response}));
    }

    //Switching T9 autocorrect
    switchAutoT9() {

        let autoT9 = !this.state.autoT9;
        this.setState({
            autoT9: autoT9
        });
    }

    //applies T9 on the last word
    applyT9(e) {
        let T9response = e.target.getAttribute('data-key');
        let t9 = this.state.t9;
        if (T9response) {
            t9[this.state.n] = T9response;
        }
        this.setState({
            t9: t9
        });

    }

//adds new letter with checking and T9 fetching
    setLetter(key) {
        //get state
        let number = this.state.number;
        let t9 = this.state.t9;
        let text = this.state.text;
        let n = this.state.n;

        if (key === "Backspace") {
            if (n > 0 && number[n] === "") {
                number.splice(n, 1);
                text.splice(n, 1);
                t9.splice(n, 1);
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
//last t9 word is temporarily set to number, before resolved from server
        t9[n] = number[n];

        this.setState({
            number: number,
            n: n,
            t9: t9
        });
//dont send empty messages
        if (number[n] === "") {
            text[n] = [];
            t9[n] = [];
            this.setState({
                text: text,
                t9: t9
            });
        } else {
            fetch('/api?dialed=' + number[n])
                .then(handleError)
                .then(res => {
                        text[this.state.n] = res;
                        let t9 = this.state.t9;
                        if (res && res.length > 0 && this.state.autoT9) {
                            t9[this.state.n] = res[0];
                        }
                        this.setState({
                            text: text,
                            t9: t9
                        });
                    }
                ).catch(error => {
                console.log(error);
            });
        }

    }

// wrapper for keyboard input
    handleKeyPress(e) {
        this.setLetter(e.key);
    }

    //wrapper fction for virtual keyboard input
    handleMyKeyPress(e) {
        let key = e.target.getAttribute('data-key');
        if (key === "11") key = " ";
        if (key === "12") key = "Backspace";
        if (key === "10") key = "";
        this.setLetter(key);
    }


    render() {

        let stylT9 = "item unpushed";

        if (this.state.autoT9) stylT9 = "item pushed";

        return (
            <div className="App">

                <h1>T9 Emulator</h1>

                <div className="input" tabIndex="0" onKeyDown={this.handleKeyPress}> {this.state.t9.join(" ")} </div>

                <div className="suggest">
                    <span className={stylT9} onClick={this.switchAutoT9}> T9 </span>
                    {
                        this.state.text[this.state.n].map(
                            (res, index) =>
                                <span
                                className="item" key={index}
                                data-key={res}
                                onClick={this.applyT9}> {res}
                                </span>
                        )
                    }
                </div>
                <Keyboard handleMyKeyPress={this.handleMyKeyPress}/>
            </div>
        );
    }
}

export default App;
