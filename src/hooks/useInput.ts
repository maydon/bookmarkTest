import { useReducer } from 'react';

interface InputState {
  value: string;
  error: string;
  touched: boolean;
}

enum InputActionTypes {
  ON_CHANGE = 'ON_CHANGE',
  SET_VAlUE = 'SET_VALUE',
  SET_ERROR = 'SET_ERROR',
  SET_TOUCHED = 'SET_TOUCHED',
}

type Actions =
  | { type: InputActionTypes.ON_CHANGE; value: string; error?: string }
  | { type: InputActionTypes.SET_VAlUE; value: string }
  | { type: InputActionTypes.SET_TOUCHED; touched: boolean }
  | { type: InputActionTypes.SET_ERROR; error: string };

const reducer = (state: InputState, action: Actions) => {
  switch (action.type) {
    case InputActionTypes.ON_CHANGE:
      return {
        ...state,
        value: action.value,
        error: action.error !== undefined ? action.error : state.error,
      };
    case InputActionTypes.SET_VAlUE:
      return { ...state, value: action.value };

    case InputActionTypes.SET_TOUCHED:
      return { ...state, touched: action.touched };

    case InputActionTypes.SET_ERROR:
      return { ...state, error: action.error };

    default:
      return state;
  }
};

const useInput = (
  initialValue: string,
  validate?: (value: string) => string,
): [
  InputState,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
  {
    setValue: (value: string) => void;
    setTouched: (touched: boolean) => void;
    setError: (error: string) => void;
  },
] => {
  const initialState = {
    value: initialValue,
    error: validate ? validate(initialValue) : '',
    touched: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    const action: Actions = { type: InputActionTypes.ON_CHANGE, value: e.target.value };
    if (validate) {
      action.error = validate(value);
    }

    dispatch(action);
  };

  const onBlur = () => {
    dispatch({ type: InputActionTypes.SET_TOUCHED, touched: true });
  };

  const setValue = (value: string) => {
    dispatch({ type: InputActionTypes.SET_VAlUE, value });
  };

  const setTouched = (touched: boolean) => {
    dispatch({ type: InputActionTypes.SET_TOUCHED, touched });
  };

  const setError = (error: string) => {
    dispatch({ type: InputActionTypes.SET_ERROR, error });
  };

  return [state, onChange, onBlur, { setValue, setTouched, setError }];
};

export default useInput;
