<template>
  <div class="mobile_banner" data-test="mobile-banner" v-if="showBanner">
    <button
      class="mobile_banner__dismiss"
      data-test="mobile-banner-close"
      @click="dismiss"
      aria-label="close banner"
    >
      &times;
    </button>
    <div class="banner_content">
      <app-logo class="mobile_banner__logo" />
      <div class="mobile_banner__content__text">
        <h3>{{ appTitle }}</h3>
        <p>{{ $t("banner.text") }}</p>
      </div>
    </div>
    <div class="download_link">
      <app-button
        class="download_btn"
        @click="openStore"
        :aria-level="'Open Google Pay Store - ' + appTitle"
        >{{ $t("banner.download") }}</app-button
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ButtonVue from "./Button.vue";
import Logo from "./Logo.vue";

export default defineComponent({
  components: {
    appButton: ButtonVue,
    appLogo: Logo,
  },

  data() {
    return {
      bannerDismissed: true,
    };
  },

  computed: {
    appTitle: () => process.env.APP_TITLE,
    showBanner() {
      return !this.$store.state.exercise.started && !this.bannerDismissed;
    },
  },

  methods: {
    dismiss() {
      this.bannerDismissed = true;
      localStorage.setItem("bannerDismissed", 1);
    },
    openStore() {
      window.open(
        "https://play.google.com/store/apps/details?id=com.unnamedxaer.breathingtime"
      );
    },
  },

  beforeMount() {
    if ("Cypress" in window || window.navigator.userAgent.includes("Android")) {
      const bannerDismissed = localStorage.getItem("bannerDismissed");
      if (bannerDismissed === null) {
        this.bannerDismissed = false;
      }
    }
  },
});
</script>

<style scoped>
.mobile_banner {
  display: flex;
  max-height: 55px;
}

.mobile_banner__dismiss {
  width: 33px;
  border: none;
  font-weight: bold;
  background-color: #eee;
  color: var(--dark);
}

.mobile_banner__logo {
  max-height: 50px;
  max-width: 50px;
  aspect-ratio: 1;
  transform: scale(0.8);
  align-self: center;
}

.download_link {
  margin-left: auto;
}

.banner_content {
  display: flex;
  font-size: 12px;
}

.mobile_banner__content__text {
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner_content h3 {
  font-size: 14px;
}
.banner_content h3,
.banner_content p {
  margin-block-end: 0;
  margin-block-start: 0;
}

@media screen and (min-width: 768px) {
  .mobile_banner {
    display: none;
  }
}
</style>
