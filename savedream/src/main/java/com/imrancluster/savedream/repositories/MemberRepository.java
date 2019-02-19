package com.imrancluster.savedream.repositories;

import com.imrancluster.savedream.model.Member;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {

    Member findByMembershipNo(String membershipNo);
}
