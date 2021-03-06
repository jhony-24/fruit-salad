import React from "react";
import BaseButton from "../../../components/atoms/Buttons/BaseButton";
import DividerContainer from "../../../components/atoms/Dividers/DividerContainer";
import useCreateNewGame from "../../../hooks/useCreateNewGame";
import useModalsController from "../../../hooks/useModalsController";

const CreateNewGame = () => {
  const { open } = useModalsController();
  const { createNewGame }  = useCreateNewGame();
  const onOpenModal = () => {
    createNewGame();
    open("createGame");
  };
  return (
    <DividerContainer m="90px auto 20px">
      <BaseButton onPress={onOpenModal} variant="secondary">
        Crear juego
      </BaseButton>
    </DividerContainer>
  );
};

export default CreateNewGame;
