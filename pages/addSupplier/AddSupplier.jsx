import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './addsupp.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const AddSupplier = memo(props => {
  const [modal, setModal] = React.useState(false);
  const [errormodal, setErrorModal] = React.useState(false);
  const toggle = () => setModal(!modal);
  const errortoggle = () => setErrorModal(!errormodal);
  const [state, setState] = useState({
    name: '',
    address:'',
    phone:'',
    email:'',
    description:''
    
  });
  

  const {name,address,phone,email} = state;

  const move = () => {
     router.push('/supplier/Supplier')
    
  }
  useEffect(() => {
   
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if(state.name=='' || state.address=='' || state.phone=='' || state.email=='')
    {
      errortoggle()
    }
    else{
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    console.log('state',state)
    axios
      .post(
        `https://api.mazglobal.co.uk/maz-api/suppliers`,
        state,config,

        { headers: { 'content-type': 'application/json' } },
      )
      .then(response => {
        console.log('res',response)
        toggle();
        //router.push('/supplier/Supplier')
      })
      .catch(error => {
        errortoggle()
      });
    }
  };

  const handleChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    
    setState({
      ...state,
      [name]: value,
    });
  };

  const PostCategory = () => (
    <div className="addSuppmain">
      <div className="addSupp">
        <h1 className="addSuppTitle">New Supplier</h1>
        <form className="addSuppForm" onSubmit={submitHandler}>
          <div className="addSuppItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Company Name"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
           <div className="addSuppFlexItem">
             <div className='addSuppinnerBox'>
            <label for="exampleInputName">Email</label>
            <input
              type="email"
              name='email'
              required
              placeholder='abc123@gmail.com'
              value={state.email}
               onChange={handleChange('email')}
            />
          </div> 
             <div className='addSuppinnerBox'style={{marginLeft:'5px'}}>
            <label for="exampleInputName">Phone</label>
            <input
              type="tel"
              name='phone'
              required
              placeholder='051-228'
              value={state.phone}
              onChange={handleChange('phone')}
            />
          </div> 
          </div>
          
          <div className="addSuppItem">
            <label for="exampleInputName">Branch Address</label>
            <input
              type="text"
              className="catlabel"
              id="name"
              placeholder="Branch Location"
              required
              name="address"
              value={state.address}
              onChange={handleChange(name)}
            />
          </div>


          <div className="addSuppdesp">
            <label for="exampleInputName">Description</label>
            <input
              type="text"
              id="descp"
              placeholder="Enter your text"
              required
              name="description"
              value={state.description}
              onChange={handleChange(name)}
            />
          </div>
          <div className="addSuppItem">
     
            <button type="submit" className="addSuppButton">
              Add
            </button>
            
          </div>
        </form>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Supplier Added Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            OK
          </Button>
          
        </ModalFooter>
      </Modal>

      <Modal isOpen={errormodal} toggle={errortoggle}>
        <ModalHeader style={{color:'red'}} toggle={errortoggle}>Alert</ModalHeader>
        <ModalBody>
          <>!OOPs soory something went wrong.Try Again</>
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
export default AddSupplier;
