import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, Heading, Input, Link, SimpleGrid, StackDivider, Text, useToast, VStack } from "@chakra-ui/react";
import { useLogin } from "../hooks/user";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../util/secret";
import { useState } from "react";


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const { mutateAsync: loginMutateAsync, isLoading: loginIsLoading } = useLogin({
        config: {
            onSuccess: (data) => {
                setCookie("userToken", data.accessToken);
                toast({ title: "Login success", status: "success", duration: 5000, isClosable: true });
                setTimeout(() => {
                    navigate("/Home");
                }, 3000);
                console.log(data);
            },
            onError: (error) => {
                toast({ title: "Login failed", description: error.message, status: "error", duration: 5000, isClosable: true });
            },
        },
    });
    const handleLogin = () => {
        loginMutateAsync({ username, password });
    };

  return (
    <Box>
      <SimpleGrid columns={1} align="center" justifyItems="center" h="100vh">
        <Flex align="center" justifyItems="center">
          <Card maxW="md" w="600px" rounded={30} shadow="2xl">
            <CardHeader>
              <VStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch">
                <Heading size="md">Sign in to TaskFlow</Heading>
              </VStack>
            </CardHeader>
            <CardBody>
              <VStack>
                <SimpleGrid columns={2} w={400}>
                  <Flex justify="flex-start">
                    <Text as="b">Username</Text>
                  </Flex>
                  <Box></Box>
                </SimpleGrid>
                <Input type="email" placeholder="example@gmail.com" size="md" width="400px" value={username} onChange={(e) => setUsername(e.target.value)} />
                <SimpleGrid columns={2} mt={2} w={400}>
                  <Box>
                    <Flex justify="flex-start">
                      <Text as="b">Password</Text>
                    </Flex>
                  </Box>
                  <Box>
                    <Flex justify="flex-end">
                      <Link color="blue.500" href="#">
                        Forgot your password?
                      </Link>
                    </Flex>
                  </Box>
                </SimpleGrid>
                <Input type="password" placeholder="......." size="md" width="400px" value={password} onChange={(e) => setPassword(e.target.value)} />
                <SimpleGrid columns={1} w={400}>
                  <Flex justify="flex-start">
                    <Checkbox>Remember my state for 30 days</Checkbox>
                  </Flex>
                </SimpleGrid>
                <Button width="400px" bg="#8F00F0" mt={2} isLoading={loginIsLoading} onClick={handleLogin}>
                  <Text fontWeight="bold" color="white">
                    Login
                  </Text>
                  <ArrowForwardIcon color="white" />
                </Button>
              </VStack>
            </CardBody>
            <CardFooter
              justify="space-between"
              flexWrap="wrap"
              sx={{
                "& > button": {
                  minW: "136px",
                },
              }}
            >
              <Flex>
                <Text>
                  Don't have an account?{" "}
                  <Link color="teal.500" href="#">
                    Sign Up
                  </Link>
                </Text>
              </Flex>
            </CardFooter>
          </Card>
        </Flex>
      </SimpleGrid>
    </Box>
  );
};

export default Login;
