export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.ico","favicon.png","robots.txt","sitemap.txt"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain"},
	_: {
		client: {"start":"_app/immutable/entry/start.fi_5DbXe.js","app":"_app/immutable/entry/app.C2OsJhfn.js","imports":["_app/immutable/entry/start.fi_5DbXe.js","_app/immutable/chunks/entry.Dq1h-SPO.js","_app/immutable/chunks/scheduler.DiI7PgUF.js","_app/immutable/chunks/index.BRbX23SW.js","_app/immutable/entry/app.C2OsJhfn.js","_app/immutable/chunks/scheduler.DiI7PgUF.js","_app/immutable/chunks/index.BsWj_o-U.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";