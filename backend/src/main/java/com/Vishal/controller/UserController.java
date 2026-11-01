package com.Vishal.controller;

import com.Vishal.model.User;
import com.Vishal.model.UserRole;
import com.Vishal.response.MessageResponse;
import com.Vishal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(@RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.findUserProfileByJwt(jwt);
        // Admin or Manager can view users list
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PutMapping("/{userId}/role")
    public ResponseEntity<User> updateUserRole(
            @PathVariable Long userId,
            @RequestParam UserRole role,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User requester = userService.findUserProfileByJwt(jwt);
        if (requester.getRole() != UserRole.ROLE_ADMIN) {
            throw new Exception("Access Denied: Only Admins can change user roles.");
        }
        User updatedUser = userService.updateUserRole(userId, role);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<MessageResponse> deleteUser(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String jwt) throws Exception {
        User requester = userService.findUserProfileByJwt(jwt);
        if (requester.getRole() != UserRole.ROLE_ADMIN) {
            throw new Exception("Access Denied: Only Admins can delete users.");
        }
        userService.deleteUser(userId);
        return new ResponseEntity<>(new MessageResponse("User deleted successfully"), HttpStatus.OK);
    }
}
