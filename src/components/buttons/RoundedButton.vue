<template>
  <v-btn
    :color="color"
    :dark="dark"
    :light="light"
    :depressed="depressed"
    :outlined="outlined"
    :disabled="disabled"
    :width="width"
    :type="type"
    :v-on="vOn"
    :v-bind="vBind"
    height="35px"
    large
    class="rounded-btn rounded-pill text-capitalize"
    @click="onClick()"
  >
    <v-icon v-if="icon" left dark>
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  name: "RoundedButton",
  props: {
    text: String,
    icon: String,
    color: String,
    dark: Boolean,
    light: Boolean,
    outlined: Boolean,
    disabled: Boolean,
    width: String,
    type: String,
    vOn: String,
    vBind: String,
  },
  methods: {
    onClick() {
      this.$emit("click");
    },
  },
};
</script>
<style lang="scss">
.rounded-btn {
  font-family: Helvetica, sans-serif;
}
.v-btn__content {
  font-size: 16px;
}
</style>
