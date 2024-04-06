import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function Active() {
  const [engage, set_engage] = useState([]);

  useEffect(() => {
    const getMetrics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://text-to-speech-uajn.onrender.com/v1/cup/metrix/${token}`
        );
        // set_met_res(response)
        set_engage(response.data.list_of_duration_of_each_session);
        console.log(response.data.engagement_factor); // Assuming the metrics are in the response data
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    getMetrics();
  }, []);
  const options_area = {
    chart: {
      type: "area",
    },
    series: [
      {
        name: "score",
        data: engage.map((factor) => factor.duration),
      },
    ],
    xaxis: {
      categories: engage.map((_, index) => index + 1),
    },
    stroke: {
      curve: "smooth",
      colors: ["#1A56DB"], // Line color
      width: 4, // Line width
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
  };
  return (
    <div className="w-full p-10 bg-gray-900 rounded-lg shadow">
      <h1 class="text-4xl font-extrabold text-white">
        Active Minute Usage
      </h1>
      <ReactApexChart
        options={options_area}
        series={options_area.series}
        type="area"
        height={350}
      />
    </div>
  );
}
