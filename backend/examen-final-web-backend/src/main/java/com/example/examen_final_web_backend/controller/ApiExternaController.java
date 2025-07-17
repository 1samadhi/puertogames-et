package com.example.examen_final_web_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/external")
@CrossOrigin(origins = "*")
public class ApiExternaController {

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("/quote")
    public ResponseEntity<Map<String, Object>> getRandomQuote() {
        try {
            // API pública gratuita de citas inspiracionales
            String url = "https://api.quotable.io/random";
            
            // Consumir API externa
            Map<String, Object> quote = restTemplate.getForObject(url, Map.class);
            
            // Agregar información adicional
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cita obtenida exitosamente de API externa");
            response.put("data", quote);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error al obtener cita de API externa: " + e.getMessage());
            errorResponse.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/weather/{city}")
    public ResponseEntity<Map<String, Object>> getWeather(@PathVariable String city) {
        try {
            // API pública de clima (sin API key requerida)
            String url = "https://wttr.in/" + city + "?format=j1";
            
            // Consumir API externa
            Map<String, Object> weather = restTemplate.getForObject(url, Map.class);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Información del clima obtenida de API externa");
            response.put("city", city);
            response.put("data", weather);
            response.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error al obtener clima: " + e.getMessage());
            errorResponse.put("city", city);
            errorResponse.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getApiStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "API Externa funcionando correctamente");
        response.put("endpoints", new String[]{
            "GET /api/external/quote - Obtiene cita inspiracional",
            "GET /api/external/weather/{city} - Obtiene clima de ciudad",
            "GET /api/external/status - Estado de la API"
        });
        response.put("timestamp", System.currentTimeMillis());
        
        return ResponseEntity.ok(response);
    }
}
