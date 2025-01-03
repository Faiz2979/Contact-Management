# User Api Spec

## Register User
Endpoint : POST /api/user

Request Body :

```json
{
    "username": "loremipsum",
    "password": "loremipsum",
    "name": "loremipsum"
}
```
Response Body (Success):

```json
{
    "data": {
        "username": "loremipsum",
        "name": "loremipsum"
    }
}
```
Response Body (Failed):

```json
{
    "error" : "username already registered"
}
```

## Login User
Endpoint : POST /api/user/login

Request Body :

```json
{
    "username": "loremipsum",
    "password": "loremipsum",
}
```
Response Body (Success):

```json
{
    "data": {
        "username": "loremipsum",
        "name": "loremipsum",
        "token": "session_id_generated"
    }
}
```
Response Body (Failed):

```json
{
    "error" : "Username or password is wrong"
}
```

## Get User
Endpoint : GET /api/user/current


Header :
- authorization: token

Response Body (Success):

```json
{
    "data": {
        "username": "loremipsum",
        "name": "loremipsum"
        
    }
}
```
Response Body (Failed):

```json
{
    "error" : "Unauthorized"
}
```



## Update User
Endpoint : PATCH /api/user/current

Headers :
- Authorization: token

Request Body :

```json
{
    "username": "loremipsum",
    "password": "loremipsum",
    "name": "loremipsum"
}
```
Response Body (Success):

```json
{
    "data": {
        "username": "loremipsum", //Optional, if want to change username
        "name": "loremipsum" //Optional, if want to change username
    }
}
```
Response Body (Failed):

```json
{
    "error" : "username already registered"
}
```


## Logout User
Endpoint : DELETE /api/user/current

Headers :
- Authorization: token

Response Body (Success):

```json
{
    "data": "logout"
}
```
Response Body (Failed):

```json
{
    "error" : "username already registered"
}
```
