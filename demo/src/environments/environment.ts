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
      tgos: {
        searchUrl: 'https://addr.tgos.nat.gov.tw/addrws/v30/QueryAddr.asmx/QueryAddr?',
        appid: '/QzQKigbHTH3npq28f7uYBQByumsYu38P1r3p3900HVserrxdpdMMA==',
        appkey: 'cGEErDNy5yNr14zbsE/4GSfiGP5i3PuZdLtXwLqpGib+nn9ElJXKdJiv8yUTp1tejsSSYzJ/PHvrhLQFOGKDbjvZmTTcIMHKPd7bsNCGzLj6Qa4FO2oQ9r4tN8S7qthT38YWxFpcHcveDJA/k204VGTxlPcRvVkr9Ruo2y174eyHPaR+bTSQYlLzv/o7dmqvOigtI/17he4tElDjf0WcNdN51krI1DV5iS7a8nhQVfBm5y8gZ8Mv6LSjv6bNYvAL15R4J0qFzirFxXtG3kmD80F9ax6oQ1L+vMVbwVahtr3KkaD9rNLoxtA14RV5yaoU',
        limit: 10,
        locateLimit: 15,
        zoomMaxOnSelect: 8,
        enabled: true
      },
      nominatim: {
        enabled: true
      },
      reseautq: {
        searchUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq',
        locateUrl: 'https://ws.mapserver.transports.gouv.qc.ca/swtq',
        limit: 5,
        locateLimit: 15,
        zoomMaxOnSelect: 8,
        enabled: false
      },
      icherche: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode',
        locateUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/xy',
        zoomMaxOnSelect: 10,
        enabled: true
      },
      datasource: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search',
        enabled: false
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
