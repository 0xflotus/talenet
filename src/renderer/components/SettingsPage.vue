<template>
  <div class="t-settings">
    <div class="row">
      <div class="t-center-col">
        <t-introduction-box messagesKey="settings.introduction"></t-introduction-box>
      </div>
    </div>

    <t-alpha-contact-box type="text"></t-alpha-contact-box>

    <div class="row">
      <div class="t-center-col">
        <t-invite-accept-form
          :join-pub-button-text="$t('settings.invite.form.joinPub.button')"
          :cancel-button-text="$t('settings.invite.form.cancel.button')"
          :show-invite-link="true">
        </t-invite-accept-form>

        <t-pub-list></t-pub-list>

        <t-action-panel :text="$t('settings.introductions.text')">
          <t-action-button
            slot="left"
            variant="primary"
            action="settings/resetIntroductions">
            {{$t('settings.introductions.reset.button')}}
          </t-action-button>
        </t-action-panel>
        <t-action-panel :text="$t('settings.landingPage.invite.text')">
          <t-action-button
            slot="left"
            variant="primary"
            action="settings/resetLandingPageInvite">
            {{$t('settings.landingPage.invite.reset.button')}}
          </t-action-button>
        </t-action-panel>
        <t-action-panel :text="$t('settings.devMode.text')">
          <b-button
            v-if="!isDevMode"
            slot="left"
            variant="outline-danger"
            @click="setDevMode(true)">
            {{$t('settings.devMode.enable.button')}}
          </b-button>
          <b-button
            v-if="isDevMode"
            slot="left"
            variant="outline-danger"
            @click="setDevMode(false)">
            {{$t('settings.devMode.disable.button')}}
          </b-button>
        </t-action-panel>
        <div class="t-dev-version">
          {{$t('dev.version')}}: <small>{{version}}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        'version': 'development/version',
        'isDevMode': 'settings/isDevMode'
      })
    },

    methods: {
      ...mapActions({
        'setDevMode': 'settings/setDevMode'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .t-settings {
    .t-action-panel {
      margin: {
        top: 3rem;
        bottom: 3rem;
      }
    }
  }
  .t-dev-version {
    text-align: center;
  }
</style>
