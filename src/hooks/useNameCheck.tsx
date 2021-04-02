import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Routes from "../routes/routes";
import { RootState } from "../store/store";

const useCheckIfName = () => {
  const history = useHistory();
  const name = useSelector((state: RootState) => state.userName.value);

  useEffect(() => {
    if (!name) {
      history.push(Routes.INITIAL_PAGE);
    }
  }, [history, name]);
};

export default useCheckIfName;
