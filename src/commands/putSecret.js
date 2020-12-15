import { putSecret } from "haven-secrets-core";
import prompts from "prompts";

const putSecretCli = async () => {
  (async () => {
    const response = await prompts([
      {
        type: "text",
        name: "projectName",
        message: "What's the project name?",
        validate: (projectName) =>
          /^\S+$/i.test(projectName)
            ? true
            : `Project name cannot contain white space`,
      },
      {
        type: "text",
        name: "environment",
        message:
          "Which environment would you like to add the secret to? (dev, stg, prod)",
        validate: (environment) =>
          /^(dev|stg|prod)$/i.test(environment)
            ? true
            : `Environment must be either dev, stg, or prod`,
      },
      {
        type: "text",
        name: "secretName",
        message: "What is the name of the secret?",
        validate: (secretName) =>
          /^\S+$/i.test(secretName)
            ? true
            : `Secret name cannot contain white space`,
      },
      {
        type: "text",
        name: "secretValue",
        message: "What is the value of the secret?",
        validate: (secretValue) =>
          /^\S+$/i.test(secretValue)
            ? true
            : `Secret value cannot contain white space`,
      },
    ]);

    putSecret(
      response.projectName,
      response.environment,
      response.secretName,
      response.secretValue
    );
  })();
};

export default putSecretCli;
