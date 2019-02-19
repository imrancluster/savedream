package com.imrancluster.savedream.controller;

import com.imrancluster.savedream.model.Dreamer;
import com.imrancluster.savedream.services.DreamerService;
import com.imrancluster.savedream.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/dreamer")
public class DreamerController {

    @Autowired
    private DreamerService dreamerService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createNewDreamer(@Valid @RequestBody Dreamer dreamer, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Dreamer dreamer1 = dreamerService.saveOrUpdateDreamer(dreamer);

        return new ResponseEntity<Dreamer>(dreamer1, HttpStatus.CREATED);
    }

    @PutMapping("")
    public ResponseEntity<?> updateDreamer(@Valid @RequestBody Dreamer dreamer, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        Dreamer dreamer1 = dreamerService.saveOrUpdateDreamer(dreamer);

        return new ResponseEntity<Dreamer>(dreamer1, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public Iterable<Dreamer> getAllDreamers() {

        return dreamerService.getAllDreamers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDreamerById(@PathVariable Long id) {
        Optional<Dreamer> dreamer = dreamerService.getDreamerById(id);

        return new ResponseEntity<Optional<Dreamer>>(dreamer, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDreamerById(@PathVariable Long id) {

        dreamerService.deleteDreamById(id);

        return new ResponseEntity<String>("Dreamer with ID: " + id + " was deleted.", HttpStatus.OK);
    }

    @GetMapping("/mobile/{mobile}")
    public ResponseEntity<?> getDreamByPrimaryMobile(@PathVariable String mobile) {

        Optional<Dreamer> dreamer = dreamerService.getDreamByPrimaryMobile(mobile);

        return new ResponseEntity<Optional<Dreamer>>(dreamer, HttpStatus.OK);
    }
}
