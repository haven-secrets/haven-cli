import { spawn } from "child_process";
import { getAllSecrets, userSetup } from "haven-secrets-core";
import { existsSync } from "fs";
import havenFileExists from "../utils/havenFileExists.js";
import getHavenRole from "../utils/getHavenRole.js";

const run = async (_, projectName, environment, ...args) => {
  if (!havenFileExists()) {
    console.log(
      "You are missing a Haven file. Setup the Haven file before running!"
    );
    return undefined;
  }

  if (getHavenRole() === "TemporaryUser") {
    console.log(
      "You are using a temporary credential.You need to run userSetup!"
    );
    return undefined;
  }

  const [command, ...options] = args;
  const logRedaction = "<Haven found a secret here and redacted it>";

  const handleStdout = (data) => {
    let dataString = data.toString();
    secretValues.forEach((secretValue) => {
      dataString = dataString.replace(secretValue, logRedaction);
    });
    process.stdout.write(dataString);
  };

  const handleStderr = (data) => {
    let dataString = data.toString();
    secretValues.forEach((secretValue) => {
      dataString = dataString.replace(secretValue, logRedaction);
    });
    process.stderr.write(dataString);
  };

  const fetchedSecrets = await getAllSecrets(projectName, environment);

  const formattedSecrets = fetchedSecrets.reduce((acc, secret) => {
    return Object.assign(acc, {
      [secret.SecretName]: secret.SecretValue,
    });
  }, {});

  const secretValues = Object.values(formattedSecrets);

  const childProcess = spawn(command, options, {
    env: Object.assign({}, process.env, formattedSecrets),
  });

  childProcess.stdout.on("data", handleStdout);

  childProcess.stderr.on("data", handleStderr);

  childProcess.on("close", (code) =>
    console.log(`child process exited with code ${code}`)
  );
};

export default run;
