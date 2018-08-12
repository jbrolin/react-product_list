import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
const list = [
  {
    title: "React",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectId: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andew Clark",
    num_comments: 2,
    points: 5,
    objectId: 1
  },
  {
    title: "Book2",
    url: "https://github.com/reactjs/redux",
    author: "More, Mickael",
    num_comments: 2,
    points: 5,
    objectId: 2
  }
];
const orgList = list;

const textFields = [
  {
    objectId: 0,
    text: "Hello you!",
    textStyle: "App-title"
  },
  {
    objectId: 1,
    text: "Hello you two!",
    textStyle: "App-intro"
  }
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      textFields: textFields,
      searchTerm: ""
    };
    //this.onReset = this.onReset.bind(this); // we need to bind 'this' if function is not an arrow function
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss = id => {
    // using arrow function we do not need to bind the function
    console.log(id);
    const isNotId = item => item.objectId !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };

  onReset = () => {
    // using non arrow function we need to bind the function to get access to 'this'.

    
    console.log(this.state.list[0]);
    this.setState({ list: orgList });
    this.setState({ searchTerm: "" });
    document.getElementById("searchForm").elements["searchEntry"].value = ""; //this empties the entry field. Optimal?

  };

  render() {
    return (
      <div className="App">
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => (
          <div key={item.objectId}>
            <span>
              <a href={item.url} target="_new">
                {item.title}
              </a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectId)}
                type="button"
              >
                Dismiss
              </button>
            </span>
          </div>
        ))}
        {this.state.textFields.map(textItem => (
          <div key={textItem.objectId}>
            <span>
              <p className={textItem.textStyle}>{textItem.text}</p>
            </span>
          </div>
        ))}
        <AppText introText="This is beatiful code to add parts like this!" />

        <form id="searchForm">
          Filter:
          <input
            type="text"
            name="searchEntry"
            value={this.searchTerm}
            onChange={this.onSearchChange}
            
          />
          </form>
          <button onClick={() => this.onReset()} type="button">
            Reset list
          </button>
        
      </div>
    );
  }
}

const AppText = props => (
  <div className="App-header">
    <h1>{props.introText}</h1>
  </div>
);

export default App;
