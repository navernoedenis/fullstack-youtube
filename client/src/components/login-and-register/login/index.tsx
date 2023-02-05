import React from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";

import { onLogin } from "api/auth";
import { LoginForm } from "types/forms";
import { useAuth } from "context";

import LocalStorageService from "services/local-storage";

import {
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
});

interface LoginCardProps {
  onClose: () => void;
  onToggle: () => void;
}

function LoginCard({ onClose, onToggle }: LoginCardProps) {
  const { setMe } = useAuth();
  const { t } = useTranslation();

  const loginAndRegsiterPrefix = "components.login-and-register";

  const mutation = useMutation(onLogin, {
    onSuccess: (payload) => {
      const { accessToken, user } = payload.data;
      toast.success(t("toasts.successfully"));
      LocalStorageService.set("accessToken", accessToken);
      setMe(user);
    },
  });

  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<LoginForm>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  return (
    <LoginAndRegisterCardContainer>
      <CloseButton onClick={onClose}>
        <CloseButtonIcon />
      </CloseButton>

      <Header>
        <Title variant="h1">{t(`${loginAndRegsiterPrefix}.sign-in`)}</Title>
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
        </FormFields>

        <FormButtons>
          <FormButton onClick={onToggle} type="button">
            {t(`${loginAndRegsiterPrefix}.create-account`)}
          </FormButton>
          <FormButton type="submit" disabled={!isValid}>
            {t(`${loginAndRegsiterPrefix}.sign-in`)}
          </FormButton>
        </FormButtons>
      </Form>
    </LoginAndRegisterCardContainer>
  );
}

export default LoginCard;
