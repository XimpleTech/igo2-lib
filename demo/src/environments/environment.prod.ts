interface Environment {
  production: boolean;
  igo: any;
}

export const environment: Environment = {
  production: true,
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
        enabled: true
      },
      icherche: {
        url: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode',
        enabled: false
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
