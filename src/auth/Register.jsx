import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import styles from "../styles/modules/auth/Register.module.css";
import LoadingScrn from "../components/Spinner/Loading";
import apiRequest from "../utility/apiRequest";
import { toast } from "react-toastify";
import { useFormValidation } from "../hooks/useFormValidation";
import { useData } from "../context/DataContext";

const Register = () => {
  const [formData, setFormData] = useState({
    title: "",
    enrollmentNo: "",
    rollNo: "",
    alumniName: "",
    fatherName: "",
    dob: "",
    yearOfPassing: "",
    phoneNo: "",
    email: "",
    school: "",
    programme: "",
    imgOfDegree: "",
  });

  const [loading, setLoading] = useState(false);
  const [titleList, setTitleList] = useState(["Mr.", "Dr.", "Ms."]);
  const { schoolData: schoolList, setSchoolData: setSchoolList } = useData();
  const [passingYears, setPassingYears] = useState(["2021", "2022", "2023"]);

  const navigate = useNavigate();

  const fieldsToValidate = [
    "title",
    "enrollmentNo",
    "rollNo",
    "Name",
    "fathersname",
    "dob",
    "yearOfPassing",
    "phoneNo",
    "email",
    "school",
    "programme",
    "degree_picture",
  ];

  const fetchData = async () => {

    const response = await apiRequest({
      url: `/api/data/filter `,
      method: "GET",
    });

    if (response.status === "success") {
      if (response?.data) {
        setSchoolList(response.data);
      }
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: Failed to fetch school list.`);
    }
  };

  useEffect(() => {
    if (!Array.isArray(schoolList) || schoolList.length === 0) {
      fetchData();
    }
  }, []);

  const { formErrors, setFormErrors, validate } =
    useFormValidation(fieldsToValidate);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if ((name === "enrollmentNo" || name === "phoneNo") && +value < 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;

    const response = await apiRequest({
      url: "/api/alumni/register",
      method: "POST",
      body: formData,
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
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
            options={Object.keys(schoolList)}
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
            options={schoolList[formData?.school]}
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
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <LoadingScrn size={"small"} color={"white"} />
            ) : (
              "Register"
            )}
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
