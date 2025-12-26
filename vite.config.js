import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { execSync } from "child_process";
import packageJson from "./package.json";

export default defineConfig(() => {
	let commitHash = "dev";
	try {
		commitHash = execSync("git rev-parse --short HEAD").toString().trim();
	} catch (e) {
		console.warn("Git commit hash could not be retrieved.");
	}

	const buildId = Date.now().toString(36);

	return {
		plugins: [react()],
		define: {
			__APP_VERSION__: JSON.stringify(packageJson.version),
			__COMMIT_HASH__: JSON.stringify(commitHash),
			__BUILD_ID__: JSON.stringify(buildId),
		},
	};
});
