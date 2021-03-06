import Vue from 'vue'

import { subscribeValue, subscribeKeys } from '../util/store'

/**
 * Constraints for identities.
 */
const IDENTITY_CONSTRAINTS = {
  name: {
    required: false,
    max: 30,
    // Format according to https://scuttlebot.io/docs/message-types/about.html
    regex: /^[a-zA-Z0-9._-]*[a-zA-Z0-9_-]$/
  },
  description: {}
}

const SUBSCRIBER_ID = 'store/identity'

/**
 * Store module for holding identity data.
 */
export default function ({ identityAdapter }) {
  return {
    namespaced: true,

    state () {
      return {
        ownIdentityKey: null,
        identities: {}
      }
    },

    getters: {
      /**
       * Constraints for validating identity data.
       */
      constraints () {
        return IDENTITY_CONSTRAINTS
      },

      /**
       * Returns a function to get the identity for a identity key.
       */
      get (state) {
        return (identityKey) => state.identities[identityKey]
      },

      /**
       * Returns the users own identity.
       */
      own (state) {
        return state.identities[state.ownIdentityKey]
      },

      /**
       * The users own identity key.
       */
      ownIdentityKey (state) {
        return state.ownIdentityKey
      }
    },

    mutations: {
      /**
       * Sets the users own identity key.
       */
      setOwnIdentityKey (state, key) {
        state.ownIdentityKey = key
      },

      /**
       * Sets the given identity on the store.
       */
      set (state, identity) {
        Vue.set(state.identities, identity.key(), identity)
      }
    },

    actions: {
      /**
       * Subscribe for the users own identity key. The current identity key
       * can then be retrieved via the getter 'identity/ownIdentityKey'.
       *
       * The component subscribing is responsible for cancelling the subscription if
       * it is no longer needed.
       *
       * @return Promise to cancel the subscription (just call <code>cancel()</code>).
       */
      subscribeOwnIdentityKey (context) {
        return subscribeValue(
          context,
          'setOwnIdentityKey',
          SUBSCRIBER_ID,
          identityAdapter.subscribeOwnIdentityKey.bind(identityAdapter)
        )
      },

      /**
       * Subscribe for one or more identities to recieve updates via the store. The current
       * state of each identity can then be retrieved via the getter 'identity/get'.
       *
       * The component subscribing is responsible for cancelling the subscription if
       * it is no longer needed.
       *
       * @return Promise to cancel the subscription (just call <code>cancel()</code>).
       */
      subscribe (context, identityKeys) {
        return subscribeKeys(
          context,
          identityKeys,
          'set',
          SUBSCRIBER_ID,
          identityAdapter.subscribeIdentities.bind(identityAdapter)
        )
      },

      /**
       * Saves updated details (name, description) for the specified identity.
       *
       * @return A promise that provides the key of the identity the name has been set for.
       */
      saveDetails (context, details) {
        return identityAdapter.updateIdentityDetails(details)
      },

      /**
       * Sets a new image for the specified identity.
       *
       * @return A promise that provides the key of the identity the image has been set for.
       */
      setImage (context, { identityKey, imageFile }) {
        return identityAdapter.setIdentityImage(identityKey, imageFile)
      },

      /**
       * Assigns the specified skill to the users own identity.
       *
       * @return A promise that provides the key of the assigned skill.
       */
      assignSkill (context, skillKey) {
        return identityAdapter.assignSkillToIdentity(skillKey)
      },

      /**
       * Unassigns the specified skill from the users own identity.
       *
       * @return A promise that provides the key of the unassigned skill.
       */
      unassignSkill (context, skillKey) {
        return identityAdapter.unassignSkillFromIdentity(skillKey)
      },

      /**
       * Starts the download of the identities key pair.
       */
      downloadKeyPair () {
        return identityAdapter.downloadKeyPair()
      },

      /**
       * Block the specified identity.
       */
      block (context, identityKey) {
        return identityAdapter.blockIdentity(identityKey)
      }
    }
  }
}
