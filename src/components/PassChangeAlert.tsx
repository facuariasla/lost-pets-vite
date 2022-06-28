import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { changePassword } from "../queries";

const PassChangeAlert = ({ setLoading2, dataChange }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const buttonGreenie = useColorModeValue("#97EA9F", "#508A55");
  const toast = useToast();

  const handlePass = async (e: any) => {
    e.preventDefault();
    onClose();
    setLoading2(true);

    let actualpass = dataChange.actualpass.trim();
    let newpass = dataChange.newpass.trim();
    let newpass2 = dataChange.newpass2.trim();
    console.log({
      actualpass,
      newpass,
      newpass2,
    });
    let restriction = null || undefined || "";

    if (
      actualpass === restriction ||
      newpass === restriction ||
      newpass2 === restriction
    ) {
      setLoading2(false);
      toast({
        title: "Completa el formulario",
        status: "error",
        description: "Rellena los campos vacios",
        duration: 3000,
        isClosable: true,
      });
      return
    } else if (dataChange.newpass !== dataChange.newpass2) {
      setLoading2(false);
      toast({
        title: "Las contraseñas deben coincidir",
        status: "error",
        description: "*Repetir contraseña nueva",
        duration: 3000,
        isClosable: true,
      });
      return;
    } 

    const changePassQuery = await changePassword({
      actualpass,
      newpass,
      newpass2,
    })

    if(changePassQuery.success){
      setLoading2(false);
      toast({
        title: "Tu contraseña ha sido cambiada",
        status: "success",
        description: "La sesión se cerrará",
        duration: 5000,
        isClosable: true,
      });
      console.log(changePassQuery)
      setInterval(() => {
        window.location.replace(`${window.location.origin}`);
        localStorage.removeItem("token_lostpet");
        localStorage.removeItem("user_lostpet");
      }, 3000);
    } else {
      setLoading2(false);
      toast({
        title: "La contraseña actual es incorrecta",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button bgColor={buttonGreenie} onClick={onOpen}>
        Confirmar
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cambiar contraseña
            </AlertDialogHeader>

            <AlertDialogBody>
              Tu contraseña se cambiará, y deberas volver a iniciar sesión
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button type="button" ref={cancelRef as any} onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="button"
                colorScheme="green"
                onClick={handlePass}
                ml={3}
              >
                Estoy seguro
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default PassChangeAlert;
