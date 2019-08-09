import React, {Component} from 'react';
import './Grid.css';
import Header from './Header';
import Rows from './Rows';
import GridContext from './GridContext';
import TreeFactory from './Tree/TreeFactory';
import $ from 'jquery';


class Grid extends Component {
  constructor (props) {
    super(props);
    const {dataType, mapping, data , columns} = this.props;

    this.TREE = TreeFactory.create(dataType, mapping);

    //Main Grid States
    this.state = {
      columns : columns,
      data :this.TREE.updateModel(data)  
    } 
    this.arrowKeyDelay = 120;
    this.arrowKeyTimeout = null;
  }

  componentDidMount (){

    let navigate = function(e){
      let current = $('.grid-input').closest('.cell');
      //up
      if(e.keyCode == 38) {
        let index = current.index();
        
        setTimeout(()=>{
            current.closest('tr').prev().find(`.cell:eq(${index})`).click()
        },120);
        current.blur();
      }
      //right
      else if(e.keyCode == 39){
        setTimeout(()=>{
            current.next().click()
        },120)
        current.blur()

      }
      //down
      else if(e.keyCode == 40){
        let index = current.index();
        setTimeout(()=>{
            current.closest('tr').next().find(`.cell:eq(${index})`).click()
        },120);

        current.blur()
        
       
      }
      //left
      else if(e.keyCode == 37){
        setTimeout(()=>{
            current.prev().click()
        },120)
        current.blur()
      }
    }
    $(document).keydown((e)=>{
      //Debounce pattern
      clearTimeout(this.arrowKeyTimeout);
      
      this.arrowKeyTimeout = setTimeout(() => navigate(e), this.arrowKeyDelay );
    })
  }
  setFocus (id){
    const {data} = this.state;
    debugger
    
    let node = this.TREE.findNode(data,id);
    node.focus = true;

    let newData = this.TREE.updateNode(data, node);
    this.updateRows(newData)
  }

  /**
   * When using this function any data will update and fixed by 
   * 'this.TREE.updateModel' before setState and broadcasting for render
   */
  updateRows =(data) => {
    data = this.TREE.updateModel(data)
    this.setState({
      data:data
    })
  }

  updateNode = ( newNode)  => {
    this.updateRows( this.TREE.updateNode(this.state.data, newNode) )
  }
  render (){
    const {columns, data} = this.state;
    
    let contextValue = { 
      Tree : this.TREE,
      updateRows : this.updateRows.bind(this),
      updateNode: this.updateNode.bind(this),
      setFocus : this.setFocus.bind(this),
      ...this.props,
      columns : columns,
      data :data ,
    };

    return (
      <GridContext.Provider value={contextValue}>
        <div className="grid" tabIndex="0" style={{width: "auto"}}>
          <Header/>
          <Rows />
        </div> 
      </GridContext.Provider>
    )
  }
}


export default Grid;
