DROP TABLE IF EXISTS chatroom_users;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chat_rooms;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       username VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       profile_picture VARCHAR(255),
                       deleted_at TIMESTAMP NULL
);

CREATE TABLE chat_rooms (
                            id BIGSERIAL PRIMARY KEY,
                            room_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE messages (
                          id BIGSERIAL PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          chatroom_id BIGINT NOT NULL,
                          content TEXT NOT NULL,
                          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                          FOREIGN KEY (chatroom_id) REFERENCES chat_rooms(id) ON DELETE CASCADE
);

CREATE TABLE chatroom_users (
                                chatroom_id BIGINT NOT NULL,
                                user_id BIGINT NOT NULL,
                                PRIMARY KEY (chatroom_id, user_id),
                                FOREIGN KEY (chatroom_id) REFERENCES chat_rooms(id) ON DELETE CASCADE,
                                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_messages_user_id ON messages(user_id);
CREATE INDEX idx_messages_chatroom_id ON messages(chatroom_id);
CREATE INDEX idx_chatroom_users_user_id ON chatroom_users(user_id);
CREATE INDEX idx_chatroom_users_chatroom_id ON chatroom_users(chatroom_id);
