import React, { useEffect, useState } from 'react';
import styles from 'styled-components';
import { Pagination } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { getFilteredItemIds, getItemIds, getItemsWithIds } from '../../utils/api';
import { TFilter, TItem } from '../../utils/types';
import Loader from '../loader/Loader';
import { CustomList } from '../list/List';
import { FilterForm } from '../filter-form/FilterForm';
import { Modal } from '../modal/Modal';
import CloseIcon from '@mui/icons-material/Close';

const AppContainer = styles.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  gap: 5px;
`;

const ScrollableContainer = styles.div`
  overflow-y: auto;
  width: 80%;
  height: 80vh;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

const RowContainer = styles.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Button = styles.button`
  font-size: 12px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 15px;
  border: none;
  background-color: rgba(235, 240, 255, 0.8);
`;


/**
 * getArrayWithoutDuplicates Function
 *
 * This function takes an array of TItem objects and removes duplicates based on the 'id' property.
 *
 * @param {TItem[]} array - An array of TItem objects.
 * @returns {TItem[]} An array without duplicate items.
 *
 */
const getArrayWithoutDuplicates = (array: TItem[]): TItem[] => {
  const uniqueObj: { [id: string]: boolean } = {};
  const arrayWithoutDuplicates = array.filter(item => {
    if (!uniqueObj[item.id]) {
      uniqueObj[item.id] = true;
      return true;
    };
    return false;
  });
  return arrayWithoutDuplicates;
};


/**
 * getCommonElements Function
 *
 * This function takes an array of string arrays and returns the common elements
 * present in all the arrays.
 *
 * @function
 * @param {string[][]} arrays - An array of string arrays.
 * @returns {string[]} An array containing common elements.
 * 
 */
const getCommonElements = (arrays: string[][]): string[] => {
  if (!arrays || arrays.length === 0) {
    return [];
  }

  const [referenceArray, ...restArrays] = arrays;
  const isCommon = (element: string) => restArrays.every(array => array.includes(element));
  const result = referenceArray.filter(isCommon);
  return result;
};


/**
 * App Component
 *
 * This component represents the main application.
 * It manages the state for fetching and displaying items with pagination,
 * provides filter functionality, and includes a modal for applying filters.
 *
 * @component
 * @returns {React.FC} The App component.
 */
const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [items, setItems] = useState<TItem[]>([]);
  const [filters, setFilters] = useState<null | TFilter>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const itemsOnPage = 50;

  const getFechedItemsIds = async (): Promise<string[]> => {
    if (!filters) {
      return await getItemIds();
    };
    
    const keys = Object.keys(filters);
    if (keys.length > 1) {
      const queries = await Promise.all(
        keys.map(async (key) => await getFilteredItemIds({ [key]: filters[key as keyof TFilter] }))
      );
      return getCommonElements(queries);
    } else {
      return await getFilteredItemIds(filters)
    }; 
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);  
      setError(null);

      const ids = await getFechedItemsIds();

      setTotalPage(Math.ceil(ids.length / itemsOnPage));

      const startIndex = (currentPage - 1) * itemsOnPage;
      const endIndex = startIndex + itemsOnPage;
      const fetchedItems = await getItemsWithIds(ids.slice(startIndex, endIndex));
      setItems(getArrayWithoutDuplicates(fetchedItems));
    } catch (e) {
      const errorMessage = `Error fetching data: ${e}`;
      setError(errorMessage);
      console.log(errorMessage);
    } finally {
      setIsLoading(false);
    };
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filters, error]);

  const handlePagination = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const showFilterModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const deleteFilter = (property: keyof TFilter) => {
    if (filters) {
      const keys = Object.keys(filters);
      if (keys.length === 1) {
        setFilters(null);
      } else {
        const { [property]: _, ...newFilters } = filters;
        setFilters(newFilters);
      };
    };
  };

  return (
    <AppContainer>
      <RowContainer>
        <h3>Список товаров</h3>
        <FilterAltIcon
          onClick={showFilterModal}
          color='primary'
          sx={[{
            '&:hover': {
              cursor: 'pointer',
            },
          }]}/>
      </RowContainer>
      <RowContainer>
        { 
          filters &&
            Object.keys(filters).map((key, id) => (
              <Button key={id} onClick={(e) => deleteFilter(key as keyof TFilter)}>
                <span>{key}</span>
                <CloseIcon
                  color='primary'
                  sx={[{
                      fontSize: 16,
                      '&:hover': {
                      cursor: 'pointer',
                      },
                  }]}/>
              </Button>
            ))
        }
      </RowContainer>
      <ScrollableContainer>
        {
          isLoading ? <Loader /> :
            items.length ? 
              <CustomList items={items} /> :
              <span>{ error ? `Error fetching data: ${error}` :
                'No items found' }
              </span>
        }
      </ScrollableContainer>
      <Pagination 
        onChange={handlePagination}
        count={totalPage}
        page={currentPage}
        variant='outlined'
        color='primary'/>
      { isModalVisible && 
        <Modal onClose={showFilterModal}>
          <FilterForm
            filters={filters}
            setCurrentPage={setCurrentPage}
            setFilters={setFilters}
            onClose={showFilterModal}/>
        </Modal>
      }
    </AppContainer>
  );
};

export default App;
