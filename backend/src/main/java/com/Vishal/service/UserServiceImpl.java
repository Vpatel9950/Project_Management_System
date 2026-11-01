package com.Vishal.service;

import com.Vishal.config.JwtProvider;
import com.Vishal.model.User;
import com.Vishal.model.UserRole;
import com.Vishal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {
        String email= JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new Exception("User not found");
        }
        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception {
        Optional<User> optionalUser=userRepository.findById(userId);
        if(optionalUser.isEmpty()){
            throw new Exception("user not found");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) {
        user.setProjectSize(user.getProjectSize()+number);
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() throws Exception {
        return userRepository.findAll();
    }

    @Override
    public User updateUserRole(Long userId, UserRole role) throws Exception {
        User user = findUserById(userId);
        user.setRole(role);
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) throws Exception {
        findUserById(userId);
        userRepository.deleteById(userId);
    }
}
