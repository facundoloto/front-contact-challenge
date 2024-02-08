import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { registerBySystem } from "../../../api/routes";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import "./../login/login.css";
import Loader from "../../Loader/Loader";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        await registerBySystem(data);
        setLoading(false);
    };



    return (
        <div className="container">
            {loading ? <Loader isLoading={true} /> : null}

            <div className="main-content">

                <div className="form-container">

                    <div className="form-content box">

                        <div className="signin-form" id="signin-form">

                            <Form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter name"
                                            {...register("name")}

                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter LastName"
                                            {...register("lastName")}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="animate-input">
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            {...register("email")}
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
                                                {...register("password")}
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
                                    <button className="btn-login" id="signin-btn" type="submit" >
                                        Register
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="box goto">
                        <p>
                            have you an account?
                            <a href="/auth/login/">Log In</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>

    );
}
