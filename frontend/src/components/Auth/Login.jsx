import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      console.log("I am here");
      const token = Cookies.get("token");
      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email:data.email,
          password:data.password,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("I am here 2");

      if (response.status === 401) {
        Cookies.remove("Token");
        Window.location.reload();
      }

      Cookies.set("token", response.data.accessToken);

      console.log("Login successful", response.data);
    } catch (e) {
      console.error("Login failed", e.response?.data || e.message);
    }
  };
  return (
    <section className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-[1000px] bg-gradient-to-br from-yellow-200 via-orange-400 to-amber-500 p-[2px] rounded-md">
        <form
          className="w-full p-5 rounded-md bg-eigengrau text-white flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex-col items-center justify-center text-4xl font-extrabold">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-yellow-200 via-orange-400 to-amber-500">
              Login
            </h1>
          </div>

          <div className="flex w-full flex-col gap-4 items-center justify-around">
            <label
              htmlFor="emaiol"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Name</p>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.name && <span>This field is required</span>}
            </label>
            <label
              htmlFor="password"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Phone Number</p>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.phone && <span>This field is required</span>}
            </label>
          </div>
          {/* Submit Button */}
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="mt-4 bg-amber-500 text-white py-2 px-6 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
