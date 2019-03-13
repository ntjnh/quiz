const { dest, parallel, series, src, watch } = require("gulp");
const babel = require("gulp-babel");

const transpile = () => {
    return src("src/index.jsx")
        .pipe(babel({
            presets: ['@babel/env', '@babel/react'],
            plugins: ['transform-react-jsx']
        }))
        .pipe(dest('src/js'));
};

exports.default = series(transpile);