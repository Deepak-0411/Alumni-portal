import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/modules/CheckStatus.module.css";
import Input from "../../components/Input";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import apiRequest from "../../utility/apiRequest";

const CheckStatus = ({ forgetPassword = false }) => {
  const location = useLocation();
  const [verified, setVerified] = useState(null);
  const [paid, setPaid] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
      handleSearch(location.state.email);
    }
  }, [location.state]);

  const handleSearch = async (e, emailToSearch = email) => {
    e.preventDefault();
    if (!email) return;

    const response = await apiRequest({
      url: foradmin ? "/api/subadmin/login" : "/api/alumni/login",
      method: "POST",
      body: { [foradmin ? "username" : "email"]: userId, password: password },
      token: false,
      setLoading,
    });

    if (response.status === "success") {
      toast.success("LoggedIn Sucessfully!!! ");
      login(response.data.token);
      foradmin
        ? navigate("/alumni/sub-admin/verify-users-list")
        : navigate("/alumni/user/membershipCard");
    } else {
      console.error("Error:", response.message);
      toast.error(`Error: ${response.message}`);
    }
  };

  const forgetPass = (e) => {
    e.preventDefault();
    console.log("Get Clicked");
  };
  const handlePayClick = () => {
    console.log("Pay Clicked");
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>
        {forgetPassword ? "Forget password" : "Check Account Status"}
      </p>
      <form onSubmit={(e) => handleSearch(e)}>
        <div className={styles.searchBar}>
          <Input
            type={"email"}
            name={"email"}
            placeHolder={"E-mail"}
            required={true}
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className={styles.btn} type="submit" disabled={!email}>
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <Loading />
      ) : verified ? (
        <div className={styles.data}>
          <p className={styles.verified}> Account Verified </p>
          {paid && (
            <button className={styles.btn} onClick={forgetPass}>
              Get Password on Mail
            </button>
          )}
          {!paid && (
            <button className={styles.btn} onClick={handlePayClick}>
              Proceed to Pay
            </button>
          )}
        </div>
      ) : (
        verified != null && (
          <div className={styles.data}>
            <p> We'll let you know as soon as your verification is complete.</p>
          </div>
        )
      )}
    </div>
  );
};

export default CheckStatus;
