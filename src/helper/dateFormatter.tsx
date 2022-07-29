export const dateFormatter = (_date: any) => {
  if (!_date) return null;

  const tempDate = new Date(_date).toISOString().slice(0, -1);

  var date = new Date(tempDate);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
};

export const setDateValue = (_date: any) :string => {
  if (!_date) return '';

  const tempDate = new Date(_date).toISOString().slice(0, -1);

  var date = new Date(tempDate);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return year + "-" + month + "-" + day;
};

export const currentDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  return mm + "/" + dd + "/" + yyyy;
};
