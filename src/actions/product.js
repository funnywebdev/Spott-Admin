import * as api from '../api/product';
import { makeApiActionCreator } from './utils';

export const PRODUCT_SEARCH_START = 'PRODUCT/PRODUCT_SEARCH_START';
export const PRODUCT_SEARCH_SUCCESS = 'PRODUCT/PRODUCT_SEARCH_SUCCESS';
export const PRODUCT_SEARCH_ERROR = 'PRODUCT/PRODUCT_SEARCH_ERROR';

export const PRODUCTS_FETCH_START = 'PRODUCT/PRODUCTS_FETCH_START';
export const PRODUCTS_FETCH_SUCCESS = 'PRODUCT/PRODUCTS_FETCH_SUCCESS';
export const PRODUCTS_FETCH_ERROR = 'PRODUCT/PRODUCTS_FETCH_ERROR';

export const PRODUCT_FETCH_START = 'PRODUCT/PRODUCT_FETCH_START';
export const PRODUCT_FETCH_SUCCESS = 'PRODUCT/PRODUCT_FETCH_SUCCESS';
export const PRODUCT_FETCH_ERROR = 'PRODUCT/PRODUCT_FETCH_ERROR';

export const PRODUCT_DELETE_START = 'PRODUCT/PRODUCT_DELETE_START';
export const PRODUCT_DELETE_SUCCESS = 'PRODUCT/PRODUCT_DELETE_SUCCESS';
export const PRODUCT_DELETE_ERROR = 'PRODUCT/PRODUCT_DELETE_ERROR';

export const PRODUCTS_DELETE_START = 'PRODUCT/PRODUCTS_DELETE_START';
export const PRODUCTS_DELETE_SUCCESS = 'PRODUCT/PRODUCTS_DELETE_SUCCESS';
export const PRODUCTS_DELETE_ERROR = 'PRODUCT/PRODUCTS_DELETE_ERROR';

export const PRODUCT_PERSIST_START = 'PRODUCT/PRODUCT_PERSIST_START';
export const PRODUCT_PERSIST_SUCCESS = 'PRODUCT/PRODUCT_PERSIST_SUCCESS';
export const PRODUCT_PERSIST_ERROR = 'PRODUCT/PRODUCT_PERSIST_ERROR';

export const UPLOAD_PORTRAIT_IMAGE_START = 'PRODUCT/UPLOAD_PORTRAIT_IMAGE_START';
export const UPLOAD_PORTRAIT_IMAGE_SUCCESS = 'PRODUCT/UPLOAD_PORTRAIT_IMAGE_SUCCESS';
export const UPLOAD_PORTRAIT_IMAGE_ERROR = 'PRODUCT/UPLOAD_PORTRAIT_IMAGE_ERROR';

export const UPLOAD_PROFILE_IMAGE_START = 'PRODUCT/UPLOAD_PROFILE_IMAGE_START';
export const UPLOAD_PROFILE_IMAGE_SUCCESS = 'PRODUCT/UPLOAD_PROFILE_IMAGE_SUCCESS';
export const UPLOAD_PROFILE_IMAGE_ERROR = 'PRODUCT/UPLOAD_PROFILE_IMAGE_ERROR';

export const DELETE_PROFILE_IMAGE_START = 'PRODUCT/DELETE_PROFILE_IMAGE_START';
export const DELETE_PROFILE_IMAGE_SUCCESS = 'PRODUCT/DELETE_PROFILE_IMAGE_SUCCESS';
export const DELETE_PROFILE_IMAGE_ERROR = 'PRODUCT/DELETE_PROFILE_IMAGE_ERROR';

export const DELETE_POSTER_IMAGE_START = 'PRODUCT/DELETE_POSTER_IMAGE_START';
export const DELETE_POSTER_IMAGE_SUCCESS = 'PRODUCT/DELETE_POSTER_IMAGE_SUCCESS';
export const DELETE_POSTER_IMAGE_ERROR = 'PRODUCT/DELETE_POSTER_IMAGE_ERROR';

export const deletePortraitImage = makeApiActionCreator(api.deletePortraitImage, DELETE_POSTER_IMAGE_START, DELETE_POSTER_IMAGE_SUCCESS, DELETE_POSTER_IMAGE_ERROR);
export const deleteProfileImage = makeApiActionCreator(api.deleteProfileImage, DELETE_PROFILE_IMAGE_START, DELETE_PROFILE_IMAGE_SUCCESS, DELETE_PROFILE_IMAGE_ERROR);
export const deleteProducts = makeApiActionCreator(api.deleteProducts, PRODUCTS_DELETE_START, PRODUCTS_DELETE_SUCCESS, PRODUCTS_DELETE_ERROR);
export const deleteProduct = makeApiActionCreator(api.deleteProduct, PRODUCT_DELETE_START, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_ERROR);
export const fetchProducts = makeApiActionCreator(api.fetchProducts, PRODUCTS_FETCH_START, PRODUCTS_FETCH_SUCCESS, PRODUCTS_FETCH_ERROR);
export const fetchProduct = makeApiActionCreator(api.fetchProduct, PRODUCT_FETCH_START, PRODUCT_FETCH_SUCCESS, PRODUCT_FETCH_ERROR);
export const persistProduct = makeApiActionCreator(api.persistProduct, PRODUCT_PERSIST_START, PRODUCT_PERSIST_SUCCESS, PRODUCT_PERSIST_ERROR);
export const searchProducts = makeApiActionCreator(api.searchProducts, PRODUCT_SEARCH_START, PRODUCT_SEARCH_SUCCESS, PRODUCT_SEARCH_ERROR);
export const uploadPortraitImage = makeApiActionCreator(api.uploadPortraitImage, UPLOAD_PORTRAIT_IMAGE_START, UPLOAD_PORTRAIT_IMAGE_SUCCESS, UPLOAD_PORTRAIT_IMAGE_ERROR);
export const uploadProfileImage = makeApiActionCreator(api.uploadProfileImage, UPLOAD_PROFILE_IMAGE_START, UPLOAD_PROFILE_IMAGE_SUCCESS, UPLOAD_PROFILE_IMAGE_ERROR);
