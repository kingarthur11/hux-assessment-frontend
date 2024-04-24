import React from 'react'
import axios from "axios";
import { authHeader, headers } from "../../redux/headers";

const DeleteModal = ({ closeModal, contactId, getContacts, currentPage }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(contactId)
  const deleteContact = async () => {
    try {
        await axios.delete(`http://localhost:8000/api/user-contact/${contactId}`, {
          headers: authHeader(token),
        });
        closeModal();
        getContacts(currentPage)
    } catch (error) {
        closeModal();
        getContacts(currentPage)
        console.error('Error:', error.message);
    }
  };
  return (
    <div tabIndex="-1" style={{ display: "block" }} className="modal fade show" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Contact</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this contact</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                <button onClick={deleteContact} type="submit" className="btn btn-primary">Delete</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DeleteModal