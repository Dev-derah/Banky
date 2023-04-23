function formatDate(date) {
    const formattedDate = new Date(date)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("-");
return formattedDate
    
}

function formatTime(date) {
  const formattedTime = new Date(date).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  );
  return formattedTime;
}

export{
    formatDate,
    formatTime
}