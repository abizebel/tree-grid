import React, {Component, Fragment} from 'react';
import GridContext from './GridContext';
import Row from './Row';
import $ from 'jquery'
class Rows extends Component {
  static contextType = GridContext ;

  constructor (props){
    super(props);
  }

  renderColGroups (){
    const {columns} = this.context;

    return columns.map((col, i) => {
      let style = col.width ? {width : col.width} : {};
      return (<col key={i} style={style} />);
    });
  }


  render (){
    const {data, rtl, Tree, mapping} = this.context;

    return (
      <div className="grid-content">
        <div style={{height: '500px', overflowY: 'scroll'}}>
          <table style={{direction : rtl ? 'rtl' : 'ltr'}} className="grid-table" cellSpacing="0.25px" >

            <colgroup>
              {this.renderColGroups()}
            </colgroup>

            <tbody>
              {Tree.traverseTree(data ,(node, i) => {
                return (
                  <tr key={node[mapping.id]}> 
                    <Row node={node} rowIndex={i} /> 
                  </tr>)
                })}
            </tbody>

          </table> 
        </div> 
      </div>              
    )
  }
}


export default Rows