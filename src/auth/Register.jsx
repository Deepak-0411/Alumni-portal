import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import styles from "../styles/modules/auth/Register.module.css";
import LoadingScrn from "../components/Spinner/Loading";
import  apiRequest  from "../utility/apiRequest";
import { validateForm } from "../utility/validateForm";
import { toast } from 'react-toastify';


const Register = () => {
  const [formData, setFormData] = useState({
    title: "",
    enrollmentNo: "",
    rollNo: "",
    Name: "",
    fathersName: "",
    dob: "",
    yearOfPassing: "",
    phoneNo: "",
    email: "",
    school: "",
    programme: "",
    degree_picture: "",
  });

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [titleList, setTitleList] = useState(["Mr.", "Dr.", "Ms."]);
  const [schoolList, setSchoolList] = useState([
    "School of Engineering",
    "School of Science",
  ]);
  const [programmeList, setProgrammeList] = useState(["B.Tech", "M.Tech"]);
  const [passingYears, setPassingYears] = useState(["2021", "2022", "2023"]);

  const navigate = useNavigate();


  const handleChange = (e) => {
    //this function will set values in formdata and clears error
    const { name, value, type, files } = e.target;

    if ((name === "enrollmentNo" || name === "phoneNo") && value < 0) return;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Clear error when user starts correcting the field
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm({formData,setFormErrors})) return;
    
    const response = await apiRequest({
      url: "/api/alumni/register",
      method: "POST",
      body: formData ,
      token : false,
      setLoading,
    });

    if (response.status === "success") {
      toast.success("Registered Sucessfully!!! ");
      // navigate("/alumni/checkStatus", { state: { email: formData.email } });
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }


  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alumni Registration Form</h2>
      <form className={styles.form} onSubmit={(e)=>(handleSubmit(e))}>
        <div className={styles.threeTiles}>
          <Input
            type="select"
            name="title"
            label="Title"
            required
            requiredMark
            value={formData.title}
            options={titleList}
            onChange={handleChange}
            error={formErrors.title}
          />
          <Input
            type="text"
            name="Name"
            label="Name"
            required
            requiredMark
            value={formData.Name}
            onChange={handleChange}
            error={formErrors.Name}
          />
          <Input
            type="text"
            name="fathersName"
            label="Father's Name"
            required
            requiredMark
            value={formData.fathersName}
            onChange={handleChange}
            error={formErrors.fathersName}
          />
        </div>

        <div className={styles.threeTiles}>
          <Input
            type="date"
            name="dob"
            label="DOB(dd/mm/yyyy)"
            required
            requiredMark
            value={formData.dob}
            onChange={handleChange}
          />
          <Input
            type="number"
            name="enrollmentNo"
            label="Enrollment Number"
            required
            requiredMark
            value={formData.enrollmentNo}
            onChange={handleChange}
            error={formErrors.enrollmentNo}
          />
          <Input
            type="text"
            name="rollNo"
            label="Roll Number"
            required
            requiredMark
            value={formData.rollNo}
            onChange={handleChange}
            error={formErrors.rollNo}
          />
        </div>

        <div className={styles.twoTiles}>
          <Input
            type="tel"
            name="phoneNo"
            label="Phone Number"
            required
            requiredMark
            value={formData.phoneNo}
            onChange={handleChange}
            error={formErrors.phoneNo}
          />
          <Input
            type="email"
            name="email"
            label="E-mail"
            required
            requiredMark
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />
        </div>

        <div className={styles.threeTiles}>
          <Input
            type="select"
            name="school"
            label="Select School"
            required
            requiredMark
            value={formData.school}
            options={schoolList}
            onChange={handleChange}
            error={formErrors.school}
          />
          <Input
            type="select"
            name="programme"
            label="Select Programme"
            required
            requiredMark
            value={formData.programme}
            options={programmeList}
            onChange={handleChange}
            error={formErrors.programme}
          />
          <Input
            type="select"
            name="yearOfPassing"
            label="Year of Passing"
            required
            requiredMark
            value={formData.yearOfPassing}
            options={passingYears}
            onChange={handleChange}
            error={formErrors.yearOfPassing}
          />
        </div>

        <div className={styles.twoTiles}>
          <Input
            type="file"
            name="degree_picture"
            label="Photograph of degree"
            onChange={handleChange}
          />
        </div>

        <div className={styles.btnContainer}>
          <button type="submit" className={styles.submitButton}
          disabled={loading}>
            {loading ? <LoadingScrn size={"small"} color={"white"}/> :"Register"}
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
