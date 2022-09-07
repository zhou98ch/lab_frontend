import React, { Component } from "react";
import axios from 'axios';
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          author: '',
          organization: '',
          keyword:'',
        }
      };
    query=()=>{
        // if (this.state.title !== '') {
        //   this.props.history.push('/Index')
        // } else {
        //   alert('title cannot be null');
        // }
        
        if (this.state.author !== '') {
            const inputAuthor =this.state.author;
        }
        const searchAuthor = {
            authorid:'1',
            author:'haoran',
            orgid:'1'
        }
        axios.post('http://localhost:8088/postgresql/query',searchAuthor)
            .then(function (response) {
                if(response.data!=null){
                    this.setState(this.initialState);
                    alert("search info posted successfully!");
                }
                console.log(response.data);
                
            })
        .catch(function (error) {
            console.log(error);
        })

        
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

    keyword_change=(e)=>{
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        const {title,author,organization,keyword} = this.state
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

                <div className="form-group">
                    <label>Keyword</label>
                    <input type="text" value={keyword} onChange={this.keyword_change} className="form-control" placeholder="Enter keyword"/>
                </div>

                <button type="submit" onClick={this.query} className="btn btn-dark btn-lg btn-block">Query</button>
         
            </form>
        );
    }
}