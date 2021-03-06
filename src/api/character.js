import { del, get, post, postFormData } from './request';
import { transformImage, transformCharacter, transformListCharacter, transformTopic } from './transformers';

export async function fetchCharacters (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25, sortDirection, sortField }) {
  let url = `${baseUrl}/v004/media/characters?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  if (sortDirection && sortField && (sortDirection === 'ASC' || sortDirection === 'DESC')) {
    url = url.concat(`&sortField=${sortField}&sortDirection=${sortDirection}`);
  }
  const { body } = await get(authenticationToken, locale, url);
  body.data = body.data.map(transformListCharacter);
  return body;
}

export async function fetchCharacter (baseUrl, authenticationToken, locale, { characterId }) {
  const url = `${baseUrl}/v004/media/characters/${characterId}`;
  const { body } = await get(authenticationToken, locale, url);
  const result = transformCharacter(body);
  return result;
}

export async function fetchFaceImages (baseUrl, authenticationToken, locale, { characterId, sortDirection = 'DESC', sortField = 'ADDED_ON' }) {
  const url = `${baseUrl}/v004/media/characters/${characterId}/faceImages?sortDirection=${sortDirection}&sortField=${sortField}`;
  const { body } = await get(authenticationToken, locale, url);
  body.data = body.data.map(({ image, uuid }) => {
    const faceImage = transformImage(image);
    faceImage.id = uuid;
    return faceImage;
  });
  return body;
}

export async function persistCharacter (baseUrl, authenticationToken, locale, {
  basedOnDefaultLocale, defaultLocale, description, locales, publishStatus,
  characterId, name, personId }) {
  let character = {};
  if (characterId) {
    const { body } = await get(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}`);
    character = body;
  }
  character.actor = { uuid: personId };
  character.defaultLocale = defaultLocale;
  character.publishStatus = publishStatus;

  // Update locale data.
  character.localeData = character.localeData || []; // Ensure we have locale data
  locales.forEach((locale) => {
    let localeData = character.localeData.find((ld) => ld.locale === locale);
    if (!localeData) {
      localeData = { locale };
      character.localeData.push(localeData);
    }
    // basedOnDefaultLocale is always provided, no check needed
    localeData.basedOnDefaultLocale = basedOnDefaultLocale && basedOnDefaultLocale[locale];
    localeData.description = description && description[locale];
    // title is always provided, no check needed
    localeData.name = name[locale];
  });
  const url = `${baseUrl}/v004/media/characters`;
  const result = await post(authenticationToken, locale, url, character);
  return transformCharacter(result.body);
}

export async function deleteCharacter (baseUrl, authenticationToken, locale, { characterId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}`);
}

export async function deleteCharacters (baseUrl, authenticationToken, locale, { characterIds }) {
  for (const characterId of characterIds) {
    await deleteCharacter(baseUrl, authenticationToken, locale, { characterId });
  }
}

export async function searchCharacters (baseUrl, authenticationToken, locale, { searchString = '', page = 0, pageSize = 25 }) {
  let url = `${baseUrl}/v004/media/characters?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  const { body: { data } } = await get(authenticationToken, locale, url);
  return data.map(transformListCharacter);
}

export async function searchMediumCharacters (baseUrl, authenticationToken, locale, { mediumId, searchString = '', page = 0, pageSize = 100 }) {
  let url = `${baseUrl}/v004/media/media/${mediumId}/castMembers?page=${page}&pageSize=${pageSize}`;
  if (searchString) {
    url = url.concat(`&searchString=${encodeURIComponent(searchString)}`);
  }
  const { body: { data } } = await get(authenticationToken, locale, url);
  return data.map(transformListCharacter);
}

export async function persistMediumCharacter (baseUrl, authenticationToken, locale, { mediumId, characterId }) {
  const { body } = await post(authenticationToken, locale, `${baseUrl}/v004/media/media/${mediumId}/castMembers/${characterId}`, {});
  return transformCharacter(body);
}

export async function deleteMediumCharacter (baseUrl, authenticationToken, locale, { mediumId, characterId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/media/${mediumId}/castMembers/${characterId}`, {});
}

export async function uploadProfileImage (baseUrl, authenticationToken, locale, { characterId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}/profileCover`, formData, callback);
  return transformCharacter(result.body);
}

export async function uploadPortraitImage (baseUrl, authenticationToken, locale, { characterId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  const result = await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}/portraitImage`, formData, callback);
  return transformCharacter(result.body);
}

export async function uploadFaceImage (baseUrl, authenticationToken, locale, { characterId, image, callback }) {
  const formData = new FormData();
  formData.append('file', image);
  await postFormData(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}/faceImages`, formData, callback);
}

export async function deleteFaceImage (baseUrl, authenticationToken, locale, { characterId, faceImageId }) {
  await del(authenticationToken, locale, `${baseUrl}/v004/media/characters/${characterId}/faceImages/${faceImageId}`);
}

export async function deletePortraitImage (baseUrl, authenticationToken, locale, { characterId }) {
  const url = `${baseUrl}/v004/media/characters/${characterId}/portraitImage`;
  await del(authenticationToken, locale, url);
}

export async function deleteProfileImage (baseUrl, authenticationToken, locale, { characterId }) {
  const url = `${baseUrl}/v004/media/characters/${characterId}/profileCover`;
  await del(authenticationToken, locale, url);
}

export async function fetchTopic (baseUrl, authenticationToken, locale, { characterId }) {
  const url = `${baseUrl}/v004/media/characters/${characterId}/topic`;
  const { body } = await get(authenticationToken, locale, url);
  const result = transformTopic(body);
  return result;
}
