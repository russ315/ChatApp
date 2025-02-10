package com.example.backend.controller;

import com.example.backend.dto.UserLoginDto;
import com.example.backend.dto.AuthResponse;
import com.example.backend.dto.UserRegisterDto;
import com.example.backend.dto.UserLoginDto;
import com.example.backend.dto.UserRegisterDto;
import com.example.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody UserRegisterDto request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserLoginDto request) {
        var result = authService.login(request);
        if(result.getStatusCode() == HttpStatus.BAD_REQUEST.value()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
        return ResponseEntity.ok(result);
    }
}
