import {  Grid, Button, Modal, Box } from '@mui/material';
import Product from '../components/Product';
import { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateForm from '../components/CreateForm'
import EditForm from '../components/EditForm'
import arr from '../db/data'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Products() {
  useEffect(()=>{setData(arr)},[])

  async function handleEdit(id){
    const item = data.filter(datum=>datum.id===id)
    setEditingItem(item[0])
    setEditMode(true)
    setOpen(true)
  }

  async function handleUpdate(e,newItem){
    e.preventDefault();
    const oldItems = data.filter(datum=>datum.id!==newItem.id)
    setData([newItem,...oldItems])
    handleClose()
    setEditMode(false)
    handlesnackClick();
  }

  async function handleDelete(id){
    let newData = data.filter(datum => datum.id !== id)
    setData(newData)
    handlesnackClick();
  }

  async function handleCreate(e,newItem){
    e.preventDefault()
    setData(oldData=>{
      return([
        {
          'id':oldData.slice(-1)[0].id+1,
          'name':newItem.name,
          'price':'$'+newItem.price,
          'stock_quantity':newItem.stock_quantity,
          'category':[...newItem.category]
        },
        ...oldData
      ]
      )
    }
    )
    setOpen(false)
    handlesnackClick();
  }

  const handlesnackClick = () => {
    setsnackOpen(true);
  };

  const handlesnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setsnackOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handlesnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  const [editingItem,setEditingItem] = useState({})
  const [data,setData] = useState([])
  const [open,setOpen] = useState(false);
  const [snackopen,setsnackOpen] = useState(false);
  const [editMode,setEditMode] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{ setOpen(false)}

  return(
  <>
  <Snackbar
        open={snackopen}
        autoHideDuration={3000}
        onClose={handlesnackClose}
        message="Successfully Created/Edited/Deleted"
        action={action}
      />
  <div>
      <Button 
      sx={{"marginBottom":"9px"}} 
      variant="contained" 
      onClick={handleOpen} 
      disableElevation 
      endIcon={<AddCircleOutlineIcon/>}>
        Create New Item
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {editMode
          ?
          <EditForm item={editingItem} handler={handleUpdate}/>
          :
          <CreateForm 
            name = ""
            price = ""
            stock_quantity = ""
            category = {[]}
            handler={handleCreate}/>}
          
        </Box>
      </Modal>
  </div>
  <Grid container spacing={2} >
    {data.map(product=>{
    return(
      <Grid key={product.id} item xs={6} md={8} lg={3}>
        <Product product={product} handleDelete={handleDelete} handleEdit={handleEdit}/>
      </Grid>
      )
    })}
  </Grid>
  
  
    </>
  );
}
