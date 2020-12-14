import { getSecret } from "haven-secrets-core";
import prompts from "prompts";

const getSecretCli = async () => {
  (async () => {
    const response = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "What's the project name?",
        validate: (projectName) =>
          /^\S+$/i.test(projectName)
            ? true
            : `Project Name Cannot Contain White Space`,
      },
      {
        type: "text",
        name: "environment",
        message: "Which environment would you like to access? (dev, stg, prod)",
        validate: (environment) =>
          /^(dev|stg|prod)$/i.test(environment)
            ? true
            : `Environment Must Be Either Dev, Stg, Or Prod`,
      },
      {
        type: "text",
        name: "secretName",
        message: "What is the name of the secret?",
        validate: (secretName) =>
          /^\S+$/i.test(secretName)
            ? true
            : `Project Name Cannot Contain White Space`,
      },
      {
        type: "text",
        name: "version",
        message: "What is the version? (Leave blank for latest version)",
      },
    ]);

    getSecret(
      response.projectName,
      response.environment,
      response.secretName,
      response.version
    );
  })();
};

export default getSecretCli;
