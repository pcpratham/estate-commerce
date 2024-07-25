import React from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


function Signup() {
  const [formData, setFormData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      // console.log(data);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  console.log(formData);
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="font-bold text-lg sm:text-3xl text-center my-8">
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg "
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-lg "
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg "
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        <OAuth />
      </form>

      <div className="flex gap-2 my-2">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-500">
          Sign in here
        </Link>
      </div>
      {error && <p className="text-red-500 font-bold text-lg sm:text-xl mt-5 mx-auto text-center">{error}</p>}
    </div>
  );
}

export default Signup;
