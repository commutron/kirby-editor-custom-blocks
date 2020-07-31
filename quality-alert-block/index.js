/**
 * This is one of the most simple blocks you can build
 */
editor.block("quality-alert", {
  // will appear as title in the blocks dropdown
  label: "Quality Alert",

  // icon for the blocks dropdown
  icon: "remove",
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
      <strong>🛑</strong>
      <k-editable
        ref="input"
        :content="content"
        placeholder="Quality Alert"
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
