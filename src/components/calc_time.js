import React, { Component } from 'react';

class Calc extends Component {
    constructor(props) {
            super(props)

            this.state = {
                lap1: '',
                lap2: '',
                total: '',
                answer: ''
            }
        }

    render() {
        const calcAnswer = (e) => {
            e.preventDefault();

            // Convert laps into 2 decimal floatnumbers
            let lap1 = parseFloat(parseFloat(this.state.lap1.replace(',', '.'), 10).toFixed(2));
            let lap2 = parseFloat(parseFloat(this.state.lap2.replace(',', '.'), 10).toFixed(2));
            let total = parseFloat(parseFloat(this.state.total.replace(',', '.'), 10).toFixed(2));
            let answer = parseFloat(parseFloat(total - (lap1 + lap2)).toFixed(2));

            console.log(`${total} - (${lap1} + ${lap2}) = ${answer}`)
            this.setState({answer: answer});
        }
        return (
            <form className='asdf'>
                <input
                    placeholder='Lap 1'
                    value={this.state.lap1}
                    onChange={e => this.setState({lap1: e.target.value})} />
                <input
                    placeholder='Lap 2'
                    value={this.state.lap2}
                    onChange={e => this.setState({lap2: e.target.value})} />
                <input
                    placeholder='Lap 3'
                    disabled='disabled'
                    value={this.state.answer}
                    readOnly />
                <input
                    placeholder='Final time'
                    value={this.state.total}
                    onChange={e => this.setState({total: e.target.value})} />
                <button onClick={calcAnswer}>Calculate last lap</button>
            </form>
        );
    }
}

export default Calc;
