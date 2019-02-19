package com.imrancluster.savedream.services;

import com.imrancluster.savedream.exceptions.DreamerNotFoundException;
import com.imrancluster.savedream.exceptions.DreamerPrimaryMobileException;
import com.imrancluster.savedream.exceptions.MemberNotFoundRexception;
import com.imrancluster.savedream.model.Member;
import com.imrancluster.savedream.model.Profile;
import com.imrancluster.savedream.repositories.MemberRepository;
import com.imrancluster.savedream.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private ProfileRepository profileRepository;

    public Member saveOrUpdateMember(Member member) {

        if (member.getId() != null) {
            getMemberByMembershipNo(member.getMembershipNo());

        } else {

            String membershipNo = "D-" + System.currentTimeMillis() + "-1";
            member.setMembershipNo(membershipNo);
        }

        if (member.getStatus() == null) {
            member.setStatus("Active");
        }

        return memberRepository.save(member);
    }

    public Iterable<Member> getAllMembers() {

        return memberRepository.findAll();
    }

    public Member getMemberByMembershipNo(String membershipNo) {

        Member member = memberRepository.findByMembershipNo(membershipNo);
        if (member == null) throw new MemberNotFoundRexception("Member with membershipNo: " + membershipNo + " doesn't exist.");

        return member;
    }

    public Optional<Member> getMemberById(Long id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member == null) throw new MemberNotFoundRexception("Member with membershipNo: " + id + " doesn't exist.");

        return member;
    }

    public Member saveOrUpdateMemberProfile(Long id, Profile profile) {

        Optional<Member> member = getMemberById(id);

        try {

            profile.setMember(member);
            Profile theProfile = profileRepository.save(profile);

            member.setProfile(theProfile);

            // return memberRepository.save(member);

            memberRepository.save(member);

            System.out.println("Done!");

        } catch (Exception ex) {
            // throw new DreamerPrimaryMobileException("Primary mobile: " + profile.getPrimaryMobile() + " already exist");
            System.out.println("<====== Debugging =====>");
            ex.printStackTrace();
        }

        return null;
    }
}
