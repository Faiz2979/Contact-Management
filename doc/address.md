# Address API Spec

## Create Address

Endpoint : POST /api/contacts/:contactID/addresses

Headers :
- Authorization : token

Request Body :

```json
    "street" : "Jalan 1", // Optional
    "city" : "Kota", // Optional
    "province" : "Provinsi", // Optional
    "country" : "Negara", 
    "postal_code" : "12345"
```

Response Body :

```json
    "data" : {
        "id" : 1,
        "street" : "Jalan 1",
        "city" : "Kota", 
        "province" : "Provinsi",
        "country" : "Negara", 
        "postal_code" : "12345"
    }
```
## Get Address
Endpoint : GET /api/contacts/:contactID/addresses/:addressID

Headers :
- Authorization : token

Response Body :

```json
    "data" : {
        "id" : 1,
        "street" : "Jalan 1", 
        "city" : "Kota", 
        "province" : "Provinsi", 
        "country" : "Negara", 
        "postal_code" : "12345"
    }
```
## Update Address

Endpoint : PUT /api/contacts/:contactID/addresses/:addressID

Headers :
- Authorization : token

Request Body :

```json
    "street" : "Jalan 1", // Optional
    "city" : "Kota", // Optional
    "province" : "Provinsi", // Optional
    "country" : "Negara", 
    "postal_code" : "12345"
```

Response Body :

```json
    "data" : {
        "id" : 1,
        "street" : "Jalan 1", 
        "city" : "Kota", 
        "province" : "Provinsi", 
        "country" : "Negara", 
        "postal_code" : "12345"
    }
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactID/addresses/:addressID

Headers :
- Authorization : token

Response Body :

```json
    "data" : true
```

## List Addresses

Endpoint : GET /api/contacts/:contactID/addresses

Headers :
- Authorization : token

Response Body :

```json
    "data" :[ 
        {
            "id" : 1,
            "street" : "Jalan 1", 
            "city" : "Kota", 
            "province" : "Provinsi", 
            "country" : "Negara", 
            "postal_code" : "12345"
        },
        {
            "id" : 2,
            "street" : "Jalan 1", 
            "city" : "Kota", 
            "province" : "Provinsi", 
            "country" : "Negara", 
            "postal_code" : "12345"
        }
    ]
```