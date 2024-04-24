import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function App({ loading }) {
  // let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  return (
    <div className="sweet-loading">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <input value={color} onChange={(input) => setColor(input.target.value)} placeholder="Color of the loader" /> */}

      <ClipLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    // <div className="d-flex justify-content-around align-content-center w-100 h-100 align-items-center">
    //   <GridLoader
    //     color={'#111e6c'}
    //     loading={loading}
    //     // css={override}
    //     size={15}
    //     speedMultiplier={1}
    //   />
    // </div>
  )
}

export default App
