import React, { Component } from "react";
export default class Test extends React.Component {

    constructor(){
      super();
      this.state = {
         height:'3.3em'
      };
    }
 
   countLines = () => {
     let height = this.testComp.offsetHeight;   
     if ( (height - 2 ) / 16 > 3.3 ) {
        this.setState({showButton:true});
     }
   }
   
   showHidePara=() => {
      if (this.state.height == 'auto') {
         this.setState({height:'3.3em'});
      } else {
         this.setState({height:'auto'});
      }
   }
   
   componentDidMount() {
       this.countLines();
   }
   
   render() {
     return ( 
     < div>
         { this.state.showButton ? 
        <button onClick={this.showHidePara} class="button-38"> Show/hide </button>
     : null
     }
     <div id ="parent" style={{height:this.state.height}}>
 
       <div id = "content" ref={(c) => this.testComp = c } style={{height:'auto'}}>
          {this.props.children}
       </div> 
       </div>
       </div>
     );
   }
 
 }