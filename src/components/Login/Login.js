import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { urlActions } from "../../store/url";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  let id;

  const selector = useSelector((state) => state.url.id);
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
    }

    const data = await response.json();
    if (data.status === "success") {
      console.log(data);
      console.log(data.data.user.company);
      id = data.data.user._id;
      userDetailHandler();
      console.log("User login successfully");
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
  return (
    <div className="ml-8">
      <form onSubmit={onSubmitHandler}>
        <div>
          <input
            value={name}
            type="text"
            placeholder="name"
            alt="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            alt="password"
          />
        </div>
        <div>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            type="text"
            placeholder="role"
            alt="role"
          />
        </div>
        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            alt="email"
          />
        </div>
        <div>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="company"
            alt="company"
          />
        </div>
        <div>
          <input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="text"
            placeholder="confirm password"
            alt="comfimation"
          />
        </div>
        <div>
          <button type="Submit">Login</button>
        </div>
        <div>{selector}</div>
      </form>
    </div>
  );
};

export default Login;
