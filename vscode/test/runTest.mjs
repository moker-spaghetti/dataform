import * as cp from 'child_process';
import * as path from 'path';
import {
  downloadAndUnzipVSCode,
  resolveCliArgsFromVSCodeExecutablePath,
  runTests
} from '@vscode/test-electron';

async function main() {
  try {
    const extensionDevelopmentPath = "/home/moker/Dataform/dataform/bazel-bin/vscode";
    const extensionTestsPath = path.resolve('/home/moker/Dataform/dataform/vscode/test/index.cjs');
    const vscodeExecutablePath = await downloadAndUnzipVSCode('1.91.0');
    const [cliPath, ...args] = resolveCliArgsFromVSCodeExecutablePath(vscodeExecutablePath);

    // Use cp.spawn / cp.exec for custom setup
    // cp.spawnSync(
    //   cliPath,
    //   args,
    //   {
    //     encoding: 'utf-8',
    //     stdio: 'inherit'
    //   }
    // );

    // Run the extension test
    await runTests({
      // Use the specified `code` executable
      vscodeExecutablePath,
      extensionDevelopmentPath,
      extensionTestsPath
    });
  } catch (err) {
    console.error(err);
    console.error('Failed to run tests');
    process.exit(1);
  }
}

main();
