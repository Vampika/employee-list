import { forwardRef } from 'react';
import styles from './Input.module.css';
import cn from 'classnames';
import { InputProps } from './Input.props';

const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ isValid = true, className, ...props}, ref){
	return (
		<div className={styles['input-wrapper']}>
		<input ref={ref} className={cn(styles['input'], className, {
			[styles['invalid']]: !isValid
		})} {...props} />
		<span>Ошибка</span>
		</div>
	);
});

export default Input;