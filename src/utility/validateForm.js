import { toast } from 'react-toastify';

export const validateForm = ({formData ,setFormErrors}) => {
    const errors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.Name)) {
      errors.Name = "Please enter a valid name.";
    }

    if (!nameRegex.test(formData.fathersName)) {
      errors.fathersName = "Please enter a valid father's name.";
    }

    if (!formData.enrollmentNo || formData.enrollmentNo < 0) {
      errors.enrollmentNo = "Enrollment Number must be a non-negative number.";
    }

    if (!formData.rollNo.trim()) {
      errors.rollNo = "Roll Number is required.";
    }

    if (!/^\d{10}$/.test(formData.phoneNo)) {
      errors.phoneNo = "Phone number must be a 10-digit number.";
    }

    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.school) {
      errors.school = "Please select a school.";
    }

    if (!formData.programme) {
      errors.programme = "Please select a programme.";
    }

    if (!formData.yearOfPassing) {
      errors.yearOfPassing = "Please select the year of passing.";
    }
    Object.values(errors).map((message)=>{
      message && toast.error(message)
    });
    

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };