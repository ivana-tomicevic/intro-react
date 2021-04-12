import React from "react";
import { MdDelete } from "react-icons/md";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      filtered: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.currList 
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.currList
    });
  }

  handleSearch(e) {
      let list = [];
      let newList = [];
      if (e.target.value !== "") {
        list = this.props.currList;
        newList = list.filter(item => {
          const lc = item.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter);
        });
      } else {
        newList = this.props.currList;
      }
      this.setState({
        filtered: newList
      });
    }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({
      value: ""
    });

    this.props.addFunction(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="col-7 mx-auto">
        <label  >
            <input
              className="form-control input-lg"
              type="text"
              placeholder="Search..."
              onChange={this.handleSearch}
            />
          </label>
        <p className="h2">{this.props.title}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              className="form-control input-sm"
              type="text"
              placeholder={this.props.placeholder}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input className="btn btn-sm" type="submit" value="Submit" />
        </form>
        <ul className="Box">
          <div className="Box-header">{this.props.title}</div>
          {this.state.filtered.map((item,index) => (
            <li className="Box-row" key={index}>
              {item}
              <span onClick={() => this.props.deleteItem(index)} style={{ fontSize: "20px", float: "right"}}><MdDelete/></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default List;