import React, { Component } from 'react';
import './Keyboard.css';

class Keyboard extends Component{

    constructor(props) {
        super(props);

        this.keys = [
            ".,?",
            "abc",
           "def",
             "ghi",
           "jkl",
            "mno",
            "pqrs",
             "tuv",
             "wxyz",
            "*",
             "_",
             '\u2190'
        ];
    }

    render(){
        return(
            <div className="keyboard" >
                {this.keys.map((res,i) =>{
                   let n=++i;
                        if(n>9)n="";
                return <div className="button" data-key={i} key={i} onClick={this.props.handleMyKeyPress}>
                <span className="number" data-key={i} >{n} </span><br />
                <span className="letter" data-key={i} >{res}</span>
            </div>})
                }

            </div>
        )
    }
}


export default Keyboard;
