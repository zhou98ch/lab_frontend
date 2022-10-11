import React, { Component } from "react";
import axios from 'axios';
import List from './list.component';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
//1.跳转 done
//2.带参数
//3.最好url不一样 done
//4.react k8s

// import { createMemoryHistory as createHistory } from "history";
// export const history = createHistory();

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          author: '',
          date: '',
          keyword:''
        }
      };
    query=(e)=>{
        // if (this.state.title !== '') {
        //   this.props.history.push('/Index')
        // } else {
        //   alert('title cannot be null');
        // }
        //const { history } = this.props;
        //alert(history);

        //e.preventDefault(); // 这里添加了一个阻止默认事件
        //this.props.history.push('/create'); //Uncaught TypeError: Cannot read properties of undefined (reading 'push')

        let searchInfo = {authorname:'',title:'',date:''};
        // let searchAuthor = '';
        // let searchtitle = ''
        let formData = new FormData();
        if (this.state.author !== '') {
            searchInfo.authorname =this.state.author;
            //formData.append('authorname',this.state.author);
        }
        if (this.state.title !== '') {
            searchInfo.title =this.state.title;
            //formData.append('title',this.state.title);
        }
        if (this.state.date !== '') {
            searchInfo.date =this.state.date;
            //formData.append('authodatername',this.state.date);
        }
        // if (this.state.keyword !== '') {
        //     searchInfo.keyword =this.state.keyword;
        // }

        // const searchAuthor = { //Metadata author;     Metadata:Author author
        //     "author": {
        //       "authorid": 0,
        //       "name": "string",
        //       "orgid": 0
        //     }
        //   }
        const config = {     
            headers: { 
                'content-type': 'multipart/form-data',
                       'content-type':'application/x-www-form-urlencoded'
                        }
        }
        
        axios.get('http://localhost:8080/user/search/science', {params:searchInfo}, config)
            .then(function (response) {
                if(response.data!=null){
                    this.setState(this.initialState);
                   
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
    date_change=(e)=>{
        this.setState({
            date: e.target.value
        })
    }
    keyword_change=(e)=>{
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        const {title,author,date,keyword} = this.state
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
                    <label>Publish Year</label>
                    <input type="text" value={date} onChange={this.date_change} className="form-control" placeholder="Enter year"/>
                </div>

                <div className="form-group">
                    <label>Keyword</label>
                    <input type="text" value={keyword} onChange={this.keyword_change} className="form-control" placeholder="Enter keyword"/>
                </div>

              

                <button type="submit" onClick={this.query} className="btn btn-dark btn-lg btn-block">
                        
                        <Link to={`/list/?keyword=${keyword}&author=${keyword}`}>Query</Link>
                </button>
                
         
            </form>
        );
    }
}