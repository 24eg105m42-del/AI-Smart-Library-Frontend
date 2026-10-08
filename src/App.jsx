import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const user = {
      name: name,
      email: email,
      password: password,
      role: "STUDENT"
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }
      );

      const result = await response.text();

      setMessage(result);
      setMessageType("success");

      if (result === "Registration successful") {
        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          setPage("login");
          setMessage("");
        }, 1000);
      }

    } catch (error) {

      console.error("Registration error:", error);

      setMessage("Cannot connect to backend.");
      setMessageType("error");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const loginUser = {
      email: email,
      password: password
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(loginUser)
        }
      );

      const result = await response.text();

      if (result === "Login successful") {
        setMessage("Login successful!");
        setMessageType("success");
      } else {
        setMessage(result);
        setMessageType("error");
      }

    } catch (error) {

      console.error("Login error:", error);

      setMessage("Cannot connect to backend.");
      setMessageType("error");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          📚
        </div>

        <h1>AI Smart Library</h1>

        <p className="auth-subtitle">
          Intelligent Library Management System
        </p>

        {page === "login" ? (

          <>
            <h2>Student Login</h2>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

              <button type="submit">
                Login
              </button>

            </form>

            <p className="switch-text">
              Don't have an account?

              <button
                className="link-button"
                onClick={() => {
                  setPage("register");
                  setMessage("");
                }}
              >
                Register
              </button>
            </p>
          </>

        ) : (

          <>
            <h2>Student Registration</h2>

            <form onSubmit={handleRegister}>

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
              />

              <button type="submit">
                Register
              </button>

            </form>

            <p className="switch-text">
              Already have an account?

              <button
                className="link-button"
                onClick={() => {
                  setPage("login");
                  setMessage("");
                }}
              >
                Login
              </button>
            </p>
          </>

        )}

        {message && (
          <div
            className={
              messageType === "success"
                ? "auth-message success"
                : "auth-message error"
            }
          >
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;