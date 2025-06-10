const fs = require("fs");
const { execSync } = require("child_process");
const semver = require("semver");

// Read current version from package.json
const package = JSON.parse(fs.readFileSync("package.json", "utf8"));
const currentVersion = package.version;

// Bump version
const newVersion = semver.inc(currentVersion, process.argv[2] || "patch");
package.version = newVersion;

// Write back to package.json
fs.writeFileSync("package.json", JSON.stringify(package, null, 2));

// Git commands
try {
  // Check if tag already exists
  const tagExists = execSync(`git tag -l v${newVersion}`).toString().trim();
  if (tagExists) {
    console.error(`Tag v${newVersion} already exists!`);
    process.exit(1);
  }

  execSync("git add package.json");
  execSync(`git commit -m "Release v${newVersion}"`);
  execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`);
  execSync("git push");
  execSync(`git push origin v${newVersion}`);
  console.log(`Released version ${newVersion}`);
} catch (error) {
  console.error("Error during release:", error);
  process.exit(1);
}
