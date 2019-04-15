package com.imrancluster.savedream.services;

import com.imrancluster.savedream.exceptions.UsernameAlreadyExistsExecption;
import com.imrancluster.savedream.model.Member;
import com.imrancluster.savedream.model.User;
import com.imrancluster.savedream.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MemberService memberService;

    // @Autowired
    // private BCryptPasswordEncoder bCryptPasswordEncoder;
    // Its not bean. So we had to create a bean at main application file.
    // PpmtoolApplication

    public User saveUser(User newUser) {
        try {

            // newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            newUser.setPassword(newUser.getPassword());
            newUser.setConfirmPassword("");
            newUser.setUserRole("ROLE_MEMBER");

            User user = userRepository.save(newUser);

            // create a member
            Member member = new Member();
            member.setMembershipType(newUser.getUserType());
            member.setUser(user);
            memberService.saveOrUpdateMember(member);

            return user;

        } catch (Exception e) {
            throw new UsernameAlreadyExistsExecption("Username '" + newUser.getUsername() + "' already exists");
        }
    }

    public Optional<User> getUserById(Long userId) {

        Optional<User> user = userRepository.findById(userId);

        // @TODO: need to add exception for UserNotFoundException

        return user;
    }
}
