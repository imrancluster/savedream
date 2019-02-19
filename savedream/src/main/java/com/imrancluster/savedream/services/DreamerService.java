package com.imrancluster.savedream.services;

import com.imrancluster.savedream.exceptions.DreamerNotFoundException;
import com.imrancluster.savedream.exceptions.DreamerPrimaryMobileException;
import com.imrancluster.savedream.model.Dreamer;
import com.imrancluster.savedream.repositories.DreamerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DreamerService {

    @Autowired
    private DreamerRepository dreamerRepository;

    public Dreamer saveOrUpdateDreamer(Dreamer dreamer) {

        // checking invalid dreamer id
        if (dreamer.getId() != null) getDreamerById(dreamer.getId());

        try {

            return dreamerRepository.save(dreamer);

        } catch (Exception e) {
            throw new DreamerPrimaryMobileException("Primary mobile: " + dreamer.getPrimaryMobile() + " already exist");
        }
    }

    public Iterable<Dreamer> getAllDreamers() {
        return dreamerRepository.findAll();
    }

    public Optional<Dreamer> getDreamerById(Long id) {

        Optional<Dreamer> existingDreamer = dreamerRepository.findById(id);

        if (!existingDreamer.isPresent()) {
            throw new DreamerNotFoundException("Dreamer with ID: " + id + " doesn't exist");
        }

        return existingDreamer;
    }

    public void deleteDreamById(Long id) {

        getDreamerById(id);

        dreamerRepository.deleteById(id);
    }

    public Optional<Dreamer> getDreamByPrimaryMobile(String mobile) {

        Optional<Dreamer> dreamer = dreamerRepository.findByPrimaryMobile(mobile);
        if (dreamer == null) throw new DreamerNotFoundException("Dreamer with Mobile: " + mobile + " doesn't exist");

        return dreamer;
    }
}
