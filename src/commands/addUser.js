import { addUser } from "haven-secrets-core";
import prompts from "prompts";
const message = `The user's temporary files are saved in a file called 'havenAccountInfo.json', located in your current directory.
Please send this to your developer through email and remove this file from your working directory.
Don't add this user to any groups until you have confirmed that they have successfully obtained their official credentials.`;

const addUserCli = async () => {
  (async () => {
    const response = await prompts(
      {
        type: "text",
        name: "userName",
        message: "What would you like this user named?",
        validate: (userName) =>
          /^\S+$/i.test(userName)
            ? true
            : `Username cannot contain white space`,
      });
    await addUser(response.userName);
    console.log(message);
  })();
};

export default addUserCli;
