import React, { Component } from 'react';
import './App.css';
import Comment from './Comment';
import data from './data.json'
import helpers from './helpers.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      comments: data
    }
    this.handleDelete = this.handleDelete.bind(this)
  }
  handleDelete(commentId){
    console.log(commentId)
    const commentRemoved = helpers.flatDataCommentRemover(this.state.comments, commentId)
    this.setState({
      comments: commentRemoved
    })
 
  }
  render() {
    const updatedComments = helpers.toNested(this.state.comments)
    const comments = updatedComments.map((comment) => {
      return (
        <Comment 
          key={comment.ID}
          ID={comment.ID}
          parentID={comment.parentID}
          City={comment.City}
          Name={comment.Name}
          children={comment.children}
          onClick={this.handleDelete}
        />
      )
    });
    return (
      <div className="mainDiv">
        {comments}
      </div>
    );
  }
}

export default App;
