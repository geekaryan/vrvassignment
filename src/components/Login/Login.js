import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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
      console.log("User login successfully");
    }
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
            type="text"
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
      </form>
    </div>
  );
};

export default Login;
