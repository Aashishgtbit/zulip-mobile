/* @flow strict-local */
import { connect } from 'react-redux';

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import type { Dispatch, User } from '../types';
import { Touchable, UserAvatarWithPresence } from '../common';
import { getRecipientsInGroupNarrow } from '../selectors';
import styles from '../styles';
import { navigateToAccountDetails } from '../nav/navActions';

type Props = {
  dispatch: Dispatch,
  recipients: User[],
};

class TitleGroup extends PureComponent<Props> {
  handlePress = user => {
    const { dispatch } = this.props;
    dispatch(navigateToAccountDetails(user.email));
  };

  render() {
    const { recipients } = this.props;

    return (
      <View style={styles.navWrapper}>
        {recipients.map((user, index) => (
          <Touchable
            key={user.email}
            onPress={() => this.handlePress(user)}
            style={styles.titleAvatar}
          >
            <UserAvatarWithPresence size={32} avatarUrl={user.avatar_url} email={user.email} />
          </Touchable>
        ))}
      </View>
    );
  }
}

export default connect((state, props) => ({
  recipients: getRecipientsInGroupNarrow(state, props.narrow),
}))(TitleGroup);
