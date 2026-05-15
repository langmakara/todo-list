import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Grid, GridItem, Heading, Input, InputGroup, InputLeftElement, Select, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { IoSearchCircleOutline } from "react-icons/io5";

const TodoList = () => {
  return (
    <Box mt={5}>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {/* Left: 1 column */}
        <GridItem colSpan={1}>
          <Box>
            <Card maxW="md" rounded={20} shadow="2xl" h="50vh">
              <CardHeader p={2} mt={2} mx={2}>
                <Heading fontSize="md" fontWeight="bold">
                  <PlusSquareIcon color="purple" /> Quick Add Task
                </Heading>
              </CardHeader>
              <CardBody p={2} px={5} my={2}>
                <VStack>
                  <Box w="100%">
                    <FormControl>
                      <FormLabel fontSize="sm">Task Description</FormLabel>
                      <Input type="text" placeholder="Task Description" />
                    </FormControl>
                  </Box>
                  <Box w="100%" mt={4}>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box w="100%">
                        <FormControl>
                          <FormLabel fontSize="sm">Category</FormLabel>
                          <Select>
                            <option value="Personal">Personal</option>
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </Select>
                        </FormControl>
                      </Box>
                      <Box w="100%">
                        <FormControl>
                          <FormLabel fontSize="sm">Priority</FormLabel>
                          <Select>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </SimpleGrid>
                  </Box>
                  <Box w="100%" h="50px">
                    <FormControl>
                      <FormLabel fontSize="sm">Due Date (Optional)</FormLabel>
                      <Input type="text" placeholder="Due Date" />
                    </FormControl>
                  </Box>
                  <Box w="100%" mt={8}>
                    <Button w="100%" bg="#8F00F0" mt={2} rounded={15}>
                      <Text fontWeight="bold" color="white">
                        Add Todo
                      </Text>
                    </Button>
                  </Box>
                </VStack>
              </CardBody>
            </Card>
          </Box>
        </GridItem>

        {/* Right: 2 columns */}
        <GridItem colSpan={2}>
          <Box>
            <Card rounded={20}>
              <CardHeader>
                <Box p={4}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                    <GridItem colSpan={2}>
                      <InputGroup>
                        <InputLeftElement pointerEvents="none">
                          <IoSearchCircleOutline size="20px" color="gray.300" />
                        </InputLeftElement>
                        <Input
                          //   isInvalid={searchLoading}
                          outline="2px solid blue"
                          placeholder="Search employee"
                          //   onChange={(e) => {
                          //     const value = e.target.value;
                          //     if (!value) {
                          //       setSearchData(null);
                          //       return;
                          //     }
                          //     searchEmployee(value);
                          //   }}
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem colSpan={1}>
                      <Box w="100%" display="flex" justifyContent="space-between" bg="gray.100" rounded={10}>
                        {['All', 'Active', 'Completed'].map((status) => {
                          return (
                            <Button key={status} fontSize="xs" p={1} bg="gray.100" fontWeight="bold">
                              {status}
                            </Button>
                          );
                        })}
                      </Box>
                    </GridItem>
                  </Grid>
                </Box>
              </CardHeader>
              <CardBody>
                <Text>All Todo List</Text>
              </CardBody>
              <CardFooter>
                <Text>All Todo List</Text>
              </CardFooter>
            </Card>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default TodoList;
