package com.example.backend.service;

import com.example.backend.model.ChatRoom;
import com.example.backend.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ChatRoomService(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }
    @Transactional(readOnly = true)
    public Optional<ChatRoom> getChatRoomById(Long id) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(id);
        return chatRoom;
    }

    public ChatRoom save(ChatRoom chatRoom) {
        return this.chatRoomRepository.save(chatRoom);

    }

    public Optional<ChatRoom> findByNameAndUsers(String name, int size, Set<Long> userIds) {
        return this.chatRoomRepository.findByNameAndUsers(name, size, userIds);
    }

    public List<ChatRoom> findAll() {
        return this.chatRoomRepository.findAll();
    }

}

