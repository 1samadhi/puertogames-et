package com.example.examen_final_web_backend.service;

import com.example.examen_final_web_backend.model.Usuario;
import com.example.examen_final_web_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    // Registrar nuevo usuario
    public Usuario registrarUsuario(Usuario usuario) {
        // Verificar que username y email no existan
        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            throw new RuntimeException("El username ya existe");
        }
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("El email ya existe");
        }
        
        // Encriptar password (simplificado para el examen)
        usuario.setPassword(encriptarPassword(usuario.getPassword()));
        usuario.setActivo(true);
        
        return usuarioRepository.save(usuario);
    }
    
    // Login de usuario
    public Usuario login(String username, String password) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByUsernameAndActivoTrue(username);
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado o inactivo");
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Verificar password
        if (!verificarPassword(password, usuario.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        
        // Actualizar último login
        usuario.setUltimoLogin(LocalDateTime.now());
        usuarioRepository.save(usuario);
        
        // Retornar usuario sin password
        return crearUsuarioSinPassword(usuario);
    }
    
    // Obtener perfil de usuario
    public Usuario obtenerPerfil(Long id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByIdAndActivoTrue(id);
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        return crearUsuarioSinPassword(usuarioOpt.get());
    }
    
    // Actualizar perfil de usuario
    public Usuario actualizarPerfil(Long id, Usuario datosActualizados) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByIdAndActivoTrue(id);
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        Usuario usuario = usuarioOpt.get();
        
        // Verificar que el nuevo email no esté en uso por otro usuario
        if (!usuario.getEmail().equals(datosActualizados.getEmail()) && 
            usuarioRepository.existsByEmail(datosActualizados.getEmail())) {
            throw new RuntimeException("El email ya está en uso");
        }
        
        // Actualizar campos permitidos
        usuario.setNombre(datosActualizados.getNombre());
        usuario.setApellido(datosActualizados.getApellido());
        usuario.setEmail(datosActualizados.getEmail());
        
        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        return crearUsuarioSinPassword(usuarioActualizado);
    }
    
    // Eliminar cuenta (soft delete)
    public void eliminarCuenta(Long id) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByIdAndActivoTrue(id);
        
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }
        
        Usuario usuario = usuarioOpt.get();
        usuario.setActivo(false);
        usuarioRepository.save(usuario);
    }
    
    // Métodos auxiliares
    private String encriptarPassword(String password) {
        // Simplificado para el examen - en producción usar BCrypt
        return "encrypted_" + password;
    }
    
    private boolean verificarPassword(String passwordPlano, String passwordEncriptado) {
        // Simplificado para el examen
        return passwordEncriptado.equals("encrypted_" + passwordPlano);
    }
    
    private Usuario crearUsuarioSinPassword(Usuario usuario) {
        return new Usuario(
            usuario.getId(),
            usuario.getUsername(),
            usuario.getEmail(),
            usuario.getNombre(),
            usuario.getApellido(),
            usuario.getActivo(),
            usuario.getFechaRegistro(),
            usuario.getUltimoLogin()
        );
    }
}
