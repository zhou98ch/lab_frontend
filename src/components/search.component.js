import React, { Component } from "react";
import axios from 'axios';
import Test from "./Test.component";
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
    downloadHandler=(e,objectId)=>{
        e.preventDefault();
          // let formData = new FormData;
          // formData.append('objectId','1111.txt');
          // formData.append('path','test');
          let fileData = {'objectId':''};
          //fileData.objectId = '9698c513-2ce8-4a14-8b9f-8941ded9f352.txt';
          fileData.objectId = objectId;
          
          const config = {     
            headers: { 
            //responseType: "arraybuffer",
            
                      'Access-Control-Allow-Origin':'http://localhost:3000'
                        },
            responseType: "arraybuffer"
        };
        //http://129.69.209.197:31002/
        //'http://localhost:8080/user/getFile'
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
            params: {	// 请求参数拼接在url上
                objectId: objectId
            },config
          }).then(res => {
            console.log(res)
          });

    };
  
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
                <>
                    <tr  className="text-center">
                        <td>{entry.title}</td>
                        <td>{entry.name}</td>
                        <td>{entry.date}</td>
                        <td>{entry.type}</td>
                        {/* <td><button onClick = {(e) =>this.downloadHandler(e,entry.objectId)}>Download</button></td> */}
                        <td><a href={'http://129.69.209.197:31002/user/getFile?objectId='+entry.ObjectId}>Download</a></td>
                        {/* <td><button onClick = {(e) =>this.deleteHandler(e,entry.objectId)}>Delete</button></td> */}
                        {/* <td><a class = "delete" href={'http://129.69.209.197:31002/user/deleteFile?objectId='+entry.ObjectId}>Download</a></td> */}
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
        let searchInfo = {authorname:'%',title:'%',date:'%',addData:''};
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
        if (this.state.date !== '') {
            searchInfo.addData =JSON.stringify({'empty':'empty'});
            //formData.append('authodatername',this.state.date);
        }
        /////////////get additional json data///////////////
        // if (this.state.addInfos[0].key !== '') {
        //     let addInfoObj = {};
            
        //     this.state.addInfos.forEach(function (item, index, array) {
        //         addInfoObj[item.key]=item.val;//
        //     })
        //     const addInfoJson = JSON.stringify(addInfoObj);
        //     searchInfo.addData =addInfoJson;
        // }
        // else{
        //     let addInfoObj ={'empty':'empty'};
        //     const addInfoJson = JSON.stringify(addInfoObj);
        //     searchInfo.addData =addInfoJson;
        // }

        /////////////////keyword////////////////////
        const keyword = this.state.keyword==''?'*':this.state.keyword;
        
            //formData.append('authodatername',this.state.date);
        
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
                //'content-type': 'multipart/form-data',
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
        
        ///////after response/////////////////////////
        // const response_data = [{"name":"cc","title":"cc","date":"cc","filename":"yang143.txt","size":"111","type":".txt","mntpath":"/mnt/nfs-solr","ObjectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt","docId":60,"isdeleted":false,"objectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt"
        //                     ,abstract:"This study examines General Practitioners’ preferences for pecuniary and non-pecuniary job characteristics in the context of choosing a general practice in which to work. A discrete choice experiment is used to test hypotheses about the nature of the utility function. Marginal rates of substitution between income and non-pecuniary characteristics are calculated. The results suggest that policies aimed at influencing General Practitioners’ location choices should take account of both non-pecuniary and pecuniary factors, particularly out of hours work commitments."},
        //                      {"name":"yang146","title":"yang146","date":"yang146","filename":"yang146","size":"txt","type":"yang146","mntpath":"/mnt/nfs-solr","ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt","docId":53,"isdeleted":false,"ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt"
        //                       ,abstract:"This study examines General Practitioners’ preferences for pecuniary and non-pecuniary job characteristics in the context of choosing a general practice in which to work. A discrete choice experiment is used to test hypotheses about the nature of the utility function. Marginal rates of substitution between income and non-pecuniary characteristics are calculated. The results suggest that policies aimed at influencing General Practitioners’ location choices should take account of both non-pecuniary and pecuniary factors, particularly out of hours work commitments."  },
        //                     ]
        // this.setState({
        //     entrys:response_data,
        //     isLoaded:true
        // }); 

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
                // alert(response.data.isNull);
                //console.log(response.data);
                
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
        // let list = [...this.state.addInfos];
        // let m = list.push({ key:'', val:''});
        // let m =[...this.state.addInfos, { key:'', val:''}];
        // let n = m.length;
        
        // // this.setState({
        // //     addInfos:list
        // // });
        
        // let x=this.state.addInfos.length;
        // let y =1;
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
                <h4>Search by parameters</h4>
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

                <h4>Search by fulltext-indexing</h4>
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


//className="btn btn-dark btn-lg btn-block"
//[{"name":"cc","title":"cc","date":"cc","filename":"yang143.txt","size":"111","type":".txt","mntpath":"/mnt/nfs-solr","ObjectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt","docId":60,"isdeleted":false,"objectId":"943e07d4-96de-48b2-b08c-b83230bb3337.txt"},{"name":"yang146","title":"yang146","date":"yang146","filename":"yang146","size":"yang146","type":"yang146","mntpath":"/mnt/nfs-solr","ObjectId":"ba0f62c9-291a-4ba9-a119-09d3ba036119.txt","docId":53,"isdeleted":false,"objectId":"ba0f62c9-291a-4b