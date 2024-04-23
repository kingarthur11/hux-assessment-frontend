import React, {useState, useEffect} from 'react';
import './todolist.css';
import AddModal from '../modal/AddModal';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';
import axios from "axios";

const mainTodoList = () => {
    const [addModalVisible, setAddModalVisible] = useState(false);
      const [editModalVisible, setEditModalVisible] = useState(false);
      const [deleteModalVisible, setDeleteModalVisible] = useState(false);
      const [todoId, setTodoId] = useState(0);
      const [todo, setTodo] = useState(0);
      const [isLoading, setIsLoading] = useState(false);
    
      
      const [formData, setFormData] = useState([])
        const openModal = (value, id) => {
          if (value === 'add') {
            setAddModalVisible(true);
          }
          if (value === 'edit') {
            id > 1 ? setTodoId(id) : 0
            setEditModalVisible(true);
          } 
          if (value === 'delete') {
            id > 1 ? setTodoId(id) : 0
            setDeleteModalVisible(true);
          } 
        };
        const closeModal = () => {
          setAddModalVisible(false);
          setEditModalVisible(false);
          setDeleteModalVisible(false);
        };
       
        const getTodos = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get('https://todo-backend-1uso.onrender.com/api/todo/getall');
                const { data } = response
                setFormData(data.todo)
                setIsLoading(false)
            } catch (error) {
                console.error('Error:', error.message);
                setIsLoading(false)
            }
        };
        const getTodo = async () => {
          try {
              const response = await axios.get(`https://todo-backend-1uso.onrender.com/api/todo/getone/${todoId}`);
              const { data } = response
              setTodo(data.todo)
              console.log(data)
          } catch (error) {
              console.error('Error:', error.message);
          }
      };
      useEffect(() => {
        getTodos()
      }, []);
      useEffect(() => {
        todoId > 1 ? getTodo(todoId) : 0
      }, [todoId]);
  return (
    <div className='brg-color'>
        <div className="d-sm-flex align-items-center justify-content-between container header-text py-3">
            <div>
                <h3>List of Contacts</h3>
            </div>
            <button onClick={() => openModal('add')} type="button" className="add-btn">
            Add Contact <i className="bi bi-plus-circle"></i>
            </button>
        </div>
        {addModalVisible && <AddModal closeModal={closeModal} getTodos={getTodos} />}
        {editModalVisible && <EditModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos}/>}
        {deleteModalVisible && <DeleteModal closeModal={closeModal} todoId={todoId} todo={todo} getTodos={getTodos} />}
       
        {
            isLoading ? 
            <div className='container'>
                <div class="spinner-border" style={{width: "3rem", height: "3rem", color: "#ffffff"}} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-grow" style={{width: "3rem", height: "3rem", color: "#ffffff"}} role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
             : 
            <div className='list-cards container'>
                {
                    formData.length > 0 ?
                    <>
                        {formData && formData.map(
                            (content, index) => (
                                <div key={index}>
                                    <li class="list-group-item border-0 d-flex p-4 mb-4 bg-gray-100 border-radius-lg">
                                        <div class="d-flex flex-column">
                                            <span class="mb-2 text-xs">First Name: <span class="text-dark font-weight-bold ms-sm-2">Viking Burrito</span></span>
                                            <span class="mb-2 text-xs">Last Name: <span class="text-dark font-weight-bold ms-sm-2">Viking Burrito</span></span>
                                            <span class="mb-2 text-xs">Phone number: <span class="text-dark font-weight-bold ms-sm-2">Viking Burrito</span></span>
                                        </div>
                                        <div class="ms-auto text-end">
                                            <i className="bi bi-pencil px-2 mb-0" onClick={() => openModal('edit', content?._id)}></i>
                                            <i className="bi bi-trash px-2 mb-0" onClick={() => openModal('delete', content?._id)}></i>
                                        </div>
                                    </li>
                                </div>
                            )
                        )}
                    </> :
                    <fragment>
                        <h3>No todos to display</h3>
                    </fragment>
                }
            </div>
        }
        
    </div>
  )
}

export default mainTodoList