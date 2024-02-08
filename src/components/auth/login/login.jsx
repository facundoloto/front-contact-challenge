import { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import { loginBySystem } from "../../../api/routes";
import { Form } from "react-bootstrap";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import Loader from "../../Loader/Loader";
import "./login.css";


export default function Login() {

  const login = useAuthStore((state) => state.login);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };



  const handleLogin = async () => {
    setLoading(true);
    const data = { email: email, password: password };
    const response = await loginBySystem(data);
    login(response);
    setLoading(false);
    redirect("/");
  };

  return (
    <div className="container">
      {loading ? <Loader isLoading={true} /> : null}
      <div className="main-content">

        <div className="form-container">
          <Form>
            <div className="form-content box">


              <div className="signin-form" id="signin-form">

                <div className="form-group">

                  <div className="animate-input">

                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      autoComplete="on"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                </div>

                <div className="form-group">
                  <div className="password-field">
                    <div className="input-group">
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          onClick={handleTogglePassword}
                          className="btn btn-outline-secondary toggle-button"
                        >
                          {showPassword ? <EyeSlash /> : <Eye />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btn-group">
                  <button className="btn-login" type='button' id="signin-btn" onClick={handleLogin} >
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </Form>

          <div className="box goto">
            <p>
              Dont have an account?
              <a href="/auth/register/">Sign up</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="copyright">
          ©app created by facundo loto
        </div>
      </div>
    </div>
  );
}
