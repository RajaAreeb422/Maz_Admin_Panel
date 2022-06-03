import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Link from 'next/link';
import { DeleteOutline, EditOutlined } from '@material-ui/icons';
import './tag.scss';
import useFetch from 'react-fetch-hook';
import axios from 'axios';

const TagPage = memo(props => {
  const [modal, setModal] = React.useState(false);
  const [id, setId] = useState(0);
  const toggle = () => setModal(!modal);
  const [data, setData] = useState([]);
  const [valu, setValue] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    let mounted = true;
    console.log('in useeffec');
    //get list of supplier from the datbase
    axios
      .get('http://localhost:8080/ecom-api/tag')
      .then(response => {
        if (mounted) {
          var i = 1;
          response.data.data.map(exam => {
            exam['_id'] = i++;
            console.log("exam",exam)
          }),
            setData(response.data.data);
          setList(response.data.data);
        }
        //console.log(response.data)
      });

    //return () => mounted = false;
  }, []);

  //filters the searched supplier from the list
  const requestSearch = name => e => {
    var x = e.target.value;
    setValue(x);

    if (x == '') {
      const filteredRows = list;
      setData(filteredRows);
    } else {
      const filteredRows = data.filter(row => {
        return row.name.toLowerCase().includes(x.toLowerCase());
      });
      setData(filteredRows);
    }
  };

  //generates the alert box
  const handleDelete = id => {
    setId(id);
    toggle();
  };

  //deletes the selected supplier from the database and creates new list
  const move = () => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .delete(`http://localhost:8080/ecom-api/tag/${id}`, config)
      .then(response => {
        console.log(response);
        toggle();
        axios
          .get(`http://localhost:8080/ecom-api/tag`, config)
          .then(res => {
            setData(res.data.data);
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
  };
  
//sets the column name for the supplier list and the syntax is built in for the DataGrid component.
  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    //{ field: 'id', headerName: 'UID', with: 240 },
    { field: 'name', headerName: 'Name', width: 240 },
    
   
    {
      field: 'action',
      headerName: 'Action',
      width: 350,
      renderCell: params => {
        return (
          <>
            <Link
              href="../editSupplier/[id]"
              as={`/editSupplier/${params.row.id}`}
            >
              <EditOutlined className="proEdit">Edit</EditOutlined>
            </Link>

            <DeleteOutline
              className="proListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="tagList">
      <h1>Tags</h1>
     
     {/* Link to Add Supplier Page */}
      <Link href="/addTag/AddTag">
        <a>
          <button className="tagAddButton">Add Tag</button>
        </a>
      </Link>
       
       {/* Search Bar */}
      <input
        type="text"
        name="search"
        id="header-search"
        value={valu}
        style={{ height: '50px' }}
        autoComplete="off"
        placeholder="  Search Supplier"
        className="form-control"
        onChange={requestSearch('search')}
      />
     
      {/* DataGrid Component for displaying Supplier List */}
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        autoHeight={true}
        checkboxSelection
      />

      <div className="tagbtnclass"></div>
      {/* Alert Box Code */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Alert</ModalHeader>
        <ModalBody>
          <>Are You Sure You Want to delete this?</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            Yes
          </Button>
          <Button color="primary" onClick={toggle}>
            No
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default TagPage;
