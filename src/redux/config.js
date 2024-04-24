const config = {
  changemaker: process.env.REACT_APP_URL || "http://localhost:8000/api/",
};

const url = config.testUrl;

export { url, config };
