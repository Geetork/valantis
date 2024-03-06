import { List,
         ListItem, 
         ListItemText, 
         Divider } from '@mui/material';

import { TItem } from '../../utils/types';

/**
 * CustomList Component
 * 
 * A component for rendering a custom list of items.
 * 
 * @component
 * @param {TItem[]} items - The array of items to be displayed in the list.
 * @returns {React.ReactElement} - Returns a React element representing the custom list.
 * 
 */
export const CustomList: React.FC<{ items: TItem[] }> = ({ items }) => {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
            {
            items.map((item) => (
                <div key={item.id}>
                    <ListItem>
                        <ListItemText
                        primary={item.product}
                        secondary={
                            <>{`Бренд: ${item.brand ? item.brand : 'не указан'} Цена: ${item.price}`}</>
                        }>
                        {item.product}
                        </ListItemText>
                    </ListItem>
                    <Divider variant='fullWidth' component='li'/>
                </div>
            ))
            }
        </List>
    )
};