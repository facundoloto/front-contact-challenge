import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const ProtectedRoute = lazy(() => import("./../security/protectedRoute"));
const Register = lazy(() => import("./../components/auth/register/register"));
const Login = lazy(() => import("./../components/auth/login/login"));
const Home = lazy(() => import("./../components/Home/Home"));

const AppRoutes = () => {
    return (
        <>

            <Suspense
                fallback={
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                        }}>
                        <BounceLoader color="rgb(186, 144, 198)" />
                    </div>}>
                <Routes>
                    <Route element={<ProtectedRoute withUserAuth={false} />}>
                        <Route exact path="/auth/register" element={< Register />} />
                        <Route exact path="/auth/login" element={<Login />} />
                    </Route>
                    <Route element={<ProtectedRoute withUserAuth={true} />}>
                        <Route exact path="/" element={< Home />} />
                    </Route>
                </Routes>
            </Suspense>

        </>
    );
};

export default AppRoutes;