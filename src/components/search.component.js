import React, { Component } from "react";
import axios from 'axios';
//import List from './list.component';

//import { Link } from 'dva/router';
//npm install http-proxy-middleware
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

//1.跳转 done
//2.link 带参数
//3.最好url不一样 done
//4.react k8s

// import { createMemoryHistory as createHistory } from "history";
// export const history = createHistory();

class TrData extends React.Component{
    constructor(props){
      super(props);
      this.state = this.initialState;
    };
    initialState ={
        data:'xxx'
      };
  
   
    downloadHandler=()=>{
          // let formData = new FormData;
          // formData.append('objectId','1111.txt');
          // formData.append('path','test');
          let fileData = {'objectId':''};
          fileData.objectId = '9698c513-2ce8-4a14-8b9f-8941ded9f352.txt';
          
          const config = {     
            headers: { 
            //responseType: "arraybuffer",
            
                      'Access-Control-Allow-Origin':'http://localhost:3000'
                        },
            responseType: "arraybuffer"
        }
        //http://129.69.209.197:31002/
        //'http://localhost:8080/user/getFile'
        axios.get('http://localhost:8080/user/getFile', {params:fileData}, config)
            .then((response) => {
              var link = document.createElement("a");
              link.href = window.URL.createObjectURL(
                new Blob([response.data], { type: "application/octet-stream" })
              );
              link.download = "file.txt";
          
              document.body.appendChild(link);
          
              link.click();
              setTimeout(function () {
                window.URL.revokeObjectURL(link);
              }, 200);
            })
            .catch((error) => {});
    }
    deleteHandler=(objectId)=>{
        const config = {     
            headers: { 
                'Access-Control-Allow-Origin':'http://localhost:3000'
                        }
        }
        axios.delete('http://localhost:8080/user/deleteFile', {	
            params: {	// 请求参数拼接在url上
                objectId: objectId
            },config
          }).then(res => {
            console.log(res)
          })

    }
    componentDidMount(){  
        
    }
    render(){
      //const location = useLocation();
      
      //let m = this.props.location.state;
      //alert();
      // this.props.entrys = {authorid:'1',name:'2',orgid:'3'};
      const data = this.props.entrys;
    //   const data = [{'authorid':'1','name':'Anna','orgid':'3'},{'authorid':'2','name':'Mike','orgid':'3'}];
    //   console.log(data.name)
    //   <td>{this.state.data}</td>
      return (
        data.map(entry=>{
            return (
                <tr  className="text-center">
                  <td>{entry.title}</td>
                  <td>{entry.name}</td>
                  <td>{entry.date}</td>
                  <td>{entry.type}</td>
                  <td><button onClick = {this.downloadHandler}>Download</button></td>
                  <td><button onClick = {this.deleteHandler(entry.objectId)}>Delete</button></td>
                </tr>
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
          isLoaded:false
        }
        this.query = this.query.bind(this)
        var urldocs = '';
      };
    //   componentDidMount(){
    //     const _this=this; 
    //     _this.setState({
    //         entrys:this.state.entrys,
    //         isLoaded:this.state.isLoaded
    //     });
    //   }
    query = (e) => {
        
        // if (this.state.title !== '') {
        //   this.props.history.push('/Index')
        // } else {
        //   alert('title cannot be null');
        // }
        //const { history } = this.props;
        //alert(history);

        e.preventDefault(); // 这里添加了一个阻止默认事件
        //this.props.history.push('/create'); //Uncaught TypeError: Cannot read properties of undefined (reading 'push')
        // this.props.history.push("/list", {

        //     data: 'xyz' //需要传递的参数
            
        //     });
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

        //////////////fake response test/////////////////
        // let testResponse = {0:{name:'mike',title:'science',date:'1998',filename:'sicenece',size:'111',type:'pdf',mntpath:'mntpath',ObjectId:'9698c513-2ce8-4a14-8b9f-8941ded9f352.txt',docId:'6'},
        //          1:{name:'mike',title:'science',date:'1998',filename:'sicenece22',size:'333',type:'txt',mntpath:'mntpath',ObjectId:'9698c513-2ce8-4a14-8b9f-8941ded9f352.txt',docId:'6'}};
        // let test = {name:'mike',title:'science',date:'1998',type:'pdf',ObjectId:'9698c513-2ce8-4a14-8b9f-8941ded9f352.txt'};
        // const docs = test;
        // this.urldocs = JSON.stringify(docs);
        // this.setState({
        //     URLinfos: this.urldocs
        // });
        
        ///////////after response/////////////////////////
        const response_data = [{"name":"cc","title":"cc","date":"cc","filename":"yang143.txt","size":"111","type":".txt","mntpath":"/mnt/nfs-solr","ObjectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt","docId":60,"isdeleted":false,"objectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt"},
                             {"name":"yang146","title":"yang146","date":"yang146","filename":"yang146","size":"txt","type":"yang146","mntpath":"/mnt/nfs-solr","ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt","docId":53,"isdeleted":false,"ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt"},
                            ]
        this.setState({
            entrys:response_data,
            isLoaded:true
        });
        
        // axios.get('http://localhost:8080/user/search/science', {params:searchInfo}, config)
        //     .then(function (response) {
        //         if(response.data!=null){
        //             this.setState(this.initialState);
        //         const docs = testResponse;
        //         this.URLinfos = JSON.stringify(docs);
        //         }
        //         //console.log(response.data);
                
        //     })
        // .catch(function (error) {
        //     console.log(error);
        // })
        


        
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
        const {title,author,date,keyword} = this.state;
        //if(false){
        if(!this.state.isLoaded){
              return (
                <>
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
                        <th className="text-center">Execution</th>
                        <th className="text-center">Execution</th>
                    </tr>
                </thead>
                <tbody>
                        <TrData entrys={this.state.entrys}/>
                </tbody>
          </table>
          </>
        );}
    }
}
//to={`/list/?keyword=${keyword}&author=${keyword}`}

// to={{ 
//     pathname:"/list/?keyword=${keyword}&author=${keyword}", 
//     hash:'#ahash',  
//     query:{foo: 'foo', boo:'boo'},  
//     state:{data:'hello'}   
// }}
{/* <Routes>
                            <Route path="/list" component={List} />
                        </Routes> */}

    //                     search:
    //   "stuff=content&moreStuff=moreContent" + // existing search params
    //   "&dataPassed=This is the passed data.", // additional for state  

{/* <Link to={{ 
                                pathname:'/list', 
                                search:'docs='+this.urldocs,
                                query:{data:'hello'},
                                state:{data:'hello'},
                                
                            }}
                        >
                            Query
                        </Link> */}

//[{"name":"cc","title":"cc","date":"cc","filename":"yang143.txt","size":"111","type":".txt","mntpath":"/mnt/nfs-solr","ObjectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt","docId":60,"isdeleted":false,"objectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt"},{"name":"yang146","title":"yang146","date":"yang146","filename":"yang146","size":"yang146","type":"yang146","mntpath":"/mnt/nfs-solr","ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt","docId":53,"isdeleted":false,"objectId":"ba0f62c9-291a-4b