/* eslint-disable react/no-set-state */
import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';
import * as toastActions from '../../../actions/toast';
import { routerPushWithReturnTo } from '../../../actions/global';
import toastSelector from '../../../selectors/toast';
import { colors, makeTextStyle, fontWeights } from '../styles';
import CompletedSVG from '../images/completed';
import PlusSVG from '../images/plus';
import {
  BRAND, BROADCAST_CHANNEL, BROADCASTER, CHARACTER, COMMERCIAL, CONTENT_PRODUCER, EPISODE,
  MOVIE, PERSON, PRODUCT, PUSH_NOTIFICATION, SEASON, SERIES_ENTRY, SHOP, SPOTT, TOPIC,
  TV_GUIDE_ENTRY, USER, SCHEDULE_ENTRY
} from '../../../constants/entityTypes';

@connect(null, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export class ErrorMessage extends Component {

  static propTypes = {
    error: PropTypes.object.isRequired,
    popToast: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  async redirect (url) {
    await this.props.routerPushWithReturnTo(url);
    await this.props.popToast();
  }

  badRequestError (error) {
    console.log('error', error);
    return (
      <div><b>Bad request:</b> {error.body && error.body.message || error.message}</div>
    );
  }

  conflictError (error) {
    return (
      <div><b>Conflict:</b> {error.body && error.body.message || error.message}</div>
    );
  }

  notFoundError (error) {
    return (
      <div><b>Not found:</b> {error.body && error.body.message || error.message}</div>
    );
  }

  static styles = {
    clickable: {
      cursor: 'pointer',
      fontSize: '12px',
      color: colors.veryDarkGray,
      ':hover': {
        textDecoration: 'underline'
      }
    }
  };

  render () {
    const { error } = this.props;
    console.log('error', error);
    // When there is a bad request error
    if (error.name === 'BadRequestError') {
      return this.badRequestError(error);
    } else
    // When there is a conflict error
    if (error.name === 'ConflictError') {
      return this.conflictError(error);
    } else
    // When there is a not found error
    if (error.name === 'NotFoundError') {
      return this.notFoundError(error);
    }
    return <span>Error occured, please let us know about this error.</span>;
  }
}

@connect(null, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch),
  routerPushWithReturnTo: bindActionCreators(routerPushWithReturnTo, dispatch)
}))
@Radium
export class SuccessMessage extends Component {

  static propTypes = {
    entity: PropTypes.object.isRequired,
    entityType: PropTypes.string.isRequired,
    popToast: PropTypes.func.isRequired,
    routerPushWithReturnTo: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.brandPersistSuccess = ::this.brandPersistSuccess;
    this.broadcastChannelPersistSuccess = ::this.broadcastChannelPersistSuccess;
    this.broadcasterPersistSuccess = ::this.broadcasterPersistSuccess;
    this.characterPersistSuccess = ::this.characterPersistSuccess;
    this.contentProducerPersistSuccess = ::this.contentProducerPersistSuccess;
    this.episodePersistSuccess = ::this.episodePersistSuccess;
    this.personPersistSuccess = ::this.personPersistSuccess;
    this.productPersistSuccess = ::this.productPersistSuccess;
    this.pushNotificationPersistSuccess = ::this.pushNotificationPersistSuccess;
    this.userPersistSuccess = ::this.userPersistSuccess;
    this.seasonPersistSuccess = ::this.seasonPersistSuccess;
    this.seriesEntryPersistSuccess = ::this.seriesEntryPersistSuccess;
    this.seriesEntryPersistSuccess = ::this.seriesEntryPersistSuccess;
    this.spottPersistSuccess = ::this.spottPersistSuccess;
    this.topicPersistSuccess = ::this.topicPersistSuccess;
  }

  async redirect (url) {
    await this.props.routerPushWithReturnTo(url);
    await this.props.popToast();
  }

