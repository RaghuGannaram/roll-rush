import styles from "./index.module.css";

export const getVersionInfo = () => {
	const version = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "0.0.0";
	const hash = typeof __COMMIT_HASH__ !== "undefined" ? __COMMIT_HASH__ : "dev";
	const buildId = typeof __BUILD_ID__ !== "undefined" ? __BUILD_ID__ : "000";

	return {
		version,
		hash,
		buildId,
	};
};

const AppVersion = ({ position = "left" }) => {
	const { version, hash, buildId } = getVersionInfo();

	const positionClass = position === "right" ? styles.bottomRight : styles.bottomLeft;

	return (
		<div className={`${styles.versionContainer} ${positionClass}`}>
			<span className={styles.versionLabel}>v{version}</span>

			<span className={styles.separator}>|</span>

			<span className={styles.meta}>{hash}</span>

			<span className={styles.separator}>|</span>

			<span className={styles.meta}>{buildId}</span>
		</div>
	);
};

export default AppVersion;
