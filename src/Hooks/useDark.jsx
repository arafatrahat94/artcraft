import React, { useEffect, useState } from "react";

const useDark = () => {
  return localStorage.getItem("theme") !== "dark";
};

export default useDark;
