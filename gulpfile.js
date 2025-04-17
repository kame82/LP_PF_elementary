//common
const gulp = require("gulp"); //gulp本体
const debug = require("gulp-debug"); //処理中のファイルをログ表示
const changed = require("gulp-changed");

//scss
const sass = require("gulp-dart-sass"); //Dart Sass はSass公式が推奨 @use構文などが使える
const plumber = require("gulp-plumber"); // エラーが発生しても強制終了させない
const notify = require("gulp-notify"); // エラー発生時のアラート出力
const browserSync = require("browser-sync"); //ブラウザリロード
const autoprefixer = require("gulp-autoprefixer"); //ベンダープレフィックス自動付与
const gcmq = require("gulp-group-css-media-queries"); //メディアクエリを一つにまとめる
const sassGlob = require("gulp-sass-glob-use-forward"); //dartSassでglob使う

//img
const webp = require("gulp-webp"); //webpに変換

/* imagemin */
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminSvgo = require("imagemin-svgo");

// 入出力するフォルダを指定
const baseRoot = "./public_html";
const srcBase = "./src";
const distBase = "./public_html/assets";

const srcPath = {
  scss: srcBase + "/scss/**/*.scss",
  html: baseRoot + "/**/*.html",
  img: srcBase + "/img/**/*.*",
  js: distBase + "/js/*.js",
  php: baseRoot + "/**/*.php",
};

const distPath = {
  css: distBase + "/css/",
  html: baseRoot + "/",
  img: distBase + "/img/",
  js: distBase + "/js/",
  php: baseRoot + "/",
};

const TARGET_BROWSERS = [
  "last 2 versions", //各ブラウザの2世代前までのバージョンを担保
  "ie >= 11", //IE11を担保
];

/**
 * sass
 *
 */
const cssSass = () => {
  return gulp
    .src(srcPath.scss, {
      sourcemaps: true,
    })
    .pipe(sassGlob())
    .pipe(
      //エラーが出ても処理を止めない
      plumber({
        errorHandler: notify.onError("Error:<%= error.message %>"),
      })
    )
    .pipe(sass({ outputStyle: "expanded" })) //指定できるキー expanded compressed
    .pipe(gcmq())
    .pipe(autoprefixer(TARGET_BROWSERS)) // ベンダープレフィックス自動付与
    .pipe(gulp.dest(distPath.css, { sourcemaps: "./" })) //コンパイル先
    .pipe(browserSync.stream())
    .pipe(
      notify({
        message: "Sassをコンパイルしました！",
        onLast: true,
      })
    );
};

/**
 * html
 */
const html = () => {
  console.log("srcPath", srcPath);
  console.log("distPath", distPath);
  return gulp.src(srcPath.html).pipe(gulp.dest(distPath.html));
};
/**
 * js
 */
const js = () => {
  return gulp.src(srcPath.js).pipe(gulp.dest(distPath.js));
};

/**
 * img
 */
// image===========================================
/**
 * @see https://github.com/svg/svgo#built-in-plugins
 */
const imageminOption = [
  imageminPngquant({ quality: [0.65, 0.8] }),
  imageminMozjpeg({ quality: 80 }),
  imageminSvgo({
    plugins: [
      { removeViewBox: false },
      { removeAttrs: { attrs: [/* 'fill', 'class',  */ "id", "data-name" /* 'stroke' */] } },
      // { removeUselessStrokeAndFill: false },
      // { removeStyleElement: true },

      /**
       * @see https://qiita.com/manabuyasuda/items/01a76204f97cd73ffc4e
       */
      // viewBox属性を削除する（widthとheight属性がある場合）。
      // 表示が崩れる原因になるので削除しない。
      // { removeViewBox: false },
      // { removeAttrs: { attrs: [/* 'fill', 'class',  */'id', 'data-name', /* 'stroke' */] } },
      // <metadata>を削除する。
      // 追加したmetadataを削除する必要はない。
      { removeMetadata: false },
      // SVGの仕様に含まれていないタグや属性、id属性やvertion属性を削除する。
      // 追加した要素を削除する必要はない。
      { removeUnknownsAndDefaults: false },
      // コードが短くなる場合だけ<path>に変換する。
      // アニメーションが動作しない可能性があるので変換しない。
      { convertShapeToPath: false },
      // 重複や不要な`<g>`タグを削除する。
      // アニメーションが動作しない可能性があるので変換しない。
      { collapseGroups: false },
      // SVG内に<style>や<script>がなければidを削除する。
      // idにアンカーが貼られていたら削除せずにid名を縮小する。
      // id属性は動作の起点となることがあるため削除しない。
      { cleanupIDs: false },
    ],
  }),
  imagemin.gifsicle({
    interlaced: false,
    optimizationLevel: 1,
    colors: 256,
  }),
];
const imageminFunc = () => {
  /* webp */
  gulp
    .src(srcBase + "/img/**/*.+(jpg|jpeg|png)")
    .pipe(webp())
    .pipe(gulp.dest(distPath.img));

  return gulp
    .src(srcBase + "/img/**/!(_)*.{jpg,jpeg,png,gif,svg,ico,webp}")
    .pipe(
      //エラーが出ても処理を止めない
      plumber({
        errorHandler: notify.onError("Error:<%= error.message %>"),
      })
    )
    .pipe(changed(distPath.img))
    .pipe(imagemin(imageminOption, { verbose: true }))
    .pipe(gulp.dest(distPath.img));
};

// const imageWebp = () => {
//   return gulp
//     .src(srcBase + '/img/**/*.+(jpg|jpeg|png)')
//     .pipe(webp())
//     .pipe(gulp.dest(distPath.img));
// }

/**
 * ローカルサーバー立ち上げ
 */
const browserSyncFunc = () => {
  browserSync.init(browserSyncOption);
};

const browserSyncOption = {
  /**静的サイトは無効 / WPは有効にする**/
  // proxy: "http://gulp-test.local",// ローカルにある「Site Domain」に合わせる

  // notify: false,// ブラウザ更新時に出てくる通知を非表示にする
  // open: "external",// ローカルIPアドレスでサーバを立ち上げる

  /**静的サイトは有効 / WPは無効にする**/
  server: {
    baseDir: "./public_html",
    index: ["index.html"],
  },

  ghostMode: {
    // 同期設定
    clicks: false,
    forms: false,
    scroll: false,
  },
};

/**
 * リロード
 */
const browserSyncReload = (done) => {
  browserSync.reload();
  done();
};

/**
 *
 * ファイル監視 ファイルの変更を検知したら、browserSyncReloadでreloadメソッドを呼び出す
 * series 順番に実行
 * watch('監視するファイル',処理)
 */
const watchFiles = () => {
  gulp.watch(srcPath.scss, gulp.series(cssSass)); //Sassコンパイル
  gulp.watch(srcPath.img, gulp.series(imageminFunc, browserSyncReload)); //Img圧縮
  gulp.watch(srcPath.html, gulp.series(browserSyncReload)); //html変更検出
  gulp.watch(srcPath.php, gulp.series(browserSyncReload)); //html変更検出
  gulp.watch(srcPath.js, gulp.series(browserSyncReload)); //html変更検出
};

/**
 * seriesは「順番」に実行
 * parallelは並列で実行
 */

// npx gulpで起動
exports.default = gulp.series(
  gulp.parallel(html, js, cssSass, imageminFunc), //初回起動時のみ実行
  gulp.parallel(watchFiles, browserSyncFunc) //ファイル変更を検知するたび(watchFiles)に画面リロード(browserSyncFunc)
);
