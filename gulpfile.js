/*
* gulp工具主文件：帮助我们完成重复性工作
* gulp机制，将重复性工作定义成一个个任务
*代码都是有node执行 
* */

/*载入gulp模块*/
var gulp = require('gulp'); 
//本地服务器
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

/*定义任务*/
//复制文件
var htmlmin = require('gulp-htmlmin');
gulp.task('copy', function() {
    // 将你的默认的任务代码放在这
    gulp.src("src/index.html")
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments:true,
            removeScriptTypeAttributes : true,
            removeStyleLinkTypeAttributes : true
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({stream: true}));
});



//转换文件 压缩文件
var less = require('gulp-less');//less -->css
var cssnano = require('gulp-cssnano');//压缩,没有必要合并，less可以通过@import实现样式导入样式
const autoprefixer = require('gulp-autoprefixer');

//_less --> css --->压缩--->自动补全：src/less/*.less -->src/css/*.css --->copy
gulp.task('less', function () {
    return gulp.src('src/style/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(reload({stream: true}));
});
gulp.task('cssCopy', function () {
    return gulp.src(['src/css/*.css',"!src/css/_*.css"])
        .pipe(gulp.dest('dist/css/'))
        .pipe(reload({stream: true}));
});

//js -->压缩 -->合并
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//js压缩:有时候可能只用压缩，不需要合并
gulp.task('jsmin', function () {
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream: true}));
});

//js合并压缩
gulp.task('script', function () {
    return gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream: true}));
});

// 最小化照片
const imagemin = require('gulp-imagemin');
 
gulp.task('imgmin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({stream: true}));
);

//打开服务器
// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });

   gulp.watch("src/index.html",["copy"]);//拷贝html 
   gulp.watch("src/style/less/*.less",["less"]); //less --> css --->压缩-->自动全部
   gulp.watch(['src/css/*.css',"!src/css/_*.css"],["cssCopy"]); //less --> css --->压缩-->自动全部

   //gulp.watch("src/js/*.js",["script"]); //压缩合并js,有时候可能不用合并，看情况script任务与jsconcat任务取其中一个即可
   gulp.watch("src/js/*.js",["jsmin"]); //压缩合并js,有时候可能不用合并，看情况
   gulp.watch("src/images/*",["imgmin"]); //压缩合并js,有时候可能不用合并，看情况
});



