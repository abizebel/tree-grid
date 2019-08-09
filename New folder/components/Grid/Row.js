import React, {Component, Fragment} from 'react';
import GridContext from './GridContext';
import Cell from './Cell';

class Row extends Component {
  static contextType = GridContext ;
  constructor (props) {
    super(props);

  }
  render (){ 
    const {columns, treeColumnIndex} = this.context;
    const {node, rowIndex} = this.props;

    return columns.map((col, i) => {

      let style = (col.align) ? {textAlign : col.align} : {};
      let isColumnIndex = (i== treeColumnIndex);

      return ( 
        <Cell  
          colIndex={i}
          rowIndex={rowIndex}
          key={i} 
          node={node} 
          col={col} 
          isColumnIndex={isColumnIndex} 
          style={style} 
        />   
      )
    })
  }
}

export default Row;