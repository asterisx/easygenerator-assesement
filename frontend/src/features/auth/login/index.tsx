import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Container,
  ContainerProps,
  styled,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateEmailPassword } from "../../../schema";
import { Errors } from "../common";
import { useLoginUserMutation } from "../../../store/auth.slice";
import { useFormFields } from "../../../helpers";

const StyledContainer = styled(Container)<ContainerProps>(({ theme }) => ({
  marginTop: theme.spacing(25),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
const noErrors = {
  email: [],
  password: [],
};
const initialFields = { email: "", password: "" };

const LoginForm = () => {
  const { fields, handleFieldChange } = useFormFields(initialFields);
  const [fieldErrors, setFieldErrors] = useState<{
    email: string[];
    password: string[];
  }>(noErrors);

  const [login, { isSuccess, isLoading, isError, error }] =
    useLoginUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { valid, errors } = validateEmailPassword(fields);
    setFieldErrors({ ...noErrors, ...errors });
    if (valid) {
      await login(fields);
    }
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={fields.email}
            onChange={handleFieldChange}
            error={!!fieldErrors.email.length}
            helperText={
              fieldErrors.email && <Errors errors={fieldErrors.email} />
            }
            disabled={isLoading}
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
            helperText={
              fieldErrors.password && <Errors errors={fieldErrors.password} />
            }
            disabled={isLoading}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Sign In"}
          </StyledButton>
          {isError && !isLoading && <Errors errors={[JSON.stringify(error)]} />}
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default LoginForm;
