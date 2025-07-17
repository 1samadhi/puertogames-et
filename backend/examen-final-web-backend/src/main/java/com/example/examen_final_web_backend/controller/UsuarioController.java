package com.example.examen_final_web_backend.controller;

import com.example.examen_final_web_backend.model.Usuario;
import com.example.examen_final_web_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Para permitir CORS desde el frontend
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;
    
    // Endpoint 3: GET /api/users/profile/{id} - Obtener perfil
    @GetMapping("/profile/{id}")
    public ResponseEntity<?> obtenerPerfil(@PathVariable Long id) {
        try {
            Usuario usuario = usuarioService.obtenerPerfil(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "usuario", usuario
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // Endpoint 4: PUT /api/users/profile/{id} - Actualizar perfil
    @PutMapping("/profile/{id}")
    public ResponseEntity<?> actualizarPerfil(@PathVariable Long id, @RequestBody Usuario datosActualizados) {
        try {
            Usuario usuarioActualizado = usuarioService.actualizarPerfil(id, datosActualizados);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Perfil actualizado exitosamente",
                "usuario", usuarioActualizado
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
    
    // Endpoint 5: DELETE /api/users/{id} - Eliminar cuenta
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable Long id) {
        try {
            usuarioService.eliminarCuenta(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Cuenta eliminada exitosamente"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        }
    }
}
