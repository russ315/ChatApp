package com.example.backend.controller;

import com.example.backend.model.ChatRoom;
import com.example.backend.model.User;
import com.example.backend.repository.ChatRoomRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ChatRoomService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chatrooms")
@CrossOrigin(origins = "*") // Modify as per frontend requirements
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/hello")
    public ResponseEntity<String> hello() {
        return ResponseEntity.ok("Hello World");
    }

    @GetMapping("/")
    public ResponseEntity<List<ChatRoom>> getAllChatRooms() {
        return ResponseEntity.ok(chatRoomService.findAll());
    }
    @Transactional
    @GetMapping("/{id}")
    public ResponseEntity<ChatRoom> getChatRoomById(@PathVariable Long id) {
        return chatRoomService.getChatRoomById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<?> createChatRoom(@RequestBody ChatRoom chatRoom) {
        try {
            if (chatRoom.getUsers() == null || chatRoom.getUsers().isEmpty()) {
                return ResponseEntity.badRequest().body("Users cannot be empty!");
            }

            Set<User> existingUsers = chatRoom.getUsers().stream()
                    .map(user -> userRepository.findByUsername(user.getUsername())
                            .orElseThrow(() -> new RuntimeException("User not found: " + user.getUsername())))
                    .collect(Collectors.toSet());

            chatRoom.setUsers(existingUsers);

            Set<Long> userIds = existingUsers.stream().map(User::getId).collect(Collectors.toSet());
            Optional<ChatRoom> existingChatRoom = chatRoomService.findByNameAndUsers(
                    chatRoom.getName(), userIds.size(), userIds
            );

            if (existingChatRoom.isPresent()) {
                return ResponseEntity.status(409).body("ChatRoom with same name and users already exists!");
            }

            ChatRoom savedChatRoom = chatRoomService.save(chatRoom);
            return ResponseEntity.ok(savedChatRoom);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

}
