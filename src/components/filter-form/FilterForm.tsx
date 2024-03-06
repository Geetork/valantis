import React, { useState } from "react";
import styles from 'styled-components';
import { TextField, Button, Tabs, Tab } from "@mui/material";

import { TFilter } from "../../utils/types";

const FilterContainer = styles.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

/**
 * FilterForm Component
 * 
 * A form component for applying filters to the list of items.
 * 
 * @component
 * @param {TFilter | null} filters - The current filters applied to the list.
 * @param {React.Dispatch<React.SetStateAction<number>>} setCurrentPage - Function to set the current page.
 * @param {React.Dispatch<React.SetStateAction<TFilter | null>>} setFilters - Function to set the filters.
 * @param {() => void} onClose - Function to close the filter modal.
 * @returns {React.ReactElement} - Returns a React element representing the filter form.
 * 
 */
export const FilterForm: React.FC<{
    filters: TFilter | null,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setFilters: React.Dispatch<React.SetStateAction<TFilter | null>>;
    onClose: () => void }> = ({ filters, setCurrentPage, setFilters, onClose }) => {
    const [filterObject, setFilterObject] = useState<TFilter | null>(filters);

    const onClick = () => {
        const result: TFilter | null = filterObject ?
            Object.keys(filterObject).reduce((acc, key) => {
                const property = key as keyof TFilter;
                if (filterObject.hasOwnProperty(property) && filterObject[property]) {
                    if (property === 'price') {
                        return { ...acc, [property]: parseInt(filterObject[property] as any) };
                    }
                    return { ...acc, [property]: filterObject[property] };
                }
                return acc;
            }, {}) : null;

        setFilters(result);
        setCurrentPage(1);
        onClose();
    };

    const handleInputChange = (property: keyof TFilter, value: string | number) => {
        setFilterObject((prevFilter) => ({
            ...prevFilter,
            [property]: value,
        }));
    };

    return (
        <FilterContainer>
            <TextField
                value={filterObject ? filterObject['brand'] || '' : ''}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                label="Бренд"
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                variant='standard'
            />
            <TextField
                value={filterObject ? filterObject['price'] || '' : ''}
                onChange={(e) => handleInputChange('price', e.target.value)}
                label="Цена"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant='standard'
            />
            <TextField
                value={filterObject ? filterObject['product'] || '' : ''}
                onChange={(e) => handleInputChange('product', e.target.value)}
                label="Товар"
                type="text"
                InputLabelProps={{
                    shrink: true,
                }}
                variant='standard'
            />
            <Button
                onClick={onClick}
                variant="outlined">
                Применить</Button>
        </FilterContainer>
    );
};