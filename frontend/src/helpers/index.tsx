import { ReactElement, ReactPortal } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logoutUser } from "../store/auth.slice";
import { RootState } from "../store";

export const useIsUserAuthenticated = () => {
  const isAuthenticated = useSelector(
    ({ user }: RootState) => user.isAuthenticated
  );
  return isAuthenticated;
};

type RenderableReactNode = ReactElement | ReactPortal | null;

export const AuthGuard = ({
  children,
}: {
  children: RenderableReactNode;
}): RenderableReactNode => {
  const isAuthenticated = useIsUserAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  return () => dispatch(logoutUser());
};

export const useFormFields = <T extends Record<string, string>>(
  initialState: T
) => {
  const [fields, setFields] = useState<T>(initialState);

  const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  return {
    fields,
    handleFieldChange,
  };
};
