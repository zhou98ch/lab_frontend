import React, { Component } from "react";
import {parseBibFile, normalizeFieldValue, organization} from "bibtex";

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          bibtext: '',
          author: '',
          organization: '',
          pubDate: '',
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
        if (this.state.bibtext !== '') {
            const bibFile = parseBibFile(this.state.bibtext);
            const entry = bibFile.getEntry("realscience"); // Keys are case-insensitive
            const fieldValue = entry.getField("title"); // This is a complex BibTeX string
            console.log(fieldValue);
            alert(fieldValue.data);
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
    pubDate_change=(e)=>{
        this.setState({
            pubDate: e.target.value
        })
    }
    bibtext_change=(e)=>{
        this.setState({
            bibtext: e.target.value
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
                    <input type="text" value={organization} onChange={this.organization_change} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Publised Date</label>
                    <input type="date" value={pubDate} onChange={this.pubDate_change} className="form-control" />
                </div>

                <div className="form-group">
                    <label>BibTex</label>
                    <input type="text"   className="form-control" placeholder="Or directly copy the BibTex here" />
                    <textarea value={bibtext} onChange={this.bibtext_change} className="form-control" cols="10" rows="5" placeholder="Or directly copy the BibTex here"/>

                </div>

                <div className="form-group">
                    <label>Select a file:</label>
                    <input type="file" className="form-control"></input>
                </div>
             

                


                <button type="submit" onClick={this.submit} className="btn btn-dark btn-lg btn-block">Submit</button>
         
            </form>
        );
    }
}