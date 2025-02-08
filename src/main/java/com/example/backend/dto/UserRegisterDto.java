package com.example.backend.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegisterDto {
    @Getter
    private String username;
    @Getter

    private String password;
    @Getter

    private String confirmPassword;


}

