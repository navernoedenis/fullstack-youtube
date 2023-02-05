import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { onRegister } from "api/auth";
import { checkFileType } from "helpers/file";
import { RegisterForm } from "types/forms";

import {
  AvatarButton,
  AvatarPreview,
  CloseButton,
  CloseButtonIcon,
  Form,
  FormButton,
  FormButtons,
  FormField,
  FormFields,
  Header,
  Heading,
  LoginAndRegisterCardContainer,
  Title,
} from "../styles";

const schema = zod.object({
  email: zod
    .string()
    .email()
    .transform((value) => value.toLowerCase()),
  password: zod.string().min(8).max(30),
  username: zod
    .string()
    .min(3)
    .transform((value) => value.toLowerCase()),
  bio: zod
    .union([
      zod.string().length(0, "String must contain exactly 10 characters"),
      zod.string().min(10),
    ])
    .optional(),
});

interface RegisterCardProps {
  onClose: () => void;
  onToggle: () => void;
}

function RegisterCard({ onClose, onToggle }: RegisterCardProps) {
  const { t } = useTranslation();
  const [image, setImage] = useState<File | null>(null);

  const loginAndRegsiterPrefix = "components.login-and-register";

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<RegisterForm>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterForm) => onRegister(data, image),
    onSuccess: () => {
      toast.success(t("toasts.successfully"));
      onToggle();
    },
  });

  return (
    <LoginAndRegisterCardContainer>
      <CloseButton onClick={onClose}>
        <CloseButtonIcon />
      </CloseButton>

      <AvatarPreview src={image ? URL.createObjectURL(image) : ""} />

      <Header>
        <Title variant="h1">{t(`${loginAndRegsiterPrefix}.register`)}</Title>
        <Heading variant="h5">{t(`${loginAndRegsiterPrefix}.heading`)}</Heading>
      </Header>
      <Form
        component="form"
        onSubmit={handleSubmit((data) => mutation.mutate(data))}
      >
        <FormFields spacing="16px">
          <FormField
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            label={t(`${loginAndRegsiterPrefix}.email`)}
          />

          <FormField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            label={t(`${loginAndRegsiterPrefix}.password`)}
            type="password"
          />

          <FormField
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            label={t(`${loginAndRegsiterPrefix}.username`)}
          />

          <AvatarButton component="label">
            {t(`${loginAndRegsiterPrefix}.select-avatar`)}
            <input
              type="file"
              onChange={(event) => {
                const { files } = event.target;
                if (!files?.length) return;
                const file = files[0];
                const isImageFile = checkFileType(file, "image");

                if (!isImageFile) {
                  toast.error(t("toasts.not-an-image-file"));
                  return;
                }

                setImage(file);
              }}
              accept="image/*"
              hidden
            />
          </AvatarButton>

          <FormField
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
            label={t(`${loginAndRegsiterPrefix}.bio`)}
            multiline
            rows={3}
          />
        </FormFields>

        <FormButtons>
          <FormButton type="button" onClick={onToggle}>
            {t(`${loginAndRegsiterPrefix}.login`)}
          </FormButton>

          <FormButton type="submit" disabled={!isValid}>
            {t(`${loginAndRegsiterPrefix}.register`)}
          </FormButton>
        </FormButtons>
      </Form>
    </LoginAndRegisterCardContainer>
  );
}

export default RegisterCard;
