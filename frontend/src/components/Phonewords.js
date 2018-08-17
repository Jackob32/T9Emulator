import React, { Component } from 'react';
import './Phonewords.css';



class Phonewords extends Component{

    constructor(props) {
        super(props);

        let words=["1-NO-MOM-WTF", "67-DE-MOM-CANTDO"];
    }

    generatePhoneWords() {


    }

    render(){
        let words = this.props.input.map((name,i)=><div key={i}>{name}</div>);
        return(
            <div>
                {words}
            </div>
        )
    }
}


export default Phonewords;
