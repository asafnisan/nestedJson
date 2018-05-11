import React, { Component } from 'react';
import './App.css';

class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleChildren = this.handleChildren.bind(this);
    }
    handleOpen() {
        this.setState(function(prevState){
            return { isOpen: !prevState.isOpen }
        })
    }
    handleChildren(children) {
        var childrenComments = [];
        if(children !== undefined) {
            childrenComments = children.map((comment) => {
                return (
                    <Comment 
                        key={comment.ID}
                        ID={comment.ID}
                        parentID={comment.parentID}
                        City={comment.City}
                        Name={comment.Name}
                        children={comment.children}
                        onClick={this.props.onClick}
                    />
                )
            })
        }
        return childrenComments
    }
    render(){
        return(
            <div className={"commentWrapper " + (this.state.isOpen ? 'open' : 'closed')} >
                <div className='comment'>
                    {this.props.children == undefined ? (
                            <div className="expandCollapseEmpty">.</div>
                        ) :
                        (   
                            <div className="expandCollapse" onClick={() => this.handleOpen()}>{this.state.isOpen ? '- ' : '+'}</div>
                        )
                    }
                    
                    <div className="content">
                        {this.props.City + ' '}
                        {this.props.Name + ' '}
                    </div>
                    <div className="delete" onClick={() => this.props.onClick(this.props.ID)}>delete</div>
                </div>
                <div className="children">
                {this.handleChildren(this.props.children, this.props.onClick)}
                </div>
            </div>
        )
    }
}

export default Comment