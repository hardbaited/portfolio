

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DABCsUVK.js","_app/immutable/chunks/scheduler.DiI7PgUF.js","_app/immutable/chunks/index.BsWj_o-U.js"];
export const stylesheets = [];
export const fonts = [];
