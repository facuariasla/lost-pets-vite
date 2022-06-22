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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiEditAlt, BiCheck, BiX } from "react-icons/bi";
import { myProfile } from "../queries";

// CustomControlsExample()
function Profile() {
  const [userData, setUserData] = useState<object | null>(null);
  const [username, setUsername] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [userAvatar, setUserAvatar] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const profileInfoDB = async () => {
      setLoading(true);
      const infoDB = await myProfile();

      setUserData(infoDB);
      setUsername(infoDB.firstname);
      setUserEmail(infoDB.email);
      let avatarUSER = `https://ui-avatars.com/api/?name=${infoDB.firstname}&background=FF6868&color=fff&size=150` 

      setUserAvatar(avatarUSER);
      setLoading(false);
    };
    profileInfoDB();
  }, []);






  /* Here's a custom control */
  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton
          aria-label="check"
          icon={<BiCheck />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="check"
          icon={<BiX />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton
          aria-label="edit"
          size="sm"
          icon={<BiEditAlt />}
          {...getEditButtonProps()}
        />
      </Flex>
    );
  }

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
          <Editable
            textAlign="center"
            // Aca va el nombre del user
            defaultValue={username}
            value={username}
            fontSize="2xl"
            isPreviewFocusable={false}
          >
            <EditablePreview />
            <Input as={EditableInput} />
            {/* <EditableControls /> */}
          </Editable>

          <Editable
            textAlign="center"
            // Aca va el nombre del user
            defaultValue={userEmail}
            value={userEmail}
            fontSize="2xl"
            isPreviewFocusable={false}
          >
            <EditablePreview />
            <Input as={EditableInput} />
            {/* <EditableControls /> */}
          </Editable>

          {/*  LINKEAR */}
          <Text
            fontWeight="bold"
            cursor="pointer"
            transition="all .2s"
            _hover={{ color: "tomato" }}
          >
            CAMBIAR PASSWORD
          </Text>
        </Stack>
      )}

    </Stack>
  );
}

export default Profile;
