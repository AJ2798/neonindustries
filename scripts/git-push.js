import { execSync } from "child_process";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function run(command) {
  execSync(command, {
    stdio: "inherit",
    shell: true,
  });
}

rl.question("Commit message: ", (message) => {
  try {
    run("git status");
    run("git add .");

    if (message.trim()) {
      run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
    } else {
      console.log("No commit message entered. Stopping.");
      rl.close();
      return;
    }

    run("git pull --rebase origin main");
    run("git push origin main");

    console.log("\nGit push completed successfully.");
  } catch (error) {
    console.error("\nGit command failed.");
  } finally {
    rl.close();
  }
});