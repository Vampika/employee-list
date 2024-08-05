import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	modificator?: 'big' | 'small';
	color?: 'gray' | 'black' | 'accent';
}