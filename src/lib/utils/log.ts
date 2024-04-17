import chalk from 'chalk'
// import 'dotenv/config'
const IS_DEV = '1'
const styles = {
	tomato: chalk.hex('#000000').bgHex('#ff6347'),
	aqua: chalk.hex('#000000').bgHex('#7ffd4'),
	white: chalk.hex('#000000').bgHex('#ffffff'),
	black: chalk.hex('#ffffff').bgHex('#000000')
}

export default {
	hooks(text: string) {
		IS_DEV == '1' && console.log(styles.tomato(text))
	},
	layout(text: string) {
		IS_DEV == '1' && console.log(styles.aqua(text))
	},
	page(text: string) {
		IS_DEV == '1' && console.log(styles.white(text))
	},
	endpoint(text: string) {
		console.log(styles.black(text))
	},
	bold(text: string) {
		console.log(chalk.bold(text))
	}
}
