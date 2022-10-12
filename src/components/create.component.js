import React, { Component } from "react";
import {parseBibFile, normalizeFieldValue, organization} from "bibtex";
import { findAllInRenderedTree } from "react-dom/test-utils";
import axios from 'axios';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
//TODO
//1.delete
//2.extract from html page
//3.小细节


//     function extracrUrl2(){
//         //see this
//         //https://reqbin.com/req/c-d2nzjn3z/curl-post-body
//         //alert("try");

//         var url = "http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS";
        
//         var xhr = new XMLHttpRequest();
//         xhr.open("POST", url,true);
        
//         xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
//         xhr.setRequestHeader("Accept-Language", "zh,en-US;q=0.9,en;q=0.8,de;q=0.7,zh-CN;q=0.6");
//         xhr.setRequestHeader("Cache-Control", "max-age=1000");
//         xhr.setRequestHeader("Connection", "keep-alive");
//         xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundarySvuUMW0nmABAHHt2");
//         xhr.setRequestHeader("Origin", "http://www2.informatik.uni-stuttgart.de");
//         xhr.setRequestHeader("Referer", "http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS");
//         xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
//         xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36");
//         //xhr.setRequestHeader('Cache-Control,"');
        
//         xhr.onreadystatechange = function () {
//             switch (xhr.readyState) {
//                 case 0 : alert('UNINITIALIZED');
//                 case 1 : alert('LOADING');
//                 case 2 : alert('LOADED');
//                 case 3 : alert('INTERACTIVE');
//                 break;
//                 case 4 : {
//                     alert('111');
//                 alert(xhr.status);
//                 alert(xhr.responseText);
//                 }
                
               
//                 break;
//                 default: alert("error");
//              }  
       
//         };
//         alert('222');
//         var data = '$------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="aktion"rnrnBibTeXrn------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="bibfile"rnrn/inf/ftp/pub/library/ncstrl.ustuttgart_fi/INPROC-2022-05/INPROC-2022-05.bibrn------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="mod"rnrn0rn------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="engl"rnrn1rn------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="inst"rnrnASrn------WebKitFormBoundarySvuUMW0nmABAHHt2rnContent-Disposition: form-data; name="altestruktur"rnrn0rn------WebKitFormBoundarySvuUMW0nmABAHHt2--rn';
//         data = null;
//         xhr.send(data);
        
//         alert('333333333');
//     }
//     function extracrUrl(){
//         fetch("http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS", {
//   "headers": {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
//     "accept-language": "zh,en-US;q=0.9,en;q=0.8,de;q=0.7,zh-CN;q=0.6",
//     "cache-control": "max-age=30",
//     "content-type": "multipart/form-data; boundary=----WebKitFormBoundarybSWuw2vIEnx9JKAL",
//     "upgrade-insecure-requests": "1"
//   },
//   "referrer": "http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"aktion\"\r\n\r\nBibTeX\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"bibfile\"\r\n\r\n/inf/ftp/pub/library/ncstrl.ustuttgart_fi/INPROC-2022-05/INPROC-2022-05.bib\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"mod\"\r\n\r\n0\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"engl\"\r\n\r\n1\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"inst\"\r\n\r\nAS\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL\r\nContent-Disposition: form-data; name=\"altestruktur\"\r\n\r\n0\r\n------WebKitFormBoundarybSWuw2vIEnx9JKAL--\r\n",
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "omit"
// });
//     }
//     function extracrUrl1(){
//         //var xhr = new XMLHttpRequest();
//         $.ajax({
//             url: "http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS",
//             beforeSend: function(xhr) {
//                 xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
//                 xhr.setRequestHeader("Accept-Language", "zh,en-US;q=0.9,en;q=0.8,de;q=0.7,zh-CN;q=0.6");
//                 xhr.setRequestHeader("Cache-Control", "max-age=1000");
//                 xhr.setRequestHeader("Connection", "keep-alive");
//                 xhr.setRequestHeader("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundarySvuUMW0nmABAHHt2");
//                 xhr.setRequestHeader("Origin", "http://www2.informatik.uni-stuttgart.de");
//                 xhr.setRequestHeader("Referer", "http://www2.informatik.uni-stuttgart.de/cgi-bin/NCSTRL/NCSTRL_view.pl?id=INPROC-2022-05&mod=0&engl=1&inst=AS");
//                 xhr.setRequestHeader("Upgrade-Insecure-Requests", "1");
//                 xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36");
                
