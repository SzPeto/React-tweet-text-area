# TweetsApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**tweetsControllerAddTweet**](#tweetscontrolleraddtweet) | **POST** /api/tweets | |
|[**tweetsControllerDeleteTweetById**](#tweetscontrollerdeletetweetbyid) | **DELETE** /api/tweets/{id} | |
|[**tweetsControllerGetAllTweets**](#tweetscontrollergetalltweets) | **GET** /api/tweets | |
|[**tweetsControllerGetTweetById**](#tweetscontrollergettweetbyid) | **GET** /api/tweets/{id} | |
|[**tweetsControllerUpdateTweetById**](#tweetscontrollerupdatetweetbyid) | **PATCH** /api/tweets/{id} | |

# **tweetsControllerAddTweet**
> tweetsControllerAddTweet(createTweetDto)


### Example

```typescript
import {
    TweetsApi,
    Configuration,
    CreateTweetDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetsApi(configuration);

let createTweetDto: CreateTweetDto; //

const { status, data } = await apiInstance.tweetsControllerAddTweet(
    createTweetDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTweetDto** | **CreateTweetDto**|  | |


### Return type

void (empty response body)

### Authorization

[access-token](../README.md#access-token)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetsControllerDeleteTweetById**
> tweetsControllerDeleteTweetById()


### Example

```typescript
import {
    TweetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tweetsControllerDeleteTweetById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetsControllerGetAllTweets**
> Array<Tweet> tweetsControllerGetAllTweets()


### Example

```typescript
import {
    TweetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetsApi(configuration);

const { status, data } = await apiInstance.tweetsControllerGetAllTweets();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<Tweet>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetsControllerGetTweetById**
> Tweet tweetsControllerGetTweetById()


### Example

```typescript
import {
    TweetsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.tweetsControllerGetTweetById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Tweet**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **tweetsControllerUpdateTweetById**
> tweetsControllerUpdateTweetById(updateTweetDto)


### Example

```typescript
import {
    TweetsApi,
    Configuration,
    UpdateTweetDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TweetsApi(configuration);

let id: string; // (default to undefined)
let updateTweetDto: UpdateTweetDto; //

const { status, data } = await apiInstance.tweetsControllerUpdateTweetById(
    id,
    updateTweetDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateTweetDto** | **UpdateTweetDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** |  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

