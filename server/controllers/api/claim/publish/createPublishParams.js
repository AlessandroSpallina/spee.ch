const logger = require('winston');
const { details, publishing } = require('@config/siteConfig');
const createPublishParams = (
  filePath,
  name,
  title,
  description,
  license,
  licenseUrl,
  nsfw,
  thumbnail,
  channelName,
  channelClaimId
) => {
  // provide defaults for title
  if (title === null || title.trim() === '') {
    title = name;
  }
  // provide default for description
  if (description === null || description.trim() === '') {
    description = '';
  }
  // provide default for license
  if (license === null || license.trim() === '') {
    license = ''; // default to empty string
  }
  // provide default for licenseUrl
  if (licenseUrl === null || licenseUrl.trim() === '') {
    licenseUrl = ''; // default to empty string
  }
  // create the basic publish params
  const publishParams = {
    name,
    file_path: filePath,
    bid: publishing.fileClaimBidAmount,
    description,
    title,
    author: details.title,
    languages: ['en'],
    license,
    license_url: licenseUrl,
    tags: [],
    claim_address: publishing.primaryClaimAddress,
  };
  // add thumbnail to channel if video
  if (thumbnail) {
    publishParams['thumbnail_url'] = thumbnail;
  }
  if (nsfw) {
    publishParams.tags = ['mature'];
  }
  // add channel details if publishing to a channel
  if (channelName && channelClaimId) {
    publishParams['channel_id'] = channelClaimId;
    publishParams['channel_name'] = channelName;
  }
  // log params
  logger.debug('publish params:', publishParams);
  // return
  return publishParams;
};

module.exports = createPublishParams;
