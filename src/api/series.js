import { del, get, post, postFormData } from './request';
import { transformListSeriesEntry, transformSeriesEntry004, transformListSeason, transformListEpisode } from './transformers';

export async function fetchSeriesEntrySeasons (baseUrl, authenticationToken, locale, { seriesEntryId, searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/series/${seriesEntryId}/seasons?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformListSeason);
  return body;
}

export async function fetchSeriesEntryEpisodes (baseUrl, authenticationToken, locale, { publishStatus, seriesEntryId, searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/series/${seriesEntryId}/episodes?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  if (publishStatus) {
    url = url.concat(`&publishStatus=${publishStatus}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformListEpisode);
  return body;
}

export async function fetchSeriesEntries (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/series?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformListSeriesEntry);
  return body;
}

export async function fetchSeriesEntry (baseUrl, authenticationToken, locale, { seriesEntryId }) {
  const url = `${baseUrl}/v004/media/series/${seriesEntryId}`;
  const { body } = await get(authenticationToken, locale, url);
  return transformSeriesEntry004(body);
}

export async function persistSeriesEntry (baseUrl, authenticationToken, locale, {
  basedOnDefaultLocale, defaultLocale, defaultTitle, description, endYear, locales, publishStatus,
  seriesEntryId, startYear, title }) {
  let seriesEntry = {};
  if (seriesEntryId) {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/series/${seriesEntryId}`);
    seriesEntry = body;
  }

  // series.categories = mediumCategories.map((mediumCategoryId) => ({ uuid: mediumCategoryId }));
  seriesEntry.defaultLocale = defaultLocale;
  seriesEntry.defaultTitle = title[defaultLocale];
  // series.externalReference.reference = externalReference;
  // series.externalReference.source = externalReferenceSource;
  seriesEntry.publishStatus = publishStatus;

  // Update locale data.
  seriesEntry.localeData = [];
  locales.forEach((locale) => {
    const localeData = {};
    // basedOnDefaultLocale is always provided, no check needed
    localeData.basedOnDefaultLocale = basedOnDefaultLocale && basedOnDefaultLocale[locale];
    localeData.description = description && description[locale];
    localeData.endYear = endYear && endYear[locale];
    localeData.startYear = startYear && startYear[locale];
    // title is always provided, no check needed
    localeData.title = title[locale];
    localeData.locale = locale;
    seriesEntry.localeData.push(localeData);
  });
  const url = `${baseUrl}/v004/media/series`;
  const result = await post(authenticationToken, locale, url, seriesEntry);
  return transformSeriesEntry004(result.body);
}

export async function deleteSeriesEntry (baseUrl, authenticationToken, locale, { seriesEntryId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/series/${seriesEntryId}`);
}

export async function deleteSeriesEntries (baseUrl, authenticationToken, locale, { seriesEntryIds }) {
  for (const seriesEntryId of seriesEntryIds) {
    await deleteSeriesEntry(baseUrl, authenticationToken, locale, { seriesEntryId });
  }
}

// Used for autocompletion.
export async function searchSeriesEntries (baseUrl, authenticationToken, locale, { searchString = '' }) {
  let searchUrl = `${baseUrl}/v004/media/series?pageSize=25`;
  if (searchString) {
    searchUrl += `&searchString=${encodeURIComponent(searchString)}`;
  }
  const { body: { data } } = await get(authenticationToken, locale, searchUrl);
  return data.map(transformListSeriesEntry);
}

export async function searchSeasons (baseUrl, authenticationToken, locale, { searchString, seriesEntryId }) {
  if (!seriesEntryId) {
    return [];
  }
  let searchUrl = `${baseUrl}/v004/media/series/${seriesEntryId}/seasons?pageSize=25`;
  if (searchString) {
    searchUrl += `&searchString=${encodeURIComponent(searchString)}`;
  }
  const { body: { data } } = await get(authenticationToken, locale, searchUrl);
  return data.map(transformListSeason);
}

export async function uploadProfileImage (baseUrl, authenticationToken, locale, { locale: imageLocale, seriesEntryId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('locale', imageLocale);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${seriesEntryId}/profileCover`, formData, callback);
  return transformSeriesEntry004(result.body);
}

export async function uploadPosterImage (baseUrl, authenticationToken, locale, { locale: imageLocale, seriesEntryId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('locale', imageLocale);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${seriesEntryId}/posterImage`, formData, callback);
  return transformSeriesEntry004(result.body);
}

export async function uploadRoundLogo (baseUrl, authenticationToken, locale, { locale: imageLocale, seriesEntryId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('locale', imageLocale);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${seriesEntryId}/roundLogo`, formData, callback);
  return transformSeriesEntry004(result.body);
}
