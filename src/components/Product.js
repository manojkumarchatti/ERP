import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import EditIcon from '@mui/icons-material/Edit';

export default function Product({product,handleDelete,handleEdit}) {
  return (
    <>
        <Card color='Secondary' variant='outlined'>
            <CardHeader 
             title={product.name}
             subheader={product.category.join(' ')}
             action={
              <IconButton aria-label="settings" onClick={()=>handleDelete(product.id)}>
                <DeleteIcon color='warning'/>
              </IconButton>
            }
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                price: {product.price}
                <br></br>
                stock: {product.stock_quantity}
                </Typography>
            </CardContent> 
            <CardActions disableSpacing>
            <IconButton aria-label="settings" onClick={()=>handleEdit(product.id)}>
              <EditIcon color="success"/>
            </IconButton>
            </CardActions>      
        </Card>
    </>
  )
}
