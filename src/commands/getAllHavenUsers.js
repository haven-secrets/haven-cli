import { getAllHavenUsers } from "haven-secrets-core";

const getAllHavenUsersCli = async () => {
  const havenUsers = await getAllHavenUsers();
  havenUsers.forEach((userObj) => {
    console.log(userObj.UserName);
  });
};

export default getAllHavenUsersCli;
