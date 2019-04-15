package com.imrancluster.savedream.controller;

import com.imrancluster.savedream.exceptions.ProfileNotFoundException;
import com.imrancluster.savedream.model.Member;
import com.imrancluster.savedream.model.Profile;
import com.imrancluster.savedream.services.MapValidationErrorService;
import com.imrancluster.savedream.services.MemberService;
import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewMember(@Valid @RequestBody Member member, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Member member1 = memberService.saveOrUpdateMember(member);

        return new ResponseEntity<Member>(member1, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> updateMember(@Valid @RequestBody Member member, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Member member1 = memberService.saveOrUpdateMember(member);

        return new ResponseEntity<Member>(member1, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllMembers() {

        Iterable<Member> members = memberService.getAllMembers();

        return new ResponseEntity<Iterable<Member>>(members, HttpStatus.OK);
    }

    @GetMapping("/{membershipNo}")
    public ResponseEntity<?> getMemberByMembershipNo(@PathVariable String membershipNo) {

        Member member = memberService.getMemberByMembershipNo(membershipNo);

        return new ResponseEntity<Member>(member, HttpStatus.OK);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> getMemberById(@PathVariable Long id) {
//
//        Optional<Member> member = memberService.getMemberById(id);
//
//        return new ResponseEntity<Optional<Member>>(member, HttpStatus.OK);
//    }

    @PutMapping("/{membershipNo}/profile")
    public ResponseEntity<?> updateMemberProfile(@Valid @RequestBody Profile profile, BindingResult result, @PathVariable String membershipNo) {

        // @TODO: Need to find database error, like duplicate entry mobileNo
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Member member = memberService.saveOrUpdateMemberProfile(membershipNo, profile);
        Profile profile1 = member.getProfile();

        return new ResponseEntity<Profile>(profile1, HttpStatus.OK);
    }

    @GetMapping("/{membershipNo}/profile")
    public ResponseEntity<?> getMemberProfile(@PathVariable String membershipNo) {

        Member member = memberService.getMemberByMembershipNo(membershipNo);

        Profile profile = member.getProfile();

        if (profile != null) {
            return new ResponseEntity<Profile>(profile, HttpStatus.OK);
        }

        throw new ProfileNotFoundException("The profile is not found for this " + membershipNo + ".");
    }
}
