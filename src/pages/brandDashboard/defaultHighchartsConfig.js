import { fromJS } from 'immutable';

export const brandActivityConfig = {
  exporting: {
    buttons: {
      contextButton: {
        align: 'right',
        x: 0,
        y: -100,
        verticalAlign: 'top'
      }
    }
  },
  chart: {
    spacingTop: 100,
    style: {
      fontFamily: 'Rubik-Regular, Verdana, sans-serif'
    }
  },
  // colors: [
  //   '#643dfa'
  //   '#f0b609'
  // ],
  credits: false,
  title: {
    text: null
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { // don't display the dummy year
      month: '%e. %b',
      year: '%b'
    },
    title: {
      text: 'Date'
    }
  },
  yAxis: [ {
    title: {
      text: 'Events'
    },
    min: 0
  }, {
    title: {
      text: 'Users'
    },
    min: 0,
    opposite: true
  } ],
  tooltip: {
    backgroundColor: '#ffffff',
    borderColor: '#ced6da',
    borderRadius: 2,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
    headerFormat: '<p style="font-size: 10px; color: #6d8791; margin-bottom: 9px; margin-left: 3px; margin-top: 3px;">{eventType} ({point.x:%a %e %b})</p>',
    pointFormat: '<p style="font-size: 12px; margin-bottom: 7px; margin-left: 3px;"><span style="color:{point.color};">{series.name}</span>\u00a0\u00a0\u00a0\u00a0<b>{point.y}</b></p>',
    shared: true,
    style: {
      padding: 7
    },
    useHTML: true
  },

  plotOptions: {
    series: {
      animation: false
    },
    spline: {
      marker: {
        enabled: true
      }
    }
  },
  series: [ {
    type: 'column',
    data: [ [ new Date().getTime(), 10000 ], [ new Date().getTime() + 100000000, 120 ], [ new Date().getTime() + 200000000, 160 ], [ new Date().getTime() + 300000000, 200 ] ],
    name: 'users',
    yAxis: 1
  }, {
    type: 'spline',
    data: [ [ new Date().getTime(), 1000 ], [ new Date().getTime() + 100000000, 1200 ], [ new Date().getTime() + 200000000, 260 ], [ new Date().getTime() + 300000000, 600 ] ],
    name: 'test'
  } ]
};
