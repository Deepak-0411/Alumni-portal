import { useEffect, useState } from "react";
import DP from "../../assets/user.png";
import styles from "../../styles/modules/user/Profile.module.css";
import DataCard from "../../components/DataCard/DataCard";
import Input from "../../components/Input/Input";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Loading from "../../components/Spinner/Loading";
import Overlay from "../../components/Overlay/Overlay";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utility/apiRequest";
import { useData } from "../../context/DataContext";
import { toast } from "react-toastify";

const ChangePass = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [data, setData] = useState({ oldPass: "", newPass: "", cnfPass: "" });
  const [errors, setErrors] = useState({
    oldPass: "",
    newPass: "",
    cnfPass: "",
  });

  useEffect(() => {
    if (data.cnfPass && data.newPass && data.cnfPass !== data.newPass) {
      setErrors((prev) => ({ ...prev, cnfPass: "Passwords do not match." }));
    } else {
      setErrors((prev) => ({ ...prev, cnfPass: "" }));
    }
  }, [data.cnfPass, data.newPass]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (errors.cnfPass) {
      toast.error("Please fix form errors before submitting.");
      return;
    }

    const response = await apiRequest({
      url: "/api/alumni/profile/change-password",
      method: "POST",
      body: {
        credential: data.oldPass,
        newCredential: data.cnfPass,
      },
      setLoading: setIsUploading,
    });

    if (response.status === "success") {
      toast.success(`Password changed! ${response.data.message}`);
    } else if (response.data?.error) {
      toast.error(`Upload failed: ${response.data.error}`, { autoClose: 5000 });
    } else {
      console.error("Error:", response.message);
      toast.error(`Upload failed: ${response.message || "Unknown error"}`);
    }
  };

  const fields = [
    { name: "oldPass", placeholder: "Old Password" },
    { name: "newPass", placeholder: "New Password" },
    { name: "cnfPass", placeholder: "Confirm Password" },
  ];

  return (
    <div className={styles.changePassContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map(({ name, placeholder }) => (
          <div key={name}>
            <Input
              type="password"
              name={name}
              placeholder={placeholder}
              value={data[name]}
              required
              onChange={handleChange}
              error={errors[name]}
            />
          </div>
        ))}

        <button
          type="submit"
          className={styles.uploadBtn}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              Change <Loading size={"small"} color={"white"} />
            </>
          ) : (
            "Change"
          )}
        </button>
      </form>
    </div>
  );
};

const Profile = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);

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
    fetchCard,
    clearAll,
    userLoading: loading,
    currentUser,
    setCurrentUser: setFormData,
    card,
  } = useData();

  useEffect(() => {
    if (!Array.isArray(currentUser) || currentUser.length === 0) {
      fetchUser();
    }
    if (!Array.isArray(card) || card.length === 0) {
      fetchCard();
    }
  }, []);

  const formData = currentUser[0] || {};
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
      setLoading: setLogoutLoading,
    });

    if (response.status === "success") {
      clearAll();
      navigate("/alumni/login");
    } else {
      toast.error("Failed to logout");
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

      {/* Logout and change Password */}
      <div className="w-[100%] flex items-center justify-center gap-6 flex-wrap">
        <button
          className="py-2.5 px-6 rounded-full text-black font-semibold  text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.5px] flex items-center justify-center gap-3 "
          onClick={() => setShowChangePass(true)}
        >
          Change Password
        </button>
        <button
          className=" w-45 py-2.5 px-6 rounded-full text-black font-semibold  text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.5px] flex items-center justify-center gap-3 "
          onClick={handleLogout}
        >
          {logoutLoading ? (
            <Loading color="blue" size="small" />
          ) : (
            <>
              Logout <FiLogOut size={18} strokeWidth={2.65} />
            </>
          )}
        </button>
      </div>

      {showChangePass && (
        <Overlay onClose={() => setShowChangePass(false)}>
          <ChangePass />
        </Overlay>
      )}
    </div>
  );
};

export default Profile;
