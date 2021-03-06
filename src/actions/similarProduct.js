import { makeApiActionCreator } from './utils';
import * as similarProductApi from '../api/similarProduct';

export const SIMILAR_PRODUCT_DELETE_START = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_DELETE_START';
export const SIMILAR_PRODUCT_DELETE_SUCCESS = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_DELETE_SUCCESS';
export const SIMILAR_PRODUCT_DELETE_ERROR = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_DELETE_ERROR';

export const SIMILAR_PRODUCT_PERSIST_START = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_PERSIST_START';
export const SIMILAR_PRODUCT_PERSIST_SUCCESS = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_PERSIST_SUCCESS';
export const SIMILAR_PRODUCT_PERSIST_ERROR = 'SIMILAR_PRODUCT/SIMILAR_PRODUCT_PERSIST_ERROR';

export const deleteSimilarProduct = makeApiActionCreator(similarProductApi.deleteSimilarProduct, SIMILAR_PRODUCT_DELETE_START, SIMILAR_PRODUCT_DELETE_SUCCESS, SIMILAR_PRODUCT_DELETE_ERROR);
export const persistSimilarProduct = makeApiActionCreator(similarProductApi.persistSimilarProduct, SIMILAR_PRODUCT_PERSIST_START, SIMILAR_PRODUCT_PERSIST_SUCCESS, SIMILAR_PRODUCT_PERSIST_ERROR);
