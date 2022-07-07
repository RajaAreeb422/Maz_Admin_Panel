import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";

import { useState, useEffect } from 'react';

import './adduser.scss';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import router from 'next/router';
import { AirlineSeatIndividualSuite } from '@material-ui/icons';
//import {toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//toast.configure();

const AddUserPage = memo(props => {
  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    type: 'admin',
    phone: '',
    mobile: '',
    date_of_birth: '',
  });

  
  const [file, setFile] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [mydiv, setDiv] = useState(false);

  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    mobile,
    date_of_birth,
  } = state;
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const [errormodal, setErrorModal] = React.useState(false);
  const errortoggle = () => setErrorModal(!errormodal);
  useEffect(() => {}, []);

  const submitHandler = e => {
    e.preventDefault();
    console.log(state);
    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/users/adminSignUp`,
        state,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        toggle()
        
        console.log("respoooos",response);
      })
      .catch(error => {
        console.log('error',error)
        setError('This email already exists')
        setDiv(true)
        errortoggle()
        console.log(error);
      });
  };

  const handleChange = names => e => {
   
    const name = e.target.name;
    console.log(name);
    const value = e.target.value;
    console.log(value);
    setState({
      ...state,
      [name]: value,
    });
  };
  const move = ()  => {
    router.push('/users/Users')
  }
  // className="newUserForm"

  const PostCategory = () => (
    <div className="main">
      <div className="newUser">
        <h1 className="newUserTitle">Create User</h1>
        <form  onSubmit={submitHandler}>
          <div className="newUserItem">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                placeholder="First Name"
                className="form-control"
                name="first_name"
                required
                value={state.first_name}
                onChange={handleChange('first_name')}
              />
            </div>
          </div>
          <div className="newUserItem">
            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                name="last_name"
                value={state.last_name}
                className="form-control"
                required
                placeholder="Last name"
                onChange={handleChange('last_name')}
              />
            </div>
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                value={state.date_of_birth}
                placeholder="Birthday"
                name="date_of_birth"
                required
                onChange={handleChange('date_of_birth')}
                className="form-control"
              />
            </div>
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={state.email}
                placeholder="Email"
                name="email"
                required
                onChange={handleChange('email')}
                className="form-control"
              />
            </div>
            {mydiv &&
            <div style={{color:'red'}}>
              {error}
              </div>

            }
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Phone no</label>
              <input
                type="tel"
                name="phone"
                value={state.phone}
                required
                placeholder="Phone no"
                onChange={handleChange('phone')}
                className="form-control"
              />
            </div>
         
          </div>

          <div className="newUserItem">
            <div className="form-group">
              <label>Mobile no</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile"
                value={state.mobile}
                required
                onChange={handleChange('mobile')}
                className="form-control"
              />
            </div>
          </div>
          <div className="newUserItem">
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={state.password}
                required
                onChange={handleChange('password')}
                className="form-control"
              />
            </div>
          </div>

      

          <div className="newUserItem">
            <button type="submit" className="newUserButton">
              Create
            </button>
          </div>
        </form>
      </div>
      
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>User Addded Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader toggle={errortoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!OOps something went wrong. Try Again later..</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={errortoggle}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>
    </div>
  );

  return (
    <>
     
      {PostCategory()}
    </>
  );
});
export default AddUserPage;
