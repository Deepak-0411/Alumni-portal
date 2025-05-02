import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import styles from "../styles/modules/Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    enrollmentNo: "",
    rollNo: "",
    Name: "",
    fathersName: "",
    dob: "",
    yearOfPassing: "",
    phoneNo: "",
    email: "",
    school: "",
    department: "",
    degreePic: "",
  });
  const [schoolList, setSchoolList] = useState([]);
  const [programmeList, setProgrammeList] = useState([]);
  const [passingYears, setPassingYears] = useState([]);

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // For now, just log the data
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alumni Registration Form</h2>
      <form className={styles.form}>
        <div className={styles.twoTiles}>
          <Input
            type={"number"}
            name={"enrollmentNo"}
            label={"Enrollment Number"}
            required={true}
            requiredMark={true}
            value={formData.enrollmentNo}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            name={"rollNo"}
            label={"Roll Number"}
            required={true}
            requiredMark={true}
            value={formData.rollNo}
            onChange={handleChange}
          />
        </div>

        <div className={styles.threeTiles}>
          <Input
            type={"text"}
            name={"Name"}
            label={"Name"}
            required={true}
            requiredMark={true}
            value={formData.Name}
            onChange={handleChange}
          />
          <Input
            type={"text"}
            name={"fathersName"}
            label={"Father's Name"}
            required={true}
            requiredMark={true}
            value={formData.fathersName}
            onChange={handleChange}
          />
          <Input
            type={"date"}
            name={"dob"}
            label={"DOB(dd/mm/yyyy)"}
            required={true}
            requiredMark={true}
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className={styles.twoTiles}>
          <Input
            type={"number"}
            name={"phoneNo"}
            label={"Phone Number"}
            required={true}
            requiredMark={true}
            value={formData.phoneNo}
            onChange={handleChange}
          />
          <Input
            type={"email"}
            name={"email"}
            label={"E-mail"}
            required={true}
            requiredMark={true}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.threeTiles}>
          <Input
            type={"select"}
            name={"school"}
            label={"Select School"}
            required={true}
            requiredMark={true}
            value={formData.school}
            options={schoolList}
            onChange={handleChange}
          />
          <Input
            type={"select"}
            name={"programme"}
            label={"Select Programme"}
            required={true}
            requiredMark={true}
            value={formData.programme}
            options={programmeList}
            onChange={handleChange}
          />
          <Input
            type={"select"}
            name={"yearOfPassing"}
            label={"Year of Passing"}
            required={true}
            requiredMark={true}
            value={formData.yearOfPassing}
            options={passingYears}
            onChange={handleChange}
          />
        </div>
        <div className={styles.twoTiles}>
          <Input
            type={"file"}
            name={"degreePic"}
            label={"Photograph of degree"}
          />
        </div>

        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </div>
      </form>
      <div className={styles.btnContainer}>
        <button
          className={styles.backToLoginBtn}
          onClick={() => navigate("/alumni/login")}
        >
          Back to login
        </button>
      </div>
    </div>
  );
};
export default Register;
