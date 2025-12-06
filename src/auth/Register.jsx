import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import styles from "../styles/modules/auth/Register.module.css";
import LoadingScrn from "../components/Spinner/Loading";
import apiRequest from "../apis/apiRequest";
import { toast } from "react-toastify";
import { useFormValidation } from "../hooks/useFormValidation";
import { useSchoolList } from "../apis/school.query";
import { useMutation } from "@tanstack/react-query";

const initialFormState = {
  title: "",
  enrollmentNo: "",
  rollNo: "",
  alumniName: "",
  fatherName: "",
  dob: "",
  yearOfPassing: "",
  phoneNo: "",
  email: "",
  schoolName: "",
  programme: "",
  branch: "",
};

const Register = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: currentYear - 2010 + 1 }, (_, i) =>
    (2010 + i).toString()
  );

  const [formData, setFormData] = useState(initialFormState);
  const [degreeImg, setDegreeImg] = useState(null);
  const [titleList] = useState(["Mr.", "Dr.", "Ms."]);
  const { data: schoolList = [], isError } = useSchoolList();
  const [passingYears] = useState(yearsArray);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch school list");
    }
  }, [isError]);

  const fieldsToValidate = [
    "title",
    "enrollmentNo",
    "rollNo",
    "alumniName",
    "fatherName",
    "dob",
    "yearOfPassing",
    "phoneNo",
    "email",
    "schoolName",
    "programme",
    "branch",
    "degreeImg",
  ];

  const { formErrors, validate } = useFormValidation(fieldsToValidate);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if ((name === "enrollmentNo" || name === "phoneNo") && +value < 0) return;

    if (type === "file") {
      const file = files[0];
      const maxSize = 2 * 1024 * 1024;
      if (file && file.size > maxSize) {
        toast.info("Image size must be less than 2MB");
        e.target.value = "";
        return;
      }
      setDegreeImg(file);
    } else {
      let processedValue = value;

      if (name === "phoneNo") {
        processedValue = processedValue.replace(/^0+/, "");
      }

      setFormData((prev) => ({ ...prev, [name]: processedValue }));
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (formDataToSend) => {
      return await apiRequest({
        url: "/api/alumni/register",
        method: "POST",
        body: formDataToSend,
      });
    },
    onSuccess: () => {
      toast.success("Registered Successfully!");
      setFormData(initialFormState);
      setDegreeImg(null);
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong!");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allData = { ...formData, degreeImg };

    if (!validate(allData)) return;

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });
    if (degreeImg) {
      console.log(degreeImg);

      formDataToSend.append("degreeImg", degreeImg);
    }

    mutate(formDataToSend);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Alumni Registration Form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* --- first row --- */}
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
            name="alumniName"
            label="Name"
            required
            requiredMark
            value={formData.alumniName}
            onChange={handleChange}
            error={formErrors.alumniName}
          />
          <Input
            type="text"
            name="fatherName"
            label="Father's Name"
            required
            requiredMark
            value={formData.fatherName}
            onChange={handleChange}
            error={formErrors.fatherName}
          />
        </div>

        {/* --- second row --- */}
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

        {/* --- third row --- */}
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

        {/* --- fourth row --- */}
        <div className={styles.threeTiles}>
          <Input
            type="select"
            name="schoolName"
            label="Select School"
            required
            requiredMark
            value={formData.schoolName}
            options={Object.keys(schoolList)}
            onChange={handleChange}
            error={formErrors.schoolName}
          />
          <Input
            type="select"
            name="programme"
            label="Select Programme"
            required
            requiredMark
            value={formData.programme}
            options={Object.keys(schoolList[formData?.schoolName] ?? {})}
            onChange={handleChange}
            error={formErrors.programme}
          />
          <Input
            type="select"
            name="branch"
            label="Select Branch"
            required
            requiredMark
            value={formData.branch}
            options={
              schoolList[formData?.schoolName]?.[formData.programme] || []
            }
            onChange={handleChange}
            error={formErrors.branch}
          />
        </div>

        {/* --- fifth row --- */}
        <div className={styles.twoTiles}>
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
          <Input
            type="file"
            name="degreeImg"
            label="Upload Degree/Marksheet (max size 2MB)"
            required
            requiredMark
            onChange={handleChange}
          />
        </div>

        {/* --- submit button --- */}
        <div className={styles.btnContainer}>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isPending}
          >
            {isPending ? (
              <LoadingScrn size="small" color="white" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>

      <div className={styles.btnContainer}>
        <span className={styles.backToLoginSpan}>
          Already have an account? &nbsp;
          <button
            className={styles.backToLoginBtn}
            onClick={() => navigate("/alumni/user")}
          >
            log in
          </button>
        </span>
      </div>
    </div>
  );
};

export default Register;
