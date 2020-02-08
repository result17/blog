// ts写法？
const importAll = (requireContext: _webpackModlueApi.RequireContext) => requireContext.keys().forEach(requireContext)

try {
  importAll(require.context('../assets/icons', true, /\.svg$/))
} catch (error) {
  console.error(error)
}