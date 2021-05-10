<template>
  <div>
    <h1>Components UI Testing Page</h1>
    <br /><br />
    <div>
      <RoundedButton color="primary" text="Primary" icon="fa fa-pencil" dark />
    </div>
    <div>
      <RoundedButton color="secondary" text="Secondary" icon="fa fa-eye" dark />
    </div>
    <div>
      <RoundedButton
        color="highlight"
        text="Highlight"
        icon="fa fa-trash"
        light
      />
    </div>
    <div>
      <RoundedButton color="dark" text="Dark" dark />
    </div>
    <div>
      <SquareButton color="red" text="Cancel" icon="fa fa-pencil" dark />
    </div>
  </div>
</template>
<script>
import RoundedButton from "@/components/buttons/RoundedButton";
import SquareButton from "@/components/buttons/SquareButton";
export default {
  name: "TestComponent",
  components: {
    RoundedButton,
    SquareButton,
  },
};
</script>
<style lang="scss"></style>
