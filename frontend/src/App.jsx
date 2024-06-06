import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProtectedRoute from "./private/ProtectedRoute";
import MainSection from "./components/MainSection";
import Trending from "./components/Movies/Trending";
import UpcomingMovies from "./components/Movies/UpcomingMovies";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeScreen />}>
            <Route path="" element={<MainSection />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/upcoming" element={<UpcomingMovies />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
