import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
export const PERMISSIONS={
    ExternaUser:[{
        name:"wishList",
        icon:<FavoriteIcon color='success' />
    },{
        name:"cart",
        icon:<ShoppingCartIcon color='success' />
    },{
        name:"orders",
        icon:<ListAltIcon color='success' />
    }],
    InternalUser:['addproduct','requests','manageusers']
}
