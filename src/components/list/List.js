import React, { Component, useState } from "react";
import "./list.scss";
import Item from "./Item";
import status from "../../constants/status";

// class List extends Component {
//   constructor(props) {
//     super(props);
//     this.handleShowContextMenu = this.handleShowContextMenu.bind(this);
//   }

//   state = {
//     top: 0,
//     left: 0,
//     visibility: "hidden",
//     todo: {
//       id: undefined,
//       status: undefined,
//       name: "",
//     },
//   };

//   handleShowContextMenu(e, todo) {
//     this.setState({
//       top: e.clientY,
//       left: e.clientX,
//       visibility: "visible",
//       todo: {
//         ...this.state.todo,
//         ...todo,
//       },
//     });
//   }

//   handleCloseContextMenu() {
//     this.setState({
//       ...this.state,
//       top: 0,
//       left: 0,
//       visibility: "hidden",
//       todo: {
//         id: undefined,
//         status: undefined,
//         name: "",
//       },
//     });
//   }

//   handleSaveStatusTodo(status) {
//     this.setState({
//       ...this.state,
//       visibility: "hidden",
//     });
//     this.props.handleSaveTodo({
//       ...this.state.todo,
//       status: status,
//     });
//   }

//   render() {
//     const { todos } = this.props;
//     console.log("todos", todos);
//     return (
//       <>
//         <ul>
//           {todos.map((todo, key) => {
//             return (
//               <Item
//                 todo={todo}
//                 key={key}
//                 handlePrepareEdit={this.props.handlePrepareEdit}
//                 handleDelete={this.props.handleDelete}
//                 handleShowContextMenu={this.handleShowContextMenu}
//               />
//             );
//           })}
//         </ul>
//         <div
//           className={`status-context-cover ${this.state.visibility}`}
//           onClick={() => this.handleCloseContextMenu()}
//         ></div>
//         <div
//           className={`status-context-menu ${this.state.visibility}`}
//           style={{
//             top: `${this.state.top}px`,
//             left: `${this.state.left}px`,
//             transform: `${
//               window.innerHeight - this.state.top <= 150
//                 ? "translateY(-100%)"
//                 : ""
//             }`,
//           }}
//         >
//           <button
//             className={`todo-status todo`}
//             onClick={() => this.handleSaveStatusTodo(status.TODO)}
//           >
//             Todo
//           </button>
//           <button
//             className={`todo-status process`}
//             onClick={() => this.handleSaveStatusTodo(status.PROCESS)}
//           >
//             Processing
//           </button>
//           <button
//             className={`todo-status completed`}
//             onClick={() => this.handleSaveStatusTodo(status.COMPLETED)}
//           >
//             Completed
//           </button>
//         </div>
//       </>
//     );
//   }
// }

// export default List;

const List = ({ todos, handleSaveTodo, handlePrepareEdit, handleDelete }) => {
  const initContext = {
    top: 0,
    left: 0,
    visibility: "hidden",
  };

  const initTodo = {
    id: undefined,
    status: 0,
    name: "",
  };

  const [context, setContext] = useState(initContext);
  const [todoState, setTodoState] = useState(initTodo);

  const handleShowContextMenu = (e, todo) => {
    setContext({
      top: e.clientY,
      left: e.clientX,
      visibility: "visible",
    });

    setTodoState({
      ...todoState,
      ...todo,
    });
  };

  const handleCloseContextMenu = () => {
    setContext({
      ...context,
      ...initContext,
    });

    setTodoState({
      ...todoState,
      ...initTodo,
    });
  };

  const handleSaveStatusTodo = (status) => {
    setContext({
      ...context,
      visibility: "hidden",
    });

    handleSaveTodo({
      ...todoState,
      status: status,
    });
  };

  return (
    <>
      <ul>
        {todos.map((todo, key) => {
          return (
            <Item
              todo={todo}
              key={key}
              handlePrepareEdit={handlePrepareEdit}
              handleDelete={handleDelete}
              handleShowContextMenu={handleShowContextMenu}
            />
          );
        })}
      </ul>
      <div
        className={`status-context-cover ${context.visibility}`}
        onClick={() => handleCloseContextMenu()}
      ></div>
      <div
        className={`status-context-menu ${context.visibility}`}
        style={{
          top: `${context.top}px`,
          left: `${context.left}px`,
          transform: `${
            window.innerHeight - context.top <= 150
              ? "translateY(-100%)"
              : ""
          }`,
        }}
      >
        <button
          className={`todo-status todo`}
          onClick={() => handleSaveStatusTodo(status.TODO)}
        >
          Todo
        </button>
        <button
          className={`todo-status process`}
          onClick={() => handleSaveStatusTodo(status.PROCESS)}
        >
          Processing
        </button>
        <button
          className={`todo-status completed`}
          onClick={() => handleSaveStatusTodo(status.COMPLETED)}
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default List;
