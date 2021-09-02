<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordName } from "vue-router";

export default defineComponent({
  data() {
    return {
      showModal: false,
      allowNavigation: false,
      routeToNavigate: null as RouteRecordName | null,
    };
  },

  watch: {
    allowNavigation(val: boolean) {
      if (val && this.routeToNavigate) {
        this.$router.replace({
          name: this.routeToNavigate,
          params: {
            allowNavigation: 1,
          },
        });
      }
    },
  },

  methods: {
    askBeforeLeave(routeName: RouteRecordName | null) {
      this.routeToNavigate = routeName;
      this.showModal = true;
    },

    confirmCancelExercise() {
      this.allowNavigation = true;
    },
    preventCancelExercise() {
      this.allowNavigation = false;
      this.routeToNavigate = null;
      this.showModal = false;
    },
  },
});
</script>
