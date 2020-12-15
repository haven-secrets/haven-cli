import { fetchLogs } from "haven-secrets-core";

const fetchLogsCli = async () => {
  const logs = await fetchLogs();
  logs.forEach((logItem) => {
    for (const logItemProperty in logItem) {
      console.log(`${logItemProperty}: ${logItem[logItemProperty]}`);
    }

    console.log("-".repeat(80));
  });
};

export default fetchLogsCli;
