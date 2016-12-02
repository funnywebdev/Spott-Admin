import { del, get, post, postFormData } from './request';
import { transformEpisode, transformEpisode004, transformTvGuideEntry } from './transformers';

export async function fetchTvGuideEntries (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField, episodeId }) {
  let url = `${baseUrl}/v004/media/media/${episodeId}/tvGuideEntries?page=${page}&pageSize=${pageSize}&mediumUuid=${episodeId}`;
  if (searchString) {
    url = url.concat(`&searchString=${searchString}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformTvGuideEntry);
  return body;
}

export async function fetchEpisodes (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/serieEpisodes?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${searchString}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformEpisode);
  return body;
}

export async function fetchEpisode (baseUrl, authenticationToken, locale, { episodeId }) {
  const url = `${baseUrl}/v004/media/serieEpisodes/${episodeId}`;
  const { body } = await get(authenticationToken, locale, url);
  // console.log('before transform', { ...body });
  const result = transformEpisode004(body);
  // console.log('after tranform', result);
  return result;
}

export async function persistEpisode (baseUrl, authenticationToken, locale, { availabilities, number, hasTitle, basedOnDefaultLocale,
  locales, publishStatus, description, endYear, startYear, defaultLocale, defaultTitle, seriesEntryId, title, seasonId, episodeId,
  contentProducers, broadcasters }) {
  let episode = {};
  if (episodeId) {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/serieEpisodes/${episodeId}`);
    episode = body;
  }
  episode.availabilities = availabilities && availabilities.map(({ availabilityFrom, availabilityTo, countryId, videoStatus }) => ({
    country: countryId && { uuid: countryId }, startTimeStamp: availabilityFrom, endTimeStamp: availabilityTo, videoStatus
  }));
  // episode.categories = mediumCategories.map((mediumCategoryId) => ({ uuid: mediumCategoryId }));
  episode.contentProducers = contentProducers && contentProducers.map((cp) => ({ uuid: cp }));
  episode.broadcasters = broadcasters && broadcasters.map((bc) => ({ uuid: bc }));
  episode.defaultLocale = defaultLocale;
  episode.defaultTitle = defaultTitle;
  // episode.externalReference.reference = externalReference;
  // episode.externalReference.source = externalReferenceSource;
  episode.publishStatus = publishStatus;
  episode.season = { uuid: seasonId };
  episode.serie = { uuid: seriesEntryId };
  episode.type = 'TV_SERIE_SEASON';
  episode.number = number;
  // Update locale data.
  episode.localeData = episode.localeData || []; // Ensure we have locale data
  locales.forEach((locale) => {
    // Get localeData, create if necessary in O(n^2)
    let localeData = episode.localeData.find((ld) => ld.locale === locale);
    if (!localeData) {
      localeData = { locale };
      episode.localeData.push(localeData);
    }
    // basedOnDefaultLocale is always provided, no check needed
    localeData.basedOnDefaultLocale = basedOnDefaultLocale && basedOnDefaultLocale[locale];
    localeData.description = description && description[locale];
    localeData.endYear = endYear && endYear[locale];
    localeData.startYear = startYear && startYear[locale];
    localeData.hasTitle = hasTitle && hasTitle[locale];
    localeData.title = title && title[locale];
  });
  const url = `${baseUrl}/v004/media/serieEpisodes`;
  const result = await post(authenticationToken, locale, url, episode);
  return transformEpisode004(result.body);
}

export async function deleteEpisode (baseUrl, authenticationToken, locale, { episodeId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/serieEpisodes/${episodeId}`);
}

export async function deleteEpisodes (baseUrl, authenticationToken, locale, { episodeIds }) {
  for (const episodeId of episodeIds) {
    await deleteEpisode(baseUrl, authenticationToken, locale, { episodeId });
  }
}

export async function uploadProfileImage (baseUrl, authenticationToken, locale, { episodeId, image, callback }) {
  const formData = new FormData();
  formData.append('uuid', episodeId);
  formData.append('file', image);
  await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${episodeId}/profileCover`, formData, callback);
}

export async function uploadPosterImage (baseUrl, authenticationToken, locale, { episodeId, image, callback }) {
  const formData = new FormData();
  formData.append('uuid', episodeId);
  formData.append('file', image);
  await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${episodeId}/posterImage`, formData, callback);
}
