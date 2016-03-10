'use strict'

const App = React.createClass({
  getInitialState:function(){
    // overall application state
    return {tasks:{}}
  },
  componentDidMount:function() {
   // this is where you'll get the data from the 'db'
   $.get('/tasks').done( (data)=>{
      this.state.tasks=data;
      this.setState({tasks:this.state.tasks})
    })
  },
  addTask:function( newTask ) {
    // generate a new timestamp so that we have a unique id for each task
    var timestamp = (new Date()).getTime();

    // add new task to state
    this.state.tasks['task-'+ timestamp] = newTask;

    this.setState({ tasks: this.state.tasks });

  },
  toggleTask:function(key){
    this.state.tasks[key].completed = !this.state.tasks[key].completed;
    this.setState({tasks:this.state.tasks});
  },


  filterComplete:function(key){
    return this.state.tasks[key].completed
  },
  filterNotComplete:function(key){
    return !this.filterComplete(key)
  }, 
  renderTask:function(key){
    return (
      <Task key={key} index={key} details={this.state.tasks[key]} toggleTask={this.toggleTask} />
    )
  },

  render:function() {
    return (
      <div className="container">
      
        <div className="row">
          <section className="col s12">
          
            {/*to do unfinished tasks*/}
            <section id="todo-display" className="col s7">
              <ul className="collection with-header">
                <li className="collection-header"><h4>Tasks</h4></li>
                {/*open tasks here*/}
                {Object.keys(this.state.tasks)
                  .filter(this.filterNotComplete)
                  .map( this.renderTask )}
              </ul>
            </section>

            {/* TO DO FORM*/}
            <section id="todo-form" className="col s5">
              <aside className="card-panel">
                <CreateTaskForm addTask={this.addTask}/>
              </aside>
            </section>

          </section>
        </div>
        <div className="row">

          {/*Complete tasks*/}
          <section id="todo-display-complete" className="col s12">
            <ul className="collection with-header">
                <li className="collection-header"><h4>Completed Tasks</h4></li>
                {/*complete tasks go here*/}
                {Object.keys(this.state.tasks)
                  .filter(this.filterComplete)
                  .map( this.renderTask )}
              </ul>

            </section>
        </div>
      </div>)
  }

});

const CreateTaskForm = React.createClass({
  handleSubmit:function(event) {
    event.preventDefault();
    var task = {
      name : this.refs.name.value,
      completed:false,
      desc: this.refs.desc.value
    }

    // add the task to the state
    this.props.addTask(task);
    
    // clear the form
    this.refs.taskForm.reset();

  },
  render:function() {
    return (
      <form className="task-edit" ref="taskForm" onSubmit={this.handleSubmit}>
        <h3>Create a new task</h3>

        <div className="row">
          <div className="input-field col s4">
            <label htmlFor="task_name">Task Name</label>
            <input type="text"  id="task_name" ref="name" />
          </div>
          <div className="input-field col s8">
            <label htmlFor="task_desc">Task Description</label>
            <input type="text"  id="task_desc" ref="desc" />
          </div>
        </div>
        <div className="row">
          <button className="btn waves-effect waves-light col s6" type="submit" name="action">Add Task</button>
        </div>


      </form>
    )
  }
});


const Task = React.createClass({
  handleClick:function(event) {
    event.preventDefault();
    this.props.toggleTask(this.props.index);
  },

  render:function() {
    return (
      <li className="collection-item">
        <div>
          <strong>{this.props.details.name}</strong> {this.props.details.desc}
          <a href="#" onClick={this.handleClick} className="secondary-content">
            <i className="material-icons">check</i>
          </a>
        </div>
      </li>
  )
  }
});


ReactDOM.render(<App />, document.querySelector('#container'))





