# Vk post bot

Bot that adds posts to community wall

# Usage

```javascript
const bot = new VkPostBot("<access_token>");
bot.post({
             "ownerId": "-1",
             "friendsOnly": "1",
             "fromGroup": "1",
             "message": "test message",
             "attachments": "https://example.com/"
           });
```

# Documentation

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [VkPostBot](#vkpostbot)
    -   [post](#post)
-   [ErrorBadRequest](#errorbadrequest)

## VkPostBot

Class represents bot that adds post on wall

**Parameters**

-   `token` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** access token

### post

Add post community wall

**Parameters**

-   `params`  {Object} - Parameters of post
    -   `params.ownerId`  (Required) community ID - negative value
    -   `params.friendsOnly`  1 — post will be available to friends only, 0 — post will be available to all users (default)
    -   `params.fromGroup`  1 — post will be published by the community, 0 — post will be published by the user (default)
    -   `params.message`  (Required if attachments is not set.) Text of the post.
    -   `params.attachments`  (Required if message is not set.) List of objects attached to the post

## ErrorBadRequest

**Extends Error**

Class represents custom error for Bad Request

**Parameters**

-   `message` **([string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | null)** error message (optional, default `null`)