import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // State for storing the image file

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    
    // Prepare the form data to include the image file
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phoneNumber", data.phone);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("dob", data.dob);
    formData.append("gender", data.gender);
    if (imageFile) formData.append("image", imageFile); // Include image if selected
    
    data.file = imageFile
    console.log("Form Data:", data);

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("User signed up:", response);
    } catch (error) {
      console.log("Error signing up:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result); // Set preview for image
        setImageFile(file); // Store the image file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-[1000px] bg-gradient-to-br from-yellow-200 via-orange-400 to-amber-500 p-[2px] rounded-md">
        <form
          className="w-full p-5 rounded-md bg-eigengrau text-white flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex items-center justify-center text-4xl font-extrabold">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-yellow-200 via-orange-400 to-amber-500">
              Sign Up
            </h1>
          </div>

          {/* Name and Phone */}
          <div className="flex w-full gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
            <label
              htmlFor="name"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Name</p>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.name && <span>This field is required</span>}
            </label>
            <label
              htmlFor="phoneNumber"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Phone Number</p>
              <input
                type="text"
                {...register("phoneNumber", { required: true })}
                placeholder="Phone Number"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.phone && <span>This field is required</span>}
            </label>
          </div>

          {/* Email and Password */}
          <div className="flex w-full gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
            <label
              htmlFor="email"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Email</p>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="Email"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.email && <span>This field is required</span>}
            </label>
            <label
              htmlFor="password"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Password</p>
              <input
                type="password"
                {...register("password", { required: true })}
                placeholder="Password"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.password && <span>This field is required</span>}
            </label>
          </div>

          {/* Role and Date of Birth */}
          <div className="flex w-full gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
            <label
              htmlFor="role"
              className="w-full flex flex-col justify-center gap-2"
            >
              <p>Role</p>
              <Controller
                name="role"
                control={control}
                defaultValue="Attendee"
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white  border-amber-600 border px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <option value="Organizer">Organizer</option>
                    <option value="Attendee">Attendee</option>
                  </select>
                )}
              />
            </label>

            <label
              htmlFor="dob"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Date of Birth</p>
              <input
                type="date"
                {...register("dob", { required: true })}
                placeholder="Date of Birth"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.dob && <span>This field is required</span>}
            </label>
          </div>

          {/* Gender and Profile Image */}
          <div className="flex w-full gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
            <label
              htmlFor="gender"
              className="w-full flex flex-col justify-center gap-2"
            >
              <p>Gender</p>
              <Controller
                name="gender"
                control={control}
                defaultValue="Male"
                render={({ field }) => (
                  <select
                    {...field}
                    className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white  border-amber-600 border px-4 py-2 rounded-lg flex items-center justify-center"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                )}
              />
            </label>

            <label
              htmlFor="image"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Profile Image</p>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {imageFile && <span>File selected: {imageFile.name}</span>}
            </label>
          </div>

          {/* Image Preview */}
          <div className="w-full flex items-center justify-center">
            {imagePreview ? (
              <div className="flex items-center justify-center mt-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center mt-4">
                <img
                  src="/Avatar.png"
                  alt="Avatar"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-amber-500 text-white py-2 px-6 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup;
