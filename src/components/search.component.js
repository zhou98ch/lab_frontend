import React, { Component } from "react";
import axios from 'axios';
import Test from "./Test.component";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

class TrData extends React.Component{
    constructor(props){
      super(props);
      this.state = this.initialState;
    };
    initialState ={
        data:'xxx'
      };
    downloadHandler=(e,objectId)=>{
        e.preventDefault();

          let fileData = {'objectId':''};
          fileData.objectId = objectId;
          
          const config = {     
            headers: { 

                      'Access-Control-Allow-Origin':'http://localhost:3000'
                        },
            responseType: "arraybuffer"
        };
        axios.get('http://localhost:3000/api/user/getFile', {params:fileData}, config)
        .then((response) => {
            let t=response;
            var link = document.createElement("a");
            link.href = window.URL.createObjectURL(
              new Blob([response.data], { type: "application/octet-stream" })
            );
            link.download = objectId;
        
            document.body.appendChild(link);
        
            link.click();
            setTimeout(function () {
              window.URL.revokeObjectURL(link);
            }, 200);
          })
          .catch((error) => {});
      };
    deleteHandler=(objectId)=>{
        const config = {     
            headers: { 
                'Access-Control-Allow-Origin':'http://localhost:3000'
                        }
        };
        axios.delete('http://129.69.209.197:31002/user/deleteFile', {	
            params: {	
                objectId: objectId
            },config
          }).then(res => {
            console.log(res)
          });

    };
  
    render(){
      const data = this.props.entrys;

      return (
        data.map(entry=>{
            return (
                <>
                    <tr bgcolor="#e6e6fa" className="text-center">
                        <td >{entry.title}</td>
                        <td>{entry.name}</td>
                        <td>{entry.date}</td>
                        <td>{entry.type}</td>
                       
                        <td><a href={'http://129.69.209.197:31002/user/getFile?objectId='+entry.ObjectId}>Download</a></td>
                       
                        <td>
                        <a href={'http://129.69.209.197:31002/user/deleteFile?objectId='+entry.ObjectId}>Delete</a>
                        </td>
                    </tr>
                    <tr>
                        <div>
                            <h6>Abstract:</h6>
                                <Test>
                                {entry.abstra}
                                </Test>
                        </div>
                        
                    </tr>
                    <tr>
                        <div>
                            <h6>Additional Information:</h6>
                                
                                {entry.publication_json}
                                
                        </div>
                        
                    </tr>




                </>
            )       
        })
      )
    }
  }

export default class SignUp extends Component {
   
