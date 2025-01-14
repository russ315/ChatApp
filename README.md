Real-Time Chat Application

This project is a real-time chat application built using Spring Java, enabling users to communicate instantly with one another.

Features

Real-time Messaging: Send and receive messages instantly.

User Authentication: Secure login and registration for users.

Chat Rooms: Create and join chat rooms for group discussions.

Private Messaging: Send direct messages to individual users.

Typing Indicators: See when other users are typing.

Online Presence: Display users' online/offline status.

Scalability: Designed to support a large number of concurrent users.

Technologies Used

Backend: Spring Boot

WebSocket: For real-time communication

Database: MySQL or PostgreSQL

Frontend: React.js or Angular (optional, depending on your choice)

Build Tool: Maven or Gradle

Prerequisites

Ensure you have the following installed on your system:

Java 17 or higher

Maven or Gradle

MySQL or PostgreSQL

Node.js (if using a frontend framework)

Getting Started

1. Clone the Repository

$ git clone https://github.com/your-repo/realtime-chat-application.git
$ cd realtime-chat-application

2. Set Up the Backend

Navigate to the backend directory:

$ cd backend

Configure the database in the application.properties file:

spring.datasource.url=jdbc:mysql://localhost:3306/chat_app
spring.datasource.username=your_db_username
spring.datasource.password=your_db_password
spring.jpa.hibernate.ddl-auto=update

Build and run the backend:

$ mvn clean install
$ mvn spring-boot:run

3. Set Up the Frontend (Optional)

Navigate to the frontend directory:

$ cd frontend

Install dependencies:

$ npm install

Start the development server:

$ npm start

4. Access the Application

Open your browser and navigate to http://localhost:8080 (or the port specified in your configuration).

Project Structure

realtime-chat-application/
├── backend/
│   ├── src/
│   │   ├── main/
│   │       ├── java/
│   │       ├── resources/
│   │   ├── test/
│   ├── pom.xml
├── frontend/
│   ├── src/
│   │   ├── components/
│   ├── package.json

WebSocket Endpoints

/chat: Main endpoint for chat messages

/users: Endpoint for user status and online presence

API Endpoints (REST)

POST /auth/register: Register a new user

POST /auth/login: Authenticate a user

GET /chat/rooms: Retrieve all chat rooms

POST /chat/message: Send a message

Future Enhancements

File sharing within chat

Message search functionality

Push notifications for new messages

License

This project is licensed under the MIT License. See the LICENSE file for details.

Contributors
russ315
Kairat24
NONAME-12
