const { default: axios } = require("axios");
const { useEffect, useState } = require("react");

function useAxios(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [url]);

  return data;
}

export default useAxios;
