import React, { Component } from "react";

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          author: '',
          organization: '',
        }
      };
    submit=()=>{
        // if (this.state.title !== '') {
        //   this.props.history.push('/Index')
        // } else {
        //   alert('title cannot be null');
        // }
        if (this.state.author !== '') {
            const inputAuthor =this.state.author;
        }
      
        
    };
    title_change=(e)=>{
        this.setState({
            title: e.target.value
        })
    }
    author_change=(e)=>{
        this.setState({
            author: e.target.value
        })
    }
    organization_change=(e)=>{
        this.setState({
            organization: e.target.value
        })
    }

    render() {
        const {title, bibtext,author,organization,pubDate} = this.state
        return (
            <form>

                <h3>Create Publication Record</h3>

                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={this.title_change} className="form-control" placeholder="Enter title" />
                </div>

                <div className="form-group">
                    <label>Author</label>
                    <input type="text" value={author} onChange={this.author_change} className="form-control" placeholder="Enter author" />
                </div>

                <div className="form-group">
                    <label>Organization</label>
                    <input type="text" value={organization} onChange={this.organization_change} className="form-control" placeholder="Enter organization"/>
                </div>

                <button type="submit" onClick={this.submit} className="btn btn-dark btn-lg btn-block">Query</button>
         
            </form>
        );
    }
}