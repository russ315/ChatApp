package com.example.backend.service;

import com.example.backend.dto.UserLoginDto;
import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.UserRegisterDto;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(UserRegisterDto request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        String token = jwtUtil.generateToken(user);

        return new AuthResponse(200,token);
    }

    public AuthResponse login(UserLoginDto request) {
        Optional<User> user = userRepository.findByUsername(request.getUsername());

        if (user.isEmpty() || !passwordEncoder.matches(request.getPassword(), user.get().getPassword())) {
            return new AuthResponse(400,"Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.get());
        return new AuthResponse(200,token);
    }
}
