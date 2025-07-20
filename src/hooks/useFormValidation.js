import { useState } from "react";
import { toast } from "react-toastify";

export const useFormValidation = (fieldsToValidate = []) => {
  const [formErrors, setFormErrors] = useState({});

  const shouldValidate = (field) =>
    fieldsToValidate.length === 0 || fieldsToValidate.includes(field);

  const validate = (formData) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const urlRegex =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;

    if (shouldValidate("title") && !formData.title) {
      errors.title = "Please select a title.";
    }

    if (
      shouldValidate("Name") &&
      (!formData.Name || !nameRegex.test(formData.Name.trim()))
    ) {
      errors.Name = "Please enter a valid name.";
    }

    if (
      shouldValidate("fathersname") &&
      (!formData.fathersname || !nameRegex.test(formData.fathersname.trim()))
    ) {
      errors.fathersname = "Please enter a valid father's name.";
    }

    const enrollmentNum = Number(formData.enrollmentNo);
    if (
      shouldValidate("enrollmentNo") &&
      (!formData.enrollmentNo || isNaN(enrollmentNum) || enrollmentNum < 0)
    ) {
      errors.enrollmentNo = "Enrollment Number must be a non-negative number.";
    }

    if (
      shouldValidate("rollNo") &&
      (!formData.rollNo || !formData.rollNo.trim())
    ) {
      errors.rollNo = "Roll Number is required.";
    }

    if (shouldValidate("dob") && !formData.dob) {
      errors.dob = "Please select your date of birth.";
    }

    if (shouldValidate("yearOfPassing") && !formData.yearOfPassing) {
      errors.yearOfPassing = "Please select the year of passing.";
    }

    if (shouldValidate("phoneNo") && !/^\d{10}$/.test(formData.phoneNo)) {
      errors.phoneNo = "Phone number must be a 10-digit number.";
    }

    if (shouldValidate("email") && !emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (shouldValidate("school") && !formData.school) {
      errors.school = "Please select a school.";
    }

    if (shouldValidate("programme") && !formData.programme) {
      errors.programme = "Please select a programme.";
    }

    if (
      shouldValidate("linkedIn") &&
      formData.linkedIn &&
      !urlRegex.test(formData.linkedIn.trim())
    ) {
      errors.linkedIn = "Please enter a valid LinkedIn URL.";
    }

    if (
      shouldValidate("gitHub") &&
      formData.gitHub &&
      !urlRegex.test(formData.gitHub.trim())
    ) {
      errors.gitHub = "Please enter a valid GitHub URL.";
    }

    if (
      shouldValidate("degree_picture") &&
      (!formData.degree_picture || !(formData.degree_picture instanceof File))
    ) {
      errors.degree_picture = "Please upload a degree certificate image.";
    }

    // Display errors via toast
    Object.values(errors).forEach((msg) => msg && toast.error(msg));

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { formErrors, setFormErrors, validate };
};
