import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class TrData extends React.Component{
    constructor(props){
      super(props);
    }
    downloadHandler=()=>{

      let fileData = {'objectId':''};
      fileData.objectId = '737fa382-2f95-48c8-867f-3006c69233e6.txt';
      
      const config = {     
        headers: { 
                   'Access-Control-Allow-Origin':'*'
                    },
        responseType: "arraybuffer"
    }

    axios.get('http://localhost:3000/api/user/getFile', {params:fileData}, config)
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
      const data = [{'authorid':'1','name':'Anna','orgid':'3'},{'authorid':'2','name':'Mike','orgid':'3'}];
      console.log(data.name)
      return (
        data.map(entry=>{
            return (
                <tr  className="text-center">
                  
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
      
  }


render() {
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