import ErrorBadRequest from './ErrorBadRequest';

/**
 * Class represents bot that adds post on wall
 * @param {String} token - access token
 */
export default class VkPostBot {
  constructor(token) {
    this.token = token;
  }

  /**
   * Add post community wall
   * @param params {Object} - Parameters of post
   * @param params.ownerId - (Required) community ID - negative value
   * @param params.friendsOnly - 1 — post will be available to friends only, 0 — post will be available to all users (default)
   * @param params.fromGroup - 1 — post will be published by the community, 0 — post will be published by the user (default)
   * @param params.message - (Required if attachments is not set.) Text of the post.
   * @param params.attachments - (Required if message is not set.) List of objects attached to the post
   */
  async post(params) {
    let result;
    let friendsOnly = params.friendsOnly || 0;
    let fromGroup = params.fromGroup || 0;

    try {
      if (!params.message) { //no message text
        if (params.attachments) { //no message, only attachments
          result = await fetch(`https://api.vk.com/method/wall.post?owner_id=${params.ownerId}&friends_only=${friendsOnly}&from_group=${fromGroup}&access_token=${this.token}&v=5.71&attachments=${params.attachments}`);
        } else { // no message, no attachments
          throw new ErrorBadRequest('One of the parameters specified was missing or invalid: invalid message param');
        }
      } else if (params.attachments) { //message & attachments
        result = await fetch(`https://api.vk.com/method/wall.post?owner_id=${params.ownerId}&friends_only=${friendsOnly}&from_group=${fromGroup}&message=${params.message}&access_token=${this.token}&v=5.71&attachments=${params.attachments}`);
      } else { //only message
        result = await fetch(`https://api.vk.com/method/wall.post?owner_id=${params.ownerId}&friends_only=${friendsOnly}&from_group=${fromGroup}&message=${params.message}&access_token=${this.token}&v=5.71`);
      }
      const json = await result.json();
      if (json.hasOwnProperty('response')) {
        return json.response;
      }
      throw new ErrorBadRequest(json.error.error_msg);
    } catch (error) {
      throw new ErrorBadRequest(`${error.message}`);
    }
  }
}
