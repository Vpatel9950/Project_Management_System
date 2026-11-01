package com.Vishal.service;

import com.Vishal.model.User;
import com.Vishal.model.UserRole;
import com.Vishal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CustomUserDetailsImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user=userRepository.findByEmail(username);
        if(user==null){
           throw new UsernameNotFoundException("user not found with email "+username);
        }
        List<GrantedAuthority> authorities=new ArrayList<>();
        if(user.getRole()!=null){
            authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        } else {
            authorities.add(new SimpleGrantedAuthority(UserRole.ROLE_MEMBER.name()));
        }
        return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
    }
}
