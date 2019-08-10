import React, { Component } from 'react';
import { render } from 'react-dom';
import Grid from './components/Grid/Grid';
import flatData from './components/Grid/flatData'
import compositeData from './components/Grid/compositeData'





class App extends Component {
  constructor() {
    super();


  }

  
  render() {
    
    return (


      <Grid 
        dataType = 'composition'
        treeColumnIndex={1} 
        edit={true}
        mapping = {{children : 'subtasks' , id :'taskID', parentId : 'parentId'}}
        data={compositeData}
        onchange={this.test} 
        columns ={[
          {text : 'Task ID', field:'taskID', width:70, align:'right'},
          {text : 'Task Name', field:'taskName', width:200},
          {text : 'Start Date', field:'startDate', width:90, align:'right'},
          {text : 'End Date', field:'endDate', width:90, align:'right'},
          {text : 'Duration', field:'progress', width:90, align:'right'},
          {text : 'Progress', field:'duration', width:90},
        ]}
      />
      
    );
  }
}

render(<App />, document.getElementById('root'));
