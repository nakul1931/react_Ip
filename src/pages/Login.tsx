import React, { useState } from "react";
import { loginReq } from "../services/authService";
import styles from "../styles/pages/Login.module.css";
import Button from "../ui/Button";
import { endpoints } from "../constants/apiEndpoints";
import { showToast } from "../utils/showToast";
import { Link, useHistory } from "react-router-dom";
import Input from "../ui/Input";
import Loading from "../ui/Loading";

interface ILogin {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setAuth }: ILogin) => {
  const history = useHistory();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const r = await loginReq(endpoints.login, {
      phone,
      password,
    });

    if (r) {
      setAuth(true);
      setIsLoading(false);

      showToast(r.message);
      history.push("/inventory");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className={styles.container}>
        <h1 className={styles.heading}>Stockman</h1>
        <div className={styles.desc}>Manage your stock easily and securely</div>
        <div className={styles.card}>
          <h2 className={styles.title}>Login</h2>
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
              or <Link to="/signup">signup</Link> instead
            </div>
            <Button style={{ marginTop: "1em" }}>Login</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
