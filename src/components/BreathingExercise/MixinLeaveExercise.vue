<script lang="ts">
import { namespaceName } from "@/store/createStore";
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

  methods: {
    askBeforeLeave(routeName: RouteRecordName | null) {
      this.routeToNavigate = routeName;
      this.showModal = true;
    },

    confirmCancelExercise() {
      this.$store.dispatch(namespaceName("exercise", ExerciseActions.Cancel));
      this.allowNavigation = true;
      if (this.routeToNavigate) {
        this.$router.replace({
          name: this.routeToNavigate,
          params: {
            allowNavigation: 1,
          },
        });
      }
    },
    preventCancelExercise() {
      this.allowNavigation = false;
      this.routeToNavigate = null;
      this.showModal = false;
    },
  },
});
</script>
