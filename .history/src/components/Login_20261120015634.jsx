import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", terms: false });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/success");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Giriş Yap</h1>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        data-cy="email-input"
      />

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        data-cy="password-input"
      />

      <label>
        <input
          name="terms"
          type="checkbox"
          checked={form.terms}
          onChange={handleChange}
          data-cy="terms-input"
        />
        Şartları kabul ediyorum
      </label>

      <button type="submit" data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  );
}

export default Login;