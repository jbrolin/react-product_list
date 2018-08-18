import React, { Component } from "react";
//import logo from "./logo.svg";
import "./App.css";
const list = [
  {
    title: "ReactJ",
    url: "https://facebook.github.io/react/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 1,
    objectId: 0
  },
  {
    title: "ReduxD",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andew Clark",
    num_comments: 2,
    points: 2,
    objectId: 1
  },
  {
    title: "Book2",
    url: "https://github.com/reactjs/redux",
    author: "More, Mickael",
    num_comments: 2,
    points: 3,
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
      searchTerm: "",

    };

    this.onReset = this.onReset.bind(this); // we need to bind 'this' if function is not an arrow function
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss = id => {
    // using arrow function we do not need to bind the function
    const isNotId = item => item.objectId !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  };


  onReset() {
    // using non arrow function we need to bind the function to get access to 'this'.
    this.setState({ searchTerm: "" });

    // we need to copy the orginal list and resort it by objectId since the order of object are uncertain.

    const newOrgList = orgList.sort(function (a, b) {
      return a.objectId - b.objectId
    });

    this.setState({ list: newOrgList });

  }

  onSortTitle = () => {
    const updatedList = this.state.list.sort(function (a, b) {
      var x = a.title.toLowerCase();
      var y = b.title.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    this.setState({ list: updatedList });
    console.log(this.state.list);
  }

  onSortAuthor = () => {
    const updatedList = this.state.list.sort(function (a, b) {
      var x = a.author.toLowerCase();
      var y = b.author.toLowerCase();
      if (x < y) { return -1; }
      if (x > y) { return 1; }
      return 0;
    });
    this.setState({ list: updatedList });
    console.log(this.state.list);
  }



  render() {
    const { searchTerm, list } = this.state; // destructing values from this.state
    console.log("get", this.state, list);
    return (
      <div className="page">

        <Table
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onReset={this.onReset}
          />
          <Button onClick={() => this.onReset()}>
            Reset list
        </Button>

          <Button onClick={() => this.onSortTitle()}>
            Sort list by title
        </Button>

          <Button onClick={() => this.onSortAuthor()}>
            Sort list by author
        </Button>

        </div>
      </div>
    );
  }
}

const Search = ({ value, onChange, onReset }) =>
  <form>
    Filter:
          <input
      value={value} // using the string as value in the html-form makes it a controlled component, 
      // that is the string is now the "single source of truth" 
      type="text"
      onChange={onChange}
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>

  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
      <div key={item.objectId} className="table-row">
        <span className="largeColumn">
          <a href={item.url} target="_new">
            {item.title}
          </a>
        </span>
        <span className="midColumn">
          {item.author}
        </span>
        <span className="smallColumn">
          {item.num_comments}
        </span>
        <span className="smallColumn">
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => onDismiss(item.objectId)} className="button-inline">
            <b>Do</b> Dismiss
              </Button>
        </span>
      </div>
    ))}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>


export default App;
