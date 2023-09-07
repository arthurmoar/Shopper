const requestCSVFile = async ({ target }) => {
  const file = target.files[0];
  const fileUrl = URL.createObjectURL(file);
  const response = await fetch(fileUrl);
  const text = await response.text();
  const lines = text.split("\n");
  const _data = lines.map((line) => line.split(","));
  return _data;  
}

export default requestCSVFile;