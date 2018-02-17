import nock from 'nock';
import "isomorphic-fetch";
import 'dot-env';
import VkPostBot from "../index";


test('ok: message and attachments passed', async () => {
  const okResponse = {"response": {"post_id": 48}};
  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=1&message=test&access_token=${process.env.ACCESS_TOKEN}&v=5.71&attachments=https://github.com/`)
    .reply(200,
      okResponse
    );
  const bot = new VkPostBot(process.env.ACCESS_TOKEN);
  const ownerId = process.env.OWNER_ID;
  const friendsOnly = 0;
  const fromGroup = 1;
  const message = 'test';
  const attachments = 'https://github.com/';

  const response = await bot.post({
    "ownerId": ownerId,
    "friendsOnly": friendsOnly,
    "fromGroup": fromGroup,
    "message": message,
    "attachments": attachments
  });
  expect(response).toEqual(okResponse.response);
});

test('ok: no message text, only attachments passed', async () => {
  const okResponse = {"response": {"post_id": 48}};

  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=1&access_token=${process.env.ACCESS_TOKEN}&v=5.71&attachments=https://github.com/`)
    .reply(200,
      okResponse
    );
  const bot = new VkPostBot(process.env.ACCESS_TOKEN);
  const ownerId = process.env.OWNER_ID;
  const friendsOnly = 0;
  const fromGroup = 1;
  const attachments = 'https://github.com/';

  const response = await bot.post({
    "ownerId": ownerId,
    "friendsOnly": friendsOnly,
    "fromGroup": fromGroup,
    "attachments": attachments
  });
  expect(response).toEqual(okResponse.response);
});

test('ok: message text passed, no attachments', async () => {
  const okResponse = {"response": {"post_id": 48}};

  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=1&message=test&access_token=${process.env.ACCESS_TOKEN}&v=5.71`)
    .reply(200,
      okResponse
    );
  const bot = new VkPostBot(process.env.ACCESS_TOKEN);
  const ownerId = process.env.OWNER_ID;
  const friendsOnly = 0;
  const fromGroup = 1;
  const message = 'test';

  const response = await bot.post({
    "ownerId": ownerId,
    "friendsOnly": friendsOnly,
    "fromGroup": fromGroup,
    "message": message
  });
  expect(response).toEqual(okResponse.response);
});


test('fail: no message, no attachments passed', async () => {
  const errorResponse = {
    "error": {
      "error_code": 100,
      "error_msg": "One of the parameters specified was missing or invalid: invalid message param",
      "request_params": [{"key": "oauth", "value": "1"}, {"key": "method", "value": "wall.post"}, {
        "key": "owner_id",
        "value": process.env.OWNER_ID
      }, {"key": "friends_only", "value": "0"}, {"key": "from_group", "value": "1"}, {"key": "v", "value": "5.71"}]
    }
  };

  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=1&access_token=${process.env.ACCESS_TOKEN}&v=5.71`)
    .reply(200,
      errorResponse
    );
  try {
    const bot = new VkPostBot(process.env.ACCESS_TOKEN);
    const ownerId = process.env.OWNER_ID;
    const friendsOnly = 0;
    const fromGroup = 1;
    await bot.post({
      "ownerId": ownerId,
      "friendsOnly": friendsOnly,
      "fromGroup": fromGroup
    });
  } catch (error) {
    expect(error.message).toEqual(errorResponse.error.error_msg);
  }
});


test('fail: expired token passed', async () => {
  const errorResponse = {
    "error": {
      "error_code": 5,
      "error_msg": "User authorization failed: access_token has expired.",
      "request_params": [{"key": "oauth", "value": "1"}, {"key": "method", "value": "wall.post"}, {
        "key": "owner_id",
        "value": process.env.OWNER_ID,
      }, {"key": "friends_only", "value": "0"}, {"key": "from_group", "value": "1"}, {
        "key": "message",
        "value": "text"
      }, {"key": "v", "value": "5.71"}]
    }
  };

  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=1&message=test&access_token=${process.env.ACCESS_TOKEN}&v=5.71&attachments=https://github.com/`)
    .reply(200,
      errorResponse
    );
  const bot = new VkPostBot(process.env.ACCESS_TOKEN);
  const ownerId = process.env.OWNER_ID;
  const friendsOnly = 0;
  const fromGroup = 1;
  const message = 'test';
  const attachments = 'https://github.com/';
  try {
    await bot.post({
      "ownerId": ownerId,
      "friendsOnly": friendsOnly,
      "fromGroup": fromGroup,
      "message": message,
      "attachments": attachments
    });
  } catch (error) {
    expect(error.message).toEqual(errorResponse.error.error_msg);
  }
});


test('ok: message and attachments passed, friendsOnly and fromGroup are default', async () => {
  const okResponse = {"response": {"post_id": 48}};
  nock('https://api.vk.com')
    .get(`/method/wall.post?owner_id=${process.env.OWNER_ID}&friends_only=0&from_group=0&message=test&access_token=${process.env.ACCESS_TOKEN}&v=5.71&attachments=https://github.com/`)
    .reply(200,
      okResponse
    );
  const bot = new VkPostBot(process.env.ACCESS_TOKEN);
  const ownerId = process.env.OWNER_ID;
  const message = 'test';
  const attachments = 'https://github.com/';

  const response = await bot.post({
    "ownerId": ownerId,
    "message": message,
    "attachments": attachments
  });
  expect(response).toEqual(okResponse.response);
});

