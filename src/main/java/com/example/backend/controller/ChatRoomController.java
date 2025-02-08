package com.example.backend.controller;

import com.example.backend.model.ChatRoom;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.backend.repository.ChatRoomRepository;

import java.util.List;

@RestController
@RequestMapping("/api/chatrooms")
public class ChatRoomController {
    private final ChatRoomRepository chatRoomRepository;

    public ChatRoomController(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }


    @GetMapping("/hello")
    public String Hello(){
        return "Hello World";
    }
    @GetMapping
    public List<ChatRoom> getAllChatRooms() {
        return chatRoomRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
        return ResponseEntity.ok(chatRoomRepository.save(chatRoom));
    }
}
