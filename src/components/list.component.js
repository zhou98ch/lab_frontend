import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import qs from "qs"
//1.react 下载文件
//2.显示 后端假return个东西 然后显示
//3.获取当前的object id，用来click
//
class TrData extends React.Component{
    constructor(props){
      super(props);
      this.state = this.initialState;
    };
    initialState ={
        data:'xxx'
      };
    componentDidMount
    
   
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
    render(){
      //const location = useLocation();
      
      //let m = this.props.location.state;
      //alert();
      // this.props.entrys = {authorid:'1',name:'2',orgid:'3'};
      // const data = [this.props.entrys];
      const data = [{'authorid':'1','name':'Anna','orgid':'3'},{'authorid':'2','name':'Mike','orgid':'3'}];
      console.log(data.name)
      return (
        data.map(entry=>{
            return (
                <tr  className="text-center">
                  <td>{this.state.data}</td>
                  <td>{entry.authorid}</td>
                  <td>{entry.name}</td>
                  <td>{entry.orgid}</td>
                  <td><button onClick = {this.downloadHandler}>Download</button></td>
                  <td><button onClick = {() => {
                    
                    }}>Delete</button></td>
                </tr>
            )       
        })
      )
    }
  }


export default class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            entrys:[],
            isLoaded:false
          }
          //alert(this.props.location);
          
      
  }

  

  //当组件输出到 DOM 后会执行 componentDidMount()
    componentDidMount(){  
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        // http://129.69.209.197:31000/postgresql/author/YangHaoran
        // http://localhost:8088/postgresql/author/YangHaoran
        axios.get('http://localhost:8088/postgresql/author/YangHaoran')
        .then(function (response) {
        _this.setState({
            entrys:response.data,
            isLoaded:true
        });
        })
        .catch(function (error) {
        console.log(error);
        _this.setState({
            isLoaded:false,
            error:error
        })
        })
       

        // axios({
        //   method: "get",
        //   url: "http://localhost:8088/postgresql/author/YangHaoran",
        //   withCredentials: true,
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "Content-Type": "application/json",
        //     Accept: "application/json"
        //   }
        // })
        //   .then(response => {
        //     if (response && response.data) {
        //       this.setState({ users: response.data });
        //     }
        //   })
        //   .catch(error => console.log(error));
    }

  //List.js
render() {
  // let m = this.props.location;
  // this.state.data = this.props.location.query.data;

  // const {search} = location; //search: '?id=001&name=gailun'
  // const {keyword, author} = qs.parse(search.slice(1));
  
  // let msg = new URLSearchParams(global.location.search.slice(1));
  // const docs = JSON.parse(msg.get('docs'));

    if(false){
    // if(!this.state.isLoaded){
      return <div>Loading</div>
    }else{
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
         
            <th className="text-center">author id</th>
            <th className="text-center">author name</th>
            <th className="text-center">organization id</th>
            <th className="text-center">Execution</th>
          </tr>
        </thead>
      <tbody>
         <TrData entrys={this.state.entrys}/>
      </tbody>
      </table>
    )  
  }
}
}