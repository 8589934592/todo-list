import React, { Component, useEffect, useState } from "react";
import List from "../list/List";
import "./form.scss";

// class Form extends Component {
//   state = {
//     id: undefined,
//     name: "",
//     status: 0,
//   };

//   handleChange(e) {
//     this.setState({
//       ...this.state,
//       name: e.target.value,
//     });
//   }

//   componentDidUpdate(preveProps, preState) {
//     if (preveProps.check !== this.props.check) {
//       this.setState({
//         ...this.state,
//         id: this.props.todo.id,
//         name: this.props.todo.name,
//         status: this.props.todo.status,
//       });
//     }
//   }

//   handleChangeFormToSave() {
//     this.state({
//       id: undefined,
//       name: '',
//       status: 0
//     })
//   }

//   render() {
//     return (
//       <div className="todo-form">
//         {this.state.id && (
//           <button
//             className="edit-tag"
//             onClick={() => this.handleChangeFormToSave()}
//           >
//             EDIT: {this.props.todo.name}
//           </button>
//         )}
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             this.props.handleSaveTodo(this.state);
//           }}
//         >
//           <input
//             type="text"
//             placeholder=" "
//             name="name"
//             onChange={(e) => this.handleChange(e)}
//             value={this.state.name}
//           />
//           <button className="todo-save" placeholder="Input todo" type="submit">
//             SAVE
//           </button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Form;

const Form = ({ handleSaveTodo, todo }) => {
  const initTodo = {
    id: undefined,
    name: "",
    status: 0,
  };

  const [todoState, setTodoState] = useState(initTodo);

  const handleChange = (e) => {
    setTodoState({
      ...todoState,
      name: e.target.value,
    });
  };

  useEffect(() => {
    setTodoState({
      ...todoState,
      id: todo.id,
      name: todo.name,
      status: todo.status,
    });
  }, [todo]);

  const handleChangeFormToSave = () => {
    setTodoState(initTodo);
  };

  return (
    <div className="todo-form">
      {todoState.id && (
        <button className="edit-tag" onClick={() => handleChangeFormToSave()}>
          EDIT: {todo.name}
        </button>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveTodo(todoState);
        }}
      >
        <input
          type="text"
          placeholder=" "
          name="name"
          onChange={(e) => handleChange(e)}
          value={todoState.name}
        />
        <button className="todo-save" placeholder="Input todo" type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
};

export default Form;
