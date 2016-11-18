import { del, get, post, postFormData } from './request';
import { transformUser, transformContentProducers, transformContentProducer } from './transformers';

export async function fetchContentProducerUsers (baseUrl, authenticationToken, locale, { contentProducerId, searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/contentProducers/${contentProducerId}/users?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${searchString}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformUser);
  return body;
}

export async function fetchContentProducers (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/contentProducers?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${searchString}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  return transformContentProducers(body);
}

export async function fetchContentProducer (baseUrl, authenticationToken, locale, { contentProducerId }) {
  const url = `${baseUrl}/v004/media/contentProducers/${contentProducerId}`;
  const { body } = await get(authenticationToken, locale, url);
  // console.log('before transform', { ...body });
  const result = transformContentProducer(body);
  // console.log('after tranform', result);
  return result;
}

export async function persistContentProducer (baseUrl, authenticationToken, locale, { id, name }) {
  let cp = {};
  if (id) {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/contentProducers/${id}`);
    // console.log('body', body);
    cp = body;
  }
  const url = `${baseUrl}/v004/media/contentProducers`;
  await post(authenticationToken, locale, url, { ...cp, uuid: id, name });
}

export async function deleteContentProducer (baseUrl, authenticationToken, locale, { contentProducerId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/contentProducers/${contentProducerId}`);
}

export async function deleteContentProducers (baseUrl, authenticationToken, locale, { contentProducerIds }) {
  for (const contentProducerId of contentProducerIds) {
    await deleteContentProducer(baseUrl, authenticationToken, locale, { contentProducerId });
  }
}

// Used for autocompletion.
export async function searchContentProducers (baseUrl, authenticationToken, locale, { searchString = '' }) {
  let searchUrl = `${baseUrl}/v004/media/contentProducers?pageSize=25`;
  if (searchString) {
    searchUrl += `&searchString=${encodeURIComponent(searchString)}`;
  }
  const { body: { data } } = await get(authenticationToken, locale, searchUrl);
  return data.map(transformContentProducer);
}

export async function persistLinkUser (baseUrl, authenticationToken, locale, { contentProducerId, userId }) {
  const url = `${baseUrl}/v004/media/contentProducers/${contentProducerId}/users/${userId}`;
  return await post(authenticationToken, locale, url);
}

export async function deleteLinkUser (baseUrl, authenticationToken, locale, { contentProducerId, userId }) {
  const url = `${baseUrl}/v004/media/contentProducers/${contentProducerId}/users/${userId}`;
  return await del(authenticationToken, locale, url);
}

export async function uploadContentProducerImage (baseUrl, authenticationToken, locale, { contentProducerId, image, callback }) {
  const formData = new FormData();
  formData.append('uuid', contentProducerId);
  formData.append('file', image);
  await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/contentProducers/${contentProducerId}/logo`, formData, callback);
}