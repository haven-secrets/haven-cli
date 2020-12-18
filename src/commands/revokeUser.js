import { revokeUser, getAllHavenUsers } from "haven-secrets-core";
import prompts from "prompts";

const revokeUserCli = async () => {
  (async () => {
    const users = await getAllHavenUsers();
    const usernames = [];
    const havenUser = (i) => {
      return (
        users[i].UserName !== "HavenSecretsAdmin" &&
        !users[i].UserName.startsWith("HavenSecretsTemporary")
      )
    }

    for (let i = 0; i < users.length; i++) {
      if (havenUser(i)) {
        usernames.push(users[i].UserName);
      }
    }
    const response = await prompts({
      type: "select",
      name: "userName",
      message: "Which user would you like to revoke?",
      choices: usernames,
    });
    await revokeUser(usernames[response.userName]);

  })();
};

export default revokeUserCli;
