const container = document.querySelector('.container');
const menu = document.querySelector('.navigation__list');
const score = document.querySelector('.score');

const links = [{
		title: 'Action (set A)',
		image: "./src/image/links/dance.jpg",
	},
	{
		title: 'Action (set B)',
		image: './src/image/links/swim.bddf0687.jpg',
	},
	{
		title: 'Animal (set A)',
		image: './src/image/links/bird.f0a80efa.jpg',
	}, {
		title: 'Animal (set B)',
		image: './src/image/links/dog.jpg',
	}, {
		title: 'Clothes',
		image: './src/image/links/blouse.jpg',
	}, {
		title: 'Emotions',
		image: './src/image/links/smile.jpg',
	},
	{
		title: 'Transport',
		image: './src/image/links/transport.jpg',
	},
	{
		title: 'Sport',
		image: './src/image/links/sport.jpg',
	},
]

const cards = [
	[{
			word: 'cry',
			translation: 'плакать',
			image: './src/image/cards/cry.jpg',
			audioSrc: './src/audio/cry.mp3'
		},
		{
			word: 'dance',
			translation: 'танцевать',
			image: './src/image/cards/dance.jpg',
			audioSrc: './src/audio/dance.mp3'
		},
		{
			word: 'dive',
			translation: 'нырять',
			image: './src/image/cards/dive.jpg',
			audioSrc: './src/audio/dive.mp3'
		},
		{
			word: 'draw',
			translation: 'рисовать',
			image: './src/image/cards/draw.jpg',
			audioSrc: './src/audio/draw.mp3'
		},
		{
			word: 'fish',
			translation: 'ловить рыбу',
			image: './src/image/cards/fish.jpg',
			audioSrc: './src/audio/fish.mp3'
		},
		{
			word: 'fly',
			translation: 'летать',
			image: './src/image/cards/fly.jpg',
			audioSrc: './src/audio/fly.mp3'
		},
		{
			word: 'hug',
			translation: 'обнимать',
			image: './src/image/cards/hug.jpg',
			audioSrc: './src/audio/hug.mp3'
		},
		{
			word: 'jump',
			translation: 'прыгать',
			image: './src/image/cards/jump.jpg',
			audioSrc: './src/audio/jump.mp3'
		}
	],
	[{
			word: 'open',
			translation: 'открывать',
			image: './src/image/cards/open.jpg',
			audioSrc: './src/audio/open.mp3'
		},
		{
			word: 'play',
			translation: 'играть',
			image: './src/image/cards/play.jpg',
			audioSrc: './src/audio/play.mp3'
		},
		{
			word: 'point',
			translation: 'указывать',
			image: './src/image/cards/point.jpg',
			audioSrc: './src/audio/point.mp3'
		},
		{
			word: 'ride',
			translation: 'ездить',
			image: './src/image/cards/ride.jpg',
			audioSrc: './src/audio/ride.mp3'
		},
		{
			word: 'run',
			translation: 'бегать',
			image: './src/image/cards/run.jpg',
			audioSrc: './src/audio/run.mp3'
		},
		{
			word: 'sing',
			translation: 'петь',
			image: './src/image/cards/sing.jpg',
			audioSrc: './src/audio/sing.mp3'
		},
		{
			word: 'skip',
			translation: 'пропускать, прыгать',
			image: './src/image/cards/skip.jpg',
			audioSrc: './src/audio/skip.mp3'
		},
		{
			word: 'swim',
			translation: 'плавать',
			image: './src/image/cards/swim.jpg',
			audioSrc: './src/audio/swim.mp3'
		}
	],
	[{
			word: 'cat',
			translation: 'кот',
			image: './src/image/cards/cat.jpg',
			audioSrc: './src/audio/cat.mp3'
		},
		{
			word: 'chick',
			translation: 'цыплёнок',
			image: './src/image/cards/chick.jpg',
			audioSrc: './src/audio/chick.mp3'
		},
		{
			word: 'chicken',
			translation: 'курица',
			image: './src/image/cards/chicken.jpg',
			audioSrc: './src/audio/chicken.mp3'
		},
		{
			word: 'dog',
			translation: 'собака',
			image: './src/image/cards/dog.jpg',
			audioSrc: './src/audio/dog.mp3'
		},
		{
			word: 'horse',
			translation: 'лошадь',
			image: './src/image/cards/horse.jpg',
			audioSrc: './src/audio/horse.mp3'
		},
		{
			word: 'pig',
			translation: 'свинья',
			image: './src/image/cards/pig.jpg',
			audioSrc: './src/audio/pig.mp3'
		},
		{
			word: 'rabbit',
			translation: 'кролик',
			image: './src/image/cards/rabbit.jpg',
			audioSrc: './src/audio/rabbit.mp3'
		},
		{
			word: 'sheep',
			translation: 'овца',
			image: './src/image/cards/sheep.jpg',
			audioSrc: './src/audio/sheep.mp3'
		}
	],
	[{
			word: 'bird',
			translation: 'птица',
			image: './src/image/cards/bird.jpg',
			audioSrc: './src/audio/bird.mp3'
		},
		{
			word: 'fish',
			translation: 'рыба',
			image: './src/image/cards/fish1.jpg',
			audioSrc: './src/audio/fish.mp3'
		},
		{
			word: 'frog',
			translation: 'жаба',
			image: './src/image/cards/frog.jpg',
			audioSrc: './src/audio/frog.mp3'
		},
		{
			word: 'giraffe',
			translation: 'жирафа',
			image: './src/image/cards/giraffe.jpg',
			audioSrc: './src/audio/giraffe.mp3'
		},
		{
			word: 'lion',
			translation: 'лев',
			image: './src/image/cards/lion.jpg',
			audioSrc: './src/audio/lion.mp3'
		},
		{
			word: 'mouse',
			translation: 'мышь',
			image: './src/image/cards/mouse.jpg',
			audioSrc: './src/audio/mouse.mp3'
		},
		{
			word: 'turtle',
			translation: 'черепаха',
			image: './src/image/cards/turtle.jpg',
			audioSrc: './src/audio/turtle.mp3'
		},
		{
			word: 'dolphin',
			translation: 'дельфин',
			image: './src/image/cards/dolphin.jpg',
			audioSrc: './src/audio/dolphin.mp3'
		}
	],
	[{
			word: 'skirt',
			translation: 'юбка',
			image: './src/image/cards/skirt.jpg',
			audioSrc: './src/audio/skirt.mp3'
		},
		{
			word: 'pants',
			translation: 'брюки',
			image: './src/image/cards/pants.jpg',
			audioSrc: './src/audio/pants.mp3'
		},
		{
			word: 'blouse',
			translation: 'блузка',
			image: './src/image/cards/blouse.jpg',
			audioSrc: './src/audio/blouse.mp3'
		},
		{
			word: 'dress',
			translation: 'платье',
			image: './src/image/cards/dress.jpg',
			audioSrc: './src/audio/dress.mp3'
		},
		{
			word: 'boot',
			translation: 'ботинок',
			image: './src/image/cards/boot.jpg',
			audioSrc: './src/audio/boot.mp3'
		},
		{
			word: 'shirt',
			translation: 'рубашка',
			image: './src/image/cards/shirt.jpg',
			audioSrc: './src/audio/shirt.mp3'
		},
		{
			word: 'coat',
			translation: 'пальто',
			image: './src/image/cards/coat.jpg',
			audioSrc: './src/audio/coat.mp3'
		},
		{
			word: 'shoe',
			translation: 'туфли',
			image: './src/image/cards/shoe.jpg',
			audioSrc: './src/audio/shoe.mp3'
		}
	],
	[{
			word: 'sad',
			translation: 'грустный',
			image: './src/image/cards/sad.jpg',
			audioSrc: './src/audio/sad.mp3'
		},
		{
			word: 'angry',
			translation: 'сердитый',
			image: './src/image/cards/angry.jpg',
			audioSrc: './src/audio/angry.mp3'
		},
		{
			word: 'happy',
			translation: 'счастливый',
			image: './src/image/cards/happy.jpg',
			audioSrc: './src/audio/happy.mp3'
		},
		{
			word: 'tired',
			translation: 'уставший',
			image: './src/image/cards/tired.jpg',
			audioSrc: './src/audio/tired.mp3'
		},
		{
			word: 'surprised',
			translation: 'удивлённый',
			image: './src/image/cards/surprised.jpg',
			audioSrc: './src/audio/surprised.mp3'
		},
		{
			word: 'scared',
			translation: 'испуганный',
			image: './src/image/cards/scared.jpg',
			audioSrc: './src/audio/scared.mp3'
		},
		{
			word: 'smile',
			translation: 'улыбка',
			image: './src/image/cards/smile.jpg',
			audioSrc: './src/audio/smile.mp3'
		},
		{
			word: 'laugh',
			translation: 'смех',
			image: './src/image/cards/laugh.jpg',
			audioSrc: './src/audio/laugh.mp3'
		}
	],
	[{
			word: 'car',
			translation: 'машина',
			image: './src/image/cards/car.jpg',
			audioSrc: './src/audio/car.mp3'
		},
		{
			word: 'bicycle',
			translation: 'велосипед',
			image: './src/image/cards/bicycle.jpg',
			audioSrc: './src/audio/bicycle.mp3'
		},
		{
			word: 'bus',
			translation: 'автобус',
			image: './src/image/cards/bus.jpg',
			audioSrc: './src/audio/bus.mp3'
		},
		{
			word: 'motorbike',
			translation: 'мотоцикл',
			image: './src/image/cards/motorbike.jpg',
			audioSrc: './src/audio/motorbike.mp3'
		},
		{
			word: 'airplane',
			translation: 'самолет',
			image: './src/image/cards/airplane.jpg',
			audioSrc: './src/audio/airplane.mp3'
		},
		{
			word: 'ship',
			translation: 'корабль',
			image: './src/image/cards/ship.jpg',
			audioSrc: './src/audio/ship.mp3'
		},
		{
			word: 'helicopter',
			translation: 'вертолет',
			image: './src/image/cards/helicopter.jpg',
			audioSrc: './src/audio/helicopter.mp3'
		},
		{
			word: 'tram',
			translation: 'трамвай',
			image: './src/image/cards/tram.jpg',
			audioSrc: './src/audio/tram.mp3'
		}
	],
	[
		{
			word: 'football',
			translation: 'футбол',
			image: './src/image/cards/football.jpg',
			audioSrc: './src/audio/football.mp3'
		},
		{
			word: 'hockey',
			translation: 'хоккей',
			image: './src/image/cards/hockey.jpg',
			audioSrc: './src/audio/hockey.mp3'
		},
		{
			word: 'swimming',
			translation: 'плавание',
			image: './src/image/cards/swimming.jpeg',
			audioSrc: './src/audio/swimming.mp3'
		},
		{
			word: 'basketball',
			translation: 'баскетбол',
			image: './src/image/cards/basketball.jpg',
			audioSrc: './src/audio/basketball.mp3'
		},
		{
			word: 'tennis',
			translation: 'тенис',
			image: './src/image/cards/tennis.jpg',
			audioSrc: './src/audio/tennis.mp3'
		},
		{
			word: 'rugby',
			translation: 'регби',
			image: './src/image/cards/rugby.jpg',
			audioSrc: './src/audio/rugby.mp3'
		},
		{
			word: 'polo',
			translation: 'поло',
			image: './src/image/cards/polo.jpg',
			audioSrc: './src/audio/polo.mp3'
		},
		{
			word: 'boxing',
			translation: 'бокс',
			image: './src/image/cards/boxing.jpg',
			audioSrc: './src/audio/boxing.mp3'
		}
	]
]

export {
	cards,
	links,
	container,
	menu,
	score
};