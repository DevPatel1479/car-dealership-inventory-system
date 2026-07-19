# Car Dealership Inventory System API Documentation

## Base URL

http://localhost:3000/api

---

# Authentication APIs

## 1. Register User

### Endpoint

```
POST /auth/register
```

### Authentication

No authentication required.

### Description

Creates a new user account.

The user role is automatically assigned as: USER

The client cannot provide or modify the role during registration.

---

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}


Postman Example

Method:

POST

URL:

http://localhost:3000/api/auth/register

Content-Type: application/json

Body:

{
  "name": "Rahul Pandit",
  "email": "rahul@pan.com",
  "password": "mypassword"
}

Success Response
Status:

201 Created

Response:

{
    "name": "Rahul Pandit",
    "email": "rahul@pan.com",
    "role": "USER"
}

```

Notes
New registrations are always created with USER role.
Admin users must be created separately or promoted through a secure admin process.
Sending role: "ADMIN" in the request body will be ignored or rejected



---

## 2. Login User

### Endpoint

```
POST /auth/login
```

### Authentication

No authentication required.

### Description

Authenticates an existing user and returns a JWT token.

The returned JWT token must be sent in the Authorization header to access protected APIs.

---

### Request Body

```json
{
  "email": "rahul@pan.com",
  "password": "mypassword"
}
```

---

### Postman Example

Method:

```
POST
```

URL:

```
http://localhost:3000/api/auth/login
```

Headers:

```
Content-Type: application/json
```

Body:

```json
{
  "email": "rahul@pan.com",
  "password": "mypassword"
}
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
{
    "name": "Rahul Pandit",
    "email": "rahul@pan.com",
    "role": "USER",
    "token": "jwt_access_token"
}
```

---

### Notes

- Login is available for both `USER` and `ADMIN` accounts.
- A valid JWT token is generated after successful authentication.
- The JWT token must be included in protected API requests.

Authorization Header format:

```
Authorization: Bearer <JWT_TOKEN>
```

- Invalid credentials will return an authentication error.
- The role returned in the response determines access permissions for protected admin routes.

---

# Vehicle APIs

---

## 1. Create Vehicle

### Endpoint

```
POST /vehicles
```

### Authentication

JWT authentication required.

### Authorization

**Admin Only**

Only users with `ADMIN` role can create new vehicles.

---

### Description

Creates a new vehicle and adds it to the dealership inventory.

Each vehicle contains:

- Make
- Model
- Category
- Price
- Quantity available in stock

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### Request Body

```json
{
  "make": "BMW",
  "model": "M4 Competition",
  "category": "Sports",
  "price": 85000,
  "quantity": 5
}
```

---

### Postman Example

Method:

```
POST
```

URL:

```
http://localhost:3000/api/vehicles
```

Headers:

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

```
Content-Type: application/json
```

Body:

```json
{
  "make": "BMW",
  "model": "M4 Competition",
  "category": "Sports",
  "price": 85000,
  "quantity": 5
}
```

---

### Success Response

Status:

```
201 Created
```

Response:

```json
{
    "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
    "make": "BMW",
    "model": "M4 Competition",
    "category": "Sports",
    "price": 85000,
    "quantity": 5
}
```

---

### Notes

- Only ADMIN users can create vehicles.
- USER role requests will be rejected with `403 Forbidden`.
- A valid JWT token is required.
- Vehicle quantity represents the available inventory stock.
- Each vehicle is assigned a unique ID automatically.

---

### Error Responses

#### Missing Authentication Token

Status:

```
401 Unauthorized
```

Response:

```json
{
    "message": "Invalid authentication token"
}
```


---

#### Validation Error

Status:

```
400 Bad Request
```

Response:

```json
{
    "message": "Invalid vehicle price or quantity"
}
```

---

---

## 2. Get All Vehicles

### Endpoint

```
GET /vehicles
```

### Authentication

JWT authentication required.

### Authorization

**User and Admin**

Both `USER` and `ADMIN` roles can view available vehicles.

---

### Description

Fetches all vehicles available in the dealership inventory.

This endpoint returns vehicle details including:

- Vehicle ID
- Make
- Model
- Category
- Price
- Available quantity

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Postman Example

Method:

```
GET
```

URL:

```
http://localhost:3000/api/vehicles
```

Headers:

```
Authorization: Bearer <USER_OR_ADMIN_JWT_TOKEN>
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
[
  {
    "id": "3e31c3d8-7387-4213-8fed-70a18f3b6585",
    "make": "Honda",
    "model": "Civic",
    "category": "Sedan",
    "price": 3349332,
    "quantity": 5
  },
  {
    "id": "fea7c189-27a0-4739-8863-b19aac17a4bc",
    "make": "BMW",
    "model": "X5",
    "category": "Luxury SUV",
    "price": 5811206,
    "quantity": 7
  },
  {
    "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
    "make": "BMW",
    "model": "M4 Competition",
    "category": "Sports",
    "price": 85000,
    "quantity": 5
  }
]
```

---

### Notes

- This endpoint is protected and requires a valid JWT token.
- Both `USER` and `ADMIN` users can access vehicle listings.
- Vehicles with `quantity: 0` are returned but cannot be purchased.
- Quantity represents the current available inventory stock.
- The response contains all vehicles stored in the dealership inventory.
- Vehicle IDs are generated automatically and uniquely identify each vehicle.

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### Server Error

Status:

```
500 Internal Server Error
```

Response:

```json
{
  "message": "Internal server error"
}
```

---


---

## 3. Search Vehicles

### Endpoint

```
GET /vehicles/search
```

### Authentication

JWT authentication required.

### Authorization

**User and Admin**

Both `USER` and `ADMIN` roles can search vehicles.

---

### Description

Searches vehicles based on available filters.

Supported search filters:

- Make
- Model
- Category
- Minimum price
- Maximum price

The API returns all vehicles matching the provided search criteria.

---

### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| make | string | Filter vehicles by manufacturer |
| model | string | Filter vehicles by model name |
| category | string | Filter vehicles by vehicle category |
| minPrice | number | Minimum vehicle price |
| maxPrice | number | Maximum vehicle price |

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

---

### Postman Example

Method:

```
GET
```

URL:

```
http://localhost:3000/api/vehicles/search?minPrice=50000&maxPrice=1500000
```

Headers:

```
Authorization: Bearer <USER_OR_ADMIN_JWT_TOKEN>
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
[
  {
    "id": "8ae91dd9-439a-45db-8f05-0f28c139b97b",
    "make": "BMW",
    "model": "M4",
    "category": "Sports",
    "price": 1439501,
    "quantity": 1
  },
  {
    "id": "f15e47ba-c3c5-4900-acef-0d8dbd2b095c",
    "make": "tst",
    "model": "checker",
    "category": "easy",
    "price": 1000000,
    "quantity": 11
  },
  {
    "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
    "make": "BMW",
    "model": "M4 Competition",
    "category": "Sports",
    "price": 85000,
    "quantity": 5
  }
]
```

---

### Notes

- This endpoint requires a valid JWT token.
- Both `USER` and `ADMIN` users can search vehicles.
- Multiple filters can be combined in a single request.
- If no filters are provided, the API returns all available vehicles.
- Price filtering is inclusive:
  - `minPrice` includes vehicles equal to or above the given price.
  - `maxPrice` includes vehicles equal to or below the given price.
- Vehicles with `quantity: 0` may appear in search results but cannot be purchased until restocked.

---

### Example Filter Requests

Search by manufacturer:

```
GET /api/vehicles/search?make=BMW
```

Search by category:

```
GET /api/vehicles/search?category=SUV
```

Search by price range:

```
GET /api/vehicles/search?minPrice=500000&maxPrice=2000000
```

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### Server Error

Status:

```
500 Internal Server Error
```

Response:

```json
{
  "message": "Internal server error"
}
```

---


---

## 4. Update Vehicle

### Endpoint

```
PUT /vehicles/:id
```

### Authentication

JWT authentication required.

### Authorization

**Admin Only**

Only users with `ADMIN` role can update vehicle details.

---

### Description

Updates existing vehicle information using the vehicle ID.

Admin users can update fields such as:

- Price
- Quantity
- Vehicle details based on provided request body

Only the fields provided in the request body will be updated.

---

### Headers

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json
```

