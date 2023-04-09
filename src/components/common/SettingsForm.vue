<template>
  <v-form
    :value="value.valid"
    @input="(e) => onSettingsChange(e, 'valid')"
    lazy-validation
    class="px-5 pt-2"
  >
    Name:
    <v-text-field
      solo
      :value="value.voteName"
      @input="(e) => onSettingsChange(e, 'voteName')"
    />
    Cards:
    <v-text-field
      solo
      :value="value.cards"
      @input="(e) => onSettingsChange(e, 'cards')"
      :rules="[rules.required, rules.cardsValid]"
    />
    Voting time:
    <v-text-field
      solo
      :value="value.time"
      @input="(e) => onSettingsChange(e, 'time')"
      :rules="[rules.required, rules.timeValid]"
    />
  </v-form>
</template>

<script>
import { validateCardsArray } from "@/methods/cardsArray";

export default {
  props: ["value"],
  name: "SettingsForm",
  data() {
    return {
      rules: {
        required: (value) => value !== "" || "Required.",
        cardsValid: (value) => {
          return (
            validateCardsArray(value) || "Should be comma separated numbers."
          );
        },
        timeValid: (value) => {
          return (
            (/^[0-9]+$/.test(value) && value >= 0) ||
            "Should be positive number, or zero."
          );
        },
      },
    };
  },
  methods: {
    onSettingsChange(value, prop) {
      this.$emit("input", { ...this.value, [prop]: value });
    },
  },
};
</script>

<style scoped></style>
