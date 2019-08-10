import React, {Component,PureComponent, Fragment,createRef} from 'react';
import GridContext from './GridContext';
import $ from 'jquery';
import icons from './icons'



class Cell extends PureComponent {
  static contextType = GridContext ;
  constructor (props) {
    super(props);
    this.cellDom = createRef();
    this.editInput = createRef();

    this.state= {
      edit : false,
      edited : false,
      editValue : this.props.node[this.props.col.field]
    }

  }
  


 getValueByField(node, field) {
    if (field === undefined) {  console.error('in cell component , in getValueByfield ===> field is wrong'); debugger; return false; }
    if (Array.isArray(field)) { field = field[node.level]; }
    if (field === undefined) {  console.error('in cell component , in getValueByfield ===> field is wrong'); debugger; return false; }
    field = field.split('.');
    var value = node[field[0]];
    for (var i = 1; i < field.length; i++) {
      if (!value) { return '' }
      value = value[field[i]];
    }
    return value;
  }

  /**
   * @param {Object} node
   * @param {Event} e
   * @description toggle tree nodes by click
   */
  toggle (node, e) {
    const {Tree, data, updateRows, mapping} = this.context;

    var newData = Tree.toggleNode(data, node[mapping.id]);
    updateRows(newData)

  }
  addChild (node){
    const {Tree, data, updateRows, mapping} = this.context;
    let model = Tree.addNode(data, node[mapping.id])
     
    updateRows(model);
    
  }

  addNode (node){
  
  }

  addToggle (e){
    this.setState((prevState) => ({showAddOption : !prevState.showAddOption}))
  }

  /**
   * @param {Object} node
   * @param {Object} col
   * @descrition render cells than has child with details like icon and margins
   */
  renderChildCell (node, col){
    const { rtl, Tree, data} = this.context;
    const { showAddOption} = this.state;
    let value = this.getValueByField(node, col.field);
    let hasChild = (Tree.hasChild(node, data)) ? true : false;
    
    return (
      <div className="tree-container">
        <span style={{width: `${(node.level*15)+ (hasChild ? 0 : 30) }px` ,display: 'inline-block'}}></span>

        <span className="grid-icon add" onClick={this.addChild.bind(this, node)}>
            {icons.plus }
        </span>

        {hasChild &&
          <span onClick={this.toggle.bind(this, node)} className="grid-icon">
            {node.open ? icons.arrow_down : (rtl?icons.arrow_left :icons.arrow_right)}
          </span>
        }
        {this.getCellValue (node, col)}
      </div>
    )
  }

  /**
   * Start inline editing
   */
  startEdit (e){
    const {node} = this.props;
    const {mapping} = this.context;

    //Fix - dont let to tree container active edit
    if ($(e.target).closest('.grid-icon').length) return;
    if ($(e.target).closest('.grid-add').length) return;

    this.setState(prevState => ({edit : true}));

    setTimeout(()=>{
      let id = node[mapping.id];
      $(this.editInput.current).focus().select()
    },100)
  }
  
  /**
   * End inline editing
   */
  endEdit (e){
    const {Tree, data, updateRows} = this.context;
    const {node, col} = this.props;
    
    if (e.keyCode === 13) {
      this.updateEdit()
    }
  }

  /**
   * Update state  based of inline edit
   */
  updateEdit (){
    const {Tree, data, updateRows} = this.context;
    const {node, col} = this.props;

    this.setState(prevState => ({edit : false}));

    if(node[col.field] == this.state.editValue) return ;
    
    node[col.field] = this.state.editValue;
    updateRows(Tree.updateNode(data, node));
     this.setState(prevState => ({edited : true}));
  }

  /**
   * Change editCell value
   */
  changeEdit (e){
    const {editValue} = this.state;

    this.setState({editValue : e.target.value})
  }

  /**
   * @param {Object} node
   * @param {Object} col
   * @param {Boolean} isColumnIndex
   * @description get value of cell in grid
   */
  getCellValue (node, col, isColumnIndex){
    const {columns, treeColumnIndex} = this.context;
    
    let val = this.getValueByField(node, col.field);
    console.log('ppp',val)
    return isColumnIndex ? this.renderChildCell(node, col) : <span style={{padding:'0 8px'}}>{val}</span>
  }

  /**
   * @param {Object} node
   * @param {Object} col
   * @param {Boolean} isColumnIndex
   * @description render a editable cell when state.edit is true
   */
  renderEditCell (node, col, isColumnIndex){
    const {columns, treeColumnIndex} = this.context;
    const {editValue} = this.state;
    let val = this.getValueByField(node, col.field);

    return (
      <input 
        autofocus
        ref={this.editInput}
        onChange={this.changeEdit.bind(this)} 
        onBlur={this.updateEdit.bind(this)}
        value={editValue} 
        className="grid-input" 
      />
    )
  }

  render (){ 
    const {node, col, isColumnIndex, style, colIndex, rowIndex} = this.props;
    const {mapping} = this.context;
    const {edit, edited} = this.state;  
    
    return ( 
      <Fragment>
        {node.show &&
          <td  
            data-id={node[mapping.id]}
            data-colIndex={colIndex}
            data-rowIndex={rowIndex}
            ref={this.cellDom}
            className={`cell ${edited ? 'edited':''}`} 
            style={style} 
            onKeyUp={this.endEdit.bind(this)}
            onClick={this.startEdit.bind(this )}>
              {
                edit ? 
                this.renderEditCell (node, col, isColumnIndex): 
                this.getCellValue (node, col, isColumnIndex)
              }
          </td>
        }
      </Fragment>
    )
   
  }
}

export default Cell;
