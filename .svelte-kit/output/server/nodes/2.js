

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.BXlT3O9U.js","_app/immutable/chunks/scheduler._PVTacox.js","_app/immutable/chunks/index.CWV-FYsQ.js"];
export const stylesheets = ["_app/immutable/assets/2.B28D5XPt.css"];
export const fonts = [];
