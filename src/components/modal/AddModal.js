import React, { useState, useEffect } from 'react';
import axios from "axios";
import FormValidation, { validate } from "../utility/FormValidation";
import './styleModal.css'
import { ToastContainer, toast } from 'react-toastify';
import { authHeader, headers } from "../../redux/headers";

const AddModal = ({ closeModal, getContacts }) => {
    const { errors, values, onInputChange, handleSubmit, isSubmitted } =
            FormValidation(validate);
    const [loading, setIsLoading] = useState(false);
    const notify = () => toast("Weldone, you have successfully added a contact");
    const token = JSON.parse(localStorage.getItem("token"));

    const onFormSubmit = async (obj) => {
        setIsLoading(true);
        try {
            await axios.post('http://localhost:8000/api/user-contact', obj, {
                headers: authHeader(token),
              });
            notify()
            getContacts()
            closeModal();
            setIsLoading(false);
        } catch (error) {
            closeModal();
            console.error('Error:', error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (Object.keys(errors).length == 0 && isSubmitted) {
          onFormSubmit(values);
        }
      }, [errors]);

    return (
        <div tabIndex="-1" style={{ display: "block" }} className="modal fade show" id="addModal" aria-labelledby="exampleModalLabel" aria-hidden="false">
             <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add Contact</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <ToastContainer />
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <input value={values.fname} onChange={(e) => onInputChange(e)} name="fname" type="text" className="form-control" placeholder="First Name" />
                                {errors && errors.fname ? (
                                    <div className="style-error">{errors.fname}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <input value={values.lname} onChange={(e) => onInputChange(e)} name="lname" type="text" className="form-control" placeholder="Last Name" />
                                {errors && errors.lname ? (
                                    <div className="style-error">{errors.lname}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                            <div className="mb-3">
                                <input value={values.phoneNumber} onChange={(e) => onInputChange(e)} name="phoneNumber" type="text" className="form-control" placeholder="Phone Number" />
                                {errors && errors.phoneNumber ? (
                                    <div className="style-error">{errors.phoneNumber}</div>
                                    ) : (
                                    <div className=""></div>
                                    )}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                            {
                                loading ? <button className="loading-btn" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button> :
                                <button type="submit" className="add-btn">Submit</button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddModal;
