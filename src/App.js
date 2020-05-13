<<<<<<< HEAD
import React from 'react';
import './App.css';
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            tags: [], 
            pattern: /^\d+$/,
            props: {
                placeholder: 'Add value'
            }
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
        amount = amount.map(function(num){ return +num;}).reduce((a, b) => a + b, 0);
        amount = amount.reduce((a, b) => a + b, 0);
        const percentage = document.getElementById('percentage').value;
        const result = document.getElementsByClassName('result')[0];
        const calculation = amount * (parseFloat(percentage) / 100.0);
        if (!isNaN(calculation)) {
          result.innerHTML = calculation.toFixed(2);   
        }
        else {
          result.innerHTML = "";
        }
    }
    render() {
        return (
            <div className="App">
              <div className="jumbotron">
                <div className="form-group">
                  <label htmlFor="amount">Initial value:</label>
                <TagsInput 
                    inputProps={this.state.props} 
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
=======
import React, { Component } from "react"
import logo from "./logo.svg"
import "./App.css"

class LambdaDemo extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
        </header>
      </div>
    )
  }
}

export default App
>>>>>>> c1632d5989a78f69cc5fa5907001b1327647aab3
