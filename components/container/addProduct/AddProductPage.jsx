import axios from 'axios';
import React, { memo } from 'react';
//import { response } from "express";
import './addproduct.scss';
import { Editor } from '@tinymce/tinymce-react';
import { Dropdown } from 'semantic-ui-react';
import { useState, useEffect } from 'react';
// import {toast} from 'react-toastify';
import DropZone from './DropZone';
import Variants from './Variants';
import router from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
//import { AddAPhoto } from '@material-ui/icons'
//import 'react-toastify/dist/ReactToastify.scss';
//import { toast, ToastContainer } from 'react-nextjs-toast'
import { MultiSelect } from "react-multi-select-component";
// toast.configure();

const AddProductPage = memo(props => {
  const [state, setState] = useState({
    name: '',
    category_id: null,
    regular_price: null,
    stock_quantity: null,
    part_no: '',
    oem_no:'',
    application:'',
    package:'',
   
    product_description: '',
    supplier_id: null,
    cross_ref:'',
    variants: [],
    combinations: [],
  });
  const [modal, setModal] = React.useState(false);
  const [Imgmodal, setImgModal] = React.useState(false);
  const [succmodal, setSuccModal] = React.useState(false);
  const [selected, setSelected] = useState([]);
  const [variantss, setVariants] = useState([]);
  const [varArr, setVarArr] = useState([]);
  const [comb, setComb] = useState([]);
  const [mydiv, showDiv] = useState(false);
  const [file, setFile] = useState({
    imageFile: '',
  });
  const [parnt_cat, setParent] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [veh, setVeh] = useState([]);
  const [sub, setSub] = useState(state.category_id);

  const {
    name,
    category_id,
    regular_price,
    quantity,
    product_description,
    supplier_id,
    variants,
    combinations,
    part_no,
    oem_no,
    application,
    packag,
    
    cross_ref
  } = state;
  const toggle = () => setModal(!modal);
  const Imgtoggle = () => setImgModal(!Imgmodal);
  const succtoggle = () => setSuccModal(!succmodal);
  const options = [
    { label: "Grapes 🍇", value: "grapes" },
    { label: "Mango 🥭", value: "mango" },
    { label: "Strawberry 🍓", value: "strawberry", disabled: true },
  ];
  
  const [selected1, setSelected1] = useState([]);
 
  useEffect(() => {
    let mounted = true;
    
    // axios.get(`http://localhost:8080/maz-api/products`).then(response => {
       if (mounted) {
        axios
          .get('https://mazglobal.co.uk/maz-api/categories')
          .then(res => {
            console.log("categories are",res.data)
            setParent(res.data.data)})
          .catch(err => console.log(err));
        axios
          .get('https://mazglobal.co.uk/maz-api/suppliers')
          .then(res => setSupplier(res.data.data))
          .catch(err => console.log(err));

          axios
          .get('https://mazglobal.co.uk/maz-api/vehicles')
          .then(res => {
            let list=[]
            res.data.data.map(vh=>{
              list.push({
                id:vh.id,
                label:vh.name,
                value:vh.id
              })
            })
            setVeh(list)
            
          }
            )
          .catch(err => console.log(err));
      }
    // });
    // return () => mounted = false;
  }, []);

  const submitHandler = e => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    e.preventDefault();
    console.log('subbbbbbb', sub);
    console.log('supp id', state.supplier_id);
    //sub=parseInt(sub)
    state.category_id = sub;
    let cc=sub;
    let ss=state.supplier_id
    let pp=state.regular_price
    let qq=state.stock_quantity
    cc=parseInt(cc)
    ss=parseInt(ss)
   pp=parseInt(pp)
    qq=parseInt(qq)
    state.category_id = cc;
    state.supplier_id = ss;
    state.regular_price = pp;
    state.stock_quantity = qq;
    //state.supplier_id=parseInt(state.supplier_id)
    if(variantss.length!=0)
    {
    state.variants = variantss[0];
    state.combinations = variantss[1];
    
    }
    else{
      state.variants = null;
      state.combinations = null;
      console.log('vvvvv', variantss);
    console.log('product issss', state);
    console.log('selected issss', selected1);
    }
   
    if(state.name=='' || state.part_no==''||state.stock_quantity==null||state.regular_price==null||state.product_description==''||
    state.category_id==null||state.supplier_id==null )
    toggle()
    else if(selected.length==0)
    {
      Imgtoggle()
    }
    //toast.notify('Plz fill all the fields')
    else{
      console.log('state issss', state);
    axios
    .post(
      `https://mazglobal.co.uk/maz-api/products`,
      state,
      config,

      { headers: { 'content-type': 'application/json' } },
    )
    .then(response => {
      console.log('Insert Id', response.data);
      console.log('Selectd', selected);
     
        var formData = new FormData();
        for (const key of Object.keys(selected)) {
          formData.append('imageFile', selected[key]);
          console.log('in lopppp', formData);
        }
        
        axios
          .post(
            `https://mazglobal.co.uk/maz-api/products/uploadProductImages/${response.data.InsertedId}`,
            formData,
            config,
            {},
          )
          .then(res => {
            console.log(res.data);
          for(let i=0;i<selected1.length;i++)
        {
              
        axios
        .post(
          `https://mazglobal.co.uk/maz-api/products/addVehicle`,
         {vId:selected1[i],pId:response.data.InsertedId,pno:state.part_no}
        )
        .then(res => {
          console.log(res.data);
         
        }).catch(err=>console.log(err))

        }
           succtoggle();
          })
      .catch(error => {
        console.log(error);

        
      });
        
      
     
    }).catch(err=>console.log(err))

  }
};
  const move = () => {
    router.push('/product/product');
  };
  const handleEditorChange = (content, editor) => e => {
    const value = content;

    setState({
      ...state,
      ['product_description']:e.target.value,
    });
  };
  const handleSuppChange = name => e => {
    //onClick={()=>addToast("success",{appearence:"success"})}
    const name = e.target.name;
    const value = e.target.value;
    console.log('supp value', value);
    setState({
      ...state,
      ['supplier_id']: value,
    });
  };

  const handleChange = name => e => {
    const name = e.target.name;
    const value = e.target.value;

    setState({
      ...state,
      [name]: value,
    });
    if (name == 'category_id') {
      setSub(value);
    }
    var arr = [];
    arr = parnt_cat;

    if (value != '') {
      showDiv(false);
      for (var i = 0; i < parnt_cat.length; i++) {
        if (parnt_cat[i].parent == value) {
          showDiv(true);
          break;
        }
      }

      console.log('After Change', mydiv);
    } else {
      showDiv(false);
    }
  };

  const handleSubChange = name => e => {
    const name = e.target.name;
    const val = e.target.value;

    setSub(val);
  };

  const handleChild = childData => {
    setSelected({ ...childData });
    console.log('selected', selected);
  };
  const handleVariant = child => {
    setVariants({ ...child });
    console.log('parent Variants array', variantss);
  };
  const PostProduct = () => (
    <div className="addpromain">
      <h1 className="newaddproTitle">New Product</h1>

      <div className="newaddpro">
        <form >
          <div className="newaddproItem">
            <label for="exampleInputName">Name</label>
            <input
              type="text"
              className="newaddproSelect"
              id="name"
              placeholder="Your Product Label"
              required
              name="name"
              value={state.name}
              onChange={handleChange(name)}
            />
          </div>
       
          <div className="newaddproflexItem" style={{marginBottom:'20px'}}>
            <div className="flexdiv">
              <div className="newaddpro1Select">
                <label for="exampleFormControlSelect1">Part No</label>
                <input
                  required
                  type="text"
                  name="part_no"
                  placeholder="  part no..."
                  style={{
                    width: '285px',
                    border: ' 1px solid gray',
                    borderRadius: '5px',
                    height: '35px',
                  }}
                  value={state.part_no}
                  onChange={handleChange(name)}
                />
              </div>
            </div>
            <div className="flexdiv">
              <div className="newaddpro1Select" style={{ marginLeft: '30px' }}>
                <label for="exampleFormControlSelect1">OEM No</label>
                <input
                  style={{
                    width: '285px',
                    border: ' 1px solid gray',
                    borderRadius: '5px',
                    height: '35px',
                  }}
                  required
                  placeholder=" OEM"
                  name="oem_no"
                  type="text"
                  value={state.oem_no}
                  onChange={handleChange(name)}
                />
              </div>
            </div>
          </div>


          <div className="newaddproflexItem">
          <div className="flexdiv">
              <div className="newaddpro1Select">
            <label for="exampleFormControlSelect1"  >Category</label>
            <select
              className="qtySelect"
              id="parent"
              required
              name="category_id"
              value={state.category_id}
              onChange={handleChange(name)}
            >
              {console.log(parnt_cat)}
              <option value="">Select Category</option>
              {parnt_cat.map(p => {
                if (!p.parent) return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          <div className="flexdiv">
          <div className="newaddpro1Select">
            <label for="exampleFormControlSelect1" style={{marginLeft:'30px'}}>Supplier</label>
            <select
              className="qtySelect"
              required
              name="supplier"
              style={{marginLeft:'30px'}}
              //value={state.category_id}
              onChange={handleSuppChange(name)}
            >
              <option value="">Select Product Supplier</option>
              {supplier.map(p => {
                return <option value={p.id}>{p.name}</option>;
              })}
            </select>
          </div>
          </div>
          </div>

          {mydiv && (
            <div className="newaddproItem">
              <label for="exampleFormControlSelect1">Sub Category</label>
              <select
                className="newaddproSelect"
                id="sub"
                //required
                name="category"
                value={sub}
                onChange={handleSubChange(name)}
              >
                {console.log('cat is', state.category_id)}
                <option value={state.category_id}>Select Category</option>
                {parnt_cat.map(p => {
                  {
                    console.log('parent is ', p.parent);
                  }

                  if (p.parent == state.category_id)
                    return <option value={p.id}>{p.name}</option>;
                })}
              </select>
            </div>
          )}
          
          <div className="newaddproItem">
              <label for="exampleFormControlSelect1">Vehicle</label>
              {/* <select
                className="newaddproSelect"
                id="veh"
                //required
                name="vehicle_id"
                
                onChange={handleChange(name)}
              >
                  
               <option value={state.vehicle_id}>Select Vehicle</option>
                {veh.map(p => {
                
                    return <option value={p.id}>{p.name}</option>;
                })} 
              </select> */}

<MultiSelect
             className="newaddproSelect"
             id="veh"
                //required
                name="vehicle_id"
        options={veh}
        value={selected1}
        onChange={setSelected1}
        labelledBy="Select"
      />
            </div>
           
       
          <div className="newaddproflexItem">
            <div className="flexdiv">
              <div className="newaddpro1Select">
                <label for="exampleFormControlSelect1">Price</label>
                <input
                  required
                  type="number"
                  name="regular_price"
                  placeholder="  Price in Rs..."
                  style={{
                    width: '285px',
                    border: ' 1px solid gray',
                    borderRadius: '5px',
                    height: '35px',
                  }}
                  value={state.regular_price}
                  onChange={handleChange(name)}
                />
              </div>
            </div>
            <div className="flexdiv">
              <div className="newaddpro1Select" style={{ marginLeft: '30px' }}>
                <label for="exampleFormControlSelect1">Quantity</label>
                <input
                  style={{
                    width: '285px',
                    border: ' 1px solid gray',
                    borderRadius: '5px',
                    height: '35px',
                  }}
                  required
                  placeholder="  Quantity"
                  name="stock_quantity"
                  type="number"
                  value={state.stock_quantity}
                  onChange={handleChange(name)}
                />
              </div>
            </div>
          </div>

          <div className="newaddproItem">
            <label for="exampleFormControlSelect1">Description</label>
            
            <textarea
            name="product_description"
            style={{width:'600px',height:'80px'}}
            required
            onChange={handleChange('product_description')}/>
           
             
          </div>
          {/* <div className="newaddproItem">
            <label for="exampleFormControlSelect1">Cross Reference</label>
            
            <textarea
            name="package"
            style={{width:'600px',height:'80px'}}
            value={state.package}
            required
            onChange={handleChange('package')}/>
           
             
          </div> */}
          <div className="newaddproItem">
            <label for="exampleFormControlSelect1">Application</label>
            
            <textarea
            name="application"
            style={{width:'600px',height:'80px'}}
            required
            onChange={handleChange('application')}/>
           
             
          </div>
        </form>
      </div>
      <div className="newaddpro1">
        <label className="imgdiv">Images</label>

        <DropZone parentCall={handleChild} />
      </div>

      <span>
        <Variants variantCall={handleVariant} />
      </span>
      <button type="submit" onClick={submitHandler} className="newaddproButton">
        Save
      </button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Please Fill all the Fields</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={Imgmodal} toggle={Imgtoggle}>
        <ModalHeader toggle={Imgtoggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Please Select an Image</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={Imgtoggle}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>
      
      <Modal isOpen={succmodal} toggle={succtoggle}>
        <ModalHeader toggle={succtoggle}>Product Status</ModalHeader>
        <ModalBody>
          <>Product Added Successfully</>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={move}>
            Okay
          </Button>
        </ModalFooter>
      </Modal>

    </div>
  );

  return <>{PostProduct()}</>;
});
export default AddProductPage;
