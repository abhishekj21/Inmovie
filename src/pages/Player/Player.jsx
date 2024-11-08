import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YmQ3NGM4MmFiMGUyNTU4YWE5NzkyMzgwYWVmNWEyZCIsIm5iZiI6MTczMDg4MjcyOC42NzM4MTU1LCJzdWIiOiI2NzJiMjViYTJmNjRlYmU4YzhlNGUwODEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1qMkyXSXQeQNkkowk74K4qexl-v0dAs8EKb62o6gw9Y",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]);
        } else {
          console.error("No video results found for this movie.");
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        onClick={() => {
          navigate(-1);
        }}
      />
      {apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={"https://www.youtube.com/embed/" + apiData.key}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p>No trailer available</p>
      )}
      <div className="player-info">
        <p>{apiData.published_at}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
