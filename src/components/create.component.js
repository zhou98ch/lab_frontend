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

//css style
//remove删的有问题 x
//用户没有填addinfo时，addinfo 在formdata里不是必传字段
//bibtex的数据传送有问题吗
//abstract检查可以正常返回吗

//create 用戶不填 不发送addinfo
//search 把addinfo功能，增加显示返回的json
//delete测试 
//只输入一项也能查
//keyword查询默认*
//删除成功 插入成功 

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
        addInfos:[{ key: '', val:'' },]
      };

    submit=(e)=>{
        //alert('sub');
        // extracrUrl();
       e.preventDefault();
        
        if (this.state.title != '') {
          //this.props.history.push('/Index')
        } else {
          alert('title cannot be null!');
        }
        if (this.state.author !== '') {
            const inputAuthor =this.state.author;
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

        /////////////get additional json data///////////////
        let addInfoObj = {};
        this.state.addInfos.forEach(function (item, index, array) {
            addInfoObj[item.key]=item.val;
        })
        const addInfoJson = JSON.stringify(addInfoObj);

        ////////////////////////////////

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
        formData.append('fileSize', uploadFile.filesize.toString());
        formData.append('pubid', 0);
        formData.append('fileType', uploadFile.filetype);
        formData.append('author.authorid', 0);
        formData.append('author.name', this.state.author);
        formData.append('organization.address', this.state.address);
        formData.append('organization.name', this.state.organization);
        formData.append('organization.orgId', 0);
        // formData.append('addData',addInfoJson);
        //no addinfo entered by user, then not send addinfo
        if(!(this.state.addInfos.length==1 && this.state.addInfos[0]['key'] =='')){
            formData.append('addData',addInfoJson);
        }
  
        const config = {     
             //headers: { 'content-type': 'multipart/form-data',
            headers: { 
                       'Access-Control-Allow-Origin':'http://localhost:3000'
                        }
        }
        
        //console.log(formData);
        // axios.get('http://localhost:8088/postgresql/author/YangHaoran')
        
        
        //129.69.209.197:8080 http://localhost:8080/create
        //axios.get('http://localhost:8088/postgresql/author/YangHaoran')
        //axios.post('http://localhost:8088/user/create', formData, config)
        //let createSuccess = false;
        axios.post('http://129.69.209.197:31002/user/create', formData, config)
            .then(response => {
                //createSuccess = true;
                
                alert("creation success");
                this.setState(this.initialState);
                //console.log(response);
                
            })
            .catch(error => {
                alert("creation failed!");
                //console.log(error);
            });
        //if(createSuccess==false)    alert("Time out! Creation failed!");
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
    bibtext_newchange=(e)=>{
        e.preventDefault();
        
        if (this.state.bibtext !== '') {
            var bibInfo = {title:'',authors:[],address:'',date:'',org:'',publisher:'',language:'',booktitle:''};
            
            const bibFile = parseBibFile(this.state.bibtext);
            const entryId = bibFile.entries_raw[0]._id;
           
            const entry = bibFile.getEntry(entryId); // Keys are case-insensitive
            bibInfo.title = entry.getFieldAsString("title"); // This is a complex BibTeX string
            bibInfo.address = entry.getFieldAsString("address");
            bibInfo.date = entry.getFieldAsString("year");
            bibInfo.org = entry.getFieldAsString("institution");
            bibInfo.publisher = entry.getFieldAsString("publisher");
            bibInfo.language  = entry.getFieldAsString("language");
            bibInfo.booktitle   = entry.getFieldAsString("booktitle");
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
            this.setState({
                title:bibInfo.title,
                author:bibInfo.authors[0],
                organization:bibInfo.org,
                pubDate:bibInfo.date,
                orgAddress:bibInfo.address

            })
            const list = [...this.state.addInfos];
            if(list.length==1 && list[0]['key'] =='')
                list.pop();
            if(bibInfo.publisher)
                list.push({key:'publisher',val:bibInfo.publisher});
            if(bibInfo.booktitle)
                list.push({key:'bookTitle',val:bibInfo.booktitle});
            if(bibInfo.language)
                list.push({key:'language',val:bibInfo.language});
            this.setState({
                addInfos:list
            });
        }
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
        
        const list = [...this.state.addInfos];
        list.splice(index, 1);
        this.setState({
            addInfos:list
        });
    };


    render() {
        const {title, bibtext,author,organization,orgAddress,pubDate,url,addInfos} = this.state
        return (
            <form>
                <br/><br/><br/><br/><br/><br/><br/>
                
                <h3>Use Case: Create</h3>

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
                    <input type="text" value={organization} onChange={this.organization_change} className="form-control" placeholder="Enter organization name"/>
                </div>

                <div className="form-group">
                    <label>Organization Address</label>
                    <input type="text" value={orgAddress} onChange={this.orgAdd_change} className="form-control" placeholder="Enter address"/>
                </div>

                <div className="form-group">
                    <label>Published Year</label>
                    <input type="text" value={pubDate} onChange={this.pubDate_change} className="form-control" placeholder="Enter published year"/>
                </div>

                

                <div className="form-group">
                    <label>BibTex</label>
                    
                    <textarea value={bibtext} onChange={this.bibtext_change} className="form-control" cols="10" rows="5" placeholder="Or directly copy the BibTex here"/>

                </div>
                <button  class="button-38" onClick={this.bibtext_newchange}>Auto fulfill</button>
                {/* <pre>
                
                        {JSON.stringify(addInfos[0])}
                        {JSON.stringify(addInfos[1])}
                        {JSON.stringify(addInfos[2])}
                </pre> */}
                <div className="form-group">
                    <label>Select a file:</label>
                    <input type="file" className="form-control" name="myfile" id="myfile" ></input>
                </div>

                
                    

            <label>Additional information</label>    
            {addInfos.map((x, i) => {
             return (
                <div className="additional-box">
                    <input
                    className="add-info"
                    type = "text"
                    name = "key"
                    value = {x.key}
                    onChange={e =>this.addInfos_change(e,i)}
                    placeholder="Enter key"
                    border="0.5px"
                    background-color='red'
                    />

                    <input
                    className="add-info"
                    type = "text"
                    name = "val"
                    value = {x.val}
                    onChange={e =>this.addInfos_change(e,i)}
                    placeholder="Enter value"
                    /><button class="button-38" onClick={() => this.handleRemoveClick(i)}>Remove</button> <button class="button-38" onClick={this.handleAddClick}>Add</button>
                   
                    {/* <pre>
                        {JSON.stringify(addInfos[i])}
                    </pre> */}
                    
                </div>
                );
            })}
                


                
                
             

                


                <button type="submit" onClick={this.submit}  class="button-38" >Submit</button>
         
            </form>
        );
    }
}


