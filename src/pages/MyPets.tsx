import {
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { myPetsReported } from "../queries";

// const petsData = [
//   {
//     id: 1,
//     petname: "Bobinola",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, hic, magnam pariatur iure vero culpa itaque officia illum recusandae obcaecati laborum! Facere quod, porro similique voluptates dolorum modi a incidunt!",
//     locationlat: -38.95085155006793,
//     locationlng: -68.05912034243897,
//     location: "Santa Cruz",
//     petPhoto: "randomimg.com/123",
//   },
//   {
//     id: 2,
//     petname: "Pituso",
//     description:
//       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore fugit consequatur quas eligendi ipsa vero quis esse praesentium similique aliquam perferendis obcaecati voluptate molestias unde itaque, earum nostrum enim magnam!",
//     locationlat: -38.95085155006654,
//     locationlng: -68.05912034243897,
//     location: "Estacion San Jose",
//     petPhoto: "randomimg.com/123",
//   },
//   {
//     id: 3,
//     petname: "Cuco",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo accusamus molestiae exercitationem corrupti natus? Earum facere repudiandae necessitatibus mollitia laborum aliquid, nemo tempora accusantium dolores, eveniet iste nam totam hic.",
//     locationlat: -38.95085155006792,
//     locationlng: -68.05912034243881,
//     location: "YPF de Godoy",
//     petPhoto: "randomimg.com/123",
//   },
// ];

const MyPets = () => {
  const colorName = useColorModeValue("#31ac3d", "#63c96c");
  const [loading, setLoading] = useState<boolean>(false);
  const [myPetsData, setMyPets] = useState<Array<any> | null>(null);
  const [dataExist, setDataExist] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const myPetsDBFN = async () => {
      const MyPetsDB: any = await myPetsReported();
      // console.log(MyPetsDB);
      if (MyPetsDB.message) {
        setDataExist(false);
        return;
      }

      setMyPets(MyPetsDB);
      if (MyPetsDB.length === 0) {
        setDataExist(false);
      }
      setLoading(false);
    };
    myPetsDBFN();
  }, []);

  return (
    <Stack w="100%" align="center">
      <Stack p={10} spacing={8} w={["350px", "550px", "800px", "1024px"]}>
        <Heading w="100%">Mascotas reportadas</Heading>

        {loading && (
          <Stack align="center" justify="center">
            <Spinner size="xl" />
          </Stack>
        )}

        {!dataExist && (
          <Text fontSize={20}>Aún no se te pierde ninguna mascota</Text>
        )}

        <SimpleGrid
          minChildWidth="200px"
          gap={4}
          w="100%"
          alignItems="center"
          justifyItems="center"
        >
          {myPetsData?.map((el) => (
            <Stack
              w="200px"
              maxH="310px"
              minH="280px"
              align="center"
              key={el.id}
              borderRadius={6}
              boxShadow="dark-lg"
              textOverflow="ellipsis"
              overflow="hidden"
            >
                <Image
                  w="100%"
                  h='150px'
                  src={el.petPhoto}
                  borderTopRadius={6}
                  objectFit="contain"
                />

              <Stack
                align="center"
                px={3}
                pb={2}
                textOverflow="ellipsis"
                overflow="hidden"
                w="100%"
              >
                <Heading
                  color={colorName}
                  noOfLines={1}
                  fontSize="18px"
                  fontWeight="700"
                  textOverflow="ellipsis"
                  textAlign="center"
                  w="100%"
                >
                  {el.petname}
                </Heading>
                <Heading
                  noOfLines={1}
                  fontSize="16px"
                  fontWeight="500"
                  textOverflow="ellipsis"
                >
                  {el.description}
                </Heading>
                <Heading
                  noOfLines={1}
                  fontSize="16px"
                  fontWeight="500"
                  flexDirection="row"
                  textOverflow="ellipsis"
                >
                  📍 {el.location}
                </Heading>
                <Link to={`/editpet/${el.objectID}`}>
                  <Text
                    fontWeight="bold"
                    cursor="pointer"
                    transition="all .2s"
                    color="#ff9358"
                    textOverflow="ellipsis"
                    _hover={{ color: "tomato" }}
                  >
                    EDITAR
                  </Text>
                </Link>
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Stack>
  );
};

export default MyPets;
