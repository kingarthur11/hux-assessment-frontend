import React from 'react'
import axios from "axios";

const DeleteModal = ({ closeModal, todoId, getTodos }) => {
  const deleteTodo = async () => {
    try {
        await axios.delete(`https://todo-backend-1uso.onrender.com/api/todo/delete/${todoId}`);
        closeModal();
        getTodos()
    } catch (error) {
        closeModal();
        getTodos()
        console.error('Error:', error.message);
    }
  };
  return (
    <div tabIndex="-1" style={{ display: "block" }} className="modal fade show" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this task</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                <button onClick={deleteTodo} type="submit" className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DeleteModal