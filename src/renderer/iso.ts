import { existsSync, promises } from "fs";
import { join } from "path";
import { runPowerShell } from "./powershell";

async function createIsoWindows(options) {
  const { source } = options;
  const ps1Path = join(__dirname, `../script/iso.ps1`);
  const target = join(__dirname, "../basilisk/test.iso");

  if (!existsSync(ps1Path)) {
    throw new Error(`createIsoWindows: Could not find ${ps1Path}`);
  }

  if (existsSync(target)) {
    console.warn(`createIsoWindows: Target file exists, removing`);
    await promises.unlink(target);
  }

  const fn = `. ${join(__dirname, `../script/iso.ps1`)}`;
  const cmd = `${fn}; $s = "${source}"; get-childitem "$s" | New-ISOFile -Media CDROM -path ${target}`;

  await runPowerShell(cmd);
}

export default {
  createIsoWindows,
};

async function main() {
  const source = `C:\\Users\\felix\\Desktop\\test`;
  await createIsoWindows({ source }).catch(console.log);
}

main();
