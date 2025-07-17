package com.example.examen_final_web_backend.repository;

import com.example.examen_final_web_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
    // Para login - buscar por username
    Optional<Usuario> findByUsername(String username);
    
    // Para login - buscar por email
    Optional<Usuario> findByEmail(String email);
    
    // Verificar si username ya existe
    boolean existsByUsername(String username);
    
    // Verificar si email ya existe
    boolean existsByEmail(String email);
    
    // Buscar usuario activo por ID
    @Query("SELECT u FROM Usuario u WHERE u.id = ?1 AND u.activo = true")
    Optional<Usuario> findByIdAndActivoTrue(Long id);
    
    // Para login - buscar usuario activo por username
    @Query("SELECT u FROM Usuario u WHERE u.username = ?1 AND u.activo = true")
    Optional<Usuario> findByUsernameAndActivoTrue(String username);
}
