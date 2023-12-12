### APPLICATION NAME
Our App will be called: **Roommate Match**

### TECH STACK
- Frontend Framework: **React**
- Backend Framework: **Ruby on Rails**
- Database: **PostgreSQL**

### USER STORIES
* A user can register/login on the app
* A user can view all listing or filter all listings, whether logged in or not
* A user can:
  * C - Create a listing
    * Listing Details
  * R - View/Read a listing
  * U - Update a listing
  * D - Delete a listing
* A user should be able to send messages between users
* A user can favourite litings
* Users can add reviews and ratings for other users
* A user can change the status of a listing

  **STRETCH**
  * Implement Google Maps API integration so that users can see where each listing is located.
  * A user should be able to receive notifications for new listings in their area (when notification is on)
  * A user can see how many views each listing they posted have


### TABLES
* users
  - id, username, first_name, last_name, email, password_digest, isDeleted
* listings
  - id, title, description, number_of_rooms, number_of_roommates, preference, status, price, postal_code, city, country, image_url, user_id, created_at, updated_at
* messages
  - id, sender_id, recipient_id, message, read, created_at, read_at
* favourites
  - id, user_id, listing_id, isFavourite (True/False)
* reviews
  - id, user_id, listing_id, review, rating, created_at


### ROUTES
- **FRONTEND**
  - **AUTHENTICATION**
    - GET /login
    - POST /logout
    - POST /registration
  - **PROFILE**
    - GET /profile
    - GET /profile/listings
    - PUT /profile/edit
    - DELETE /profile/:id
  - **LISTINGS**
    - GET /listings
    - POST /listings/
    - PUT /listings/:profile_id/edit
    - DELETE listings/:profile_id/:id
  - **MESSAGES**
    - GET /messages
    - GET /message/:profile_id
    - PUT /message/:profile_id
    - DELETE /message/:profile_id
  - **FAVOURITES**
  - **REVIEWS**
- **BACKEND**