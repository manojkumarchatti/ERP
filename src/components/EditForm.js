import React from 'react'
import { TextField, FormGroup, FormLabel, FormControlLabel, Checkbox, Button} from '@mui/material'

export default function EditForm(props){

    const [name,setName] = React.useState(props.item.name)
    const [price,setPrice] = React.useState(props.item.price)
    const [stock_quantity,setStock] = React.useState(props.item.stock_quantity)
    const [category,setCategory] = React.useState(props.item.category)

    async function handleCat(e){
        let value = e.target.value
        let checked = e.target.checked
        if(checked && !category.includes(value)){
            setCategory(old=>[...old,value])
        }else if(!checked && category.includes(value)){
            setCategory(old=>old.filter(item=>item!==value))
        }
    }

  return (
    <>
    <form autoComplete='off'>
            <TextField
              required
              id="standard-required"
              label="Name"
              name='name'
              variant="outlined"
              sx={{"marginBottom":"10px"}}
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <TextField
              required
              id="standard-required"
              label="Price of each Item"
              name='price'
              variant="outlined"
              sx={{"marginBottom":"10px"}}
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
            />
            
            <TextField
            required
            id="standard-required"
            label="Stock"
            name='stock_quantity'
            variant="outlined"
            sx={{"marginBottom":"10px"}}
            gutterbottom='true'
            value={stock_quantity}
            onChange={(e)=>setStock(e.target.value)}
          />
            <FormGroup required>
              <FormLabel required>Categories</FormLabel>
              <FormControlLabel control={<Checkbox />} label="Electronics" value="Electronics" onChange={handleCat} checked={category.includes('Electronics')}/>
              <FormControlLabel control={<Checkbox />} label="Footwear" value="Footwear" onChange={handleCat} checked={category.includes("Footwear")}/>
              <FormControlLabel control={<Checkbox />} label="Clothing" value="Clothing" onChange={handleCat} checked={category.includes("Clothing")}/>
              <FormControlLabel control={<Checkbox />} label="Audio" value="Audio" onChange={handleCat} checked={category.includes("Audio")}/>
              <FormControlLabel control={<Checkbox />} label="Photography" value="Photography" onChange={handleCat} checked={category.includes("Photography")}/>
            </FormGroup>
            {(category.length===0) && <p style={{ color: 'gray' }}>Please select at least one option.</p>}

          <Button 
          disableElevation 
          variant='contained' 
          type='submit' 
          disabled={category.length===0}
          onClick={(e)=>{

            props.handler(e,{'id':props.item.id,name,price,stock_quantity,category})
          }}
            >Save</Button>

          </form>
    </>
  )
}