package com.Vishal.service;

import com.Vishal.model.User;

public interface UserService {

    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email)throws Exception;

    User findUserById(Long userId) throws Exception;

    User updateUsersProjectSize(User user,int number);

}
