import React, { useState, useEffect } from 'react';
import FormValidation, { validate } from "../utility/FormValidation";
import './styleModal.css'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const EditModal = ({ closeModal, todoId, todo, getTodos }) => {
    const { errors, values, onInputChange, handleSubmit, isSubmitted, setValues } =
            FormValidation(validate);
    const [loading, setIsLoading] = useState(false);
    const notify = () => toast("Weldone, you have successfully added a todo");

    const onFormSubmit = async (formData) => {
        setIsLoading(true);
        try {
            await axios.put(`https://todo-backend-1uso.onrender.com/api/todo/update/${todoId}`, formData);
            notify()
            closeModal();
            getTodos()
            setIsLoading(false);
        } catch (error) {
            closeModal();
            getTodos()
            console.error('Error:', error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (todo) setValues(todo);
    }, [todo]);

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
                        <h5 className="modal-title">Edit Contacts</h5>
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
                                <input value={values.phoneNumber} onChange={(e) => onInputChange(e)} name="fname" type="text" className="form-control" placeholder="Phone Number" />
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
                                loading ? <button class="btn btn-primary" type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
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

export default EditModal;
