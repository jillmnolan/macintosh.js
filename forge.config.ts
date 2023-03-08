import { join, resolve } from 'path';
import { existsSync } from 'fs';
import { version } from './package.json';

if (process.env['WINDOWS_CODESIGN_FILE']) {
  const certPath = join(__dirname, 'win-certificate.pfx');
  const certExists = existsSync(certPath);

  if (certExists) {
    process.env['WINDOWS_CODESIGN_FILE'] = certPath;
  }
}

export const packagerConfig = {
  asar: false,
  icon: resolve(__dirname, 'assets', 'icon'),
  appBundleId: 'com.felixrieseberg.macintoshjs',
  appCategoryType: 'public.app-category.developer-tools',
  win32metadata: {
    CompanyName: 'Felix Rieseberg',
    OriginalFilename: 'macintoshjs'
  },
  osxSign: {
    identity: 'Developer ID Application: Felix Rieseberg (LT94ZKYDCJ)',
    'hardened-runtime': true,
    'gatekeeper-assess': false,
    'entitlements': 'assets/entitlements.plist',
    'entitlements-inherit': 'assets/entitlements.plist',
    'signature-flags': 'library'
  },
  osxNotarize: {
    appBundleId: 'com.felixrieseberg.macintoshjs',
    appleId: process.env['APPLE_ID'],
    appleIdPassword: process.env['APPLE_ID_PASSWORD'],
    ascProvider: 'LT94ZKYDCJ'
  },
  ignore: [
    /\/github(\/?)/,
    /\/assets(\/?)/,
    /\/docs(\/?)/,
    /\/tools(\/?)/,
    /\/src\/basilisk\/user_files(\/?)/,
    /package-lock\.json/,
    /README\.md/,
    /CREDITS\.md/,
    /issue_template\.md/,
    /HELP\.md/,
    /win-certificate\.pfx/,
    /user_image_.*/
  ]
};
export const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    platforms: ['win32'],
    config: (arch) => {
      return {
        name: 'macintosh.js',
        authors: 'Felix Rieseberg',
        exe: 'macintosh.js.exe',
        noMsi: true,
        remoteReleases: '',
        setupExe: `macintoshjs-${version}-setup-${arch}.exe`,
        setupIcon: resolve(__dirname, 'assets', 'icon.ico'),
        certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
        certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
        loadingGif: './assets/loadingGif.gif',
      };
    }
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin', 'win32']
  },
  {
    name: '@electron-forge/maker-deb',
    platforms: ['linux'],
    options: {
      maintainer: 'Felix Rieseberg',
      homepage: 'https://github.com/felixrieseberg/macintosh.js',
      categories: [
        'Education',
      ],
      icon: resolve(__dirname, 'assets', 'icon.png')
    }
  },
  {
    name: '@electron-forge/maker-rpm',
    platforms: ['linux']
  }
];
export const publishers = [
  {
    name: '@electron-forge/publisher-github',
    config: {
      repository: {
        owner: 'felixrieseberg',
        name: 'macintosh.js'
      },
      draft: true,
      prerelease: true
    }
  }
];
