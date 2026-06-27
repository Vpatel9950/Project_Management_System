package com.Vishal.service;

import com.Vishal.model.PlanType;
import com.Vishal.model.Subscription;
import com.Vishal.model.User;

public interface SubscriptionService {

    Subscription createSubscription(User user);

    Subscription getUsersSubscription(Long userId) throws Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid (Subscription subscription);
}
