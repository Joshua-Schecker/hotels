# hotel booking service
Tiden går fort. Med tanke på 4 timer begrensing, klarte jeg ikke lage en fungerende løsning. Istendenfor satset jeg på utvikling av arkitektur og API design. Nedenfor finner du en beskrivelser av databasen og hovrdan API hadde sett ut.

## Data model
https://dbdiagram.io/d/hotels-65dca63e5cd0412774d65d78

## API

### Hotels
- api/v1/hotel/:hotel_id
  - GET: Get hotel
  - POST: Create a hotel
  - PATCH: Update a hotel
  - DELETE: Delete a hotel

### Rooms
- api/v1/room/:room_id
  - GET: Get room
  - POST: Create a room
  - PATCH: Update a room
  - DELETE: Delete a room

- api/v1/hotel/:hotel_id/room
  - GET: List of hotel rooms

### Reservations
- hotel/:hotelId/reservation
  - POST: Create a reservation in a hotel for a room type
- rooms/:roomId/reservation
  - POST: Create a reservation for a specific room

- api/v1/hotel/:hotel_id/reservations
  - GET: List of hotel reservations

- api/v1/room/:room_id/reservations
  - GET: List of room reservations
  - POST: Book specific room

- api/v1/user/:user_id/reservations
    GET: List of user reservations


##  Diskusjonsoppgaver
### Hva mener du er viktig å tenke på når du skal lage et slikt system?
Security is always a primary concern when dealing with sensitive data. The system should be designed to be secure and to protect the data from unauthorized access. This can be achieved by using encryption, authentication, and authorization.

Data integrity is very important. The system should be designed to ensure that the data is always consistent and accurate.

Performance and scalability would not be primary concerns given relatively modest expected traffic.

### Er det noen spesielle teknologier du mener vil være til hjelp når du skal lage et slikt system og hvorfor?
- Relational database
  - The data is inherently relational, and having a relational database will make it easier to query and maintain the data.
  - It will also make it easier to maintain the data integrity.
- REST APIs
  - REST APIs are well suited to managing the resources in the system.
- JWT
  - JWT can be used to authenticate and authorize the users of the system and it can be used to give role-based access to the users. This will allow employees to book on behalf of customers


### Er det noen spesielle utfordringer som kan oppstå i en slik type løsning, og hvordan ville du angrepet dette.
- Payments
  - It's important to ensure that the payment information is secure and that the payments are processed correctly. This can be achieved by using third party payment provider and following best practices for handling payment information.

- Consistency
  - It's important to ensure that the data is always consistent and accurate. This can be achieved by using transactions and ensuring that the data is always validated before it is committed to the database.

- Integrations
  - To support integratiosn with other sytems, the system should support API token authentication and have a separate, well-documented API for integrations. Oauth2 could be used to allow third party applications to access the system.

### Loyalty program
A loyalty program could be a complex solution. It may be best to outsouce this to a third party provider. If we were to implement it ourselves, we would need to consider how to track and manage the points, how to apply the points to the reservations, and how to manage the rewards. 

A simple solution be:
Tables for tracking user points, a table for tracking point transactions and defining how points are converted to reward and how payments are are converted to points. 

It would be important to ensure that the system is not exploitabl by users trying to game the system. For exmaple, esuring users do not earn points for cancelled reservations.

It would also require an integration with the payment provider that would allow the users to spend points instead of money. This could be achieved by converting the points into credit.