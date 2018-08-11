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
    ObjectId: 0
  },
  {
    title: "Redux",
    url: "https://github.com/reactjs/redux",
    author: "Dan Abramov, Andew Clark",
    num_comments: 2,
    points: 5,
    ObjectId: 1
  }
];
const textFields = [
  {
    ObjectId: 0,
    text: "Hello you!",
    textStyle: "App-title"
  },
  {
    ObjectId: 1,
    text: "Hello you two!",
    textStyle: "App-intro"
  }
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list,
      textFields: textFields
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.list.map(item => (
          <div key={item.objectID}>
            <span>
              <a href={item.url} target="_new">
                {item.title}
              </a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        ))}
        {this.state.textFields.map(textItem => (
          <div key={textItem.objectID}>
            <span><p className={textItem.textStyle}>{textItem.text}</p></span>
          </div>
        ))}
        <AppText
          introText="This is a beatiful code to add parts like this!"
        />
      </div>
    );
  }
}

const AppText = (props) =>
  <div className="App-header">
    <h1>{props.introText}</h1>
  </div>

export default App;
