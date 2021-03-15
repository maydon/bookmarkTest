import classNames from '../utils/classNames';

import classes from './scss/textField.module.scss';

interface TextFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  error?: string;
  inputComponent?: React.ReactNode;
}

const TextField = ({ label, error, className, inputComponent, ...rest }: TextFieldProps) => {
  return (
    <div className={classNames(classes.container, className)}>
      <div className={classNames(classes.label, error && classes.error)}>
        {label}
        {error && (
          <>
            <span className={classes.separator}>-</span> <span className={classes.errorText}>{error}</span>
          </>
        )}
      </div>
      {inputComponent ? inputComponent : <input className={classes.input} {...rest} />}
    </div>
  );
};

export default TextField;
