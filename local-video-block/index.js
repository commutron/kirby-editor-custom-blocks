editor.block("local-video", {
  label: "Local Video",
  icon: "file-video",

  props: {
    attrs: {
      type: Object,
      default() {
        return {};
      }
    },
    endpoints: Object,
    spellcheck: Boolean
  },
  computed: {
    fields() {
      return {
        alt: {
          label: "Alt Text",
          type: "text",
          icon: "text"
        },
        link: {
          label: "Link",
          type: "text",
          icon: "url",
          placeholder: "" 
        },
        css: {
          label: "CSS Class",
          type: "text",
          icon: "code",
        }
      };
    }
  },

  methods: {
    caption(html) {
      this.input({
        caption: html
      });
    },
    edit() {
      if (this.attrs.guid) {
        this.$router.push(this.attrs.guid);
      }
    },
    focus() {
      if (this.attrs.src) {
        this.$refs.element.focus();
      } else {
        this.$refs.element.$el.focus();
      }
    },
    input(data) {
      this.$emit("input", {
        attrs: {
          ...this.attrs,
          ...data
        }
      });
    },
    fetchFile(link) {
      this.$api.get(link).then(response => {
        this.input({
          guid: response.link,
          src: response.url,
          id: response.id,
          filename: response.filename,
          mime: response.mime,
          media_root: response.mediaRoot,
        });
      });
    },
    insertFile(files) {
      const file = files[0];
      this.fetchFile(file.link);
    },
    insertUpload(files, response) {
      this.fetchFile(response[0].link);
      this.$events.$emit("file.create");
      this.$events.$emit("model.update");
      this.$store.dispatch("notification/success", ":)");
    },
    menu() {

      if (this.attrs.src) {
        return [
          {
            icon: "open",
            label: "Open",
            click: this.open
          },
          {
            icon: "edit",
            label: "Edit",
            click: this.edit,
            disabled: !this.attrs.guid
          },
          {
            icon: "cog",
            label: "Settings",
            click: this.$refs.settings.open
          },
          {
            icon: "file-video",
            label: "Replace",
            click: this.replace
          },
        ];
      } else {
        return [];
      }

    },
    open() {
      window.open(this.attrs.src);
    },
    onDrop(files) {
      this.$refs.fileUpload.drop(files, {
        url: window.panel.api + "/" + this.endpoints.field + "/upload",
        multiple: false,
        accept: "video/*"
      });
    },
    onLoad() {
      const video = this.$refs.video;
    },
    replace() {
      this.$emit("input", {
        attrs: {}
      });
    },
    selectFile() {
      this.$refs.fileDialog.open({
        endpoint: this.endpoints.field + "/files",
        multiple: false,
        selected: [this.attrs.id]
      });
    },
    settings() {
      this.$refs.settings.open();
    },
    saveSettings() {
      this.$refs.settings.close();
      this.input(this.attrs);
    },
    uploadFile() {
      this.$refs.fileUpload.open({
        url: window.panel.api + "/" + this.endpoints.field + "/upload",
        multiple: false,
        accept: "video/*"
      });
    },
  },

  template: `
    <div>
      <figure>
        <template v-if="attrs.src">
          <div
            ref="element"
            class="k-editor-local-video-block-wrapper"
            tabindex="0"
            @keydown.delete="$emit('remove')"
            @keydown.enter="$emit('append')"
            @keydown.up="$emit('prev')"
            @keydown.down="$emit('next')"
          >
            <video ref="video" width="250" height="200" :key="attrs.src" @dblclick="selectFile" @load="onLoad">
              <source :src="attrs.src" :type="attrs.mime">
            </video>
          
          </div>
          <figcaption>
            <k-editable
              :content="attrs.caption"
              :breaks="true"
              :placeholder="$t('editor.blocks.image.caption.placeholder') + '…'"
              :spellcheck="spellcheck"
              @prev="focus"
              @shiftTab="focus"
              @tab="$emit('next', $event)"
              @next="$emit('next', $event)"
              @split="$emit('append')"
              @enter="$emit('append')"
              @input="caption"
            />
          </figcaption>
        </template>
        <template v-else>
          <k-dropzone
            ref="element"
            class="k-editor-local-video-block-placeholder"
            tabindex="0"
            @keydown.native.delete="$emit('remove')"
            @keydown.native.enter="$emit('append')"
            @keydown.native.up.prevent="$emit('prev')"
            @keydown.native.down.prevent="$emit('next')"
            @drop="onDrop"
          >
            <k-button icon="upload" @click="uploadFile" @keydown.enter.native.stop>Upload Video</k-button>
            {{ $t('editor.blocks.image.or') }}
            <k-button icon="file-video" @click="selectFile" @keydown.enter.native.stop>Select Video</k-button>
          </k-dropzone>
        </template>
      </figure>

      <k-files-dialog ref="fileDialog" @submit="insertFile($event)" />
      <k-upload ref="fileUpload" @success="insertUpload" />

      <k-dialog ref="settings" @submit="saveSettings" size="medium">
        <k-form :fields="fields" v-model="attrs" @submit="saveSettings" />
      </k-dialog>

    </div>
  `,
});

