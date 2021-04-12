import React from "react";
import Table from "./Table";
import List from "./List";
import "./App.css"


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonClicked: "",
      assignments: [],
      students: [],
      grades: {},
    };

    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.addStudent = this.addStudent.bind(this);
    this.addGrade = this.addGrade.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.deleteTable = this.deleteTable.bind(this);
    this.deleteRow= this.deleteRow.bind(this)
  }

  handleButtonClicked(buttonName) {
    this.setState({
      buttonClicked: buttonName
    });
  }

  addAssignment(assignmentName) {
    this.setState({
      assignments: this.state.assignments.concat(assignmentName),
    });
   
  }

  addStudent(studentName) {
    this.setState({
      students: this.state.students.concat(studentName)
    });
  }
  

  deleteAssignment(index) {
   let assignments = [...this.state.assignments]
   assignments.splice(index,1)
    this.setState({assignments})
  }

  deleteStudent(index) {
  
  let students = [...this.state.students]
  students.splice(index,1)
     this.setState({students})
   }



  addGrade(assignment, student, score) {
    let grades = this.state.grades;
    let assignmentName = assignment;
    let studentName = student;
    if (!(assignment in grades)) {
      grades[assignmentName] = {};
    }
    grades[assignmentName][studentName] = score;
    this.setState({ grades: grades});
  }

   deleteRow (index) {
    let students = [...this.state.students]
    students.splice(index,1)
    this.setState({students})
   }

  deleteTable(index){
    let assignments = [...this.state.assignments]
    assignments.splice(index,1)
     this.setState({assignments})
  }


  render() {
    let tabChoice = <div />;
    if (this.state.buttonClicked === "assignments") {
      tabChoice = (
        <List
          placeholder="Add Assignment..."
          currList={this.state.assignments}
          deleteItem={this.deleteAssignment}
          addFunction={this.addAssignment}
          title="Assignments"
        />
      );
    }


    if (this.state.buttonClicked === "students") {
      tabChoice = (
        <List
          placeholder="Add Student..." 
          currList={this.state.students}
          addFunction={this.addStudent}
          deleteItem={this.deleteStudent}
          title="Student Roster"
        />
      );
    }

    if (this.state.buttonClicked === "grades") {
      tabChoice = (
        <Table
        tableNames={this.state.assignments}
        rows={this.state.students}
        deleteTable={this.deleteTable}
        deleteRow={this.deleteRow}
        addFunction={this.addGrade}
        data={this.state.grades}
        />
        );
    }

    return (
      <div>
        <div className="Box Box--spacious f4">
          <div className="Box-header">
            <h3 className="Box-title d-flex flex-justify-center">GradeBook</h3>
          </div>
        </div>
        <nav className="d-flex flex-justify-center">
          <div className="UnderlineNav-body pt-6">
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("assignments")}
            >
              Assignments
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("students")}
            >
              Students
            </button>
            <button
              className="btn btn-primary"
              onClick={() => this.handleButtonClicked("grades")}
            >
              Grades
            </button>
          </div>
        </nav>
        {tabChoice}
      </div>
    );
  }
}

export default App;