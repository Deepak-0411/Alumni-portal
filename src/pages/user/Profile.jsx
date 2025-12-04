import { useEffect, useState } from "react";
import baseURL from "../../utility/baseURL";
import FallBackDP from "../../assets/user.webp";
import styles from "../../styles/modules/user/Profile.module.css";
import DataCard from "../../components/DataCard/DataCard";
import Input from "../../components/Input/Input";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FaUserEdit } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import Loading from "../../components/Spinner/Loading";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../apis/apiRequest";
import { toast } from "react-toastify";
import { useUser } from "../../apis/user.query";

const Profile = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);

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

  const { data: formData, isLoading, refetch: refetchUser } = useUser();

  const startEdit = () => {
    setDraftData(formData);
    setUploadPreview(null);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftData({});
    setFormErrors({});
    setUploadPreview(null);
  };

  const saveEdit = async () => {
    if (!validate(draftData)) return;

    // Prepare FormData to send file + text
    const fd = new FormData();
    for (let key in draftData) {
      if (key !== "profileImg") {
        fd.append(key, draftData[key] || "");
      }
    }
    if (draftData.profileImg) {
      fd.append("profileImg", draftData.profileImg);
    }

    const response = await apiRequest({
      url: "/api/alumni/profile/update",
      method: "POST",
      body: fd,
      setLoading: () => {},
    });

    if (response.status === "success") {
      setFormData(response.data);
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setFormErrors({});
    } else {
      toast.error(response.message || "Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImg" && files && files[0]) {
      const file = files[0];
      setDraftData((prev) => ({ ...prev, profileImg: file }));
      setUploadPreview(URL.createObjectURL(file));
    } else {
      setDraftData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogout = async () => {
    const response = await apiRequest({
      url: `/api/alumni/logout`,
      method: "POST",
      setLoading: setLogoutLoading,
    });

    if (response.status === "success") {
      clearAll();
      localStorage.setItem("user", "false");
      navigate("/alumni/login");
    } else {
      toast.error("Failed to logout");
    }
  };

  const buildItems = (fields) =>
    fields.map(({ label, name, editable = false, type = "text" }) => {
      const value = isEditing ? draftData[name] : formData[name];
      if (isEditing && editable) {
        if (name === "description") {
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
        return { label, value };
      }
    });

  const sections = [
    {
      heading: "Profile Data",
      dataItems: buildItems([{ label: "Name", name: "alumniName" }]),
      image: uploadPreview || baseURL + formData.profileImg || FallBackDP,
      editableImage: isEditing,
      imageInput: (
        <input
          type="file"
          name="profileImg"
          accept="image/*"
          onChange={handleChange}
          className={styles.fileInput}
        />
      ),
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
            <FaUserEdit size={25} />
          </span>
        )}
      </div>

      {sections.map((section, idx) => (
        <DataCard
          key={idx}
          heading={section.heading}
          dataItems={section.dataItems}
          image={section.image}
          loading={isLoading}
          imageInput={section.editableImage ? section.imageInput : null}
        />
      ))}

      {/* Logout + Change Password */}
      <div className="w-[100%] flex items-center justify-center gap-6 flex-wrap">
        <button
          className="py-2.5 px-6 rounded-full text-black font-semibold text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.5px] flex items-center justify-center gap-3"
          onClick={() => navigate("/alumni/user/changePassword")}
        >
          Change Password
        </button>
        <button
          className="w-45 py-2.5 px-6 rounded-full text-black font-semibold text-base tracking-wide transition-all duration-600 cursor-pointer border-[1.5px] flex items-center justify-center gap-3"
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
    </div>
  );
};

export default Profile;
