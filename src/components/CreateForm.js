import React from 'react'
import { TextField, FormGroup, FormLabel, FormControlLabel, Checkbox, Button} from '@mui/material'

export default function CreateForm(props){

    const [name,setName] = React.useState(props.name)
    const [price,setPrice] = React.useState(props.price)
    const [stock_quantity,setStock] = React.useState(props.stock_quantity)
    const [category,setCategory] = React.useState(props.category)

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
              onChange={(e)=>setName(e.target.value)}
            />

            <TextField
              required
              id="standard-required"
              label="Price of each Item"
              name='price'
              variant="outlined"
              sx={{"marginBottom":"10px"}}
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
            onChange={(e)=>setStock(e.target.value)}
          />
            <FormGroup required>
              <FormLabel required>Categories</FormLabel>
              <FormControlLabel control={<Checkbox />} label="Electronics" value="Electronics" onChange={handleCat}/>
              <FormControlLabel control={<Checkbox />} label="Footwear" value="Footwear" onChange={handleCat}/>
              <FormControlLabel control={<Checkbox />} label="Clothing" value="Clothing" onChange={handleCat}/>
              <FormControlLabel control={<Checkbox />} label="Audio" value="Audio" onChange={handleCat}/>
              <FormControlLabel control={<Checkbox />} label="Photography" value="Photography" onChange={handleCat}/>
            </FormGroup>
            {(category.length===0) && <p style={{ color: 'gray' }}>Please select at least one option.</p>}

          <Button 
          disableElevation 
          variant='contained' 
          type='submit' 
          disabled={category.length===0}
          onClick={(e)=>props.handler(e,{name,price,stock_quantity,category})}
            >submit</Button>

          </form>
    </>
  )
}
