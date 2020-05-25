const vocabulary = {
	en: {
		0: 'Sunday',
		1: 'Monday',
		2: 'Tuesday',
		3: 'Wednesday',
		4: 'Thursday',
		5: 'Friday',
		6: 'Suturday',
		longitude: 'Longitude',
		latitude: 'latitude',
	},
	be: {
		0: 'Нядзеля',
		1: 'Панядзелак',
		2: 'Аўторак',
		3: 'Серада',
		4: 'Чацвер',
		5: 'Пятнiца',
		6: 'Субота',
		longitude: 'Даўгата',
		latitude: 'Шырата',
	},
	ru: {
		0: 'Воскресенье',
		1: 'Понедельник',
		2: 'Вторник',
		3: 'Среда',
		4: 'Четверг',
		5: 'Пятница',
		6: 'Суббота',
		longitude: 'Долгота',
		latitude: 'Широта',
	},
};

export default function translate(language, word) {
	return vocabulary[language][word];
}
