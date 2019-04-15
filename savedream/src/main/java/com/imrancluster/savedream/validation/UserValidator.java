package com.imrancluster.savedream.validation;

import com.imrancluster.savedream.model.User;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.stereotype.Component;

import java.nio.file.attribute.UserPrincipalNotFoundException;

@Component
public class UserValidator implements Validator {

    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object object, Errors errors) {

        User user = (User) object;

        if (user.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters");
        }

        if (!user.getPassword().equals(user.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Password must match");
        }
    }

}
