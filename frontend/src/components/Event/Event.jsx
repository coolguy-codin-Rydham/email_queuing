import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Map from "../Map/Map";

const Event = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null); // To hold searched location coordinates

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const obj = {
      name: data.name,
      date: data.date,
      description: data.description,
      venue: {
        name: data.venue,
        lat: data.latitude,
        lng: data.longitude,
      },
      mode: data.mode,
      creator: {
        email: "rydhampreetsingh.gindra@gmail.com",
        name: "Rydham",
      },
    };

    try {
      const response = await axios.post("http://localhost:8080/event/new", obj);
      console.log(response);
    } catch (err) {
      console.error("Error creating event:", err);
    }
    console.log(obj);
  };

  const handleSearch = async (query) => {
    if (!query) return;

    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: "json",
            limit: 1,
          },
        }
      );

      if (data.length > 0) {
        const { lat, lon } = data[0];
        setSearchedLocation({ lat: parseFloat(lat), lng: parseFloat(lon) }); // Update searched location
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <section className="w-full flex items-center justify-center p-2">
      <div className="w-full max-w-[1000px] bg-gradient-to-br from-yellow-200 via-orange-400 to-amber-500 p-[2px] rounded-md ">
        <form
          className="w-full p-5 rounded-md bg-eigengrau text-white flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full flex items-center justify-center text-4xl font-extrabold">
            <h1 className="bg-clip-text text-transparent bg-gradient-to-tr from-yellow-200 via-orange-400 to-amber-500">
              Register Your Event
            </h1>
          </div>

          <div className="flex w-full gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
            <label
              htmlFor="name"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Name of Event</p>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-sm focus:shadow-white border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.name && <span>This field is required</span>}
            </label>
            <label
              htmlFor="date"
              className="flex flex-col w-full items-start gap-2 justify-center"
            >
              <p>When is the Event?</p>
              <input
                type="date"
                {...register("date", { required: true })}
                placeholder="Date"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white text-sm border-amber-600 border px-4 py-2 rounded-lg"
              />
              {errors.date && <span>This field is required</span>}
            </label>
          </div>
          <div className="w-full flex flex-col gap-4 items-center justify-around">
            <label
              htmlFor="description"
              className="flex flex-col items-start gap-2 w-full justify-center"
            >
              <p>Description of Event</p>
              <textarea
                type="text"
                {...register("description", { required: true })}
                placeholder="Description"
                className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white  border-amber-600 border px-4 py-2 rounded-lg flex items-center justify-center"
              />
              {errors.description && <span>This field is Required</span>}
            </label>
            </div>

          {/* Search Feature */}
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <label htmlFor="search" className="w-full">
              <p>Search Location</p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id="search"
                  placeholder="Search for a location"
                  className="bg-transparent focus:outline-none w-full focus:border-amber-500 border-amber-600 border px-4 py-2 rounded-lg"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch(e.target.value); // Perform search on Enter
                    }
                  }}

                />
                <button
                  type="button"
                  onClick={() =>
                    handleSearch(document.getElementById("search").value)
                  }
                  className="px-4 py-2 bg-orange-500 rounded-lg text-white"
                >
                  Search
                </button>
              </div>
            </label>
          </div>

          <div className="w-full flex flex-col gap-4 items-center">
            <Map
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
              searchedLocation={searchedLocation}
              setValue={setValue}
            />
          </div>
          <div className="w-full flex gap-16 max-md:flex-col max-md:gap-4 items-center justify-around">
          <label
                htmlFor="venue"
                className="w-full flex flex-col justify-center gap-2"
              >
                <p>Venue Name</p>
                <input
                  type="text"
                  {...register("venue", { required: true })}
                  className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white  border-amber-600 border px-4 py-2 rounded-lg flex items-center justify-center"
                  placeholder="Venue Name"
                />
              </label>
              <label
                htmlFor="mode"
                className="w-full flex flex-col justify-center gap-2"
              >
                <p>Mode</p>
                <Controller
                  name="mode"
                  control={control}
                  defaultValue="Hybrid"
                  render={({ field }) => (
                    <select
                      {...field}
                      className="bg-transparent focus:outline-none w-full focus:border-amber-500 focus:shadow-xs focus:shadow-white  border-amber-600 border px-4 py-2 rounded-lg flex items-center justify-center"
                    >
                      <option value="Hybrid">Hybrid</option>
                      <option value="Offline">Offline</option>
                      <option value="Online">Online</option>
                    </select>
                  )}
                />
              </label>
          </div>

          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              className="bg-gradient-to-br from-yellow-200 text-black via-orange-400 to-amber-500 px-4 py-2 text-md rounded-md "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Event;
