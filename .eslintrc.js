module.exports = {
    // 环境
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },    
    // 使用的扩展库
    "extends":"airbnb",
    // 全局变量
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    // 解析器用于解析代码
    "parser": "babel-eslint",
    // 解析器配置
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    // 第三方插件
    "plugins": [
        "react"
    ],
    // 规则
    "rules": {
        "react/jsx-uses-react": 2,
        "react/react-in-jsx-scope": 2,
        "indent": ["error","tab"],
        "linebreak-style":["error","windows"],
        "quotes":["error","single"],
        "semi":["error","always"],
        "react/jsx-indent":["error","tab"],
        "react/jsx-indent-props":["error","tab"],
        "no-tabs": "off",
        "no-restricted-syntax": 0,
        "guard-for-in":0,
        "react/jsx-filename-extension":[1,{"extensions":[".js",".jsx"]}],
        "react/prefer-stateless-function": 0,
        "global-require": 0,
        "import/no-unresolved": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "react/prop-types": 0,
        "array-callback-return": 0,
        "consistent-return": 0
    }
};