    constructor(props) {
        super(props)
        this.state = {
          title: '',
          author: '',
          date: '',
          keyword:'',
          URLinfos:'',
          entrys:[],
          isLoaded:false,

          addInfos:[{ key: '', val:'' },]
        }
        this.query = this.query.bind(this)
        var urldocs = '';
      };
   
    
    query = (e) => {
   
        e.preventDefault(); 
      
        let searchInfo = {authorname:'%',title:'%',date:'%',addData:''};

        let formData = new FormData();
        if (this.state.author !== '') {
            searchInfo.authorname =this.state.author;
        }
        if (this.state.title !== '') {
            searchInfo.title =this.state.title;
        }
        if (this.state.date !== '') {
            searchInfo.date =this.state.date;
        }
        if (this.state.date !== '') {
            searchInfo.addData =JSON.stringify({'empty':'empty'});
        }

        /////////////////keyword////////////////////
        const keyword = this.state.keyword==''?'*':this.state.keyword;
  
        const config = {     
            headers: { 
                       'content-type':'application/x-www-form-urlencoded'
                        }
        }

        ////////send real request//////////////////////////////////
        axios.get('http://129.69.209.197:31002/user/search/'+keyword, {params:searchInfo}, config)
            .then(function (response) {
                
                if(response.data!=null){
                   
                    console.log(response.data);
                    this.setState({
                        entrys:response.data,
                        isLoaded:true
                    });
                    
                }
                
            }.bind(this))
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
    addInfos_change=(e,index)=>{
        const { name, value } = e.target;
        const list = [...this.state.addInfos];
        list[index][name] = value;
        this.setState({
            addInfos:list
        });
    }

    increaseLine = () =>{
        this.setState({
            addInfos:[...this.state.addInfos, { key:'', val:''}]
        });
    }
    
    handleAddClick = (e) => {
        e.preventDefault();
        this.increaseLine();
        
    };

    handleRemoveClick = (index) => {
        //alert(index);
        const list = [...this.state.addInfos];
        list.splice(index, 1);
        this.setState({
            addInfos:list
        });
    };
    render() {
        const {title,author,date,keyword,addInfos} = this.state;
        //if(false){
        if(!this.state.isLoaded){
              return (
                <>
                <form>
                <br/><br/>
                <h3>Use Case: Seach, Retrieve and Delete</h3>
                <h4>Parametric search</h4>
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
                
                {/* <label>Additional information</label>
                {addInfos.map((x, i) => {
                return (
                    <div className="additional-box">
                        
                        <input
                        type = "text"
                        name = "key"
                        value = {x.key}
                        onChange={e =>this.addInfos_change(e,i)}
                        placeholder="Enter key"
                        />

                        <input
                        type = "text"
                        name = "val"
                        value = {x.val}
                        onChange={e =>this.addInfos_change(e,i)}
                        placeholder="Enter value"
                        /> <button class="button-38" onClick={() => this.handleRemoveClick(i)}>Remove</button> <button class="button-38" onClick={this.handleAddClick}>Add</button>
                        
                        <pre>
                            {JSON.stringify(addInfos[i])}
                        </pre>
                        
                    </div>
                );
                })} */}

                <h4>Fulltext-index search</h4>
                <div className="form-group">
                    <label>Keyword</label>
                    <input type="text" value={keyword} onChange={this.keyword_change} className="form-control" placeholder="Enter keyword"/>
                </div>
                
              

                <button type="submit" onClick={this.query} class="button-24">       
                                Query
                </button>
         
            </form>
              <div>No results now. Please search.</div>
              
              
              </>
              )
        }
        else {return (
            <>
            <form>

                <h3>Use Case: Seach, Retrieve and Delete</h3>
                <h4>Parametric search</h4>
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
                <h4>Fulltext-index search</h4>
                <div className="form-group">
                    <label>Keyword</label>
                    <input type="text" value={keyword} onChange={this.keyword_change} className="form-control" placeholder="Enter keyword"/>
                </div>
                
                {/* {addInfos.map((x, i) => {
                return (
                    <div className="additional-box">
                        <input
                        type = "text"
                        name = "key"
                        value = {x.key}
                        onChange={e =>this.addInfos_change(e,i)}
                        />

                        <input
                        type = "text"
                        name = "val"
                        value = {x.val}
                        onChange={e =>this.addInfos_change(e,i)}
                        /> <button class="button-38" onClick={() => this.handleRemoveClick(i)}>Remove</button> <button class="button-38" onClick={this.handleAddClick}>Add</button>
                        
                    
                        
                        
                        <pre>
                            {JSON.stringify(addInfos[i])}
                        </pre>
                        
                    </div>
                );
                })} */}

                <button type="submit" onClick={this.query} class="button-38" >       
                                Query
                </button>
            
            </form>

            

            

            <table className="table table-bordered">
                <thead>
                    <tr>
                    
                        <th className="text-center">title</th>
                        <th className="text-center">author name</th>
                        <th className="text-center">date</th>
                        <th className="text-center">file type</th>
                        <th className="text-center">Download</th>
                        <th className="text-center">Delete</th>
                    </tr>
                </thead>
                <tbody>
                        <TrData entrys={this.state.entrys}/>
                </tbody>
          </table>
          <a href={'/search'}>Clear</a>
          </>
        );}
    }
}
