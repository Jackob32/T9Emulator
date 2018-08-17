import React, { Component } from 'react';
import './Keyboard.css';



class Keyboard extends Component{

    constructor(props) {
        super(props);
        this.state = {suggested: [], keys: "", text: "", sentence: ""};

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
             "#"
        ];

        console.log(this.keys);
    }

    render(){

        return(
            <div className="Keyboard" >

                {this.keys.map((res,i) =>{
                   let n=++i;
                        if(n>9)n="";

                return <div className="button" data-key={i} key={i} onClick={this.props.handleMyKeyPress}>
                <span className="number">{n}</span>
                <span className="letter">{res}</span>
            </div>})
                }

            </div>
        )
    }
}



export default Keyboard;
