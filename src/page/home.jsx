import { Box } from "@chakra-ui/react";
import TodoDashboard from "../components/TodoDashboard";

const Home = () => {
  return (
    <>
      <Box p={8}>
        <TodoDashboard />
      </Box>
    </>
  );
};

export default Home;
