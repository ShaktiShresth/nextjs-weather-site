"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import Weather from "@/components/Weather";
import Spinner from "@/components/Spinner";
import AlertError from "@/components/AlertError";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = async (ev) => {
    ev.preventDefault();

    if (city === "") {
      setError("Please provide a city name to search for.");
      return;
    }

    setLoading(true);
    await axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
    setCity("");
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
      {/* Background Image */}
      <Image
        className="object-cover"
        src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        layout="fill"
        alt="background image"
      />

      {/* Search */}
      <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 sm:px-0 text-white z-10">
        <form
          onSubmit={fetchWeather}
          className="flex gap-4 justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
        >
          <div className="w-full">
            <input
              className="bg-transparent w-full border-none text-white text-2xl placeholder:text-white placeholder:opacity-60 focus:outline-none"
              type="text"
              placeholder="Search city..."
              onChange={(ev) => setCity(ev.target.value)}
              value={city}
            />
          </div>
          <button disabled={loading}>
            {loading ? <Spinner /> : <BsSearch size={20} />}
          </button>
        </form>
      </div>

      {/* Alert box */}
      {error && <AlertError message={error} setError={setError} />}

      {/* Weather details */}
      {weather.main && <Weather data={weather} />}
    </div>
  );
}
