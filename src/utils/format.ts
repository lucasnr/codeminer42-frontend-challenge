const locale = 'pt-BR'; // 1.000,00
const moneyFormatter = new Intl.NumberFormat(locale, {
	minimumFractionDigits: 2,
});

export function formatMoney(number: number) {
	return moneyFormatter.format(number);
}
