// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // Initialize Firebase
  firebase: {
    apiKey: "AIzaSyB-cPwCzRW5cwBdUHS00UGgq4DM0nwu7O8",
    authDomain: "dailyimpression-a2de1.firebaseapp.com",
    databaseURL: "https://dailyimpression-a2de1.firebaseio.com",
    projectId: "dailyimpression-a2de1",
    storageBucket: "dailyimpression-a2de1.appspot.com",
    messagingSenderId: "118778718970"
  }
};
