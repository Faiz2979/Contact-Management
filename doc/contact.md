# Contact API Spec

## Create Contact

Endpoint: POST /api/contacts

Headers :
- Authorization : token

Request Body :


```json
{
    "first_name" : "Eko Kurniawan",
    "last_name" : "Kiko",
    "email" : "eko@example.com",
    "phone" : "987654321"
}
```

Response Body (Success)

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Eko Kurniawan",
        "last_name" : "Kiko",
        "email" : "eko@example.com",
        "phone" : "987654321"
    }
}
```

## Get Contact

Endpoint: GET /api/contacts/:contactID

Headers :
- Authorization : token

Request Body :

Response Body (Success)

```json
{
    "data" : {
        "id" : 1,
        "first_name" : "Eko Kurniawan",
        "last_name" : "Kiko",
        "email" : "eko@example.com",
        "phone" : "987654321"
    }
}
```

## Update Contact

Endpoint: PUT /api/contacts/:contactID

Headers :
- Authorization : token

Request Body :


```json
{
    "first_name" : "Eko Kurniawan",
    "last_name" : "Kiko",
    "email" : "eko@example.com",
    "phone" : "987654321"
}
```

Response Body (Success)

```json
{
    "data" : {
        "id" : 1 
        "first_name" : "Eko Kurniawan",
        "last_name" : "Kiko",
        "email" : "eko@example.com",
        "phone" : "987654321"
    }
}
```

## Remove Contact

Endpoint: DELETE /api/contacts/:contactID

Headers :
- Authorization : token
Response Body (Success)

```json
{
    "data" : true
}
```

## Search Contact

Endpoint: GET /api/contacts

Headers :
- Authorization : token

Query Params :
- name: string, contact first name or contact last name, optional
- phone: string, contact phone, optional
- email: string, contact email, optional
- page: number, default 1
- size: number, default 10


Response Body (Success)

```json
{
    "data" : [
        {
        "id" : 1, 
        "first_name" : "Eko Kurniawan",
        "last_name" : "Kiko",
        "email" : "eko@example.com",
        "phone" : "987654321"
        },
        {
        "id" : 2, 
        "first_name" : "Eko Kurniawan",
        "last_name" : "Kiko",
        "email" : "eko@example.com",
        "phone" : "987654321"
        }
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10
    }
}
```