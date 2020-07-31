/**
 * This is an example of a block that extends
 * an existing one. The best block to extend
 * is the paragraph.
 */
editor.block("red-text", {
  extends: "paragraph",

  // will appear as title in the blocks dropdown
  label: "Red-Text",

  // icon for the blocks dropdown
  icon: "text",
});
