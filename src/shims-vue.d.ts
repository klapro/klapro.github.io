declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module 'country-flag-icons/string/3x2' {
  const flags: { [code: string]: string };
  export default flags;
}

declare module 'vue-draggable-resizable';