import React from "react";
import './navbar.css'
import Avatar from "@mui/material/Avatar";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { useSelector, useDispatch, connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../../redux/actions/authActions";


const Navbar = ({ callback, isToggled }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, isAuth } = useSelector((state) => state.auth);
  const logout = () => dispatch(logOut(navigate));

  return (
    <div className="style-navbar">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-between">

          <div>
            <h3>HuxProject</h3>
          </div>
        </div>
        <div>
          <ul className="list-unstyled d-flex align-items-center justify-content-start">
            <li className="d-none d-sm-block">
            </li>
            <li className="d-none d-sm-block list-avater">
              <Avatar sx={{ bgcolor: deepPurple[500] }}>
                {(login && login?.name).charAt(0).toUpperCase()}
              </Avatar>
            </li>
            <li>
              <div>
                <p>Hello</p>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {(login && login?.name).toUpperCase()}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li onClick={logout}><a className="dropdown-item" href="#">Logout</a></li>
                  </ul>
                </li>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

