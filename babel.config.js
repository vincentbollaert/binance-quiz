module.exports = api => {
  const isTest = api.env('test')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
        '@babel/preset-react',
      ],
    ],
    plugins: [
      'react-hot-loader/babel',
      'syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties'
    ],
    env: {
      production: {
        plugins: [
          '@babel/plugin-transform-react-inline-elements',
          'transform-react-remove-prop-types',
          '@babel/plugin-transform-react-constant-elements' // hoists react elements, preventing unneccesary reinstantiations
        ]
      },
      test: {
        plugins: [
          '@babel/plugin-transform-modules-commonjs',
          'babel-plugin-transform-es2015-modules-commonjs', // not working
          'dynamic-import-node' // try this one too why not
        ]
      }
    }
  }
}
