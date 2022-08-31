module.exports = {
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		[
			'postcss-pxtorem',
			{
				rootValue:16,//结果为：设计稿元素尺寸/16，比如元素宽320px,最终页面会换算成 20rem
				propList: ['*'],
				exclude: file => {
					// 传入的每一个file都是用到的less,可以选择直接return false
					return false
				}
			}
		]
	]
}