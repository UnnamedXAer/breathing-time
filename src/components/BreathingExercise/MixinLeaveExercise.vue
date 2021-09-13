<script lang="ts">
import { namespaceName } from "@/store";
import { ExerciseActions } from "@/store/modules/exercise/types";
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
      this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
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
