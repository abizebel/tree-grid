import React, {Component} from 'react';
import GridContext from './GridContext';


class Header extends Component {
  static contextType = GridContext;

  constructor (props){
    super(props)
  }

  renderColGroups (){
    const {columns} = this.context;
    return columns.map((col, i) => {
      let style = col.width ? {width : col.width} : {};
      return (<col key={i} style={style} />)
    })
  }

  renderHeaders (){
    const {columns} = this.context;

    return columns.map((col, i) => {
      let style = col.align ? {textAlign : col.align} : {};
      return (
        <th key={i} className="header-cell">
          <div style={style}>
            <span >{col.text}</span>
          </div>
        </th>
      )
    })
  }

  render (){
    const {rtl} = this.context;

    return (
      <div className="grid-header" style={{paddingRight: '16px'}}>
        <div className="header-content">
          <table style={{direction : rtl ? 'rtl' : 'ltr'}} className="table" cellSpacing="0.25px" >
            <colgroup>{this.renderColGroups()}</colgroup>
           <thead><tr>{this.renderHeaders()}</tr></thead>
          </table>    
        </div>
      </div>
    )
  }
}


export default Header;
