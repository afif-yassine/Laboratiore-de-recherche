package com.example.gestiondepartement.controllers;
import com.example.gestiondepartement.config.JwtSecretKey;
import com.example.gestiondepartement.config.jwt.JwtResponse;
import com.example.gestiondepartement.config.jwt.LoginRequest;
import com.example.gestiondepartement.dao.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtSecretKey jwtSecretKey; // Inject the JwtSecretKey

    @Autowired
    private MemberRepository memberRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        Long id = memberRepository.findByEmail(loginRequest.getEmail()).getId();
        String role = authentication.getAuthorities().iterator().next().getAuthority();
        String jwt = jwtSecretKey.generateJWT(loginRequest.getEmail(), role, id);
        return ResponseEntity.ok(new JwtResponse(jwt));
    }
}
