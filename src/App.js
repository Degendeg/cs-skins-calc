import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            pattern: /^[0-9.,]+$/,
            inputProps: {
                placeholder: 'Add value'
            },
			currency: ' SEK'
        };
        this.calculateAmount = this.calculateAmount.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleReject(tags) {
        tags.pop();
    }
    handleChange(tags) {
        this.setState({tags});
    }
    calculateAmount() {
        let amount = this.state.tags;
        amount = amount.map((a) => { return +a.replace(/,/g, '.'); }).reduce((a, b) => a + b, 0);
        const percentage = document.getElementById('percentage').value;
        const result = document.getElementsByClassName('result')[0];
        const calculation = amount * (parseFloat(percentage) / 100.0);
        if (!isNaN(calculation)) {
          result.innerHTML = calculation.toFixed(2) + this.state.currency;
        }
        else {
          result.innerHTML = "";
        }
    }
    render() {
        return (
            <div className="App">
              <div className="jumbotron main">
				<h4 className="ribbon">Currency: {this.state.currency}</h4>
                <div className="form-group">
                  <label htmlFor="amount">Initial value:</label>
                <TagsInput 
                    inputProps={this.state.inputProps}
                    validationRegex={this.state.pattern} 
                    value={this.state.tags}
                    onChange={this.handleChange}
                    onValidationReject={this.handleReject}
                />
                </div>
                <div className="form-group">
                  <label htmlFor="percentage">Percentage:</label>
                  <input type="number" min="1" max="100" className="form-control" id="percentage" />
                </div>
                <label htmlFor="result">Result:</label>
                <div className="result">
                </div>
                <button className="btn btn-info" onClick={this.calculateAmount}>Calculate</button>
              </div>
            </div>
        );
    }
}

export default App;