package com.Vishal.service;

import com.Vishal.model.User;
import com.Vishal.model.UserRole;

import java.util.List;

public interface UserService {

    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long userId) throws Exception;

    User updateUsersProjectSize(User user, int number);

    List<User> getAllUsers() throws Exception;

    User updateUserRole(Long userId, UserRole role) throws Exception;

    void deleteUser(Long userId) throws Exception;
}
