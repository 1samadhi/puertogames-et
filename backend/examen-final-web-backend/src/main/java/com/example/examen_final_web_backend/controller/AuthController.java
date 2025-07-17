package com.example.examen_final_web_backend.controller;

import com.example.examen_final_web_backend.model.Usuario;
import com.example.examen_final_web_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*") // Para permitir CORS desde el frontend
public class AuthController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    // Endpoint 1: POST /api/auth/register - Registrar usuario
    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        try {
            Usuario nuevoUsuario = usuarioService.registrarUsuario(usuario);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Usuario registrado exitosamente",
                "usuario", nuevoUsuario
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // Endpoint 2: POST /api/auth/login - Autenticar usuario
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String username = loginData.get("username");
            String password = loginData.get("password");
            
            Usuario usuario = usuarioService.login(username, password);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login exitoso",
                "usuario", usuario
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
}
