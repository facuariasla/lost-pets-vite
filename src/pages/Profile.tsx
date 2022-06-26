import {
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Flex,
  Input,
  Stack,
  Image,
  Text,
  Heading,
  Spinner,
  FormLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiEditAlt, BiCheck, BiX } from "react-icons/bi";
import ProfileEditAlert from "../components/ProfileEditAlert";
import { myProfile } from "../queries";

interface UserData {
  email: string;
  firstname: string;
  id: number;
  profilePic?: string;
  createdAt?: string;
  updatedAt?: string;
}

// CustomControlsExample()
function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [username, setUsername] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loading2, setLoading2] = useState<boolean>(false);

  useEffect(() => {
    const profileInfoDB = async () => {
      setLoading(true);
      const infoDB = await myProfile();

      setUserData(infoDB);
      console.log(infoDB);
      setUsername(infoDB.firstname);
      setUserEmail(infoDB.email);
      let avatarUSER = `https://ui-avatars.com/api/?name=${infoDB.firstname}&background=FF6868&color=fff&size=150`;

      setUserAvatar(avatarUSER);
      setLoading(false);
    };
    profileInfoDB();
  }, []);

  const handleProfile = () => {};

  return (
    <Stack p={6} spacing={6} align="center">
      <Heading>Mi Perfil</Heading>
      {loading && (
        <Stack align="center" justify="center">
          <Spinner size="xl" />
        </Stack>
      )}

      {userData && (
        <Stack align="center" spacing={6}>
          <Image
            boxSize="130px"
            alt="profile-pic"
            borderRadius="full"
            border="4px #FF6868 solid"
            src={userAvatar}
            objectFit="cover"
          />

          <form action="" onSubmit={handleProfile}>
            <Stack w={["auto", "300px", "400px"]} spacing={4}>
              <Stack>
                <FormLabel htmlFor="firstname" pb={0} m={0}>
                  Nombre
                </FormLabel>
                <Input
                  w="100%"
                  type="text"
                  id="firstname"
                  name="firstname"
                  isRequired
                  maxLength={40}
                  value={userData?.firstname}
                  variant="filled"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      firstname: e.target.value,
                    })
                  }
                />
              </Stack>
              <Stack>
                <FormLabel htmlFor="email" pb={0} m={0}>
                  Email
                </FormLabel>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  isRequired
                  maxLength={40}
                  value={userData?.email}
                  variant="filled"
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                />
              </Stack>

              {loading2 && (
                <Stack align="center" justify="center">
                  <Spinner size="xl" />
                </Stack>
              )}

              {!loading2 && (
                <Stack>
                  <ProfileEditAlert
                    userData={userData}
                    setLoading2={setLoading2}
                  />
                </Stack>
              )}
            </Stack>
          </form>

          {/*  LINKEAR */}
          {/* <Text
            fontWeight="bold"
            cursor="pointer"
            transition="all .2s"
            _hover={{ color: "tomato" }}
          >
            CAMBIAR PASSWORD
          </Text> */}
        </Stack>
      )}
    </Stack>
  );
}

export default Profile;
