import { useState } from "react";
import Input from "../../Components/Input/Input";
import styles from "../Styles/Register.module.css";

const titleOptions = ["Mr.", "Mrs.", "Miss", "Dr.", "Prof."];
const passingYears =[];

const Register = () => {
  const [formData, setFormData] = useState({
    title: "",
    dob: "",
    fName: "",
    mName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
    cnfpassword: "",
    enrollmentNo: "",
    rollNo: "",
    school: "",
    programme: "",
    yearOfPassing: "",
    countryOfResidence: "",
    address: "",
    linkedin: "",
    instagram: "",
    twitter: "",
  });
  const [schoolList,setSchoolList]=useState([]);
  const [programmeList,setProgrammeList]=useState([]);


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
              type={"select"}
              name={"title"}
              label={"Title"}
              required={true}
              requiredMark={true}
              value={formData.title}
              options={titleOptions}
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

          <div className={styles.threeTiles}>
            <Input
              type={"text"}
              name={"fName"}
              label={"First Name"}
              required={true}
              requiredMark={true}
              value={formData.fName}
              onChange={handleChange}
            />
            <Input
              type={"text"}
              name={"mName"}
              label={"Midddle Name"}
              value={formData.mName}
              onChange={handleChange}
            />
            <Input
              type={"text"}
              name={"lName"}
              label={"Last Name"}
              value={formData.lName}
              onChange={handleChange}
            /> 
          </div>

          <div className={styles.twoTiles}>
            <Input
              type={"password"}
              name={"password"}
              label={"Password"}
              required={true}
              requiredMark={true}
              value={formData.password}
              onChange={handleChange}
            />
            <Input
              type={"password"}
              name={"cnfpassword"}
              label={"Confirm Password"}
              required={true}
              requiredMark={true}
              value={formData.cnfpassword}
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
              type={"email"}
              name={"email"}
              label={"Email"}
              required={true}
              requiredMark={true}
              value={formData.email}
              onChange={handleChange}
            />
          <Input
              type={"number"}
              name={"phone"}
              label={"Phone"}
              required={true}
              requiredMark={true}
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
    
          <div className={styles.threeTiles}>
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
            <Input 
            type={"file"}
            name={"pfp"}
            label={"Photograph"}
            />
          </div>
          <div className={styles.twoTiles}>
          <Input
              type={"text"}
              name={"countryOfResidence"}
              label={"Country of Residence"}
              required={true}
              requiredMark={true}
              value={formData.countryOfResidence}
              onChange={handleChange}
            />
          <Input
              type={"text"}
              name={"address"}
              label={"Address"}
              required={true}
              requiredMark={true}
              value={formData.address}
              onChange={handleChange}
            />
            
          </div>
          <div className={styles.threeTiles}>
          <Input
              type={"url"}
              name={"linkedin"}
              label={"Linkedin URL"}
              value={formData.linkedin}
              onChange={handleChange}
            />
          <Input
              type={"url"}
              name={"instagram"}
              label={"Instagram URL"}
              value={formData.instagram}
              onChange={handleChange}
            />
          <Input
              type={"url"}
              name={"twitter"}
              label={"Twitter URL"}
              value={formData.twitter}
              onChange={handleChange}
            />
          </div> 
          <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitButton}>Register</button>
          <button className={styles.backToLoginBtn}>Back to login</button>
          </div>
        </form>
      </div>
  );
};
export default Register;
