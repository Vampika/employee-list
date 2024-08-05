import styles from "./Error.module.css";

export function Error() {
	return (
		<div className={styles['error']}>
			<span>404</span>
			<p>Page not found</p>
		</div>
	);
}
