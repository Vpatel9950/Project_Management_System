package com.Vishal.repository;

import com.Vishal.model.Project;
import com.Vishal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project,Long> {
    List<Project> findByNameContainingAndTeamContains(String partialName, User user);

    List<Project> findByNameContaining(String partialName);

    List<Project> findByTeamContainingOrOwner(User user, User owner);
}
