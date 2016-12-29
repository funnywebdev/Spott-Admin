import * as api from '../api/productCategory';
import { makeApiActionCreator } from './utils';

export const PRODUCT_CATEGORIES_SEARCH_START = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_SEARCH_START';
export const PRODUCT_CATEGORIES_SEARCH_SUCCESS = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_SEARCH_SUCCESS';
export const PRODUCT_CATEGORIES_SEARCH_ERROR = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_SEARCH_ERROR';

export const PRODUCT_CATEGORIES_FETCH_START = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_FETCH_START';
export const PRODUCT_CATEGORIES_FETCH_SUCCESS = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_FETCH_SUCCESS';
export const PRODUCT_CATEGORIES_FETCH_ERROR = 'PRODUCT_CATEGORY/PRODUCT_CATEGORIES_FETCH_ERROR';

export const fetchProductCategories = makeApiActionCreator(api.fetchProductCategories, PRODUCT_CATEGORIES_FETCH_START, PRODUCT_CATEGORIES_FETCH_SUCCESS, PRODUCT_CATEGORIES_FETCH_ERROR);
export const searchProductCategories = makeApiActionCreator(api.searchProductCategories, PRODUCT_CATEGORIES_SEARCH_START, PRODUCT_CATEGORIES_SEARCH_SUCCESS, PRODUCT_CATEGORIES_SEARCH_ERROR);