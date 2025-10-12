import React, { useState } from "react";

// Simulated user data (in a real app, this might come from an API or context)
const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  theme: "light", // "light" or "dark"
};

const SettingsPage = () => {
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [theme, setTheme] = useState(user.theme);

  // Simulate saving changes (could call an API in a real app)
  const handleSave = () => {
    alert(
      `Settings saved! Username: ${username}, Email: ${email}, Theme: ${theme}`
    );
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`settings-page ${theme}`}>
      <h1>Settings</h1>

      <section className="user-info">
        <h2>User Profile</h2>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
      </section>

      <section className="theme-toggle">
        <h2>Appearance</h2>
        <div>
          <label>
            Theme:
            <button onClick={toggleTheme}>
              Switch to {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </label>
        </div>
      </section>

      <section className="actions">
        <button onClick={handleSave}>Save Changes</button>
      </section>
    </div>
  );
};

export default SettingsPage;
