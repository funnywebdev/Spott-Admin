import { createSelector, createStructuredSelector } from 'reselect';
import { List, Map } from 'immutable';
import {
  agesEntitiesSelector, gendersEntitiesSelector, gendersListSelector, agesListSelector,
  createEntitiesByRelationSelector, createEntityIdsByRelationSelector, createEntitiesByListSelector, brandDashboardEventsEntitiesSelector,
  filterHasTopMediaRelationsSelector, brandDashboardEventsListSelector, listBrandsEntitiesSelector,
  filterHasTopPeopleRelationsSelector, filterHasTopProductsRelationsSelector, topProductsEntitiesSelector,
  filterHasTopCommercialsRelationsSelector, topCommercialsEntitiesSelector,
  topMediaEntitiesSelector, topPeopleEntitiesSelector, languagesEntitiesSelector, searchStringHasBrandsRelationsSelector
} from '../../../selectors/data';
import { getInformationFromQuery } from '../../_common/components/table/index';
import { serializeFilterHasTopMedia, serializeFilterHasTopPeople, serializeFilterHasTopProducts, serializeFilterHasTopCommercials } from '../../../reducers/utils';
import { createQueryStringArraySelector } from '../../../selectors/global';
import { ageDataConfig, dateDataConfig, genderDataConfig } from './defaultHighchartsConfig';

const currentBrandsSearchStringSelector = (state) => state.getIn([ 'brandDashboard', 'currentBrandsSearchString' ]);
const searchedBrandIdsSelector = createEntityIdsByRelationSelector(searchStringHasBrandsRelationsSelector, currentBrandsSearchStringSelector);

// Used in actions
export const currentAgesSelector = createQueryStringArraySelector('ages');
export const currentBrandSelector = (state) => state.get('router').locationBeforeTransitions.query.brand;
export const currentGendersSelector = createQueryStringArraySelector('genders');
export const currentLanguagesSelector = createQueryStringArraySelector('languages');
export const currentBrandActivityEventsSelector = createQueryStringArraySelector('brandActivityEvents');
export const currentBrandActivityByRegionEventSelector = createQueryStringArraySelector('brandActivityByRegionEvent');

// Filters
// ///////

const gendersSelector = createEntitiesByListSelector(gendersListSelector, gendersEntitiesSelector);
const agesSelector = createEntitiesByListSelector(agesListSelector, agesEntitiesSelector);

export const filtersSelector = createStructuredSelector({
  ages: agesSelector,
  agesById: agesEntitiesSelector,
  genders: gendersSelector,
  gendersById: gendersEntitiesSelector,
  languagesById: languagesEntitiesSelector
});

// Brand Dashboard
// ///////////////

export const topMediaPrefix = 'topMedia';
export const topPeoplePrefix = 'topPeople';
export const topProductsPrefix = 'topProducts';
export const topCommercialsPrefix = 'topCommercials';

const topMediaFilterKeySelector = (state, props) => serializeFilterHasTopMedia({
  ...getInformationFromQuery(props.location.query, topMediaPrefix)
  // brandId: 'BRAND_ID_PLACEHOLDER'
});

const topPeopleFilterKeySelector = (state, props) => serializeFilterHasTopPeople({
  ...getInformationFromQuery(props.location.query, topPeoplePrefix)
  // brandId: 'BRAND_ID_PLACEHOLDER'
});

const topProductsFilterKeySelector = (state, props) => serializeFilterHasTopProducts({
  ...getInformationFromQuery(props.location.query, topProductsPrefix)
  // brandId: 'BRAND_ID_PLACEHOLDER'
});

const topCommercialsFilterKeySelector = (state, props) => serializeFilterHasTopCommercials({
  ...getInformationFromQuery(props.location.query, topCommercialsPrefix)
    // brandId: 'BRAND_ID_PLACEHOLDER'
});

export const topMediaSelector = createEntitiesByRelationSelector(
  filterHasTopMediaRelationsSelector,
  topMediaFilterKeySelector,
  topMediaEntitiesSelector
);

export const topPeopleSelector = createEntitiesByRelationSelector(
  filterHasTopPeopleRelationsSelector,
  topPeopleFilterKeySelector,
  topPeopleEntitiesSelector
);

export const topProductsSelector = createEntitiesByRelationSelector(
  filterHasTopProductsRelationsSelector,
  topProductsFilterKeySelector,
  topProductsEntitiesSelector
);

export const topCommercialsSelector = createEntitiesByRelationSelector(
    filterHasTopCommercialsRelationsSelector,
    topCommercialsFilterKeySelector,
    topCommercialsEntitiesSelector
);

