
editor.block("list", {
  label: "List",

  icon: "funnel",

  props: {
    content: String,
    attrs: [Array, Object],
  },

  methods: {
    focus(cursor) {
      this.$refs.input.focus(cursor);
    },
    onBack(event) {
      this.$emit("back", event);
    },

    onStart(num) {
      this.$emit("input", {
        attrs: {
          start: num,
          style: this.attrs.style
        }
      });
    },
    onStyle(sty) {
      this.$emit("input", {
        attrs: {
          start: this.attrs.start,
          style: sty
        }
      });
    },
    onEnter() {
      if (this.content.length === 0) {
        this.$emit("convert", "paragraph");
      } else {
        this.$emit("append", {
          type: "list"
        });
      }
    },
    onInput(html) {
      this.$emit("input", {
        content: html
      });
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

  template: `
    <p>
      <k-select-field
        :options="[
            { value: 'decimal', text: ' 1 ' },
            { value: 'decimal-leading-zero', text: ' 01 ' },
            { value: 'upper-alpha', text: ' A ' },
            { value: 'lower-alpha', text: ' a ' },
            { value: 'upper-roman', text: ' Ⅰ ' },
            { value: 'lower-roman', text: ' ⅰ ' },
            { value: 'inherit', text: '•' }
        ]"
        :required="true"
        :value="attrs.style"
        @input="onStyle"
      />
      <k-number-field
        :max="99"
        :min="1"
        :step="1"
        :required="true"
        :value="attrs.start"
        @input="onStart"
      />
      <k-editable
        ref="input"
        :content="content"
        :spellcheck="true"
        @back="onBack"
        @enter="onEnter"
        @input="onInput"
        @next="onNext"
        @prev="onPrev"
        @split="onSplit"
      />
    </p>
  `,
});