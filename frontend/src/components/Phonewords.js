import React, {Component} from 'react';
import './Phonewords.css';

class Phonewords extends Component {

    constructor(props) {
        super(props);

    }
    generatePhoneWords() {

    }
    render() {
        let words = this.props.input.map((name, i) => <div key={i}>{name}</div>);
        return (
            <div>
                {words}
            </div>
        )
    }
}

export default Phonewords;
