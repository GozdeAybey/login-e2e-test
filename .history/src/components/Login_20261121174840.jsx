import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// en az 8 karakter, 1 büyük harf, 1 küçük harf, 1 rakam
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", terms: false });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    terms: false,
  });

  const errors = {
    email: emailRegex.test(form.email) ? "" : "Geçerli bir email adresi giriniz.",
    password: passwordRegex.test(form.password)
      ? ""
      : "Şifre en az 8 karakter olmalı; büyük harf, küçük harf ve rakam içermelidir.",
    terms: form.terms ? "" : "Şartları kabul etmelisiniz.",
  };

  const isValid = !errors.email && !errors.password && !errors.terms;

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
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
      {touched.email && errors.email && (
        <p className="error" data-cy="email-error">
          {errors.email}
        </p>
      )}

      <label htmlFor="password">Şifre</label>
      <input
        id="password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        data-cy="password-input"
      />
      {touched.password && errors.password && (
        <p className="error" data-cy="password-error">
          {errors.password}
        </p>
      )}

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
      {touched.terms && errors.terms && (
        <p className="error" data-cy="terms-error">
          {errors.terms}
        </p>
      )}

      <button type="submit" disabled={!isValid} data-cy="submit-button">
        Giriş Yap
      </button>
    </form>
  );
}

export default Login;