export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["cv.pdf","favicon.ico","favicon.png","robots.txt","sitemap.txt","sitemap.xml"]),
	mimeTypes: {".pdf":"application/pdf",".png":"image/png",".txt":"text/plain",".xml":"text/xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.C1L-wKw3.js","app":"_app/immutable/entry/app.z5dm94hQ.js","imports":["_app/immutable/entry/start.C1L-wKw3.js","_app/immutable/chunks/entry.BvEXZ26A.js","_app/immutable/chunks/scheduler.rHNyJg8M.js","_app/immutable/chunks/index.Ct5PZE8B.js","_app/immutable/entry/app.z5dm94hQ.js","_app/immutable/chunks/scheduler.rHNyJg8M.js","_app/immutable/chunks/index.BmuBWEB0.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
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
