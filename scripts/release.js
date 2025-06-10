const fs = require("fs");
const { execSync } = require("child_process");
const semver = require("semver");

// Read current version from package.json
const package = JSON.parse(fs.readFileSync("package.json", "utf8"));
const currentVersion = package.version;

// Bump version
const newVersion = semver.inc(currentVersion, "patch"); // or 'minor' or 'major'
package.version = newVersion;

// Write back to package.json
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));

// Git commands
try {
  execSync("git add package.json");
  execSync(`git commit -m "Release v${newVersion}"`);
  execSync(`git tag v${newVersion}`);
  execSync("git push && git push --tags");
  console.log(`Released version ${newVersion}`);
} catch (error) {
  console.error("Error during release:", error);
  process.exit(1);
}
