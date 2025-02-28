

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BsIJEhPb.js","_app/immutable/chunks/scheduler.rHNyJg8M.js","_app/immutable/chunks/index.BmuBWEB0.js","_app/immutable/chunks/index.Ct5PZE8B.js"];
export const stylesheets = ["_app/immutable/assets/2.oI_fgDg0.css"];
export const fonts = [];
