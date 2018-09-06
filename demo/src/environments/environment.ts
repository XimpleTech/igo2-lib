// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// import { IgoEnvironment } from '@ximple/igo2-core';

interface Environment {
  production: boolean;
  igo: any;
}

export const environment: Environment = {
  production: false,
  igo: {
    auth: {
      intern: {
        enabled: true
      }
    },
    language: {
      prefix: './locale/'
    },
    catalog: {
      sources: [
        {
          title: 'Gouvouvert',
          url: 'https://geoegl.msp.gouv.qc.ca/igo2/api/ws/igo_gouvouvert.fcgi'
        }
      ]
    },
    searchSources: {
      nominatim: {
        enabled: false
      },
      icherche: {
        url: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
      },
      datasource: {
        url: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
      },
      tgos: {
        url: 'https://addr.tgos.tw/addrws/v30/QueryAddr.asmx/QueryAddr?',
        appid: '/9PZSOga/YetRdV5KHCY1XhIG5gGS/OsjGPC3ZrdnVsaAW9HlEeErw==',
        appkey: 'cGEErDNy5yNr14zbsE/4GSfiGP5i3PuZwlsR5ASVWUusGuHdTAiJg5chYjOvjS3dT' +
        '/+AxjWh4SAqLnjPk5CztZfjheHzw4PQT8kokv5IabMs+qhUkbRGw' +
        '1+nl6cKO4lA5QwYo9od0EewQSHTIL9HmjFXwLDQ1yp3nMYbvckV0zMDUW1jTm8pYyVc8IKMJOyAHd8ODeI' +
        'wmuW9a+M6QAvhtkd7iPJdfgAqhCS5vrF3CoUadr7QgKluD2Z7' +
        'pg5zxao+oL90prUmGE+zITCV8sYsykVoj73VBsi7p+VSZtkkochCFllth9jGSs032295' +
        'yeqSewR+O0j/FbC3KFzp3aqsjoBGGjqtIoD1vDEStPXueTm7+P5cTERUZpH+bu7gyLTX'
      }
    }
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
