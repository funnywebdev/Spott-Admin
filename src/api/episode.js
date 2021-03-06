import { del, get, post, postFormData } from './request';
import { transformListEpisode, transformEpisode004 } from './transformers';

export async function fetchEpisodes (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/serieEpisodes?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  // There is also usable data in body (not only in data field).
  // We need also fields page, pageCount,...
  body.data = body.data.map(transformListEpisode);
  return body;
}

export async function fetchEpisode (baseUrl, authenticationToken, locale, { episodeId }) {
  const url = `${baseUrl}/v004/media/serieEpisodes/${episodeId}`;
  const { body } = await get(authenticationToken, locale, url);
  return transformEpisode004(body);
}

export async function fetchNextEpisode (baseUrl, authenticationToken, locale, { episodeId }) {
  const url = `${baseUrl}/v004/media/serieEpisodes/${episodeId}/next`;
  const { body } = await get(authenticationToken, locale, url);
  return transformEpisode004(body);
}

export async function persistEpisode (baseUrl, authenticationToken, locale, {
  basedOnDefaultLocale, broadcasters, characters, contentProducers, defaultLocale,
  defaultTitle, description, endYear, episodeId, hasTitle, live, locales, number,
  publishStatus, relatedCharacterIds, seasonId, seriesEntryId, startYear, title,
  lastEpisodeId, mediumCategories
}) {
  let episode = {};
  if (episodeId) {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/serieEpisodes/${episodeId}`);
    episode = body;
  }
  // episode.characters = characters.map(({ id }) => ({ character: { uuid: id } }));
  episode.categories = mediumCategories && mediumCategories.map((mediumCategoryId) => ({ uuid: mediumCategoryId }));
  episode.contentProducers = contentProducers && contentProducers.map((cp) => ({ uuid: cp }));
  episode.broadcasters = broadcasters && broadcasters.map((bc) => ({ uuid: bc }));
  episode.defaultLocale = defaultLocale;
  episode.defaultTitle = defaultTitle;
  // episode.externalReference.reference = externalReference;
  // episode.externalReference.source = externalReferenceSource;
  episode.live = live;
  episode.publishStatus = publishStatus;
  episode.season = { uuid: seasonId };
  episode.serie = { uuid: seriesEntryId };
  episode.type = 'TV_SERIE_EPISODE';
  episode.number = number;
  // episode.id = 'e7965a70-e455-4292-a043-170f5aca6d05';
  // Update locale data.
  episode.localeData = [];
  locales.forEach((locale) => {
    const localeData = {};
    // basedOnDefaultLocale is always provided, no check needed
    localeData.basedOnDefaultLocale = basedOnDefaultLocale && basedOnDefaultLocale[locale];
    localeData.description = description && description[locale];
    localeData.endYear = endYear && endYear[locale];
    localeData.startYear = startYear && startYear[locale];
    localeData.hasTitle = hasTitle && hasTitle[locale];
    localeData.title = title && title[locale];
    localeData.locale = locale;
    episode.localeData.push(localeData);
  });
  const url = `${baseUrl}/v004/media/serieEpisodes`;
  const result = await post(authenticationToken, locale, url, episode);
  const persistedEpisode = transformEpisode004(result.body);
  // Copy all brands, characters, shops, collections of the last episode of a season.
  // This only happens when we create a new episode. We need to create the episode
  // first, so we have the id of this episode. After that we can do the copy call.
  if (lastEpisodeId) {
    await post(authenticationToken, locale, `${baseUrl}/v004/media/media/${persistedEpisode.id}/brandDeals/actions/importFromOtherMedium/${lastEpisodeId}`);
    await post(authenticationToken, locale, `${baseUrl}/v004/media/media/${persistedEpisode.id}/castMembers/actions/importFromOtherMedium/${lastEpisodeId}`);
    await post(authenticationToken, locale, `${baseUrl}/v004/media/media/${persistedEpisode.id}/shopDeals/actions/importFromOtherMedium/${lastEpisodeId}`);
    await post(authenticationToken, locale, `${baseUrl}/v004/media/media/${persistedEpisode.id}/itemCollections/actions/copy/${lastEpisodeId}`);
  }
  return persistedEpisode;
}

export async function deleteEpisode (baseUrl, authenticationToken, locale, { episodeId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/serieEpisodes/${episodeId}`);
}

export async function deleteEpisodes (baseUrl, authenticationToken, locale, { episodeIds }) {
  for (const episodeId of episodeIds) {
    await deleteEpisode(baseUrl, authenticationToken, locale, { episodeId });
  }
}

export async function uploadProfileImage (baseUrl, authenticationToken, locale, { locale: imageLocale, episodeId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('locale', imageLocale);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${episodeId}/profileCover`, formData, callback);
  return transformEpisode004(result.body);
}

export async function uploadPosterImage (baseUrl, authenticationToken, locale, { locale: imageLocale, episodeId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('locale', imageLocale);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/media/${episodeId}/posterImage`, formData, callback);
  return transformEpisode004(result.body);
}
