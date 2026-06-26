package com.Vishal.service;

import com.Vishal.model.Invitation;
import jakarta.mail.MessagingException;

public interface InvitationService {

    public void sendInvitation(String email,Long projectId) throws MessagingException;//yaha pe hum which user we want to send email and which project Id

    public Invitation acceptInvitation(String token,Long userId) throws Exception;

    public String getTokenByUserEmail(String userEmail);

    void deleteToken(String token);

}
