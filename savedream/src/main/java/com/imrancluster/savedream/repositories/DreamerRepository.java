package com.imrancluster.savedream.repositories;

import com.imrancluster.savedream.model.Dreamer;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DreamerRepository extends CrudRepository<Dreamer, Long> {

    Optional<Dreamer> findByPrimaryMobile(String mobile);

}
