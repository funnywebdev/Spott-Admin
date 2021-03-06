import { processVideo, uploadFile } from '../../../../actions/video';

export const CREATE_VIDEO_START = 'VIDEO/CREATE_VIDEO_START';
export const CREATE_VIDEO_SUCCESS = 'VIDEO/CREATE_VIDEO_SUCCESS';
export const CREATE_VIDEO_ERROR = 'VIDEO/CREATE_VIDEO_ERROR';
export const CREATE_VIDEO_PROGRESS = 'VIDEO/CREATE_VIDEO_PROGRESS';

/**
 * Create a media object.
 * 1) Upload to Amazon S3.
 * 2) Process the video on S3 +
 *    Link the uploaded video to a medium (series, movie, etc.).
 */
export function createVideo ({ description, externalReference, externalReferenceSource, file, processAudio, processScenes }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ data: { description, externalReference, videoFilename: file.name }, externalReference, type: CREATE_VIDEO_START });
      // Upload the video file.
      const { remoteFilename } = await dispatch(uploadFile(file, (currentBytes, totalBytes) => {
        // Track upload progress.
        dispatch({ externalReference, data: { currentBytes, externalReference, totalBytes }, type: CREATE_VIDEO_PROGRESS });
      }));
      // Stores the requestId in the state to poll the status or retrieve the logs.
      await dispatch(processVideo({ description, externalReference, externalReferenceSource, processAudio, processScenes, remoteFilename }));
      dispatch({ externalReference, data: { currentBytes: file.size, externalReference, totalBytes: file.size }, type: CREATE_VIDEO_SUCCESS });
    } catch (error) {
      dispatch({ error, externalReference, type: CREATE_VIDEO_ERROR });
    }
  };
}
