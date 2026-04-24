const formatDate = (unixTime) => {
  //değer yoksa null dön
  if (!unixTime || unixTime === 0) return null;

  //saniye formatından veriyi milisaniye formatına çevir
  const formatted = new Date(unixTime * 1000);

  return formatted.toLocaleTimeString("tr", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default formatDate;
