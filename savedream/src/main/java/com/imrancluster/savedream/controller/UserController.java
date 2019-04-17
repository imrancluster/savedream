package com.imrancluster.savedream.controller;

import com.imrancluster.savedream.model.User;
import com.imrancluster.savedream.payload.JWTLoginSuccessResponse;
import com.imrancluster.savedream.payload.LoginRequest;
import com.imrancluster.savedream.security.JwtTokenProvider;
import com.imrancluster.savedream.security.SecurityConstants;
import com.imrancluster.savedream.services.MapValidationErrorService;
import com.imrancluster.savedream.services.UserService;
import com.imrancluster.savedream.validation.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result) {

        System.out.println("Username: " + loginRequest.getUsername());
        System.out.println("Pass: " + loginRequest.getPassword());

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) return errorMap;

        System.out.println("Pass Validation");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        System.out.println("Debugging one");

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = SecurityConstants.TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result) {

        // Validate password match
        // @TODO: if password fields not posted then error need to be fixed
        userValidator.validate(user, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if(errorMap != null) return errorMap;

        User newUser = userService.saveUser(user);

        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);

    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId) {

        Optional<User> user = userService.getUserById(userId);

        return new ResponseEntity<Optional<User>>(user, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {

        Iterable<User> users = userService.getAllUsers();

        return new ResponseEntity<Iterable<User>>(users, HttpStatus.OK);
    }

}
