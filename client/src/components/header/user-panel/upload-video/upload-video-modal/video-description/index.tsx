import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { VideoDescriptionForm } from "types/forms";
import { Form, FormButton, FormButtons, FormField, FormFields } from "./styles";

const schema = zod.object({
  title: zod.string().min(5),
  description: zod
    .union([
      zod.string().length(0, "String must contain exactly 10 characters"),
      zod.string().min(10).max(200),
    ])
    .optional(),
});

interface VideoDescriptionProps {
  onFormSubmit: (data: VideoDescriptionForm) => void;
}

function VideoDescription({ onFormSubmit }: VideoDescriptionProps) {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    reset,
  } = useForm<VideoDescriptionForm>({
    resolver: zodResolver(schema),
    mode: "all",
  });

  return (
    <Form component="form" onSubmit={handleSubmit(onFormSubmit)}>
      <FormFields spacing="16px">
        <FormField
          {...register("title")}
          error={!!errors.title}
          helperText={errors.title?.message}
          label="Title"
        />
        <FormField
          {...register("description")}
          error={!!errors.description}
          helperText={errors.description?.message}
          label="Description"
          multiline
          rows={5}
        />
      </FormFields>
      <FormButtons>
        <FormButton onClick={() => reset()} type="button">
          Reset
        </FormButton>
        <FormButton type="submit" disabled={!isValid}>
          Upload
        </FormButton>
      </FormButtons>
    </Form>
  );
}

export default VideoDescription;
