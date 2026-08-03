import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, "..");
const OUTPUT_FILE = path.join(ROOT, "docs", "folder-structure.md");

/**
 * Directories and files to ignore
 */
const IGNORE = [
	"node_modules",
	".git",
	".next",
	"dist",
	"build",
	"coverage",
	".env",
	".cache",
	".vscode",
	".idea",
	"*.log",
	"package-lock.json",
	"yarn.lock",
	"pnpm-lock.yaml",
	".DS_Store",
	"*.test.js",
	"*.spec.js",
	"*.test.ts",
	"*.spec.ts",
	"*.map",
	"*.min.js",
	"*.min.css",

	"trash",
	"endpoint_tests",
	"prompt",
	"docs",
];

/**
 * Directories to show full contents (not just folder)
 */
const SHOW_FILES = [
	"client/src/app",
	"client/src/pages",
	"client/src/components",
	"server/src/modules",
	"server/src/shared",
];

function shouldIgnore(filePath) {
	const parts = filePath.split(path.sep);

	/**
	 * Check if any part matches ignore patterns
	 */
	return parts.some((part) => {
		return IGNORE.some((pattern) => {
			if (pattern.includes("*")) {
				const regex = new RegExp(pattern.replace("*", ".*"));
				return regex.test(part);
			}
			return part === pattern;
		});
	});
}

function shouldShowFiles(dirPath) {
	return SHOW_FILES.some((showPath) => dirPath.includes(showPath));
}

function generateTree(dir, prefix = "", isLast = true, output = []) {
	const items = fs
		.readdirSync(dir)
		.filter((item) => !shouldIgnore(path.join(dir, item)))
		.sort((a, b) => {
			const aIsDir = fs.statSync(path.join(dir, a)).isDirectory();
			const bIsDir = fs.statSync(path.join(dir, b)).isDirectory();
			if (aIsDir && !bIsDir) return -1;
			if (!aIsDir && bIsDir) return 1;
			return a.localeCompare(b);
		});

	items.forEach((item, index) => {
		const fullPath = path.join(dir, item);
		const isDir = fs.statSync(fullPath).isDirectory();
		const isLastItem = index === items.length - 1;
		const connector = isLastItem ? "└── " : "├── ";

		output.push(`${prefix}${connector}${item}${isDir ? "/" : ""}`);

		if (isDir) {
			const newPrefix = prefix + (isLastItem ? "    " : "│   ");

			/**
			 * Only show files if this is a directory we care about
			 */
			const showFiles = shouldShowFiles(fullPath);
			generateTree(fullPath, newPrefix, isLastItem, output, showFiles);
		}
	});

	return output;
}

/**
 * Generate markdown
 */
function generateMarkdown(tree) {
	const header = `# TassiaQCA Folder Structure

Generated on: ${new Date().toISOString().split("T")[0]}

\`\`\`bash
${tree.join("\n")}
\`\`\`
`;

	return header;
}

/**
 * Main execution
 */
const tree = generateTree(ROOT);
const markdown = generateMarkdown(tree);

/**
 * Ensure docs directory exists
 */
const docsDir = path.join(ROOT, "docs");
if (!fs.existsSync(docsDir)) {
	fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, markdown);
console.log(`✅ Folder structure generated at ${OUTPUT_FILE}`);
