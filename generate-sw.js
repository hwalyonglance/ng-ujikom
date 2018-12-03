const workboxBuild = require('workbox-build');
const SRC_DIR = 'src';
const BUILD_DIR = 'functions/public';
const SW = 'sw.js';
const globPatterns = [
	'**/*',
	'**/**',
	'assets',
	'assets/*',
	'assets/**'
];

const globIgnores = [
	'sw.js'
];

const input = {
	swSrc: `${SRC_DIR}/${SW}`,
	swDest: `${BUILD_DIR}/${SW}`,
	globDirectory: BUILD_DIR,
	globPatterns: globPatterns,
	globIgnores: globIgnores,
	maximumFileSizeToCacheInBytes: 4000000000000
};

workboxBuild.injectManifest(input).then(() => {
	console.log(`The service worker ${BUILD_DIR}/${SW} has been injected with a precache list.`);
});
// ngrw127 | n123 | coc.snk@gmail.com // Kotlin
// ngrw126 | gantisaya123 | coc.snk@gmail.com
// ngrw123 | gantisaya | mrci69iykwim@gmail.com //
// ngrw121 | gantisaya123 | mrci69iykwim@gmail.com // ngrw4 + Phaser
// ngrw122 | gantisaya123 | kepsek.paket2.ujikom2018@gmail.com //
// ngrwcore | n123 | paket2.ujikom2018@gmail.com // Lodash
// ngrw129 | gantisaya123 | petugas.paket2.ujikom2018@gmail.com // Typescript + Bazel
/**
* todo: 090453
*
*	pribadi, resmi, keluarga, sosial, niaga, dinas, pengantar, rahasia,
*	konfidensial, biasa, memo, nota, pengumuman, edaran, kilat, terbuka, tertutup
*
*	edit
*	backup restore
*	pdf
*	signup email
*	login
*	validasi form
*	konfirmasi hapus dll
*
*/
