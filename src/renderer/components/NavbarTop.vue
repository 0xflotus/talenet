<template>
  <div>
    <t-navbar position="top">
      <b-nav-item slot="item" to="/ideas/matches">{{$t('navbar.matchingIdeas')}}</b-nav-item>
      <b-nav-item slot="item" to="/ideas/create">{{$t('navbar.createIdea')}}</b-nav-item>
      <b-nav-item slot="item" to="/skills/all">{{$t('navbar.skilliverse')}}</b-nav-item>
      <b-nav-form slot="item" @submit="$event.preventDefault()">
        <t-search-field></t-search-field>
      </b-nav-form>

      <t-connection-activity-indicator
        slot="center"
        @click="goToHomePage()">
      </t-connection-activity-indicator>
      <t-history-button
        direction="back"
        slot="center-left">
      </t-history-button>
      <t-history-button
        direction="forward"
        slot="center-right">
      </t-history-button>
    </t-navbar>
  </div>
</template>

<script>
  import SubscriptionMixin from '../mixins/Subscription'
  import { mapGetters } from 'vuex'

  export default {
    mixins: [
      SubscriptionMixin({
        '!': 'identity/subscribeOwnIdentityKey',
        'ownIdentityKey': 'identity/subscribe'
      })
    ],

    computed: {
      ...mapGetters({
        // ssbConnected: 'ssb/connected',
        ownIdentityKey: 'identity/ownIdentityKey',
        ownIdentity: 'identity/own'
      })
    },

    methods: {
      // reconnect () {
      //   this.$store.dispatch('ssb/connect')
      // },

      goToHomePage () {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
</script>
