/* eslint-disable jsx-a11y/aria-role */
import React, { Component } from "react";

class App extends Component {

  /**
 * keep this following data as default data in agenda details as it is required for testing
 * [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
 */

  state = {
    // your data goes here
    Agenda: true,
    disableAddBtn: true,
    disableSubmitBtn: true,
    newTitle: "",
    newDescription: "",
    newTopic: "",
    newTopics: [],
    data: [
      {
        title: "Angular",
        description: "Some description about the angular",
        topics: ["Introduction", "Typescript", "Why Angular?", "Understanding Versions", "Fundamentals"]
      },
      {
        title: "Vue",
        description: "Some description about the vue",
        topics: ["Introduction", "Javascript", "Why Vue?", "Vue Bindings", "Component Interaction"]
      },
    ],
  }

  // your methods goes here
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    if (this.state.newTopic.trim().length !== 0) {
      this.setState({
        disableAddBtn: false,
      });
    } else {
      this.setState({
        disableAddBtn: true,
      });
    }

  //   if (this.state.newTitle.trim().length !== 0 && this.state.newDescription.trim().length !== 0 && this.state.newTopics.length !== 0) {
  //     this.setState({
  //       disableSubmitBtn: false,
  //     });
  //   } else {
  //     this.setState({
  //       disableSubmitBtn: true,
  //     });
  //   }
  // }
  
  if (this.state.newTopics.length !== 0) {
      this.setState({
        disableSubmitBtn: false,
      });
    } else {
      this.setState({
        disableSubmitBtn: true,
      });
    }
  }

  handleButtonClick = (e) => {
    const { name } = e.target;
    this.setState({
      [name]: !this.state[name],
    });
  }

  addTopic = () => {
    const { newTopic, newTopics } = this.state;
    this.setState({
      newTopics: [...newTopics, newTopic],
      newTopic: "",
      disableAddBtn: true,
      disableSubmitBtn: false,
    });
  }

  handleSubmit = () => {
    const { newTitle, newDescription, newTopics } = this.state;
    const newData = {
      title: newTitle,
      description: newDescription,
      topics: newTopics,
    };
    this.setState({
      data: [...this.state.data, newData],
      newTitle: "",
      newDescription: "",
      newTopics: [],
      disableSubmitBtn: true,
    });
  }

  render() {
    return (
      <div>
        <h1 className="mx-5 mb-5">Agenda Manager</h1>
        {/* show/hide this following add agenda template */
          this.state.Agenda &&
          <div className="container" role="addAgenda">
            <button onClick={(e) => { this.handleButtonClick(e) }} name="Agenda" className="btn btn-info" role="goToView">Click To View Agenda</button>
            <form>
              <div className="my-3">
                <label className="form-label">Title</label>
                {/* title */}
                <input value={this.state.newTitle} onChange={(e) => this.handleChange(e)} type="text" name="newTitle" placeholder="Enter the title" className="form-control" role="inputTitle" />
                <small className="text-danger" data-testid="invalidTitle">
                  {/**
                   * show empty string if title input is valid
                   * else show 'Title is required'
                   */
                    this.state.newTitle !== "" ? this.state.newTitle.trim().length === 0 ? "Title is required" : "" : ""
                  }
                </small>
              </div>
              <div className="my-3">
                <label className="form-label">Description</label>
                {/* description */}
                <input value={this.state.newDescription} onChange={(e) => this.handleChange(e)} type="text" name="newDescription" placeholder="Enter the description" className="form-control" role="inputDescription" />
                <small className="text-danger" data-testid="invalidDescription">
                  {/**
                   * show empty string if description input is valid
                   * else show 'Description is required'
                   */
                    this.state.newDescription !== "" ? this.state.newDescription.trim().length === 0 ? "Description is required" : "" : ""
                  }
                </small>
              </div>
              <div className="my-3 w-50">
                <label className="form-label">Enter topic</label>
                {/* topic */}
                <input value={this.state.newTopic} onChange={(e) => this.handleChange(e)} type="text" name="newTopic" placeholder="Enter the topic" className="form-control" role="inputTopic" />
                <small className="text-danger" data-testid="invalidTopic">
                  {/**
                    * show empty string if topic input is valid
                    * else show 'Topic is required'
                    */
                    this.state.newTopic !== "" ? this.state.newTopic.trim().length === 0 ? "Topic is required" : "" : ""
                  }
                </small>
              </div>
              {/* on click should add topics and disable the button if invalid topic */}
              <button onClick={() => this.addTopic()} disabled={this.state.disableAddBtn} className="btn btn-success addAlign" role="addTopicBtn">+ Add Topic</button>
              {/* on click should add agenda details and disable the button if invalid inputs */}
              <button onClick={()=>{this.handleSubmit()}} disabled={this.state.disableSubmitBtn} className="btn btn-success submitAlign" role="submitAgendaBtn">Submit Agenda</button>
            </form>
            {/* show if no topics added yet */
              this.state.newTopics.length === 0 &&
              <div className="text-danger ml-2 mt-5" data-testid="noTopicsMsg">
                No Topics Added
              </div>
            }
            {/* display the list of topics added using li */
              this.state.newTopics.length > 0 &&
              <div className="card my-3">
                <div className="card-header">Added Topics</div>
                <div className="card-body">
                  <ul className="list-group">
                    {this.state.newTopics.map((topic, index) => {
                      return <li key={index} className="list-group-item" role="topicList">{/* topics list */ topic}</li>
                    })}
                  </ul>
                </div>
                <div className="card-footer">Refer the topics you added</div>
              </div>
            }
          </div>
        }
        {/* show/hide this following view agenda template */
          !this.state.Agenda &&
          <div className="container" role="viewAgenda">
            <button onClick={(e) => { this.handleButtonClick(e) }} name="Agenda" className="btn btn-info" role="goToAdd">Click To Add Agenda</button>
            {/* iterate the agenda details to display */
              this.state.data.map((item) => {
                return <div className="card my-3" role="cards">
                  <div className="card-header">
                    {/* {title} */ item.title}
                  </div>
                  <div className="card-body">
                    <ul className="list-group">
                      {/* iterate the topics to display */
                        item.topics.map((topic, index) => {
                          return <li key={index} className="list-group-item">
                            {/* {topic} */ topic}
                          </li>
                        })}
                    </ul>
                  </div>
                  <div className="card-footer">
                    {/* {description} */ item.description}
                  </div>
                </div>
              })}
          </div>
        }
      </div>
    );
  }

}

export default App;
