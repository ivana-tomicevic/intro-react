import React from "react";
import { MdDelete } from "react-icons/md";


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      results: []
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.setState({
      results: this.props.rows 
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      results: nextProps.rows
    });
  }

  handleSearch(e) {
      let table = [];
      let newTable = [];
      if (e.target.value !== "") {
        table = this.props.rows;
        newTable = table.filter(item => {
          const lc = item.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter);
        });
      } else {
        newTable = this.props.rows;
      }
      this.setState({
        results: newTable
      });
    }

  getValue(data, tableName, row) {
    if (tableName in data && row in data[tableName]) {
      return data[tableName][row];
    } else {
      return "Add Score";
    }
  }

  createRows(name) {
    return (
      <div>
        {this.state.results.map((row, index) => (
          <div className="Box-row d-flex flex-justify-between" id={row.id} key={index}>
            {row}
            <span onClick={() => this.props.deleteRow(index)}  style={{ fontSize: "20px"}}><MdDelete/></span>
            <input
              className="form-control input-sm"
              type="text"
              placeholder={this.getValue(this.props.data, name, row)}
              onChange={event =>
                this.props.addFunction(name, row, event.target.value)
              }
            />
          </div>
        ))} 
      </div>
    );
  }
  render() {
   
    return (
      <div className="Box-row flex-justify-between">
       <label>
            <input
              className="form-control input-lg"
              type="text"
              placeholder={"Search..."}
              onChange={this.handleSearch}
            />
          </label>
        {this.props.tableNames.map((name,index) => (
          <div className="pt-6" key={index}>
            <div className="Box col-6 mx-auto">
              <div className="Box-header Box-title">{name}
              <span onClick={() => this.props.deleteTable(index)} style={{ fontSize: "20px", float: "right"}}><MdDelete/></span>
             </div>
              <div>{this.createRows(name)}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;