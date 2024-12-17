import { useAppSelector, useAppDispatch } from "../store";
import { toggleNavbar } from "../store/navbarReducer";

export const useNavbar = () => {
  const opened = useAppSelector((state) => state.navbar.value);
  const dispatch = useAppDispatch();

  const toggle = () => {
    dispatch(toggleNavbar());
  };

  return {
    opened,
    toggle,
  };
};
