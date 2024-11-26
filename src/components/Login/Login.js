import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { urlActions } from "../../store/url";
import { authActions } from "../../store/auth";
import { loginActions } from "../../store/login";
import { roleActions } from "../../store/role";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let id;
  let roole;

  const selector = useSelector((state) => state.url.id);
  const loginned = useSelector((state) => state.login.login);
  console.log(selector);
  const dispatch = useDispatch();

  const apiHandler = async () => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      console.log(response.status);
      if (response.status === 401) {
        alert("Invalid credentials");
      }
    }

    const data = await response.json();
    if (data.status === "success") {
      console.log(data);
      console.log(data.data.user.company);
      id = data.data.user._id;
      roole = data.data.user.role;
      userDetailHandler();
      console.log(data.data.user.role);
      console.log("User login successfully");
      dispatch(authActions.login());
      dispatch(roleActions.add(roole));
    }
  };

  const userDetailHandler = async () => {
    const response = await fetch(`/api/user/${id}`);
    const data = await response.json();
    id = data.data.user[0].companyDetail[0]._id;
    dispatch(urlActions.add(id));
    console.log(data.data.user[0].companyDetail[0]._id);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiHandler();
    console.log(name);
    console.log(password);
    console.log(role);
    console.log(email);
  };

  const preventHandler = (e) => {
    e.preventDefault();
  };
  const toggleHandler = () => {
    dispatch(loginActions.toogle());
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <form onSubmit={preventHandler} className="space-y-6">
          {!loginned && (
            <div>
              <input
                value={name}
                type="text"
                placeholder="Name"
                alt="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              alt="email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              alt="password"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {!loginned && (
            <div>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                placeholder="Role"
                alt="role"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!loginned && (
            <div>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                type="text"
                placeholder="Company"
                alt="company"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {!loginned && (
            <div>
              <input
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type="password"
                placeholder="Confirm Password"
                alt="confirmation"
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          {!loginned && (
            <div>
              <button
                onClick={onSubmitHandler}
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Sing Up
              </button>
            </div>
          )}

          {loginned && (
            <div>
              <button
                onClick={onSubmitHandler}
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          )}
          {loginned ? (
            <div onClick={toggleHandler}>Create account? Sign Up</div>
          ) : (
            <div onClick={toggleHandler}>Already account? Login</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