const ageDataSelector = (state) => state.getIn([ 'brandDashboard', 'ageData' ]);
const dateDataSelector = (state) => state.getIn([ 'brandDashboard', 'dateData' ]);
const genderDataSelector = (state) => state.getIn([ 'brandDashboard', 'genderData' ]);
const keyMetricsSelector = (state) => state.getIn([ 'brandDashboard', 'keyMetrics' ]);
const locationDataSelector = (state) => state.getIn([ 'brandDashboard', 'locationData' ]);

const brandDashboardEventsSelector = createEntitiesByListSelector(brandDashboardEventsListSelector, brandDashboardEventsEntitiesSelector);

const dateDataConfigSelector = createSelector(
  currentBrandActivityEventsSelector,
  brandDashboardEventsEntitiesSelector,
  dateDataSelector,
  (_eventIds, eventsById, dateData) => {
    const series = [];
    // Filter unknown types.
    const eventIds = _eventIds.filter((eventId) => eventsById.get(eventId));
    const eventTypes = eventIds.map((eventId) => eventsById.getIn([ eventId, 'description' ])).join(', ');
    const colors = [];

    if (eventTypes && dateData.get('eventData') && dateData.get('userData')) {
      // Add the lines for each of the event types.
      for (const eventId of eventIds) {
        const eventData = dateData.getIn([ 'eventData', eventId ]);
        const d = (eventData && eventData.toJS()) || [];
        // There should be data available, otherwise Highcharts will crash.
        if (d.length > 0) {
          colors.push(eventsById.getIn([ eventId, 'color' ]));
          series.push({
            data: d.map(({ timestamp, value }) => ([ new Date(timestamp).getTime(), value ])),
            name: eventsById.getIn([ eventId, 'description' ]),
            type: 'spline',
            zIndex: 2
          });
        }
      }

      // Add columns for the user count.
      const d = dateData.get('userData').toJS();
      // Add user column color.
      colors.push('#eaeced');
      series.push({
        data: d.map(({ timestamp, value }) => ([ new Date(timestamp).getTime(), value ])),
        name: 'Users',
        type: 'column',
        yAxis: 1,
        zIndex: 1
      });
    }

    return dateData
      .set(
        'data',
        dateDataConfig
          .set('colors', colors)
          .setIn([ 'tooltip', 'headerFormat' ], dateDataConfig.getIn([ 'tooltip', 'headerFormat' ]).replace('{eventType}', eventTypes))
          .set('series', series)
          .toJS()
      );
  }
);

const ageDataConfigSelector = createSelector(
  ageDataSelector,
  (ageData) => {
    let series = List();
    const d = ageData.get('data') || List();

    // There should be data available, otherwise Highcharts will crash.
    if (d.size > 0) {
      series = series.push(Map({
        data: d.map((t) => t.get('value')),
        name: 'Brand subscriptions'
      }));
    }

    return ageData
      .set(
        'data',
        ageDataConfig
          .setIn([ 'xAxis', 'categories' ], d.map((t) => t.get('label')))
          .set('series', series)
          .toJS()
      );
  }
);

const genderDataConfigSelector = createSelector(
  genderDataSelector,
  gendersEntitiesSelector,
  (genderData, gendersById) => {
    let series = List();
    const d = genderData.get('data') || List();

    // There should be data available, otherwise Highcharts will crash.
    if (d.size > 0) {
      series = series.push(Map({
        data: d.map((t) => t.get('value')),
        name: 'Brand subscriptions'
      }));
    }

    return genderData
      .set(
        'data',
        genderDataConfig
          .setIn([ 'xAxis', 'categories' ], d.map((t) => gendersById.getIn([ t.get('id'), 'description' ])))
          .set('series', series)
          .toJS()
      );
  }
);

// The markers shown in the Brand activity by region widget.
const markersSelector = createSelector(
  locationDataSelector,
  (locationData) => (
    locationData.set(
      'data',
      (locationData.get('data') || List()).map((l) => ({
        label: `${l.get('value')}`,
        position: {
          lat: l.get('latitude'),
          lng: l.get('longitude')
        }
      })).toJS()
    )
  )
);

export default createStructuredSelector({
  ageDataConfig: ageDataConfigSelector,
  brandsById: listBrandsEntitiesSelector,
  dateDataConfig: dateDataConfigSelector,
  events: brandDashboardEventsSelector,
  eventsById: brandDashboardEventsEntitiesSelector,
  genderDataConfig: genderDataConfigSelector,
  keyMetrics: keyMetricsSelector,
  markers: markersSelector,
  searchedBrandIds: searchedBrandIdsSelector,
  topMedia: topMediaSelector,
  topPeople: topPeopleSelector,
  topProducts: topProductsSelector,
  topCommercials: topCommercialsSelector
});
