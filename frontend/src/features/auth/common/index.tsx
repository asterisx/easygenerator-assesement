import { Alert } from "@mui/material";

export const Errors = ({ errors }: { errors: string[] }) => (
  <>
    {errors.map((error, index) => (
      <Alert component="p" key={index} severity="error">
        {error}
      </Alert>
    ))}
  </>
);
