const { execSync } = require("child_process");

// Set the maximum number of builds to keep
const MAX_BUILDS = 2;

// Function to get the list of builds
function getBuilds() {
  try {
    const output = execSync(
      "eas build:list --non-interactive --json"
    ).toString();
    return JSON.parse(output);
  } catch (error) {
    console.error("Error fetching builds:", error.message);
    process.exit(1);
  }
}

// Function to delete a build
function deleteBuild(buildId) {
  try {
    console.log(`Deleting build ID: ${buildId}`);
    execSync(`eas build:cancel --id ${buildId} --non-interactive`);
  } catch (error) {
    console.error("Error deleting build:", error.message);
  }
}

// Main function to manage builds
function manageBuilds() {
  const builds = getBuilds();
  const sortedBuilds = builds.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  if (sortedBuilds.length > MAX_BUILDS) {
    const buildsToDelete = sortedBuilds.slice(
      0,
      sortedBuilds.length - MAX_BUILDS
    );
    buildsToDelete.forEach(build => deleteBuild(build.id));
  } else {
    console.log(`No builds to delete. Total builds: ${sortedBuilds.length}`);
  }
}

// Execute the script
manageBuilds();