//             }, success: function(data){
//                 alert('11111111')
//                 alert(data);
//                 //process the JSON data etc
//             }
//         })
//     }
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState;
    };
    initialState ={
        title: '',
        bibtext: '',
        author: '',
        organization: '',
        url:'',
        pubDate: '',
        orgAddress:'',
      };

    submit=()=>{
        //alert('sub');
        // extracrUrl();
       
        
        if (this.state.title != '') {
          //this.props.history.push('/Index')
        } else {
          alert('title cannot be null!');
        }
        if (this.state.author !== '') {
            const inputAuthor =this.state.author;
        }

        /////////////////bibtext processing////////////////////////
        if (this.state.bibtext !== '') {
            var bibInfo = {title:'',authors:[],address:'',date:'',org:''};
            
            const bibFile = parseBibFile(this.state.bibtext);
            const entryId = bibFile.entries_raw[0]._id;
           
            const entry = bibFile.getEntry(entryId); // Keys are case-insensitive
            bibInfo.title = entry.getField("title"); // This is a complex BibTeX string
            bibInfo.address = entry.getField("address");
            bibInfo.date = entry.getField("year");
            bibInfo.org = entry.getField("institution");
            const authorField = entry
                        .getField("author"); // This is a special object, divided into first names, vons and last names according to BibTeX spec
            //bibInfo.authors = authorField.authors$;
            var tt = [];
            authorField.authors$.map((author, i) => 
                tt.push((author.firstNames
                    .concat(author.vons)
                    .concat(author.lastNames)
                    .concat(author.jrs)).join(" "))
                );
            bibInfo.authors = tt;

            // authorField.authors$.map((author, i) => alert("Author: " 
            //     + (author.firstNames
            //               .concat(author.vons)
            //               .concat(author.lastNames)
            //               .concat(author.jrs)).join(" ")));

            //const bibTitle = fieldValue.data;
            
            //alert(normalizeFieldValue(bibInfo.title));
        }
        
        ////////////file processing////////////////////////////////////
        var myfile = document.getElementById('myfile');
        var uploadFile = {filename:'',filetype:'',filesize:''};
        
        
        if (myfile.files[0] === undefined) {
            alert('no file uploaded');
        } else {
            //file name 
            uploadFile.filename = myfile.files[0].name;
            //file size
            uploadFile.filesize = myfile.files[0].size;
            //file type
            var filevalue = myfile.value;
            var index = filevalue.lastIndexOf('.');
            uploadFile.filetype = filevalue.substring(index);
            //alert(uploadFile.filename);
        }
        /////////////////////////////////

        // const paper = {
        //     title: this.state.title,
        //     author: this.state.author,
        //     organization: this.state.organization,
        //     pubDate: this.state.pubDate,
        // };

        let formData = new FormData();

        // let metadata = {};
        // metadata.title = this.state.title;
        // metadata.date = this.state.pubDate;
        // metadata.filename = uploadFile.filename;
        // //metadata.fileSize = uploadFile.filesize;
        // metadata.fileSize = '111';
        // metadata.fileType = uploadFile.filetype;
        // metadata.author = this.state.author;
        // metadata.organization = this.state.organization;
        // metadata.address = 'tt';
        // const json = JSON.stringify(metadata);
        // const blob = new Blob([json], {
        //     type: 'application/json'
        //   });
        // formData.append('file',myfile.files[0]);
        // formData.append('metadata',json);

        formData.append('file',myfile.files[0]);
        formData.append('title', this.state.title);
        formData.append('date', this.state.pubDate);
        formData.append('filename', uploadFile.filename);
        formData.append('fileSize', '111');
        formData.append('pubid', 0);
        formData.append('fileType', uploadFile.filetype);
        formData.append('author.authorid', 0);
        formData.append('author.name', this.state.author);
        formData.append('organization.address', 'address');
        formData.append('organization.name', this.state.organization);
        formData.append('organization.orgId', 0);
        

        
        const config = {     
            // headers: { 'content-type': 'multipart/form-data',
            headers: { 
                       'Access-Control-Allow-Origin':'http://localhost:3000'
                        }
        }
        
        //console.log(formData);
        // axios.get('http://localhost:8088/postgresql/author/YangHaoran')
        
        
        //129.69.209.197:8080 http://localhost:8080/create
        //axios.get('http://localhost:8088/postgresql/author/YangHaoran')
        axios.post('http://129.69.209.197:31002/user/create', formData, config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
        console.log('success')
        //problems:
        //1.org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException: The field file exceeds its maximum permitted size of 1048576 bytes.
        //4.bibtext 填充逻辑 如果不填就是null
        //5.多个author
        //年份选择框

        // axios.post('',paper)
        //     .then(function (response) {
        //         if(response.data!=null){
        //             this.setState(this.initialState);
        //             alert("paper info posted successfully!");
        //         }
                
        //     })
        // .catch(function (error) {
        //     console.log(error);
        // this.setState({
        //     isLoaded:false,
        //     error:error
        // })
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
    orgAdd_change=(e)=>{
        this.setState({
            orgAddress: e.target.value
        })
    }
    url_change=(e)=>{
        this.setState({
            url: e.target.value
        })
    }
    bibtext_change=(e)=>{
        this.setState({
            bibtext: e.target.value
        })
    }
    


    render() {
        const {title, bibtext,author,organization,orgAddress,pubDate,url} = this.state
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
                    <label>Organization Name</label>
                    <input type="text" value={organization} onChange={this.organization_change} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Organization Address</label>
                    <input type="text" value={orgAddress} onChange={this.orgAdd_change} className="form-control" />
                </div>

                <div className="form-group">
                    <label>Published Year</label>
                    <input type="text" value={pubDate} onChange={this.pubDate_change} className="form-control" />
                </div>

                

                <div className="form-group">
                    <label>BibTex</label>
                    <input type="text" value={url} onChange={this.url_change}  className="form-control" placeholder="Or directly put the URL here" />
                    <textarea value={bibtext} onChange={this.bibtext_change} className="form-control" cols="10" rows="5" placeholder="Or directly copy the BibTex here"/>

                </div>

                <div className="form-group">
                    <label>Select a file:</label>
                    <input type="file" className="form-control" name="myfile" id="myfile" ></input>
                </div>
             

                


                <button type="submit" onClick={this.submit} className="btn btn-dark btn-lg btn-block">Submit</button>
         
            </form>
        );
    }
}