  brandPersistSuccess (brand) {
    const { styles } = this.constructor;
    return (
      <span>
        Brand <Link style={styles.clickable} to={`/content/brands/read/${brand.id}`}>{brand.name[brand.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  broadcastChannelPersistSuccess (broadcastChannel) {
    const { styles } = this.constructor;
    return (
      <span>
        Broadcast channel <Link style={styles.clickable} to={`/content/broadcast-channels/read/${broadcastChannel.id}`}>{broadcastChannel.name}</Link> has been succesfully persisted.
      </span>
    );
  }

  broadcasterPersistSuccess (broadcaster) {
    const { styles } = this.constructor;
    return (
      <span>
        Broadcaster <Link style={styles.clickable} to={`/content/broadcasters/read/${broadcaster.id}`}>{broadcaster.name}</Link> has been succesfully persisted.
      </span>
    );
  }

  characterPersistSuccess (character) {
    const { styles } = this.constructor;
    return (
      <span>
        Character <Link style={styles.clickable} to={`/content/characters/read/${character.id}`}>{character.name[character.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  commercialPersistSuccess (commercial) {
    const { styles } = this.constructor;
    return (
      <span>
        Commercial <Link style={styles.clickable} to={`/content/commercials/read/${commercial.id}`}>{commercial.title[commercial.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  contentProducerPersistSuccess (contentProducer) {
    const { styles } = this.constructor;
    return (
      <span>
        Content producer <Link style={styles.clickable} to={`/content/content-producers/read/${contentProducer.id}`}>{contentProducer.name}</Link> has been succesfully persisted.
      </span>
    );
  }

  episodePersistSuccess (episode) {
    const { styles } = this.constructor;
    return (
      <span>
        Episode <Link style={styles.clickable} to={`/content/series/read/${episode.seriesEntry.id}/seasons/read/${episode.season.id}/episodes/read/${episode.id}`}>{episode.title[episode.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  moviePersistSuccess (movie) {
    const { styles } = this.constructor;
    return (
      <span>
        Movie <Link style={styles.clickable} to={`/content/movies/read/${movie.id}`}>{movie.title[movie.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  productPersistSuccess (product) {
    const { styles } = this.constructor;
    return (
      <span>
        Product <Link style={styles.clickable} to={`/content/products/read/${product.id}`}>{product.fullName[product.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  personPersistSuccess (person) {
    const { styles } = this.constructor;
    return (
      <span>
        Person <Link style={styles.clickable} to={`/content/persons/read/${person.id}`}>{person.fullName}</Link> has been succesfully persisted.
      </span>
    );
  }

  pushNotificationPersistSuccess (pushNotification) {
    let linkString = pushNotification.payloadData.en;
    if (linkString.length > 20) {
      linkString = `${pushNotification.payloadData.en.substring(0, 17)}...`;
    }
    const { styles } = this.constructor;
    return (
      <span>
        PushNotification <Link style={styles.clickable} to={`/content/push-notifications/read/${pushNotification.id}`}>{linkString}</Link> has been succesfully persisted.
      </span>
    );
  }

  seasonPersistSuccess (season) {
    const { styles } = this.constructor;
    return (
      <span>
        Season <Link style={styles.clickable} to={`/content/series/read/${season.seriesEntry.id}/seasons/read/${season.id}`}>{season.title[season.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  seriesEntryPersistSuccess (seriesEntry) {
    const { styles } = this.constructor;
    return (
      <span>
        Series <Link style={styles.clickable} to={`/content/series/read/${seriesEntry.id}`}>{seriesEntry.title[seriesEntry.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  shopPersistSuccess (shop) {
    const { styles } = this.constructor;
    return (
      <span>
        Shop <Link style={styles.clickable} to={`/content/shops/read/${shop.id}`}>{shop.name[shop.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  scheduleEntryPersistSuccess () {
    return (
      <span>
        Schedule Entry has been succesfully persisted.
      </span>
    );
  }

  spottPersistSuccess (spott) {
    const { styles } = this.constructor;
    return (
      <span>
        Spott <Link style={styles.clickable} to={`/content/spotts/read/${spott.id}`}>{spott.title[spott.defaultLocale]}</Link> has been succesfully persisted.
      </span>
    );
  }

  topicPersistSuccess (topic) {
    const { styles } = this.constructor;
    return (
      <span>
        Topic <Link style={styles.clickable} to={`/content/topics/read/${topic.id}`}>{topic.text}</Link> has been succesfully persisted.
      </span>
    );
  }

  tvGuideEntryPersistSuccess (tvGuideEntry) {
    const { styles } = this.constructor;
    return (
      <span>
        TV Guide Entry <Link style={styles.clickable} to={`/tv-guide/edit/${tvGuideEntry.id}`}>{tvGuideEntry.medium && tvGuideEntry.medium.title}</Link> has been succesfully persisted.
      </span>
    );
  }

  userPersistSuccess (user) {
    const { styles } = this.constructor;
    return (
      <span>
        User <Link style={styles.clickable} to={`/users/edit/${user.id}`}>{user.firstName} {user.lastName}</Link> has been succesfully persisted.
      </span>
    );
  }

  static styles = {
    clickable: {
      cursor: 'pointer',
      fontSize: '12px',
      color: colors.veryDarkGray,
      ':hover': {
        textDecoration: 'underline'
      }
    }
  };

  render () {
    const { entityType, entity } = this.props;
    switch (entityType) {
      case BRAND:
        return this.brandPersistSuccess(entity);
      case BROADCAST_CHANNEL:
        return this.broadcastChannelPersistSuccess(entity);
      case BROADCASTER:
        return this.broadcasterPersistSuccess(entity);
      case CHARACTER:
        return this.characterPersistSuccess(entity);
      case CONTENT_PRODUCER:
        return this.contentProducerPersistSuccess(entity);
      case COMMERCIAL:
        return this.commercialPersistSuccess(entity);
      case EPISODE:
        return this.episodePersistSuccess(entity);
      case MOVIE:
        return this.moviePersistSuccess(entity);
      case PERSON:
        return this.personPersistSuccess(entity);
      case PRODUCT:
        return this.productPersistSuccess(entity);
      case PUSH_NOTIFICATION:
        return this.pushNotificationPersistSuccess(entity);
      case SCHEDULE_ENTRY:
        return this.scheduleEntryPersistSuccess(entity);
      case SEASON:
        return this.seasonPersistSuccess(entity);
      case SERIES_ENTRY:
        return this.seriesEntryPersistSuccess(entity);
      case SHOP:
        return this.shopPersistSuccess(entity);
      case SPOTT:
        return this.spottPersistSuccess(entity);
      case TOPIC:
        return this.topicPersistSuccess(entity);
      case TV_GUIDE_ENTRY:
        return this.tvGuideEntryPersistSuccess(entity);
      case USER:
        return this.userPersistSuccess(entity);

      default:
        return <span>Entity has been succesfully persisted.</span>;
    }
  }
}

@connect(toastSelector, (dispatch) => ({
  popToast: bindActionCreators(toastActions.pop, dispatch)
}))
@Radium
export default class Toast extends Component {

  static propTypes = {
    currentToast: ImmutablePropTypes.map,
    popToast: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);
    this.state = { transition: false };
  }

  componentWillReceiveProps (nextProps, nextState) {
    // We received a new toast, let's timeout
    if (nextProps.currentToast) {
      // next tick we need to set the transition on true, otherwise there
      // will be no transition.
      setTimeout(() => {
        this.setState({ transition: true });
        setTimeout(() => {
          this.setState({ transition: false });
        }, 4000);
        setTimeout(() => {
          this.props.popToast();
        }, 4250);
      }, 0);
    }
  }

  static styles = {
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: 380,
      position: 'fixed',
      transition: 'top 0.25s ease-in, opacity 0.25s ease-in',
      right: 40,
      top: -100,
      opacity: 0,
      minHeight: 60, // Matches the flex-basis in icon.base style
      zIndex: 101,
      boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.25)'
    },
    icon: {
      base: {
        minWidth: '56px',
        minHeight: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: '2px',
        borderBottomLeftRadius: '2px'
      },
      error: {
        backgroundColor: colors.red,
        border: `1px solid ${colors.red}`
      },
      /* info: {
        backgroundColor: 'rgb(0, 115, 211)',
        border: '1px solid rgb(0, 115, 211)'
      },
      warning: {
        backgroundColor: 'rgb(248, 170, 15)',
        border: '1px solid rgb(248, 170, 15)'
      },*/
      success: {
        backgroundColor: colors.lightGreen,
        border: `1px solid ${colors.lightGreen}`
      }
    },
    text: {
      base: {
        paddingRight: '23px',
        width: '100%',
        ...makeTextStyle(fontWeights.regular, '12px'),
        lineHeight: 1.25,
        color: colors.darkGray2
      }
    },
    textContainer: {
      display: 'flex',
      paddingTop: '13px',
      paddingRight: '13px',
      paddingBottom: '13px',
      paddingLeft: '19px',
      width: '100%',
      backgroundColor: colors.white,
      border: '1px solid rgb(206, 214, 218)',
      borderTopRightRadius: '2px',
      borderBottomRightRadius: '2px'
    },
    cross: {
      width: '12px',
      height: '12px',
      transform: 'rotate(45deg)',
      paddingRight: '13px',
      cursor: 'pointer'
    },
    transition: {
      top: 40,
      opacity: 1,
      transition: 'top 0.25s ease-out, opacity 0.25s ease-in'
    }
  };

  render () {
    const { styles } = this.constructor;
    const { currentToast } = this.props;

    // Render empty if there is no toast to show
    if (!currentToast) {
      return (
        <div />
      );
    }
    // Visualize the toast
    const type = currentToast.get('type');
    const entityType = currentToast.get('entityType');
    const entity = currentToast.get('entity');
    const error = currentToast.get('error');
    return (
      <div key='toastContainer' style={[ styles.container, this.state.transition && styles.transition ]}>
        <div style={[ styles.icon.base, styles.icon[type] ]}>
        {type === 'error' &&
          <PlusSVG color={colors.white} style={styles.cross}/> ||
          <CompletedSVG color={colors.white} />}
        </div>
        <div style={styles.textContainer}>
          <div style={[ styles.text.base ]}>
            { type === 'error' && <ErrorMessage entityType={entityType} error={error}/> }
            { type === 'success' && <SuccessMessage entity={entity} entityType={entityType}/> }
          </div>
          <div onClick={this.props.popToast}><PlusSVG color='#aab5b8' style={styles.cross}/></div>
        </div>
      </div>
    );
  }

}
