// import React from 'react'
// import TodoList from './components/todoList/mainTodoList'
// import Login from './components/Login'

// const App = () => {
//   return (
//     <div>
//       {/* <TodoList /> */}
//       <Login />
//     </div>
//   )
// }

// export default App

import * as React from "react";
import {
  createBrowserRouter
} from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TodoList from './components/todoList/mainTodoList'

const App = createBrowserRouter([
  {
    path: "/",
    element: <TodoList />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default App

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );