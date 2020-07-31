/**
 * This is one of the most simple blocks you can build
 */
editor.block("safety-alert", {
  // will appear as title in the blocks dropdown
  label: "Safety Alert",

  // icon for the blocks dropdown
  icon: "alert",
  // get the block content
  // props: {
  //   content: String,
  // },
  props: {
    content: String
  },

  // block methods
  methods: {
    // the block must be focusable somehow
    // In this case we focus on the input.
    focus() {
      this.$refs.input.focus();
    },
    // The input event is sent to the editor
    // to update the block content
    // onInput(event) {
    //   this.$emit("input", {
    //     content: event.target.value
    //   });
    // },
    onInput(html) {
      this.$emit("input", {
        content: html
      });
    },

    onEnter() {
      this.$emit("convert", "paragraph");
    },

    onBack(event) {
      this.$emit("back", event);
    },
    onNext(cursor) {
      this.$emit("next", cursor);
    },
    onPrev(cursor) {
      this.$emit("prev", cursor);
    },
    onSplit(data) {
      this.$emit("split", data);
    }
  },
//   :value="content" 
  // simple template. In single file components
  // this would be a bit nicer to read. You should
  // definitely go for single file components for more
  // complex blocks
  template: `
    <p>
      <strong>⚠</strong>
      <k-editable
        ref="input"
        :content="content"
        placeholder="Safety Alert"
        @input="onInput"
        @back="onBack"
        @enter="onEnter"
        @next="onNext"
        @prev="onPrev"
        @split="onSplit"
      />
    </p>
  `,
});
