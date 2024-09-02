

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.jhi34h6l.js","_app/immutable/chunks/scheduler.DiI7PgUF.js","_app/immutable/chunks/index.BsWj_o-U.js","_app/immutable/chunks/index.BRbX23SW.js"];
export const stylesheets = ["_app/immutable/assets/2.GLtqamx5.css"];
export const fonts = [];
