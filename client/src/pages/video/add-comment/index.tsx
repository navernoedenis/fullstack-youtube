import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { useAuth } from "context/auth";
import { AddVideoCommentForm } from "types/forms";

import { addVideoComment } from "api/video";
import {
  AddCommentContainer,
  Avatar,
  Button,
  Buttons,
  Form,
  MessageField,
} from "./styles";

const schema = zod.object({
  message: zod.string().max(300),
});

interface AddCommentProps {
  videoId: string;
}

function AddComment({ videoId }: AddCommentProps) {
  const queryClient = useQueryClient();

  const [showButtons, setShowButtons] = useState(false);
  const { me } = useAuth();

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<AddVideoCommentForm>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const handleReset = () => {
    setShowButtons(false);
    reset();
  };

  const { mutate: addVideoCommentMutate } = useMutation({
    mutationFn: (form: AddVideoCommentForm) => addVideoComment(videoId, form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video", videoId] });
      handleReset();
    },
  });

  if (!me) {
    return null;
  }

  const message = watch("message");

  return (
    <AddCommentContainer>
      <Avatar src={me.profile.avatar || ""} />
      <Form
        component="form"
        onSubmit={handleSubmit((form) => addVideoCommentMutate(form))}
      >
        <MessageField
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
          multiline
          onFocus={() => setShowButtons(true)}
          placeholder="Add a comment..."
          variant="standard"
        />

        {showButtons && (
          <Buttons>
            <Button onClick={handleReset} type="button">
              Cancel
            </Button>
            <Button disabled={!message.trim() || !isValid} type="submit">
              Comment
            </Button>
          </Buttons>
        )}
      </Form>
    </AddCommentContainer>
  );
}

export default AddComment;
