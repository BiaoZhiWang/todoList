var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var less=require('gulp-less');
var minifyCss=require('gulp-minify-css')
var rename=require('gulp-rename');

gulp.task('html',function(){
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhiteSpace:true,
            removeComments:true
        }))
        .pipe(gulp.dest('../todoList-min'))
});

gulp.task('html-template',function(){
    gulp.src('viewHTMLTemplate/*.html')
        .pipe(htmlmin({
            collapseWhiteSpace:true,
            removeComments:true
        }))
        .pipe(gulp.dest('../todoList-min/viewHTMLTemplate'))
});

gulp.task('packet-json',function(){
    gulp.src(['packet'])
        .pipe(gulp.dest('../todoList-min'))
});
gulp.task('js-min',function(){
    gulp.src(['js/*.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix:'.min'
        }))
        .pipe(gulp.dest('../todoList-min/js'))
});
//gulp.task('js-native',function(){
//    gulp.src(['js/common/*.js'])
//        .pipe(rename({
//            suffix:'.native'
//        }))
//        .pipe(gulp.dest('../minSource/js'))
//});
gulp.task('css-min',function(){
    gulp.src(['css/*.css'])

        .pipe(minifyCss())
        .pipe(gulp.dest('../todoList-min/css'))
});

//gulp.task('changed',function(){
//	gulp.src(['**/*.*','**/**/*.*']).
//		pipe
//});

gulp.task('default',function(){
    gulp.run('html');
    gulp.run('js-min');
    //gulp.run('js-native');
    gulp.run('css-min');
    gulp.run('packet-json');
    gulp.run('html-template');
});

gulp.watch(['**/*.*','**/**/*.*'],function(){
    gulp.run('default');
});
