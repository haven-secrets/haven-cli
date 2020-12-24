import { fetchHavenAccountInfo } from "haven-secrets-core";

const getHavenRole = () => {
  const info = fetchHavenAccountInfo();
  return info.role;
};

export default getHavenRole;
