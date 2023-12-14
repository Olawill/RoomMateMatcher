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
  * Add theme selection for the app
  * **EXTRA**
    * ___Add a payment system such as Stripe so that renters can pay landlords directly through the app___



### TABLES
* users
  - id, username, first_name, last_name, email, sub, isDeleted (True/False)
* listings
  - id, title, description, number_of_rooms, number_of_roommates
   - preference (All, Male, Female, Other), status (Available, Not Available)
   - price, postal_code, city, country, image_url, user_id, created_at, updated_at
* messages
  - id, message, checked (True/False), checked_at, created_at, chatroom_id, user_id
* chatrooms
  - id, name, created_at
* users_chatroom
  - user_id, chatroom_id
* favourites
  - id, user_id, listing_id, isFavourite (True/False)
* reviews
  - id, user_id, listing_id, review, rating (1-5), created_at


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
