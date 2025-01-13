package com.app.starter1.config;

import com.app.starter1.config.filter.JwtTokenValidator;
import com.app.starter1.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.app.starter1.persistence.services.UserDetailServiceAP;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    private final AuthenticationConfiguration authenticationConfiguration;
    @Autowired
    private final UserDetailServiceAP userDetailServiceAP;

    @Autowired
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, UserDetailServiceAP userDetailServiceAP, CustomAuthenticationEntryPoint customAuthenticationEntryPoint) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.userDetailServiceAP = userDetailServiceAP;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Habilitar CORS
                .csrf(csrf -> csrf.disable())
                .httpBasic(Customizer.withDefaults())
                .exceptionHandling(exception -> exception.authenticationEntryPoint(customAuthenticationEntryPoint)) // Aquí se usa el EntryPoint personalizado
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // Configurar los endpoints públicos
                    http.requestMatchers(HttpMethod.POST, "/auth/**").permitAll();
                    http.requestMatchers(HttpMethod.GET, "/auth/**").permitAll();

                    http.requestMatchers(HttpMethod.GET, "/sendnotification/**").permitAll();

                    // Configurar los endpoints privados
                    //auth
                    http.requestMatchers(HttpMethod.GET, "/users/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.GET, "/roles/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/users/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/users/**").hasAnyRole("SUPERADMIN","ADMIN");

                    http.requestMatchers(HttpMethod.GET, "/customers/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.POST, "/customers/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/customers/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.DELETE, "/customers/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");

                    //products
                    http.requestMatchers(HttpMethod.GET, "/products/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/products/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.POST, "/products/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.DELETE, "/products/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");

                    //type device
                    http.requestMatchers(HttpMethod.GET, "/type-device/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/type-device/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/type-device/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/type-device/**").hasAnyRole("SUPERADMIN","ADMIN");

                    //solicitudes
                    http.requestMatchers(HttpMethod.GET, "/solicitudes/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/solicitudes/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.POST, "/solicitudes/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.DELETE, "/solicitudes/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    //contratos
                    http.requestMatchers(HttpMethod.GET, "/contratos/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/contratos/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/contratos/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/contratos/**").hasAnyRole("SUPERADMIN","ADMIN");

                    //tipo servicio
                    http.requestMatchers(HttpMethod.GET, "/type-service/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/type-service/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/type-service/**").hasAnyRole("SUPERADMIN","ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/type-service/**").hasAnyRole("SUPERADMIN","ADMIN");

                    //plantillas
                    http.requestMatchers(HttpMethod.GET, "/plantillas/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/plantillas/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.POST, "/plantillas/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.DELETE, "/plantillas/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");

                    //reportes
                    http.requestMatchers(HttpMethod.GET, "/reportes/**").hasAnyRole("SUPERADMIN","ADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.PUT, "/reportes/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.POST, "/reportes/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");
                    http.requestMatchers(HttpMethod.DELETE, "/reportes/**").hasAnyRole("SUPERADMIN","BIOMEDICAL");

                    //libreria de medios
                    http.requestMatchers(HttpMethod.GET, "/media/**").permitAll();


                    // Configurar el resto de los endpoints (no especificados)
                    http.anyRequest().denyAll();
                }).
                addFilterBefore(new JwtTokenValidator(jwtUtils), BasicAuthenticationFilter.class)
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000"); // Origen permitido
        configuration.addAllowedMethod("*"); // Permitir todos los métodos (GET, POST, etc.)
        configuration.addAllowedHeader("*"); // Permitir todos los encabezados
        configuration.setAllowCredentials(true); // Permitir cookies/credenciales

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplicar a todas las rutas
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
