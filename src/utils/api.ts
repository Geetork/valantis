import { MD5 } from 'crypto-js';
import { TItem, TFilter } from './types';

const BASE_URL = 'https://api.valantis.store:41000';


const checkResponse = <T>(res: Response): Promise<T> => {
    if (res.ok) {
        return res.json();
    };

    return Promise.reject(`Error ${res.status}`);
};

const checkSuccess = <T>(res: any): any => {
    if (res?.result) {
        return res.result;
    };

    return Promise.reject(`Unsuccessful: ${res}`);
};


/**
 * request Function
 *
 * This function performs a fetch request to a specified endpoint with optional request options.
 *
 * @function
 * @template T - The expected type of the response data.
 * @param {RequestInfo} endpoint - The URL or path for the request.
 * @param {RequestInit} [options] - Optional request options, such as method, headers, and body.
 * @returns {Promise<T>} A Promise that resolves to the parsed response data.
 *
 */
const request = <T>(endpoint: RequestInfo, options?: RequestInit) => {
    return fetch(`${BASE_URL}`, options)
        .then(res => checkResponse<T>(res))
        .then(res => checkSuccess<T>(res));
};

/**
 * getItemIds Function
 *
 * This function makes a POST request to fetch item IDs.
 *
 * @function
 * @returns {Promise<string[]>} A Promise that resolves to an array of item IDs.
 *
 */
export const getItemIds = (): Promise<string[]> => request('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Auth': MD5(`Valantis_${getCurrentUTCTimestamp()}`).toString(),
    },
    body: JSON.stringify({
        action: 'get_ids',
    })
});


/**
 * getItemsWithIds Function
 *
 * This function makes a POST request to fetch items with specified IDs.
 *
 * @function
 * @param {string[]} ids - An array of item IDs.
 * @returns {Promise<TItem[]>} A Promise that resolves to an array of items.
 * 
 */
export const getItemsWithIds = (ids: string[]): Promise<TItem[]> => request('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Auth': MD5(`Valantis_${getCurrentUTCTimestamp()}`).toString(),
    },
    body: JSON.stringify({
        action: 'get_items',
        params: {
            ids: ids,
        }
    })
});

/**
 * getFilteredItemIds Function
 *
 * This function makes a POST request to fetch item IDs based on specified filters.
 *
 * @function
 * @param {TFilter} filters - An object containing filter parameters.
 * @returns {Promise<string[]>} A Promise that resolves to an array of item IDs.
 *
 */
export const getFilteredItemIds = (filters: TFilter): Promise<string[]> => request('/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Auth': MD5(`Valantis_${getCurrentUTCTimestamp()}`).toString(),
    },
    body: JSON.stringify({
        action: 'filter',
        params: filters,
    })
});

function getCurrentUTCTimestamp() {
    const now = new Date();
    
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');

    return `${year}${month}${day}`;
}