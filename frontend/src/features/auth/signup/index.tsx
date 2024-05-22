import React, { useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  ContainerProps,
  styled,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { User, UserSchema, validateFullUser } from "../../../schema";
import { Errors } from "../common";
import { useSignupUserMutation } from "../../../store/auth.slice";
import { useFormFields } from "../../../helpers";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  maxWidth: "xs",
  marginTop: theme.spacing(40),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  elevation: 6,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100%",
}));

const noErrors: Record<keyof User, string[]> = Object.keys(
  UserSchema.shape
).reduce((acc, key) => {
  acc[key as keyof User] = [];
  return acc;
}, {} as Record<keyof User, string[]>);

const initalFields: Record<keyof User, string> = Object.keys(
  UserSchema.shape
).reduce((acc, key) => {
  acc[key as keyof User] = "";
  return acc;
}, {} as Record<keyof User, string>);

const SignupForm = () => {
  const [fieldErrors, setFieldErrors] =
    useState<Record<keyof User, string[]>>(noErrors);
  const { fields, handleFieldChange } = useFormFields<User>(initalFields);

  const [signUp, { isSuccess, isLoading, isError, error }] =
    useSignupUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { valid, errors } = validateFullUser(fields);
    setFieldErrors({ ...noErrors, ...errors });

    if (valid) {
      await signUp(fields);
    }
  };

  return (
    <StyledContainer component="main">
      <StyledPaper>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={fields.name}
            onChange={handleFieldChange}
            error={!!fieldErrors.name.length}
            helperText={<Errors errors={fieldErrors.name || []} />}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={fields.email}
            onChange={handleFieldChange}
            error={!!fieldErrors.email.length}
            helperText={<Errors errors={fieldErrors.email || []} />}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={fields.password}
            onChange={handleFieldChange}
            error={!!fieldErrors.password.length}
            helperText={<Errors errors={fieldErrors.password || []} />}
          />
          <StyledButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign Up"}
          </StyledButton>
          {isError && !isLoading && <Errors errors={[JSON.stringify(error)]} />}
        </form>
      </StyledPaper>
      {isSuccess && (
        <Dialog open={isSuccess} onClose={() => navigate("/login")}>
          <DialogTitle>Signup Successful</DialogTitle>
          <DialogActions>
            <Button onClick={() => navigate("/login")} color="primary">
              Go to Login
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </StyledContainer>
  );
};

export default SignupForm;
