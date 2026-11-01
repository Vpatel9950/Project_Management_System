package com.Vishal.controller;

import com.Vishal.DTO.IssueDTO;
import com.Vishal.model.Issue;
import com.Vishal.model.User;
import com.Vishal.model.UserRole;
import com.Vishal.request.IssueRequest;
import com.Vishal.response.MessageResponse;
import com.Vishal.service.IssueService;
import com.Vishal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    @Autowired
    private UserService userService;

    @GetMapping("/{issueId}")
    public ResponseEntity<Issue>getIssueById(@PathVariable Long issueId)throws Exception{
        return ResponseEntity.ok(issueService.getIssueById(issueId));
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Issue>> getIssueByProjectId(@PathVariable Long projectId)throws Exception{
        return ResponseEntity.ok(issueService.getIssueByProjectId(projectId));
    }

    @PostMapping
    public ResponseEntity<IssueDTO>createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization")String token) throws Exception{

        User tokenUser=userService.findUserProfileByJwt(token);
        if (tokenUser.getRole() == UserRole.ROLE_MEMBER) {
            throw new Exception("Access Denied: Only Managers and Admins can create tasks.");
        }

        Issue createdIssue=issueService.createIssue(issue,tokenUser);
        IssueDTO issueDTO=new IssueDTO();
        issueDTO.setDescription(createdIssue.getDescription());
        issueDTO.setDueDate(createdIssue.getDueDate());
        issueDTO.setId(createdIssue.getId());
        issueDTO.setPriority(createdIssue.getPriority());
        issueDTO.setProject(createdIssue.getProject());
        issueDTO.setProjectId(createdIssue.getProjectId());
        issueDTO.setStatus(createdIssue.getStatus());
        issueDTO.setTitle(createdIssue.getTitle());
        issueDTO.setTags(createdIssue.getTags());
        issueDTO.setAssignee(createdIssue.getAssignedTo());

        return ResponseEntity.ok(issueDTO);
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<MessageResponse>deleteIssue(
            @PathVariable Long issueId,
            @RequestHeader("Authorization") String token) throws Exception{
        User user=userService.findUserProfileByJwt(token);
        if (user.getRole() == UserRole.ROLE_MEMBER) {
            throw new Exception("Access Denied: Only Managers and Admins can delete tasks.");
        }
        issueService.deleteIssue(issueId,user.getId());

        MessageResponse res=new MessageResponse();
        res.setMessage("Issue Deleted");
        return ResponseEntity.ok(res);
    }

    @PutMapping("{issueId}/assignee/{userId}")
    public ResponseEntity<Issue>addUserToIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId,
            @RequestHeader("Authorization") String token) throws Exception{
        User user=userService.findUserProfileByJwt(token);
        if (user.getRole() == UserRole.ROLE_MEMBER) {
            throw new Exception("Access Denied: Only Managers and Admins can assign tasks.");
        }
        Issue issue=issueService.addUserToIssue(issueId,userId);
        return ResponseEntity.ok(issue);
    }

    @PutMapping("{issueId}/status/{status}")
    public ResponseEntity<Issue>updateIssueStatus(
            @PathVariable String status,
            @PathVariable Long issueId) throws Exception{
        Issue issue=issueService.updateStatus(issueId,status);
        return ResponseEntity.ok(issue);
    }

}
