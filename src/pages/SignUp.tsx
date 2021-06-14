import { useState } from "react";
import { apiService } from "../services/apiService";
import styles from "../styles/pages/Login.module.css";
import Button from "../ui/Button";
import { endpoints } from "../constants/apiEndpoints";
import { showToast } from "../utils/showToast";
import Input from "../ui/Input";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const r = await apiService(endpoints.signup, {
      phone,
      password,
    });

    if (r) {
      showToast(r.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Stockman</h1>
      <div className={styles.desc}>Manage your stock easily and securely</div>
      <div className={styles.card}>
        <h2 className={styles.title}>SignUp</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Phone"
            type="number"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            password
          />

          <div className={styles.instead}>
            or <Link to="/login">login</Link> instead
          </div>
          <Button style={{ marginTop: "1em" }}>SignUp</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
