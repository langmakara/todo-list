import { Box } from "@chakra-ui/react";
import Placement from "../components/Placement";
import TodoDashboard from "../components/TodoDashboard";


const Home = () => {
    return (
        <Box p={8}>
            <Placement />
            <TodoDashboard />
        </Box>
    );
};

export default Home;