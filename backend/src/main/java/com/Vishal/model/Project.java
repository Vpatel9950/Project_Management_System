package com.Vishal.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name; //project name
    private String description;
    private String category;

    private List<String> tags=new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "project",cascade = CascadeType.ALL,orphanRemoval = true)
    private Chat chat;

    @ManyToOne
    private User owner;// yaha per hum 1 user bahut sare project bana raha hai,mtlb owner of project

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Issue>issues=new ArrayList<>(); //one project have many issues

    @ManyToMany
    private List<User>team=new ArrayList<>();

}