---

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique ID of the vehicle |

---

### Postman Example

Method:

```
PUT
```

URL:

```
http://localhost:3000/api/vehicles/a4ff491d-42fa-4f3f-9a8d-6543c3924ee0
```

Headers:

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

```
Content-Type: application/json
```

---

### Request Body

```json
{
  "price": 55000,
  "quantity": 8
}
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
{
  "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
  "make": "BMW",
  "model": "M4 Competition",
  "category": "Sports",
  "price": 55000,
  "quantity": 8
}
```

---

### Notes

- This endpoint is restricted to `ADMIN` users only.
- A valid admin JWT token is required.
- Normal `USER` accounts cannot update vehicle details.
- The vehicle ID must exist in the inventory.
- Only provided fields are updated.
- Updating quantity directly changes the available stock count.
- Updating vehicle price does not affect existing purchases.

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### User Does Not Have Admin Permission

Status:

```
403 Forbidden
```

Response:

```json
{
  "message": "Admin access required"
}
```

---

#### Vehicle Not Found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "Vehicle not found"
}
```

---

#### Validation Error

Status:

```
400 Bad Request
```

Response:

```json
{
  "message": "Invalid vehicle data"
}
```

---


---

## 5. Purchase Vehicle

### Endpoint

```
POST /vehicles/:id/purchase
```

### Authentication

JWT authentication required.

### Authorization

**User and Admin**

Both `USER` and `ADMIN` roles can purchase vehicles.

---

### Description

Purchases a vehicle from the dealership inventory.

When a vehicle is purchased:

- The vehicle quantity is decreased by `1`.
- The updated vehicle inventory details are returned.
- Purchase is not allowed if the vehicle is out of stock.

---

### Headers

```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique ID of the vehicle to purchase |

