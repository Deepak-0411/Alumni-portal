import { useEffect, useState } from "react";
import DP from "../../assets/user.png";
import styles from "../../styles/modules/user/Profile.module.css";
import DataCard from "../../components/DataCard/DataCard";
import Input from "../../components/Input/Input";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Loading from "../../components/Spinner/Loading";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utility/apiRequest";
import { useData } from "../../context/DataContext";

const Profile = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  // const [formData, setFormData] = useState({
  //   Name: "Mr. Example",
  //   Fathername: "Example",
  //   dob: "12/12/2012",
  //   phoneNo: "1234567890",
  //   email: "example@gmail.com",
  //   enrollmentNo: "222211244",
  //   rollNo: "235UCS050",
  //   yearOfPassing: "2027",
  //   school: "School Of ICT",
  //   programme: "B.Tech",
  //   country: "",
  //   dp: "",
  //   x: "",
  //   insta: "",
  //   linkedIn: "",
  //   gitHub: "",
  //   description:
  //     " Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda voluptatem ab molestias id velit minus laboriosam, quidem libero minima corrupti.",
  // });

  const toVerifyFields = [
    "phoneNo",
    "email",
    "country",
    "linkedIn",
    "gitHub",
    "x",
    "insta",
  ];
  const navigate = useNavigate();
  const [draftData, setDraftData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { formErrors, setFormErrors, validate } =
    useFormValidation(toVerifyFields);
  const {
    fetchUser,
    userLoading: loading,
    currentUser: formData,
    setCurrentUser: setFormData,
  } = useData();

  useEffect(() => {
    if (!Array.isArray(formData) || formData.length === 0) {
      fetchUser();
    }
  }, []);

  const startEdit = () => {
    setDraftData(formData);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftData({});
    setFormErrors({});
  };

  const saveEdit = () => {
    if (!validate(draftData)) return;

    setFormData(draftData);
    setIsEditing(false);
    setFormErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    const response = await apiRequest({
      url: `/api/alumni/logout`,
      method: "POST",
      setLoading: logoutLoading,
    });

    if (response.status === "success") {
      navigate("/alumni/login");
    }
  };

  const buildItems = (fields) =>
    fields.map(({ label, name, editable = false, type = "text" }) => {
      const value = isEditing ? draftData[name] : formData[name];

      if (isEditing && editable) {
        if (name == "description") {
          return (
            <textarea
              id="description"
              key={name}
              label={label}
              name={name}
              value={value}
              onChange={handleChange}
              className={styles.textarea}
            ></textarea>
          );
        } else {
          return (
            <Input
              key={name}
              label={label}
              name={name}
              value={value}
              onChange={handleChange}
              type={type}
              error={formErrors[name]}
            />
          );
        }
      } else {
        return {
          label,
          value,
        };
      }

      // return isEditing && editable ? (
      //   <Input
      //     key={name}
      //     label={label}
      //     name={name}
      //     value={value}
      //     onChange={handleChange}
      //     type={type}
      //     error={formErrors[name]}
      //   />
      // ) : (
      //   {
      //     label,
      //     value,
      //   }
      // );
    });

  const sections = [
    {
      heading: "Profile Data",
      dataItems: buildItems([{ label: "Name", name: "alumniName" }]),
      image: formData.dp || DP,
    },
    {
      heading: "Personal Data",
      dataItems: buildItems([
        { label: "Date Of Birth", name: "dob" },
        { label: "Father's Name", name: "fatherName" },
      ]),
    },
    {
      heading: "Contact",
      dataItems: buildItems([
        { label: "Phone Number", name: "phoneNo", type: "tel", editable: true },
        { label: "E-mail", name: "email", type: "email", editable: true },
      ]),
    },
    {
      heading: "College Info",
      dataItems: buildItems([
        { label: "Enrollment Number", name: "enrollmentNo" },
        { label: "Roll Number", name: "rollNo" },
        { label: "Year Of Passing", name: "yearOfPassing" },
        { label: "School", name: "schoolName" },
        { label: "Programme", name: "programme" },
        { label: "Country", name: "country", editable: true },
      ]),
    },
    {
      heading: "Social Media",
      dataItems: buildItems([
        { label: "X", name: "x", editable: true, type: "url" },
        { label: "Insta", name: "insta", editable: true, type: "url" },
        { label: "LinkedIn", name: "linkedIn", type: "url", editable: true },
        { label: "Github", name: "gitHub", type: "url", editable: true },
      ]),
    },
    {
      heading: "About",
      dataItems: buildItems([
        {
          label: "Description",
          name: "description",
          editable: true,
          type: "text",
        },
      ]),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.editBtn}>
        {isEditing ? (
          <>
            <button onClick={saveEdit} className={styles.saveBtn}>
              Save
            </button>
            <button onClick={cancelEdit} className={styles.cancelBtn}>
              Cancel
            </button>
          </>
        ) : (
          <span
            className="bg-gray-100 rounded-full p-4 pl-5 cursor-pointer"
            onClick={startEdit}
          >
            {<FaUserEdit size={25} />}
          </span>
        )}
      </div>

      {sections.map((section, idx) => (
        <DataCard
          key={idx}
          heading={section.heading}
          dataItems={section.dataItems}
          image={section.image}
          loading={loading}
        />
      ))}

      <div className="w-[100%] flex items-center justify-center">
        <button
          className=" w-45 py-3 px-6 rounded-full text-black font-semibold  text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.5px] flex items-center justify-center gap-3 "
          onClick={handleLogout}
        >
          {loading ? (
            <Loading color="blue" size="small" />
          ) : (
            <>
              Logout <FiLogOut size={18} strokeWidth={2.65} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;
