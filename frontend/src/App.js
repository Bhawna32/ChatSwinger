import {
  Container,
  //ToggleButtonGroup, ToggleButton
} from "@mui/material";
import { Outlet } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import "./App.css";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      {/* <ToggleButtonGroup
        color="success"
        size="large"
        // value={alignment}
        // exclusive
        // onChange={handleChange}
        // aria-label="Platform"
      >
        <ToggleButton value="web">Audio</ToggleButton>
        <ToggleButton value="android">Chat</ToggleButton>
        <ToggleButton value="ios">Video</ToggleButton>
      </ToggleButtonGroup>
      <br />
      <br />
      <br /> */}
      <Container>
        <Outlet />
        <Header />
        <AllRoutes />
      </Container>
    </div>
  );
}

export default App;
