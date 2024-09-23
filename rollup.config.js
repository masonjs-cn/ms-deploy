const resolve = require('@rollup/plugin-node-resolve')

module.exports = [
  {
    input: './src/index.js',
    output: [
      {
        dir: 'lib',
        format: 'esm',
        entryFileNames: '[name].esm.js',
        sourcemap: false // 是否输出sourcemap
      }
    ],
    plugins: [resolve()]
  }
]