---

### Postman Example

Method:

```
POST
```

URL:

```
http://localhost:3000/api/vehicles/a4ff491d-42fa-4f3f-9a8d-6543c3924ee0/purchase
```

Headers:

```
Authorization: Bearer <USER_OR_ADMIN_JWT_TOKEN>
```

```
Content-Type: application/json
```

Body:

```
No request body required
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
{
  "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
  "make": "BMW",
  "model": "M4 Competition",
  "category": "Sports",
  "price": 55000,
  "quantity": 7
}
```

---

### Notes

- This endpoint requires authentication.
- Both `USER` and `ADMIN` users can purchase vehicles.
- A successful purchase decreases the available quantity by `1`.
- The API will not allow purchasing vehicles when quantity reaches `0`.
- Vehicles with no available stock must be restocked by an admin before another purchase.
- No request body is required because the vehicle is identified using the URL parameter.

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### Vehicle Not Found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "Vehicle not found"
}
```

---

#### Vehicle Out of Stock

Status:

```
400 Bad Request
```

Response:

```json
{
  "message": "Vehicle is out of stock"
}
```

---

### Example Inventory Change

Before Purchase:

```json
{
  "model": "M4 Competition",
  "quantity": 8
}
```

After Purchase:

```json
{
  "model": "M4 Competition",
  "quantity": 7
}
```

---

---

## 6. Restock Vehicle

### Endpoint

```
POST /vehicles/:id/restock
```

### Authentication

JWT authentication required.

### Authorization

**Admin Only**

Only users with `ADMIN` role can restock vehicle inventory.

---

### Description

Restocks an existing vehicle by increasing its available quantity.

This endpoint allows administrators to:

- Increase vehicle stock quantity.
- Manage inventory availability.
- Restore vehicles that are out of stock.

The provided quantity is added to the existing inventory quantity.

---

### Headers

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
Content-Type: application/json
```

