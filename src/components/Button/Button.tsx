import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from "classnames";

function Button({ children, className, modificator = 'small', color = 'black' , ...props}: ButtonProps) {
	return (
		<button className={cn(styles['button'], className, {
			[styles['small']]: modificator === 'small',
			[styles['big']]: modificator === 'big',
			[styles['black']] : color === 'black',
			[styles['gray']] : color === 'gray',
			[styles['accent']]: color === 'accent',
		})}  {...props}>{children}</button>
	);
}

export default Button;