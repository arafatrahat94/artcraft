import React, { useEffect, useRef, useState } from "react";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";

const Rating2 = () => {
  const [ratings, setRatings] = useState([0]); // Initial rating set as an array
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const [userNotFound, setUserNotFoud] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userId, setUserId] = useState("");
  const check = () => {
    fetch(
      `https://artogram-server.vercel.app/RatingGetUser?email=${user?.email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "notFound") {
          setUserNotFoud(true);
        } else if (data) {
          setPreviousRating(data.ratingValue);
          setUserNotFoud(false);
          setUserId(data._id);
        }
      });
  };
  const [previousRating, setPreviousRating] = useState(0);

  useEffect(() => {
    axios.get("https://artogram-server.vercel.app/RatingValue").then((res) => {
      setRatings(res.data);
      setTotalUsers(res.data);
    });

    fetch(
      `https://artogram-server.vercel.app/RatingGetUser?email=${user?.email}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "notFound") {
          setUserNotFoud(true);
        } else if (data) {
          console.log(data);
          setUserId(data._id);
          setUserNotFoud(false);
        }
      });
  }, [user]);

  useEffect(() => {
    // Ensure ratings is not an empty array before calculating average
    const map = ratings.map((x) => x.ratingValue);
    const newDatas = [...map];

    if (ratings.length > 0) {
      const averageRating =
        newDatas.reduce((acc, curr) => acc + curr, 0) / ratings.length;
      setRating(averageRating.toFixed(1)); // Set the average rating with one decimal place
    }
  }, [ratings]);
  const reCalculation = () => {
    axios.get("https://artogram-server.vercel.app/RatingValue").then((res) => {
      setRatings(res.data);
      setTotalUsers(res.data);
    });
    const map = ratings.map((x) => x.ratingValue);
    const newDatas = [...map];

    if (ratings.length > 0) {
      const averageRating =
        newDatas.reduce((acc, curr) => acc + curr, 0) / ratings.length;
      setRating(averageRating.toFixed(1)); // Set the average rating with one decimal place
    }
  };
  const handleRatingChange = (value) => {
    // const updatedRatings = [...ratings, value];
    // setRatings(updatedRatings);

    if (userNotFound === true) {
      const newData = {
        userMail: user?.email,
        ratingValue: value,
      };
      axios
        .post(`https://artogram-server.vercel.app/RatingDo`, newData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          check();
        });
    }
    if (
      (value < previousRating || value > previousRating) &&
      userNotFound === false
    ) {
      const newData = {
        ratingValueN: value,
      };
      fetch(
        `https://artogram-server.vercel.app/RatingUpdate?email=${user?.email}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
          },
          body: JSON.stringify(newData),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          check();

          reCalculation();
        });
    }
    if (userNotFound === true) {
      const newData = {
        ratingValueN: value,
      };
      fetch(`https://artogram-server.vercel.app/RatingUpdate?email=${userId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
        body: JSON.stringify(newData),
      })
        .then((res) => res.json())
        .then((data) => {
          check();

          reCalculation();
        });
    }
    if (value === previousRating && userNotFound === false) {
      fetch(`https://artogram-server.vercel.app/RatingDelete/${userId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ArtAccess")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          check();

          reCalculation();
        });
    }
  };

  return (
    <div className="my-10 dark:bg-[#121212] dark:bg-opacity-50 w-[300px] lg:w-[390px] rounded-3xl mx-auto backdrop-blur-md border">
      <div className="mx-auto rounded-3xl py-10">
        <img
          className="w-20 mx-auto mb-5"
          src="https://i.ibb.co/Vv7DRWz/icons8-thumbs-60.png"
          alt="icons8-thumbs-60"
          border="0"
        />
        <h1 className="text-xl font-VarelaRound theme-text text-center font-bold dark:text-white">
          {isNaN(rating) ? 0 : rating}/5 rating <br /> based on{" "}
          {totalUsers.length} people rating
        </h1>
        {user?.email ? (
          <>
            <div className="w-[200px] mt-3 mx-auto">
              <Rating value={previousRating} onChange={handleRatingChange} />
            </div>
          </>
        ) : (
          <div className="w-[200px] mt-3 mx-auto">
            {" "}
            <Rating value={rating} readOnly />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rating2;
