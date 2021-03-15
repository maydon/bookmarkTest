import { Link } from 'react-router-dom';
import classNames from '../utils/classNames';
import classes from './scss/button.module.scss';

type ButtonProps = {
  variant?: 'link' | 'button';
  children?: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
};

const Button = ({ className, children, variant, to, onClick }: ButtonProps) => {
  return variant === 'link' && to ? (
    <Link onClick={onClick} to={to} className={classNames(classes.button, className)}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={classNames(classes.button, className)}>
      {children}
    </button>
  );
};

export default Button;
