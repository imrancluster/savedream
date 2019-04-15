package com.imrancluster.savedream.services;

import com.imrancluster.savedream.exceptions.DreamerNotFoundException;
import com.imrancluster.savedream.exceptions.DreamerPrimaryMobileException;
import com.imrancluster.savedream.exceptions.MemberNotFoundRexception;
import com.imrancluster.savedream.exceptions.ProfileNotFoundException;
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

    public Member saveOrUpdateMemberProfile(String membershipNo, Profile profile) {

        Member member = getMemberByMembershipNo(membershipNo);


        try {

            Profile profile1 = member.getProfile();

            if (profile1 == null) {
                profile.setMember(member);
                Profile theProfile = profileRepository.save(profile);

                member.setProfile(theProfile);
                memberRepository.save(member);

            } else {
                if (profile.getId() != null) {
                    profileRepository.save(profile);
                } else {
                    throw new ProfileNotFoundException("The profile already created for the " + membershipNo + ". Please send ID to update.");
                }
            }

            return member;

        } catch (Exception ex) {
            throw new ProfileNotFoundException("The profile already created for the " + membershipNo + ". Please send ID to update.");
        }
    }
}
