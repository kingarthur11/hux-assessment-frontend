import React, {useState, useEffect} from 'react';
import './contactlist.css';
import AddModal from '../modal/AddModal';
import DeleteModal from '../modal/DeleteModal';
import EditModal from '../modal/EditModal';
import axios from "axios";
import Navbar from '../utility/Navbar';
import { authHeader, headers } from "../../redux/headers";
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/material/Stack';



const mainContactList = () => {
    const [addModalVisible, setAddModalVisible] = useState(false);
      const [editModalVisible, setEditModalVisible] = useState(false);
      const [deleteModalVisible, setDeleteModalVisible] = useState(false);
      const [contactId, setContactId] = useState(0);
      const [contact, setContact] = useState(0);
      const [currentPage, setCurrentPage] = useState(1);
      const [total, setTotal] = useState(0);

      const [isLoading, setIsLoading] = useState(false);
      const token = JSON.parse(localStorage.getItem("token"));
      
    
      
      const [formData, setFormData] = useState([])
        const openModal = (value, id) => {
          if (value === 'add') {
            setAddModalVisible(true);
          }
          if (value === 'edit') {
            id > 1 ? setContactId(id) : 0
            setEditModalVisible(true);
          } 
          if (value === 'delete') {
            id > 1 ? setContactId(id) : 0
            setDeleteModalVisible(true);
          } 
        };
        const closeModal = () => {
          setAddModalVisible(false);
          setEditModalVisible(false);
          setDeleteModalVisible(false);
        };
       
        const getContacts = async (page) => {
            setIsLoading(true)
            console.log(token)
            try {
                const response = await axios.get(`http://localhost:8000/api/user-contact?page=${page}`, {
                    headers: authHeader(token),
                  });
                const { data } = response.data
                setTotal(data.last_page)
                setContactId(0)
                setFormData(data.data)
                setIsLoading(false)
            } catch (error) {
                console.error('Error:', error.message);
                setIsLoading(false)
            }
        };
        const getContact = async () => {
          try {
              const response = await axios.get(`http://localhost:8000/api/user-contact/${contactId}`, {
                headers: authHeader(token),
              });
              const { data } = response
              setContact(data.data)
              console.log(data)
          } catch (error) {
              console.error('Error:', error.message);
          }
      };

    const handleChange = (e, value) => {
        {
                setCurrentPage(value)
        }
    }

      useEffect(() => {
        getContacts(currentPage)
      }, [currentPage]);

      useEffect(() => {
        contactId > 1 ? getContact(contactId) : 0
      }, [contactId]);

  return (
    <div className='brg-color'>
        <Navbar />
        <div className="d-sm-flex align-items-center justify-content-between container header-text py-3">
            <div>
                <h3>List of Contacts</h3>
            </div>
            <button onClick={() => openModal('add')} type="button" className="add-btn">
            Add Contact <i className="bi bi-plus-circle"></i>
            </button>
        </div>
        {addModalVisible && <AddModal closeModal={closeModal} getContacts={getContacts} currentPage={currentPage} />}
        {editModalVisible && <EditModal closeModal={closeModal} contactId={contactId} contact={contact} getContacts={getContacts} currentPage={currentPage}/>}
        {deleteModalVisible && <DeleteModal closeModal={closeModal} contactId={contactId} contact={contact} getContacts={getContacts} currentPage={currentPage} />}
       
        {
            isLoading ? 
            <div className='container'>
                <div className="spinner-border" style={{width: "3rem", height: "3rem", color: "#ffffff"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div className="spinner-grow" style={{width: "3rem", height: "3rem", color: "#ffffff"}} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
             : 
            <div className='list-cards container'>
                {
                    formData && formData.length > 0 ?
                    <>
                        {formData && formData.map(
                            (content, index) => (
                                <div key={index}>
                                    <li className="list-group-item border-0 d-flex p-4 mb-4 bg-gray-100 border-radius-lg">
                                        <div className="d-flex flex-column">
                                            <span className="mb-2 text-xs">First Name: <span className="text-dark font-weight-bold ms-sm-2 capitalize-text">{content.fname}</span></span>
                                            <span className="mb-2 text-xs">Last Name: <span className="text-dark font-weight-bold ms-sm-2 capitalize-text">{content.lname}</span></span>
                                            <span className="mb-2 text-xs">Phone number: <span className="text-dark font-weight-bold ms-sm-2 capitalize-text">{content.phoneNumber}</span></span>
                                        </div>
                                        <div className="ms-auto text-end">
                                            <i className="bi bi-pencil px-2 mb-0" onClick={() => openModal('edit', content?.id)}></i>
                                            <i className="bi bi-trash px-2 mb-0" onClick={() => openModal('delete', content?.id)}></i>
                                        </div>
                                    </li>
                                </div>
                               
                            )
                        )}
                    </> :
                    <fragment>
                        <h3>No contacts to display</h3>
                    </fragment>
                }
                <Stack sx={{justifyContent: 'center'}} spacing={2}>
                    <Pagination page={currentPage} count={total} shape='rounded' onChange={handleChange} />
                </Stack>
            </div>
        }
        
    </div>
  )
}

export default mainContactList
