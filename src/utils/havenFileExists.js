import fs from "fs";
import { homedir } from "os";

const havenFileExists = () => {
  const havenDir = `${homedir()}/.haven`;
  const hiddenAccountFilePath = `${havenDir}/havenAccountInfo.json`;
  return fs.existsSync(hiddenAccountFilePath);
};

export default havenFileExists;