---

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique ID of the vehicle to restock |

---

### Postman Example

Method:

```
POST
```

URL:

```
http://localhost:3000/api/vehicles/a4ff491d-42fa-4f3f-9a8d-6543c3924ee0/restock
```

Headers:

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

```
Content-Type: application/json
```

---

### Request Body

```json
{
  "quantity": 1
}
```

---

### Success Response

Status:

```
200 OK
```

Response:

```json
{
  "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
  "make": "BMW",
  "model": "M4 Competition",
  "category": "Sports",
  "price": 55000,
  "quantity": 8
}
```

---

### Notes

- This endpoint is restricted to `ADMIN` users only.
- A valid admin JWT token is required.
- Normal `USER` accounts cannot restock vehicles.
- The quantity provided in the request body is added to the existing stock.
- Restocking does not modify vehicle details such as make, model, category, or price.
- This endpoint is used to restore inventory after vehicles are sold out.

---

### Example Inventory Change

Before Restock:

```json
{
  "model": "M4 Competition",
  "quantity": 7
}
```

Restock Request:

```json
{
  "quantity": 1
}
```

After Restock:

```json
{
  "model": "M4 Competition",
  "quantity": 8
}
```

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### User Does Not Have Admin Permission

Status:

```
403 Forbidden
```

Response:

```json
{
  "message": "Admin access required"
}
```

---

#### Vehicle Not Found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "Vehicle not found"
}
```

---

#### Invalid Quantity

Status:

```
400 Bad Request
```

Response:

```json
{
  "message": "Quantity must be greater than zero"
}
```

---



---

## 7. Delete Vehicle

### Endpoint

```
DELETE /vehicles/:id
```

### Authentication

JWT authentication required.

### Authorization

**Admin Only**

Only users with `ADMIN` role can delete vehicles from the inventory.

---

### Description

Deletes an existing vehicle from the dealership inventory.

This endpoint permanently removes the vehicle record using the provided vehicle ID.

---

### Headers

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

---

### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Unique ID of the vehicle to delete |

---

### Postman Example

Method:

```
DELETE
```

URL:

```
http://localhost:3000/api/vehicles/a4ff491d-42fa-4f3f-9a8d-6543c3924ee0
```

Headers:

```
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

---

### Request Body

```
No request body required
```

---

### Success Response

Status:

```
204 No Content
```

Response:

```
No response body
```

---

### Notes

- This endpoint is restricted to `ADMIN` users only.
- A valid admin JWT token is required.
- Normal `USER` accounts cannot delete vehicles.
- Deleting a vehicle permanently removes it from the inventory.
- The operation cannot be undone unless the vehicle is created again.
- The vehicle ID must exist before deletion.

---

### Error Responses

#### Missing or Invalid Token

Status:

```
401 Unauthorized
```

Response:

```json
{
  "message": "Unauthorized"
}
```

---

#### User Does Not Have Admin Permission

Status:

```
403 Forbidden
```

Response:

```json
{
  "message": "Admin access required"
}
```

---

#### Vehicle Not Found

Status:

```
404 Not Found
```

Response:

```json
{
  "message": "Vehicle not found"
}
```

---

### Example Inventory Change

Before Delete:

```json
{
  "id": "a4ff491d-42fa-4f3f-9a8d-6543c3924ee0",
  "make": "BMW",
  "model": "M4 Competition",
  "quantity": 8
}
```

Delete Request:

```
DELETE /api/vehicles/a4ff491d-42fa-4f3f-9a8d-6543c3924ee0
```

After Delete:

```
Vehicle record removed successfully.
```

---