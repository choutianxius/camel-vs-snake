import { glob } from "glob";
import { exec } from "child_process";

glob("./src/**/*.test.ts", { ignore: "node_modules/**" }).then(
  (fileRelativePaths) => {
    fileRelativePaths.forEach((f) => {
      exec(`tsx ${f}`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        if (stdout) {
          console.log(stdout);
        }
        if (stderr) {
          console.error(stderr);
        }
      });
    });
  }
);
