import {keyBy} from 'lodash';

export type EmojiData = {
    emoji: string;
    emojiKey: string;
    emojiName: string;
    emojiDescription: string;
    hasVideo: boolean;
}

export const emojiData: EmojiData[] = [
	{
		'emoji': '\ud83d\ude00',
		'emojiKey': '1f600',
		'emojiName': 'grinning',
		'emojiDescription': 'grinning,grinning face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude03',
		'emojiKey': '1f603',
		'emojiName': 'smiley',
		'emojiDescription': 'smiley,smiling face with open mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude04',
		'emojiKey': '1f604',
		'emojiName': 'smile',
		'emojiDescription': 'smile,smiling face with open mouth and smiling eyes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude01',
		'emojiKey': '1f601',
		'emojiName': 'grin',
		'emojiDescription': 'grin,grinning face with smiling eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude06',
		'emojiKey': '1f606',
		'emojiName': 'laughing',
		'emojiDescription': 'laughing,satisfied,smiling face with open mouth and tightly-closed eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude05',
		'emojiKey': '1f605',
		'emojiName': 'sweat smile',
		'emojiDescription': 'sweat smile,smiling face with open mouth and cold sweat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd23',
		'emojiKey': '1f923',
		'emojiName': 'rolling on the floor laughing',
		'emojiDescription': 'rolling on the floor laughing',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude02',
		'emojiKey': '1f602',
		'emojiName': 'joy',
		'emojiDescription': 'joy,face with tears of joy',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude42',
		'emojiKey': '1f642',
		'emojiName': 'slightly smiling face',
		'emojiDescription': 'slightly smiling face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude43',
		'emojiKey': '1f643',
		'emojiName': 'upside-down face',
		'emojiDescription': 'upside-down face,upside down face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee0',
		'emojiKey': '1fae0',
		'emojiName': 'melting face',
		'emojiDescription': 'melting face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude09',
		'emojiKey': '1f609',
		'emojiName': 'wink',
		'emojiDescription': 'wink,winking face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0a',
		'emojiKey': '1f60a',
		'emojiName': 'blush',
		'emojiDescription': 'blush,smiling face with smiling eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude07',
		'emojiKey': '1f607',
		'emojiName': 'innocent',
		'emojiDescription': 'innocent,smiling face with halo',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd70',
		'emojiKey': '1f970',
		'emojiName': 'smiling face with 3 hearts',
		'emojiDescription': 'smiling face with 3 hearts,smiling face with smiling eyes and three hearts',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0d',
		'emojiKey': '1f60d',
		'emojiName': 'heart eyes',
		'emojiDescription': 'heart eyes,smiling face with heart-shaped eyes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd29',
		'emojiKey': '1f929',
		'emojiName': 'star-struck',
		'emojiDescription': 'star-struck,grinning face with star eyes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude18',
		'emojiKey': '1f618',
		'emojiName': 'kissing heart',
		'emojiDescription': 'kissing heart,face throwing a kiss',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude17',
		'emojiKey': '1f617',
		'emojiName': 'kissing',
		'emojiDescription': 'kissing,kissing face',
		'hasVideo': true
	},
	{
		'emoji': '\u263a\ufe0f',
		'emojiKey': '263a-fe0f',
		'emojiName': 'relaxed',
		'emojiDescription': 'relaxed,white smiling face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1a',
		'emojiKey': '1f61a',
		'emojiName': 'kissing closed eyes',
		'emojiDescription': 'kissing closed eyes,kissing face with closed eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude19',
		'emojiKey': '1f619',
		'emojiName': 'kissing smiling eyes',
		'emojiDescription': 'kissing smiling eyes,kissing face with smiling eyes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd72',
		'emojiKey': '1f972',
		'emojiName': 'smiling face with tear',
		'emojiDescription': 'smiling face with tear',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0b',
		'emojiKey': '1f60b',
		'emojiName': 'yum',
		'emojiDescription': 'yum,face savouring delicious food',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1b',
		'emojiKey': '1f61b',
		'emojiName': 'stuck out tongue',
		'emojiDescription': 'stuck out tongue,face with stuck-out tongue',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1c',
		'emojiKey': '1f61c',
		'emojiName': 'stuck out tongue winking eye',
		'emojiDescription': 'stuck out tongue winking eye,face with stuck-out tongue and winking eye',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2a',
		'emojiKey': '1f92a',
		'emojiName': 'zany face',
		'emojiDescription': 'zany face,grinning face with one large and one small eye',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1d',
		'emojiKey': '1f61d',
		'emojiName': 'stuck out tongue closed eyes',
		'emojiDescription': 'stuck out tongue closed eyes,face with stuck-out tongue and tightly-closed eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd11',
		'emojiKey': '1f911',
		'emojiName': 'money-mouth face',
		'emojiDescription': 'money-mouth face,money mouth face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd17',
		'emojiKey': '1f917',
		'emojiName': 'hugging face',
		'emojiDescription': 'hugging face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2d',
		'emojiKey': '1f92d',
		'emojiName': 'face with hand over mouth',
		'emojiDescription': 'face with hand over mouth,smiling face with smiling eyes and hand covering mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee2',
		'emojiKey': '1fae2',
		'emojiName': 'face with open eyes and hand over mouth',
		'emojiDescription': 'face with open eyes and hand over mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee3',
		'emojiKey': '1fae3',
		'emojiName': 'face with peeking eye',
		'emojiDescription': 'face with peeking eye',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2b',
		'emojiKey': '1f92b',
		'emojiName': 'shushing face',
		'emojiDescription': 'shushing face,face with finger covering closed lips',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd14',
		'emojiKey': '1f914',
		'emojiName': 'thinking face',
		'emojiDescription': 'thinking face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee1',
		'emojiKey': '1fae1',
		'emojiName': 'saluting face',
		'emojiDescription': 'saluting face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd10',
		'emojiKey': '1f910',
		'emojiName': 'zipper-mouth face',
		'emojiDescription': 'zipper-mouth face,zipper mouth face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd28',
		'emojiKey': '1f928',
		'emojiName': 'face with raised eyebrow',
		'emojiDescription': 'face with raised eyebrow,face with one eyebrow raised',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude10',
		'emojiKey': '1f610',
		'emojiName': 'neutral face',
		'emojiDescription': 'neutral face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude11',
		'emojiKey': '1f611',
		'emojiName': 'expressionless',
		'emojiDescription': 'expressionless,expressionless face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude36',
		'emojiKey': '1f636',
		'emojiName': 'no mouth',
		'emojiDescription': 'no mouth,face without mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee5',
		'emojiKey': '1fae5',
		'emojiName': 'dotted line face',
		'emojiDescription': 'dotted line face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude36\u200d\ud83c\udf2b\ufe0f',
		'emojiKey': '1f636-200d-1f32b-fe0f',
		'emojiName': 'face in clouds',
		'emojiDescription': 'face in clouds',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0f',
		'emojiKey': '1f60f',
		'emojiName': 'smirk',
		'emojiDescription': 'smirk,smirking face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude12',
		'emojiKey': '1f612',
		'emojiName': 'unamused',
		'emojiDescription': 'unamused,unamused face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude44',
		'emojiKey': '1f644',
		'emojiName': 'face with rolling eyes',
		'emojiDescription': 'face with rolling eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2c',
		'emojiKey': '1f62c',
		'emojiName': 'grimacing',
		'emojiDescription': 'grimacing,grimacing face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2e\u200d\ud83d\udca8',
		'emojiKey': '1f62e-200d-1f4a8',
		'emojiName': 'face exhaling',
		'emojiDescription': 'face exhaling',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd25',
		'emojiKey': '1f925',
		'emojiName': 'lying face',
		'emojiDescription': 'lying face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0c',
		'emojiKey': '1f60c',
		'emojiName': 'relieved',
		'emojiDescription': 'relieved,relieved face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude14',
		'emojiKey': '1f614',
		'emojiName': 'pensive',
		'emojiDescription': 'pensive,pensive face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2a',
		'emojiKey': '1f62a',
		'emojiName': 'sleepy',
		'emojiDescription': 'sleepy,sleepy face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd24',
		'emojiKey': '1f924',
		'emojiName': 'drooling face',
		'emojiDescription': 'drooling face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude34',
		'emojiKey': '1f634',
		'emojiName': 'sleeping',
		'emojiDescription': 'sleeping,sleeping face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude37',
		'emojiKey': '1f637',
		'emojiName': 'mask',
		'emojiDescription': 'mask,face with medical mask',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd12',
		'emojiKey': '1f912',
		'emojiName': 'face with thermometer',
		'emojiDescription': 'face with thermometer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd15',
		'emojiKey': '1f915',
		'emojiName': 'face with head-bandage',
		'emojiDescription': 'face with head-bandage,face with head bandage',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd22',
		'emojiKey': '1f922',
		'emojiName': 'nauseated face',
		'emojiDescription': 'nauseated face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2e',
		'emojiKey': '1f92e',
		'emojiName': 'face vomiting',
		'emojiDescription': 'face vomiting,face with open mouth vomiting',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd27',
		'emojiKey': '1f927',
		'emojiName': 'sneezing face',
		'emojiDescription': 'sneezing face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd75',
		'emojiKey': '1f975',
		'emojiName': 'hot face',
		'emojiDescription': 'hot face,overheated face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd76',
		'emojiKey': '1f976',
		'emojiName': 'cold face',
		'emojiDescription': 'cold face,freezing face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd74',
		'emojiKey': '1f974',
		'emojiName': 'woozy face',
		'emojiDescription': 'woozy face,face with uneven eyes and wavy mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude35',
		'emojiKey': '1f635',
		'emojiName': 'dizzy face',
		'emojiDescription': 'dizzy face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude35\u200d\ud83d\udcab',
		'emojiKey': '1f635-200d-1f4ab',
		'emojiName': 'face with spiral eyes',
		'emojiDescription': 'face with spiral eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2f',
		'emojiKey': '1f92f',
		'emojiName': 'exploding head',
		'emojiDescription': 'exploding head,shocked face with exploding head',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd20',
		'emojiKey': '1f920',
		'emojiName': 'face with cowboy hat',
		'emojiDescription': 'face with cowboy hat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd73',
		'emojiKey': '1f973',
		'emojiName': 'partying face',
		'emojiDescription': 'partying face,face with party horn and party hat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd78',
		'emojiKey': '1f978',
		'emojiName': 'disguised face',
		'emojiDescription': 'disguised face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude0e',
		'emojiKey': '1f60e',
		'emojiName': 'sunglasses',
		'emojiDescription': 'sunglasses,smiling face with sunglasses',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd13',
		'emojiKey': '1f913',
		'emojiName': 'nerd face',
		'emojiDescription': 'nerd face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd0',
		'emojiKey': '1f9d0',
		'emojiName': 'face with monocle',
		'emojiDescription': 'face with monocle',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude15',
		'emojiKey': '1f615',
		'emojiName': 'confused',
		'emojiDescription': 'confused,confused face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee4',
		'emojiKey': '1fae4',
		'emojiName': 'face with diagonal mouth',
		'emojiDescription': 'face with diagonal mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1f',
		'emojiKey': '1f61f',
		'emojiName': 'worried',
		'emojiDescription': 'worried,worried face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude41',
		'emojiKey': '1f641',
		'emojiName': 'slightly frowning face',
		'emojiDescription': 'slightly frowning face',
		'hasVideo': true
	},
	{
		'emoji': '\u2639\ufe0f',
		'emojiKey': '2639-fe0f',
		'emojiName': 'frowning face',
		'emojiDescription': 'frowning face,white frowning face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2e',
		'emojiKey': '1f62e',
		'emojiName': 'open mouth',
		'emojiDescription': 'open mouth,face with open mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2f',
		'emojiKey': '1f62f',
		'emojiName': 'hushed',
		'emojiDescription': 'hushed,hushed face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude32',
		'emojiKey': '1f632',
		'emojiName': 'astonished',
		'emojiDescription': 'astonished,astonished face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude33',
		'emojiKey': '1f633',
		'emojiName': 'flushed',
		'emojiDescription': 'flushed,flushed face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd7a',
		'emojiKey': '1f97a',
		'emojiName': 'pleading face',
		'emojiDescription': 'pleading face,face with pleading eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd79',
		'emojiKey': '1f979',
		'emojiName': 'face holding back tears',
		'emojiDescription': 'face holding back tears',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude26',
		'emojiKey': '1f626',
		'emojiName': 'frowning',
		'emojiDescription': 'frowning,frowning face with open mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude27',
		'emojiKey': '1f627',
		'emojiName': 'anguished',
		'emojiDescription': 'anguished,anguished face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude28',
		'emojiKey': '1f628',
		'emojiName': 'fearful',
		'emojiDescription': 'fearful,fearful face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude30',
		'emojiKey': '1f630',
		'emojiName': 'cold sweat',
		'emojiDescription': 'cold sweat,face with open mouth and cold sweat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude25',
		'emojiKey': '1f625',
		'emojiName': 'disappointed relieved',
		'emojiDescription': 'disappointed relieved,disappointed but relieved face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude22',
		'emojiKey': '1f622',
		'emojiName': 'cry',
		'emojiDescription': 'cry,crying face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2d',
		'emojiKey': '1f62d',
		'emojiName': 'sob',
		'emojiDescription': 'sob,loudly crying face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude31',
		'emojiKey': '1f631',
		'emojiName': 'scream',
		'emojiDescription': 'scream,face screaming in fear',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude16',
		'emojiKey': '1f616',
		'emojiName': 'confounded',
		'emojiDescription': 'confounded,confounded face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude23',
		'emojiKey': '1f623',
		'emojiName': 'persevere',
		'emojiDescription': 'persevere,persevering face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude1e',
		'emojiKey': '1f61e',
		'emojiName': 'disappointed',
		'emojiDescription': 'disappointed,disappointed face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude13',
		'emojiKey': '1f613',
		'emojiName': 'sweat',
		'emojiDescription': 'sweat,face with cold sweat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude29',
		'emojiKey': '1f629',
		'emojiName': 'weary',
		'emojiDescription': 'weary,weary face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude2b',
		'emojiKey': '1f62b',
		'emojiName': 'tired face',
		'emojiDescription': 'tired face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd71',
		'emojiKey': '1f971',
		'emojiName': 'yawning face',
		'emojiDescription': 'yawning face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude24',
		'emojiKey': '1f624',
		'emojiName': 'triumph',
		'emojiDescription': 'triumph,face with look of triumph',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude21',
		'emojiKey': '1f621',
		'emojiName': 'rage',
		'emojiDescription': 'rage,pouting face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude20',
		'emojiKey': '1f620',
		'emojiName': 'angry',
		'emojiDescription': 'angry,angry face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd2c',
		'emojiKey': '1f92c',
		'emojiName': 'face with symbols on mouth',
		'emojiDescription': 'face with symbols on mouth,serious face with symbols covering mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude08',
		'emojiKey': '1f608',
		'emojiName': 'smiling imp',
		'emojiDescription': 'smiling imp,smiling face with horns',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc7f',
		'emojiKey': '1f47f',
		'emojiName': 'imp',
		'emojiDescription': 'imp',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc80',
		'emojiKey': '1f480',
		'emojiName': 'skull',
		'emojiDescription': 'skull',
		'hasVideo': true
	},
	{
		'emoji': '\u2620\ufe0f',
		'emojiKey': '2620-fe0f',
		'emojiName': 'skull and crossbones',
		'emojiDescription': 'skull and crossbones',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca9',
		'emojiKey': '1f4a9',
		'emojiName': 'poop',
		'emojiDescription': 'poop,shit,hankey,pile of poo',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd21',
		'emojiKey': '1f921',
		'emojiName': 'clown face',
		'emojiDescription': 'clown face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc79',
		'emojiKey': '1f479',
		'emojiName': 'japanese ogre',
		'emojiDescription': 'japanese ogre',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc7a',
		'emojiKey': '1f47a',
		'emojiName': 'japanese goblin',
		'emojiDescription': 'japanese goblin',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc7b',
		'emojiKey': '1f47b',
		'emojiName': 'ghost',
		'emojiDescription': 'ghost',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc7d',
		'emojiKey': '1f47d',
		'emojiName': 'alien',
		'emojiDescription': 'alien,extraterrestrial alien',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc7e',
		'emojiKey': '1f47e',
		'emojiName': 'alien monster',
		'emojiDescription': 'alien monster,space invader',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd16',
		'emojiKey': '1f916',
		'emojiName': 'robot face',
		'emojiDescription': 'robot face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3a',
		'emojiKey': '1f63a',
		'emojiName': 'smiley cat',
		'emojiDescription': 'smiley cat,smiling cat face with open mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude38',
		'emojiKey': '1f638',
		'emojiName': 'smile cat',
		'emojiDescription': 'smile cat,grinning cat face with smiling eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude39',
		'emojiKey': '1f639',
		'emojiName': 'joy cat',
		'emojiDescription': 'joy cat,cat face with tears of joy',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3b',
		'emojiKey': '1f63b',
		'emojiName': 'heart eyes cat',
		'emojiDescription': 'heart eyes cat,smiling cat face with heart-shaped eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3c',
		'emojiKey': '1f63c',
		'emojiName': 'smirk cat',
		'emojiDescription': 'smirk cat,cat face with wry smile',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3d',
		'emojiKey': '1f63d',
		'emojiName': 'kissing cat',
		'emojiDescription': 'kissing cat,kissing cat face with closed eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude40',
		'emojiKey': '1f640',
		'emojiName': 'scream cat',
		'emojiDescription': 'scream cat,weary cat face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3f',
		'emojiKey': '1f63f',
		'emojiName': 'crying cat face',
		'emojiDescription': 'crying cat face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude3e',
		'emojiKey': '1f63e',
		'emojiName': 'pouting cat',
		'emojiDescription': 'pouting cat,pouting cat face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude48',
		'emojiKey': '1f648',
		'emojiName': 'see no evil',
		'emojiDescription': 'see no evil,see-no-evil monkey',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude49',
		'emojiKey': '1f649',
		'emojiName': 'hear no evil',
		'emojiDescription': 'hear no evil,hear-no-evil monkey',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude4a',
		'emojiKey': '1f64a',
		'emojiName': 'speak no evil',
		'emojiDescription': 'speak no evil,speak-no-evil monkey',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc8b',
		'emojiKey': '1f48b',
		'emojiName': 'kiss',
		'emojiDescription': 'kiss,kiss mark',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc8c',
		'emojiKey': '1f48c',
		'emojiName': 'love letter',
		'emojiDescription': 'love letter',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc98',
		'emojiKey': '1f498',
		'emojiName': 'cupid',
		'emojiDescription': 'cupid,heart with arrow',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9d',
		'emojiKey': '1f49d',
		'emojiName': 'gift heart',
		'emojiDescription': 'gift heart,heart with ribbon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc96',
		'emojiKey': '1f496',
		'emojiName': 'sparkling heart',
		'emojiDescription': 'sparkling heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc97',
		'emojiKey': '1f497',
		'emojiName': 'heartpulse',
		'emojiDescription': 'heartpulse,growing heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc93',
		'emojiKey': '1f493',
		'emojiName': 'heartbeat',
		'emojiDescription': 'heartbeat,beating heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9e',
		'emojiKey': '1f49e',
		'emojiName': 'revolving hearts',
		'emojiDescription': 'revolving hearts',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc95',
		'emojiKey': '1f495',
		'emojiName': 'two hearts',
		'emojiDescription': 'two hearts',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9f',
		'emojiKey': '1f49f',
		'emojiName': 'heart decoration',
		'emojiDescription': 'heart decoration',
		'hasVideo': true
	},
	{
		'emoji': '\u2763\ufe0f',
		'emojiKey': '2763-fe0f',
		'emojiName': 'heart exclamation',
		'emojiDescription': 'heart exclamation,heavy heart exclamation mark ornament',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc94',
		'emojiKey': '1f494',
		'emojiName': 'broken heart',
		'emojiDescription': 'broken heart',
		'hasVideo': true
	},
	{
		'emoji': '\u2764\ufe0f\u200d\ud83d\udd25',
		'emojiKey': '2764-fe0f-200d-1f525',
		'emojiName': 'heart on fire',
		'emojiDescription': 'heart on fire',
		'hasVideo': true
	},
	{
		'emoji': '\u2764\ufe0f\u200d\ud83e\ude79',
		'emojiKey': '2764-fe0f-200d-1fa79',
		'emojiName': 'mending heart',
		'emojiDescription': 'mending heart',
		'hasVideo': true
	},
	{
		'emoji': '\u2764\ufe0f',
		'emojiKey': '2764-fe0f',
		'emojiName': 'heart',
		'emojiDescription': 'heart,heavy black heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udde1',
		'emojiKey': '1f9e1',
		'emojiName': 'orange heart',
		'emojiDescription': 'orange heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9b',
		'emojiKey': '1f49b',
		'emojiName': 'yellow heart',
		'emojiDescription': 'yellow heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9a',
		'emojiKey': '1f49a',
		'emojiName': 'green heart',
		'emojiDescription': 'green heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc99',
		'emojiKey': '1f499',
		'emojiName': 'blue heart',
		'emojiDescription': 'blue heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc9c',
		'emojiKey': '1f49c',
		'emojiName': 'purple heart',
		'emojiDescription': 'purple heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd0e',
		'emojiKey': '1f90e',
		'emojiName': 'brown heart',
		'emojiDescription': 'brown heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udda4',
		'emojiKey': '1f5a4',
		'emojiName': 'black heart',
		'emojiDescription': 'black heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd0d',
		'emojiKey': '1f90d',
		'emojiName': 'white heart',
		'emojiDescription': 'white heart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcaf',
		'emojiKey': '1f4af',
		'emojiName': '100',
		'emojiDescription': '100,hundred points symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca2',
		'emojiKey': '1f4a2',
		'emojiName': 'anger',
		'emojiDescription': 'anger,anger symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca5',
		'emojiKey': '1f4a5',
		'emojiName': 'boom',
		'emojiDescription': 'boom,collision,collision symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcab',
		'emojiKey': '1f4ab',
		'emojiName': 'dizzy',
		'emojiDescription': 'dizzy,dizzy symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca6',
		'emojiKey': '1f4a6',
		'emojiName': 'sweat drops',
		'emojiDescription': 'sweat drops,splashing sweat symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udca8',
		'emojiKey': '1f4a8',
		'emojiName': 'dash',
		'emojiDescription': 'dash,dash symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd73\ufe0f',
		'emojiKey': '1f573-fe0f',
		'emojiName': 'hole',
		'emojiDescription': 'hole',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udca3',
		'emojiKey': '1f4a3',
		'emojiName': 'bomb',
		'emojiDescription': 'bomb',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcac',
		'emojiKey': '1f4ac',
		'emojiName': 'speech balloon',
		'emojiDescription': 'speech balloon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc41\ufe0f\u200d\ud83d\udde8\ufe0f',
		'emojiKey': '1f441-fe0f-200d-1f5e8-fe0f',
		'emojiName': 'eye in speech bubble',
		'emojiDescription': 'eye in speech bubble,eye-in-speech-bubble',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udde8\ufe0f',
		'emojiKey': '1f5e8-fe0f',
		'emojiName': 'left speech bubble',
		'emojiDescription': 'left speech bubble',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddef\ufe0f',
		'emojiKey': '1f5ef-fe0f',
		'emojiName': 'right anger bubble',
		'emojiDescription': 'right anger bubble',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcad',
		'emojiKey': '1f4ad',
		'emojiName': 'thought balloon',
		'emojiDescription': 'thought balloon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca4',
		'emojiKey': '1f4a4',
		'emojiName': 'zzz',
		'emojiDescription': 'zzz,sleeping symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4b',
		'emojiKey': '1f44b',
		'emojiName': 'wave',
		'emojiDescription': 'wave,waving hand sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1a',
		'emojiKey': '1f91a',
		'emojiName': 'raised back of hand',
		'emojiDescription': 'raised back of hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd90\ufe0f',
		'emojiKey': '1f590-fe0f',
		'emojiName': 'hand with fingers splayed',
		'emojiDescription': 'hand with fingers splayed,raised hand with fingers splayed',
		'hasVideo': true
	},
	{
		'emoji': '\u270b',
		'emojiKey': '270b',
		'emojiName': 'hand',
		'emojiDescription': 'hand,raised hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd96',
		'emojiKey': '1f596',
		'emojiName': 'spock-hand',
		'emojiDescription': 'spock-hand,raised hand with part between middle and ring fingers',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef1',
		'emojiKey': '1faf1',
		'emojiName': 'rightwards hand',
		'emojiDescription': 'rightwards hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef2',
		'emojiKey': '1faf2',
		'emojiName': 'leftwards hand',
		'emojiDescription': 'leftwards hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef3',
		'emojiKey': '1faf3',
		'emojiName': 'palm down hand',
		'emojiDescription': 'palm down hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef4',
		'emojiKey': '1faf4',
		'emojiName': 'palm up hand',
		'emojiDescription': 'palm up hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4c',
		'emojiKey': '1f44c',
		'emojiName': 'ok hand',
		'emojiDescription': 'ok hand,ok hand sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd0c',
		'emojiKey': '1f90c',
		'emojiName': 'pinched fingers',
		'emojiDescription': 'pinched fingers',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd0f',
		'emojiKey': '1f90f',
		'emojiName': 'pinching hand',
		'emojiDescription': 'pinching hand',
		'hasVideo': true
	},
	{
		'emoji': '\u270c\ufe0f',
		'emojiKey': '270c-fe0f',
		'emojiName': 'v',
		'emojiDescription': 'v,victory hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1e',
		'emojiKey': '1f91e',
		'emojiName': 'crossed fingers',
		'emojiDescription': 'crossed fingers,hand with index and middle fingers crossed',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef0',
		'emojiKey': '1faf0',
		'emojiName': 'hand with index finger and thumb crossed',
		'emojiDescription': 'hand with index finger and thumb crossed',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1f',
		'emojiKey': '1f91f',
		'emojiName': 'i love you hand sign',
		'emojiDescription': 'i love you hand sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd18',
		'emojiKey': '1f918',
		'emojiName': 'the horns',
		'emojiDescription': 'the horns,sign of the horns',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd19',
		'emojiKey': '1f919',
		'emojiName': 'call me hand',
		'emojiDescription': 'call me hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc48',
		'emojiKey': '1f448',
		'emojiName': 'point left',
		'emojiDescription': 'point left,white left pointing backhand index',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc49',
		'emojiKey': '1f449',
		'emojiName': 'point right',
		'emojiDescription': 'point right,white right pointing backhand index',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc46',
		'emojiKey': '1f446',
		'emojiName': 'point up 2',
		'emojiDescription': 'point up 2,white up pointing backhand index',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd95',
		'emojiKey': '1f595',
		'emojiName': 'middle finger',
		'emojiDescription': 'middle finger,reversed hand with middle finger extended',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc47',
		'emojiKey': '1f447',
		'emojiName': 'point down',
		'emojiDescription': 'point down,white down pointing backhand index',
		'hasVideo': true
	},
	{
		'emoji': '\u261d\ufe0f',
		'emojiKey': '261d-fe0f',
		'emojiName': 'point up',
		'emojiDescription': 'point up,white up pointing index',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef5',
		'emojiKey': '1faf5',
		'emojiName': 'index pointing at the viewer',
		'emojiDescription': 'index pointing at the viewer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4d',
		'emojiKey': '1f44d',
		'emojiName': '+1',
		'emojiDescription': '+1,thumbsup,thumbs up sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4e',
		'emojiKey': '1f44e',
		'emojiName': '-1',
		'emojiDescription': '-1,thumbsdown,thumbs down sign',
		'hasVideo': true
	},
	{
		'emoji': '\u270a',
		'emojiKey': '270a',
		'emojiName': 'fist',
		'emojiDescription': 'fist,raised fist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4a',
		'emojiKey': '1f44a',
		'emojiName': 'punch',
		'emojiDescription': 'punch,facepunch,fisted hand sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1b',
		'emojiKey': '1f91b',
		'emojiName': 'left-facing fist',
		'emojiDescription': 'left-facing fist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1c',
		'emojiKey': '1f91c',
		'emojiName': 'right-facing fist',
		'emojiDescription': 'right-facing fist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc4f',
		'emojiKey': '1f44f',
		'emojiName': 'clap',
		'emojiDescription': 'clap,clapping hands sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude4c',
		'emojiKey': '1f64c',
		'emojiName': 'raised hands',
		'emojiDescription': 'raised hands,person raising both hands in celebration',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udef6',
		'emojiKey': '1faf6',
		'emojiName': 'heart hands',
		'emojiDescription': 'heart hands',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc50',
		'emojiKey': '1f450',
		'emojiName': 'open hands',
		'emojiDescription': 'open hands,open hands sign',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd32',
		'emojiKey': '1f932',
		'emojiName': 'palms up together',
		'emojiDescription': 'palms up together',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd1d',
		'emojiKey': '1f91d',
		'emojiName': 'handshake',
		'emojiDescription': 'handshake',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude4f',
		'emojiKey': '1f64f',
		'emojiName': 'pray',
		'emojiDescription': 'pray,person with folded hands',
		'hasVideo': true
	},
	{
		'emoji': '\u270d\ufe0f',
		'emojiKey': '270d-fe0f',
		'emojiName': 'writing hand',
		'emojiDescription': 'writing hand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc85',
		'emojiKey': '1f485',
		'emojiName': 'nail care',
		'emojiDescription': 'nail care,nail polish',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd33',
		'emojiKey': '1f933',
		'emojiName': 'selfie',
		'emojiDescription': 'selfie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcaa',
		'emojiKey': '1f4aa',
		'emojiName': 'muscle',
		'emojiDescription': 'muscle,flexed biceps',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddbe',
		'emojiKey': '1f9be',
		'emojiName': 'mechanical arm',
		'emojiDescription': 'mechanical arm',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddbf',
		'emojiKey': '1f9bf',
		'emojiName': 'mechanical leg',
		'emojiDescription': 'mechanical leg',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddb5',
		'emojiKey': '1f9b5',
		'emojiName': 'leg',
		'emojiDescription': 'leg',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddb6',
		'emojiKey': '1f9b6',
		'emojiName': 'foot',
		'emojiDescription': 'foot',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc42',
		'emojiKey': '1f442',
		'emojiName': 'ear',
		'emojiDescription': 'ear',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddbb',
		'emojiKey': '1f9bb',
		'emojiName': 'ear with hearing aid',
		'emojiDescription': 'ear with hearing aid',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc43',
		'emojiKey': '1f443',
		'emojiName': 'nose',
		'emojiDescription': 'nose',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udde0',
		'emojiKey': '1f9e0',
		'emojiName': 'brain',
		'emojiDescription': 'brain',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udec0',
		'emojiKey': '1fac0',
		'emojiName': 'anatomical heart',
		'emojiDescription': 'anatomical heart',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udec1',
		'emojiKey': '1fac1',
		'emojiName': 'lungs',
		'emojiDescription': 'lungs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb7',
		'emojiKey': '1f9b7',
		'emojiName': 'tooth',
		'emojiDescription': 'tooth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddb4',
		'emojiKey': '1f9b4',
		'emojiName': 'bone',
		'emojiDescription': 'bone',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc40',
		'emojiKey': '1f440',
		'emojiName': 'eyes',
		'emojiDescription': 'eyes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc41\ufe0f',
		'emojiKey': '1f441-fe0f',
		'emojiName': 'eye',
		'emojiDescription': 'eye',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc45',
		'emojiKey': '1f445',
		'emojiName': 'tongue',
		'emojiDescription': 'tongue',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc44',
		'emojiKey': '1f444',
		'emojiName': 'lips',
		'emojiDescription': 'lips,mouth',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee6',
		'emojiKey': '1fae6',
		'emojiName': 'biting lip',
		'emojiDescription': 'biting lip',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc76',
		'emojiKey': '1f476',
		'emojiName': 'baby',
		'emojiDescription': 'baby',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd2',
		'emojiKey': '1f9d2',
		'emojiName': 'child',
		'emojiDescription': 'child',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc66',
		'emojiKey': '1f466',
		'emojiName': 'boy',
		'emojiDescription': 'boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc67',
		'emojiKey': '1f467',
		'emojiName': 'girl',
		'emojiDescription': 'girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1',
		'emojiKey': '1f9d1',
		'emojiName': 'adult',
		'emojiDescription': 'adult',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc71',
		'emojiKey': '1f471',
		'emojiName': 'person with blond hair',
		'emojiDescription': 'person with blond hair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68',
		'emojiKey': '1f468',
		'emojiName': 'man',
		'emojiDescription': 'man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd4',
		'emojiKey': '1f9d4',
		'emojiName': 'bearded person',
		'emojiDescription': 'bearded person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd4\u200d\u2642\ufe0f',
		'emojiKey': '1f9d4-200d-2642-fe0f',
		'emojiName': 'man: beard',
		'emojiDescription': 'man: beard,man with beard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd4\u200d\u2640\ufe0f',
		'emojiKey': '1f9d4-200d-2640-fe0f',
		'emojiName': 'woman: beard',
		'emojiDescription': 'woman: beard,woman with beard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddb0',
		'emojiKey': '1f468-200d-1f9b0',
		'emojiName': 'man: red hair',
		'emojiDescription': 'man: red hair,red haired man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddb1',
		'emojiKey': '1f468-200d-1f9b1',
		'emojiName': 'man: curly hair',
		'emojiDescription': 'man: curly hair,curly haired man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddb3',
		'emojiKey': '1f468-200d-1f9b3',
		'emojiName': 'man: white hair',
		'emojiDescription': 'man: white hair,white haired man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddb2',
		'emojiKey': '1f468-200d-1f9b2',
		'emojiName': 'bald man',
		'emojiDescription': 'bald man,man: bald',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69',
		'emojiKey': '1f469',
		'emojiName': 'woman',
		'emojiDescription': 'woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddb0',
		'emojiKey': '1f469-200d-1f9b0',
		'emojiName': 'woman: red hair',
		'emojiDescription': 'woman: red hair,red haired woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddb0',
		'emojiKey': '1f9d1-200d-1f9b0',
		'emojiName': 'person: red hair',
		'emojiDescription': 'person: red hair,red haired person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddb1',
		'emojiKey': '1f469-200d-1f9b1',
		'emojiName': 'woman: curly hair',
		'emojiDescription': 'woman: curly hair,curly haired woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddb1',
		'emojiKey': '1f9d1-200d-1f9b1',
		'emojiName': 'person: curly hair',
		'emojiDescription': 'person: curly hair,curly haired person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddb3',
		'emojiKey': '1f469-200d-1f9b3',
		'emojiName': 'woman: white hair',
		'emojiDescription': 'woman: white hair,white haired woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddb3',
		'emojiKey': '1f9d1-200d-1f9b3',
		'emojiName': 'person: white hair',
		'emojiDescription': 'person: white hair,white haired person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddb2',
		'emojiKey': '1f469-200d-1f9b2',
		'emojiName': 'bald woman',
		'emojiDescription': 'bald woman,woman: bald',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddb2',
		'emojiKey': '1f9d1-200d-1f9b2',
		'emojiName': 'bald person',
		'emojiDescription': 'bald person,person: bald',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc71\u200d\u2640\ufe0f',
		'emojiKey': '1f471-200d-2640-fe0f',
		'emojiName': 'woman: blond hair',
		'emojiDescription': 'woman: blond hair,blond-haired-woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc71\u200d\u2642\ufe0f',
		'emojiKey': '1f471-200d-2642-fe0f',
		'emojiName': 'man: blond hair',
		'emojiDescription': 'man: blond hair,blond-haired-man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd3',
		'emojiKey': '1f9d3',
		'emojiName': 'older adult',
		'emojiDescription': 'older adult',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc74',
		'emojiKey': '1f474',
		'emojiName': 'older man',
		'emojiDescription': 'older man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc75',
		'emojiKey': '1f475',
		'emojiName': 'older woman',
		'emojiDescription': 'older woman',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude4d',
		'emojiKey': '1f64d',
		'emojiName': 'person frowning',
		'emojiDescription': 'person frowning',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4d\u200d\u2642\ufe0f',
		'emojiKey': '1f64d-200d-2642-fe0f',
		'emojiName': 'man frowning',
		'emojiDescription': 'man frowning,man-frowning',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4d\u200d\u2640\ufe0f',
		'emojiKey': '1f64d-200d-2640-fe0f',
		'emojiName': 'woman frowning',
		'emojiDescription': 'woman frowning,woman-frowning',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4e',
		'emojiKey': '1f64e',
		'emojiName': 'person with pouting face',
		'emojiDescription': 'person with pouting face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4e\u200d\u2642\ufe0f',
		'emojiKey': '1f64e-200d-2642-fe0f',
		'emojiName': 'man pouting',
		'emojiDescription': 'man pouting,man-pouting',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4e\u200d\u2640\ufe0f',
		'emojiKey': '1f64e-200d-2640-fe0f',
		'emojiName': 'woman pouting',
		'emojiDescription': 'woman pouting,woman-pouting',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude45',
		'emojiKey': '1f645',
		'emojiName': 'no good',
		'emojiDescription': 'no good,face with no good gesture',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude45\u200d\u2642\ufe0f',
		'emojiKey': '1f645-200d-2642-fe0f',
		'emojiName': 'man gesturing no',
		'emojiDescription': 'man gesturing no,man-gesturing-no',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude45\u200d\u2640\ufe0f',
		'emojiKey': '1f645-200d-2640-fe0f',
		'emojiName': 'woman gesturing no',
		'emojiDescription': 'woman gesturing no,woman-gesturing-no',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude46',
		'emojiKey': '1f646',
		'emojiName': 'ok woman',
		'emojiDescription': 'ok woman,face with ok gesture',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude46\u200d\u2642\ufe0f',
		'emojiKey': '1f646-200d-2642-fe0f',
		'emojiName': 'man gesturing ok',
		'emojiDescription': 'man gesturing ok,man-gesturing-ok',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude46\u200d\u2640\ufe0f',
		'emojiKey': '1f646-200d-2640-fe0f',
		'emojiName': 'woman gesturing ok',
		'emojiDescription': 'woman gesturing ok,woman-gesturing-ok',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc81',
		'emojiKey': '1f481',
		'emojiName': 'information desk person',
		'emojiDescription': 'information desk person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc81\u200d\u2642\ufe0f',
		'emojiKey': '1f481-200d-2642-fe0f',
		'emojiName': 'man tipping hand',
		'emojiDescription': 'man tipping hand,man-tipping-hand',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc81\u200d\u2640\ufe0f',
		'emojiKey': '1f481-200d-2640-fe0f',
		'emojiName': 'woman tipping hand',
		'emojiDescription': 'woman tipping hand,woman-tipping-hand',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4b',
		'emojiKey': '1f64b',
		'emojiName': 'raising hand',
		'emojiDescription': 'raising hand,happy person raising one hand',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4b\u200d\u2642\ufe0f',
		'emojiKey': '1f64b-200d-2642-fe0f',
		'emojiName': 'man raising hand',
		'emojiDescription': 'man raising hand,man-raising-hand',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude4b\u200d\u2640\ufe0f',
		'emojiKey': '1f64b-200d-2640-fe0f',
		'emojiName': 'woman raising hand',
		'emojiDescription': 'woman raising hand,woman-raising-hand',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcf',
		'emojiKey': '1f9cf',
		'emojiName': 'deaf person',
		'emojiDescription': 'deaf person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcf\u200d\u2642\ufe0f',
		'emojiKey': '1f9cf-200d-2642-fe0f',
		'emojiName': 'deaf man',
		'emojiDescription': 'deaf man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcf\u200d\u2640\ufe0f',
		'emojiKey': '1f9cf-200d-2640-fe0f',
		'emojiName': 'deaf woman',
		'emojiDescription': 'deaf woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude47',
		'emojiKey': '1f647',
		'emojiName': 'bow',
		'emojiDescription': 'bow,person bowing deeply',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude47\u200d\u2642\ufe0f',
		'emojiKey': '1f647-200d-2642-fe0f',
		'emojiName': 'man bowing',
		'emojiDescription': 'man bowing,man-bowing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude47\u200d\u2640\ufe0f',
		'emojiKey': '1f647-200d-2640-fe0f',
		'emojiName': 'woman bowing',
		'emojiDescription': 'woman bowing,woman-bowing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd26',
		'emojiKey': '1f926',
		'emojiName': 'face palm',
		'emojiDescription': 'face palm',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd26\u200d\u2642\ufe0f',
		'emojiKey': '1f926-200d-2642-fe0f',
		'emojiName': 'man facepalming',
		'emojiDescription': 'man facepalming,man-facepalming',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd26\u200d\u2640\ufe0f',
		'emojiKey': '1f926-200d-2640-fe0f',
		'emojiName': 'woman facepalming',
		'emojiDescription': 'woman facepalming,woman-facepalming',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd37',
		'emojiKey': '1f937',
		'emojiName': 'shrug',
		'emojiDescription': 'shrug',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd37\u200d\u2642\ufe0f',
		'emojiKey': '1f937-200d-2642-fe0f',
		'emojiName': 'man shrugging',
		'emojiDescription': 'man shrugging,man-shrugging',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd37\u200d\u2640\ufe0f',
		'emojiKey': '1f937-200d-2640-fe0f',
		'emojiName': 'woman shrugging',
		'emojiDescription': 'woman shrugging,woman-shrugging',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd1\u200d\u2695\ufe0f',
		'emojiKey': '1f9d1-200d-2695-fe0f',
		'emojiName': 'health worker',
		'emojiDescription': 'health worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\u2695\ufe0f',
		'emojiKey': '1f468-200d-2695-fe0f',
		'emojiName': 'male-doctor',
		'emojiDescription': 'male-doctor,man health worker',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2695\ufe0f',
		'emojiKey': '1f469-200d-2695-fe0f',
		'emojiName': 'female-doctor',
		'emojiDescription': 'female-doctor,woman health worker',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udf93',
		'emojiKey': '1f9d1-200d-1f393',
		'emojiName': 'student',
		'emojiDescription': 'student',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udf93',
		'emojiKey': '1f468-200d-1f393',
		'emojiName': 'man student',
		'emojiDescription': 'man student,male-student',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udf93',
		'emojiKey': '1f469-200d-1f393',
		'emojiName': 'woman student',
		'emojiDescription': 'woman student,female-student',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udfeb',
		'emojiKey': '1f9d1-200d-1f3eb',
		'emojiName': 'teacher',
		'emojiDescription': 'teacher',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udfeb',
		'emojiKey': '1f468-200d-1f3eb',
		'emojiName': 'man teacher',
		'emojiDescription': 'man teacher,male-teacher',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udfeb',
		'emojiKey': '1f469-200d-1f3eb',
		'emojiName': 'woman teacher',
		'emojiDescription': 'woman teacher,female-teacher',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\u2696\ufe0f',
		'emojiKey': '1f9d1-200d-2696-fe0f',
		'emojiName': 'judge',
		'emojiDescription': 'judge',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\u2696\ufe0f',
		'emojiKey': '1f468-200d-2696-fe0f',
		'emojiName': 'man judge',
		'emojiDescription': 'man judge,male-judge',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2696\ufe0f',
		'emojiKey': '1f469-200d-2696-fe0f',
		'emojiName': 'woman judge',
		'emojiDescription': 'woman judge,female-judge',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udf3e',
		'emojiKey': '1f9d1-200d-1f33e',
		'emojiName': 'farmer',
		'emojiDescription': 'farmer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udf3e',
		'emojiKey': '1f468-200d-1f33e',
		'emojiName': 'man farmer',
		'emojiDescription': 'man farmer,male-farmer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udf3e',
		'emojiKey': '1f469-200d-1f33e',
		'emojiName': 'woman farmer',
		'emojiDescription': 'woman farmer,female-farmer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udf73',
		'emojiKey': '1f9d1-200d-1f373',
		'emojiName': 'cook',
		'emojiDescription': 'cook',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udf73',
		'emojiKey': '1f468-200d-1f373',
		'emojiName': 'man cook',
		'emojiDescription': 'man cook,male-cook',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udf73',
		'emojiKey': '1f469-200d-1f373',
		'emojiName': 'woman cook',
		'emojiDescription': 'woman cook,female-cook',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\udd27',
		'emojiKey': '1f9d1-200d-1f527',
		'emojiName': 'mechanic',
		'emojiDescription': 'mechanic',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udd27',
		'emojiKey': '1f468-200d-1f527',
		'emojiName': 'man mechanic',
		'emojiDescription': 'man mechanic,male-mechanic',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udd27',
		'emojiKey': '1f469-200d-1f527',
		'emojiName': 'woman mechanic',
		'emojiDescription': 'woman mechanic,female-mechanic',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udfed',
		'emojiKey': '1f9d1-200d-1f3ed',
		'emojiName': 'factory worker',
		'emojiDescription': 'factory worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udfed',
		'emojiKey': '1f468-200d-1f3ed',
		'emojiName': 'man factory worker',
		'emojiDescription': 'man factory worker,male-factory-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udfed',
		'emojiKey': '1f469-200d-1f3ed',
		'emojiName': 'woman factory worker',
		'emojiDescription': 'woman factory worker,female-factory-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\udcbc',
		'emojiKey': '1f9d1-200d-1f4bc',
		'emojiName': 'office worker',
		'emojiDescription': 'office worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udcbc',
		'emojiKey': '1f468-200d-1f4bc',
		'emojiName': 'man office worker',
		'emojiDescription': 'man office worker,male-office-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udcbc',
		'emojiKey': '1f469-200d-1f4bc',
		'emojiName': 'woman office worker',
		'emojiDescription': 'woman office worker,female-office-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\udd2c',
		'emojiKey': '1f9d1-200d-1f52c',
		'emojiName': 'scientist',
		'emojiDescription': 'scientist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udd2c',
		'emojiKey': '1f468-200d-1f52c',
		'emojiName': 'man scientist',
		'emojiDescription': 'man scientist,male-scientist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udd2c',
		'emojiKey': '1f469-200d-1f52c',
		'emojiName': 'woman scientist',
		'emojiDescription': 'woman scientist,female-scientist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\udcbb',
		'emojiKey': '1f9d1-200d-1f4bb',
		'emojiName': 'technologist',
		'emojiDescription': 'technologist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udcbb',
		'emojiKey': '1f468-200d-1f4bb',
		'emojiName': 'man technologist',
		'emojiDescription': 'man technologist,male-technologist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udcbb',
		'emojiKey': '1f469-200d-1f4bb',
		'emojiName': 'woman technologist',
		'emojiDescription': 'woman technologist,female-technologist',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udfa4',
		'emojiKey': '1f9d1-200d-1f3a4',
		'emojiName': 'singer',
		'emojiDescription': 'singer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udfa4',
		'emojiKey': '1f468-200d-1f3a4',
		'emojiName': 'man singer',
		'emojiDescription': 'man singer,male-singer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udfa4',
		'emojiKey': '1f469-200d-1f3a4',
		'emojiName': 'woman singer',
		'emojiDescription': 'woman singer,female-singer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udfa8',
		'emojiKey': '1f9d1-200d-1f3a8',
		'emojiName': 'artist',
		'emojiDescription': 'artist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udfa8',
		'emojiKey': '1f468-200d-1f3a8',
		'emojiName': 'man artist',
		'emojiDescription': 'man artist,male-artist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udfa8',
		'emojiKey': '1f469-200d-1f3a8',
		'emojiName': 'woman artist',
		'emojiDescription': 'woman artist,female-artist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\u2708\ufe0f',
		'emojiKey': '1f9d1-200d-2708-fe0f',
		'emojiName': 'pilot',
		'emojiDescription': 'pilot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\u2708\ufe0f',
		'emojiKey': '1f468-200d-2708-fe0f',
		'emojiName': 'man pilot',
		'emojiDescription': 'man pilot,male-pilot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2708\ufe0f',
		'emojiKey': '1f469-200d-2708-fe0f',
		'emojiName': 'woman pilot',
		'emojiDescription': 'woman pilot,female-pilot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\ude80',
		'emojiKey': '1f9d1-200d-1f680',
		'emojiName': 'astronaut',
		'emojiDescription': 'astronaut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\ude80',
		'emojiKey': '1f468-200d-1f680',
		'emojiName': 'man astronaut',
		'emojiDescription': 'man astronaut,male-astronaut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\ude80',
		'emojiKey': '1f469-200d-1f680',
		'emojiName': 'woman astronaut',
		'emojiDescription': 'woman astronaut,female-astronaut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83d\ude92',
		'emojiKey': '1f9d1-200d-1f692',
		'emojiName': 'firefighter',
		'emojiDescription': 'firefighter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\ude92',
		'emojiKey': '1f468-200d-1f692',
		'emojiName': 'man firefighter',
		'emojiDescription': 'man firefighter,male-firefighter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\ude92',
		'emojiKey': '1f469-200d-1f692',
		'emojiName': 'woman firefighter',
		'emojiDescription': 'woman firefighter,female-firefighter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6e',
		'emojiKey': '1f46e',
		'emojiName': 'cop',
		'emojiDescription': 'cop,police officer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6e\u200d\u2642\ufe0f',
		'emojiKey': '1f46e-200d-2642-fe0f',
		'emojiName': 'man police officer',
		'emojiDescription': 'man police officer,male-police-officer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc6e\u200d\u2640\ufe0f',
		'emojiKey': '1f46e-200d-2640-fe0f',
		'emojiName': 'woman police officer',
		'emojiDescription': 'woman police officer,female-police-officer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd75\ufe0f',
		'emojiKey': '1f575-fe0f',
		'emojiName': 'detective',
		'emojiDescription': 'detective,sleuth or spy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd75\ufe0f\u200d\u2642\ufe0f',
		'emojiKey': '1f575-fe0f-200d-2642-fe0f',
		'emojiName': 'man detective',
		'emojiDescription': 'man detective,male-detective',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd75\ufe0f\u200d\u2640\ufe0f',
		'emojiKey': '1f575-fe0f-200d-2640-fe0f',
		'emojiName': 'woman detective',
		'emojiDescription': 'woman detective,female-detective',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc82',
		'emojiKey': '1f482',
		'emojiName': 'guardsman',
		'emojiDescription': 'guardsman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc82\u200d\u2642\ufe0f',
		'emojiKey': '1f482-200d-2642-fe0f',
		'emojiName': 'man guard',
		'emojiDescription': 'man guard,male-guard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc82\u200d\u2640\ufe0f',
		'emojiKey': '1f482-200d-2640-fe0f',
		'emojiName': 'woman guard',
		'emojiDescription': 'woman guard,female-guard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd77',
		'emojiKey': '1f977',
		'emojiName': 'ninja',
		'emojiDescription': 'ninja',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc77',
		'emojiKey': '1f477',
		'emojiName': 'construction worker',
		'emojiDescription': 'construction worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc77\u200d\u2642\ufe0f',
		'emojiKey': '1f477-200d-2642-fe0f',
		'emojiName': 'man construction worker',
		'emojiDescription': 'man construction worker,male-construction-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc77\u200d\u2640\ufe0f',
		'emojiKey': '1f477-200d-2640-fe0f',
		'emojiName': 'woman construction worker',
		'emojiDescription': 'woman construction worker,female-construction-worker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udec5',
		'emojiKey': '1fac5',
		'emojiName': 'person with crown',
		'emojiDescription': 'person with crown',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd34',
		'emojiKey': '1f934',
		'emojiName': 'prince',
		'emojiDescription': 'prince',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc78',
		'emojiKey': '1f478',
		'emojiName': 'princess',
		'emojiDescription': 'princess',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc73',
		'emojiKey': '1f473',
		'emojiName': 'man with turban',
		'emojiDescription': 'man with turban',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc73\u200d\u2642\ufe0f',
		'emojiKey': '1f473-200d-2642-fe0f',
		'emojiName': 'man wearing turban',
		'emojiDescription': 'man wearing turban,man-wearing-turban',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc73\u200d\u2640\ufe0f',
		'emojiKey': '1f473-200d-2640-fe0f',
		'emojiName': 'woman wearing turban',
		'emojiDescription': 'woman wearing turban,woman-wearing-turban',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc72',
		'emojiKey': '1f472',
		'emojiName': 'man with gua pi mao',
		'emojiDescription': 'man with gua pi mao',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd5',
		'emojiKey': '1f9d5',
		'emojiName': 'person with headscarf',
		'emojiDescription': 'person with headscarf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd35',
		'emojiKey': '1f935',
		'emojiName': 'man in tuxedo',
		'emojiDescription': 'man in tuxedo,person in tuxedo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd35\u200d\u2642\ufe0f',
		'emojiKey': '1f935-200d-2642-fe0f',
		'emojiName': 'man in tuxedo',
		'emojiDescription': 'man in tuxedo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd35\u200d\u2640\ufe0f',
		'emojiKey': '1f935-200d-2640-fe0f',
		'emojiName': 'woman in tuxedo',
		'emojiDescription': 'woman in tuxedo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc70',
		'emojiKey': '1f470',
		'emojiName': 'bride with veil',
		'emojiDescription': 'bride with veil',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc70\u200d\u2642\ufe0f',
		'emojiKey': '1f470-200d-2642-fe0f',
		'emojiName': 'man with veil',
		'emojiDescription': 'man with veil',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc70\u200d\u2640\ufe0f',
		'emojiKey': '1f470-200d-2640-fe0f',
		'emojiName': 'woman with veil',
		'emojiDescription': 'woman with veil',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd30',
		'emojiKey': '1f930',
		'emojiName': 'pregnant woman',
		'emojiDescription': 'pregnant woman',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udec3',
		'emojiKey': '1fac3',
		'emojiName': 'pregnant man',
		'emojiDescription': 'pregnant man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udec4',
		'emojiKey': '1fac4',
		'emojiName': 'pregnant person',
		'emojiDescription': 'pregnant person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd31',
		'emojiKey': '1f931',
		'emojiName': 'breast-feeding',
		'emojiDescription': 'breast-feeding',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83c\udf7c',
		'emojiKey': '1f469-200d-1f37c',
		'emojiName': 'woman feeding baby',
		'emojiDescription': 'woman feeding baby',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83c\udf7c',
		'emojiKey': '1f468-200d-1f37c',
		'emojiName': 'man feeding baby',
		'emojiDescription': 'man feeding baby',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udf7c',
		'emojiKey': '1f9d1-200d-1f37c',
		'emojiName': 'person feeding baby',
		'emojiDescription': 'person feeding baby',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc7c',
		'emojiKey': '1f47c',
		'emojiName': 'angel',
		'emojiDescription': 'angel,baby angel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf85',
		'emojiKey': '1f385',
		'emojiName': 'santa',
		'emojiDescription': 'santa,father christmas',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd36',
		'emojiKey': '1f936',
		'emojiName': 'mrs claus',
		'emojiDescription': 'mrs claus,mother christmas',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83c\udf84',
		'emojiKey': '1f9d1-200d-1f384',
		'emojiName': 'mx claus',
		'emojiDescription': 'mx claus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddb8',
		'emojiKey': '1f9b8',
		'emojiName': 'superhero',
		'emojiDescription': 'superhero',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb8\u200d\u2642\ufe0f',
		'emojiKey': '1f9b8-200d-2642-fe0f',
		'emojiName': 'man superhero',
		'emojiDescription': 'man superhero,male superhero',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb8\u200d\u2640\ufe0f',
		'emojiKey': '1f9b8-200d-2640-fe0f',
		'emojiName': 'woman superhero',
		'emojiDescription': 'woman superhero,female superhero',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb9',
		'emojiKey': '1f9b9',
		'emojiName': 'supervillain',
		'emojiDescription': 'supervillain',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb9\u200d\u2642\ufe0f',
		'emojiKey': '1f9b9-200d-2642-fe0f',
		'emojiName': 'man supervillain',
		'emojiDescription': 'man supervillain,male supervillain',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddb9\u200d\u2640\ufe0f',
		'emojiKey': '1f9b9-200d-2640-fe0f',
		'emojiName': 'woman supervillain',
		'emojiDescription': 'woman supervillain,female supervillain',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd9',
		'emojiKey': '1f9d9',
		'emojiName': 'mage',
		'emojiDescription': 'mage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd9\u200d\u2642\ufe0f',
		'emojiKey': '1f9d9-200d-2642-fe0f',
		'emojiName': 'man mage',
		'emojiDescription': 'man mage,male mage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd9\u200d\u2640\ufe0f',
		'emojiKey': '1f9d9-200d-2640-fe0f',
		'emojiName': 'woman mage',
		'emojiDescription': 'woman mage,female mage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddda',
		'emojiKey': '1f9da',
		'emojiName': 'fairy',
		'emojiDescription': 'fairy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddda\u200d\u2642\ufe0f',
		'emojiKey': '1f9da-200d-2642-fe0f',
		'emojiName': 'man fairy',
		'emojiDescription': 'man fairy,male fairy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddda\u200d\u2640\ufe0f',
		'emojiKey': '1f9da-200d-2640-fe0f',
		'emojiName': 'woman fairy',
		'emojiDescription': 'woman fairy,female fairy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddb',
		'emojiKey': '1f9db',
		'emojiName': 'vampire',
		'emojiDescription': 'vampire',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udddb\u200d\u2642\ufe0f',
		'emojiKey': '1f9db-200d-2642-fe0f',
		'emojiName': 'man vampire',
		'emojiDescription': 'man vampire,male vampire',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udddb\u200d\u2640\ufe0f',
		'emojiKey': '1f9db-200d-2640-fe0f',
		'emojiName': 'woman vampire',
		'emojiDescription': 'woman vampire,female vampire',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udddc',
		'emojiKey': '1f9dc',
		'emojiName': 'merperson',
		'emojiDescription': 'merperson',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddc\u200d\u2642\ufe0f',
		'emojiKey': '1f9dc-200d-2642-fe0f',
		'emojiName': 'merman',
		'emojiDescription': 'merman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddc\u200d\u2640\ufe0f',
		'emojiKey': '1f9dc-200d-2640-fe0f',
		'emojiName': 'mermaid',
		'emojiDescription': 'mermaid',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddd',
		'emojiKey': '1f9dd',
		'emojiName': 'elf',
		'emojiDescription': 'elf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddd\u200d\u2642\ufe0f',
		'emojiKey': '1f9dd-200d-2642-fe0f',
		'emojiName': 'man elf',
		'emojiDescription': 'man elf,male elf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddd\u200d\u2640\ufe0f',
		'emojiKey': '1f9dd-200d-2640-fe0f',
		'emojiName': 'woman elf',
		'emojiDescription': 'woman elf,female elf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddde',
		'emojiKey': '1f9de',
		'emojiName': 'genie',
		'emojiDescription': 'genie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddde\u200d\u2642\ufe0f',
		'emojiKey': '1f9de-200d-2642-fe0f',
		'emojiName': 'man genie',
		'emojiDescription': 'man genie,male genie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddde\u200d\u2640\ufe0f',
		'emojiKey': '1f9de-200d-2640-fe0f',
		'emojiName': 'woman genie',
		'emojiDescription': 'woman genie,female genie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udddf',
		'emojiKey': '1f9df',
		'emojiName': 'zombie',
		'emojiDescription': 'zombie',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udddf\u200d\u2642\ufe0f',
		'emojiKey': '1f9df-200d-2642-fe0f',
		'emojiName': 'man zombie',
		'emojiDescription': 'man zombie,male zombie',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udddf\u200d\u2640\ufe0f',
		'emojiKey': '1f9df-200d-2640-fe0f',
		'emojiName': 'woman zombie',
		'emojiDescription': 'woman zombie,female zombie',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddcc',
		'emojiKey': '1f9cc',
		'emojiName': 'troll',
		'emojiDescription': 'troll',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc86',
		'emojiKey': '1f486',
		'emojiName': 'massage',
		'emojiDescription': 'massage,face massage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc86\u200d\u2642\ufe0f',
		'emojiKey': '1f486-200d-2642-fe0f',
		'emojiName': 'man getting massage',
		'emojiDescription': 'man getting massage,man-getting-massage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc86\u200d\u2640\ufe0f',
		'emojiKey': '1f486-200d-2640-fe0f',
		'emojiName': 'woman getting massage',
		'emojiDescription': 'woman getting massage,woman-getting-massage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc87',
		'emojiKey': '1f487',
		'emojiName': 'haircut',
		'emojiDescription': 'haircut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc87\u200d\u2642\ufe0f',
		'emojiKey': '1f487-200d-2642-fe0f',
		'emojiName': 'man getting haircut',
		'emojiDescription': 'man getting haircut,man-getting-haircut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc87\u200d\u2640\ufe0f',
		'emojiKey': '1f487-200d-2640-fe0f',
		'emojiName': 'woman getting haircut',
		'emojiDescription': 'woman getting haircut,woman-getting-haircut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb6',
		'emojiKey': '1f6b6',
		'emojiName': 'walking',
		'emojiDescription': 'walking,pedestrian',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb6\u200d\u2642\ufe0f',
		'emojiKey': '1f6b6-200d-2642-fe0f',
		'emojiName': 'man walking',
		'emojiDescription': 'man walking,man-walking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb6\u200d\u2640\ufe0f',
		'emojiKey': '1f6b6-200d-2640-fe0f',
		'emojiName': 'woman walking',
		'emojiDescription': 'woman walking,woman-walking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcd',
		'emojiKey': '1f9cd',
		'emojiName': 'standing person',
		'emojiDescription': 'standing person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcd\u200d\u2642\ufe0f',
		'emojiKey': '1f9cd-200d-2642-fe0f',
		'emojiName': 'man standing',
		'emojiDescription': 'man standing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddcd\u200d\u2640\ufe0f',
		'emojiKey': '1f9cd-200d-2640-fe0f',
		'emojiName': 'woman standing',
		'emojiDescription': 'woman standing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddce',
		'emojiKey': '1f9ce',
		'emojiName': 'kneeling person',
		'emojiDescription': 'kneeling person',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddce\u200d\u2642\ufe0f',
		'emojiKey': '1f9ce-200d-2642-fe0f',
		'emojiName': 'man kneeling',
		'emojiDescription': 'man kneeling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddce\u200d\u2640\ufe0f',
		'emojiKey': '1f9ce-200d-2640-fe0f',
		'emojiName': 'woman kneeling',
		'emojiDescription': 'woman kneeling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddaf',
		'emojiKey': '1f9d1-200d-1f9af',
		'emojiName': 'person with white cane',
		'emojiDescription': 'person with white cane,person with probing cane',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddaf',
		'emojiKey': '1f468-200d-1f9af',
		'emojiName': 'man with white cane',
		'emojiDescription': 'man with white cane,man with probing cane',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddaf',
		'emojiKey': '1f469-200d-1f9af',
		'emojiName': 'woman with white cane',
		'emojiDescription': 'woman with white cane,woman with probing cane',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddbc',
		'emojiKey': '1f9d1-200d-1f9bc',
		'emojiName': 'person in motorized wheelchair',
		'emojiDescription': 'person in motorized wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddbc',
		'emojiKey': '1f468-200d-1f9bc',
		'emojiName': 'man in motorized wheelchair',
		'emojiDescription': 'man in motorized wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddbc',
		'emojiKey': '1f469-200d-1f9bc',
		'emojiName': 'woman in motorized wheelchair',
		'emojiDescription': 'woman in motorized wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\uddbd',
		'emojiKey': '1f9d1-200d-1f9bd',
		'emojiName': 'person in manual wheelchair',
		'emojiDescription': 'person in manual wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83e\uddbd',
		'emojiKey': '1f468-200d-1f9bd',
		'emojiName': 'man in manual wheelchair',
		'emojiDescription': 'man in manual wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83e\uddbd',
		'emojiKey': '1f469-200d-1f9bd',
		'emojiName': 'woman in manual wheelchair',
		'emojiDescription': 'woman in manual wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc3',
		'emojiKey': '1f3c3',
		'emojiName': 'runner',
		'emojiDescription': 'runner,running',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc3\u200d\u2642\ufe0f',
		'emojiKey': '1f3c3-200d-2642-fe0f',
		'emojiName': 'man running',
		'emojiDescription': 'man running,man-running',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc3\u200d\u2640\ufe0f',
		'emojiKey': '1f3c3-200d-2640-fe0f',
		'emojiName': 'woman running',
		'emojiDescription': 'woman running,woman-running',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc83',
		'emojiKey': '1f483',
		'emojiName': 'dancer',
		'emojiDescription': 'dancer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd7a',
		'emojiKey': '1f57a',
		'emojiName': 'man dancing',
		'emojiDescription': 'man dancing',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd74\ufe0f',
		'emojiKey': '1f574-fe0f',
		'emojiName': 'person in suit levitating',
		'emojiDescription': 'person in suit levitating,man in business suit levitating',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6f',
		'emojiKey': '1f46f',
		'emojiName': 'dancers',
		'emojiDescription': 'dancers,woman with bunny ears',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6f\u200d\u2642\ufe0f',
		'emojiKey': '1f46f-200d-2642-fe0f',
		'emojiName': 'men with bunny ears',
		'emojiDescription': 'men with bunny ears,men-with-bunny-ears-partying,man-with-bunny-ears-partying',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6f\u200d\u2640\ufe0f',
		'emojiKey': '1f46f-200d-2640-fe0f',
		'emojiName': 'women with bunny ears',
		'emojiDescription': 'women with bunny ears,women-with-bunny-ears-partying,woman-with-bunny-ears-partying',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd6',
		'emojiKey': '1f9d6',
		'emojiName': 'person in steamy room',
		'emojiDescription': 'person in steamy room',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd6\u200d\u2642\ufe0f',
		'emojiKey': '1f9d6-200d-2642-fe0f',
		'emojiName': 'man in steamy room',
		'emojiDescription': 'man in steamy room',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd6\u200d\u2640\ufe0f',
		'emojiKey': '1f9d6-200d-2640-fe0f',
		'emojiName': 'woman in steamy room',
		'emojiDescription': 'woman in steamy room',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd7',
		'emojiKey': '1f9d7',
		'emojiName': 'person climbing',
		'emojiDescription': 'person climbing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd7\u200d\u2642\ufe0f',
		'emojiKey': '1f9d7-200d-2642-fe0f',
		'emojiName': 'man climbing',
		'emojiDescription': 'man climbing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd7\u200d\u2640\ufe0f',
		'emojiKey': '1f9d7-200d-2640-fe0f',
		'emojiName': 'woman climbing',
		'emojiDescription': 'woman climbing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3a',
		'emojiKey': '1f93a',
		'emojiName': 'fencer',
		'emojiDescription': 'fencer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc7',
		'emojiKey': '1f3c7',
		'emojiName': 'horse racing',
		'emojiDescription': 'horse racing',
		'hasVideo': false
	},
	{
		'emoji': '\u26f7\ufe0f',
		'emojiKey': '26f7-fe0f',
		'emojiName': 'skier',
		'emojiDescription': 'skier',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc2',
		'emojiKey': '1f3c2',
		'emojiName': 'snowboarder',
		'emojiDescription': 'snowboarder',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcc\ufe0f',
		'emojiKey': '1f3cc-fe0f',
		'emojiName': 'golfer',
		'emojiDescription': 'golfer,person golfing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcc\ufe0f\u200d\u2642\ufe0f',
		'emojiKey': '1f3cc-fe0f-200d-2642-fe0f',
		'emojiName': 'man golfing',
		'emojiDescription': 'man golfing,man-golfing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcc\ufe0f\u200d\u2640\ufe0f',
		'emojiKey': '1f3cc-fe0f-200d-2640-fe0f',
		'emojiName': 'woman golfing',
		'emojiDescription': 'woman golfing,woman-golfing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc4',
		'emojiKey': '1f3c4',
		'emojiName': 'surfer',
		'emojiDescription': 'surfer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc4\u200d\u2642\ufe0f',
		'emojiKey': '1f3c4-200d-2642-fe0f',
		'emojiName': 'man surfing',
		'emojiDescription': 'man surfing,man-surfing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc4\u200d\u2640\ufe0f',
		'emojiKey': '1f3c4-200d-2640-fe0f',
		'emojiName': 'woman surfing',
		'emojiDescription': 'woman surfing,woman-surfing',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea3',
		'emojiKey': '1f6a3',
		'emojiName': 'rowboat',
		'emojiDescription': 'rowboat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea3\u200d\u2642\ufe0f',
		'emojiKey': '1f6a3-200d-2642-fe0f',
		'emojiName': 'man rowing boat',
		'emojiDescription': 'man rowing boat,man-rowing-boat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea3\u200d\u2640\ufe0f',
		'emojiKey': '1f6a3-200d-2640-fe0f',
		'emojiName': 'woman rowing boat',
		'emojiDescription': 'woman rowing boat,woman-rowing-boat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfca',
		'emojiKey': '1f3ca',
		'emojiName': 'swimmer',
		'emojiDescription': 'swimmer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfca\u200d\u2642\ufe0f',
		'emojiKey': '1f3ca-200d-2642-fe0f',
		'emojiName': 'man swimming',
		'emojiDescription': 'man swimming,man-swimming',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfca\u200d\u2640\ufe0f',
		'emojiKey': '1f3ca-200d-2640-fe0f',
		'emojiName': 'woman swimming',
		'emojiDescription': 'woman swimming,woman-swimming',
		'hasVideo': false
	},
	{
		'emoji': '\u26f9\ufe0f',
		'emojiKey': '26f9-fe0f',
		'emojiName': 'person with ball',
		'emojiDescription': 'person with ball,person bouncing ball',
		'hasVideo': false
	},
	{
		'emoji': '\u26f9\ufe0f\u200d\u2642\ufe0f',
		'emojiKey': '26f9-fe0f-200d-2642-fe0f',
		'emojiName': 'man bouncing ball',
		'emojiDescription': 'man bouncing ball,man-bouncing-ball',
		'hasVideo': false
	},
	{
		'emoji': '\u26f9\ufe0f\u200d\u2640\ufe0f',
		'emojiKey': '26f9-fe0f-200d-2640-fe0f',
		'emojiName': 'woman bouncing ball',
		'emojiDescription': 'woman bouncing ball,woman-bouncing-ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcb\ufe0f',
		'emojiKey': '1f3cb-fe0f',
		'emojiName': 'weight lifter',
		'emojiDescription': 'weight lifter,person lifting weights',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f',
		'emojiKey': '1f3cb-fe0f-200d-2642-fe0f',
		'emojiName': 'man lifting weights',
		'emojiDescription': 'man lifting weights,man-lifting-weights',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcb\ufe0f\u200d\u2640\ufe0f',
		'emojiKey': '1f3cb-fe0f-200d-2640-fe0f',
		'emojiName': 'woman lifting weights',
		'emojiDescription': 'woman lifting weights,woman-lifting-weights',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb4',
		'emojiKey': '1f6b4',
		'emojiName': 'bicyclist',
		'emojiDescription': 'bicyclist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb4\u200d\u2642\ufe0f',
		'emojiKey': '1f6b4-200d-2642-fe0f',
		'emojiName': 'man biking',
		'emojiDescription': 'man biking,man-biking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb4\u200d\u2640\ufe0f',
		'emojiKey': '1f6b4-200d-2640-fe0f',
		'emojiName': 'woman biking',
		'emojiDescription': 'woman biking,woman-biking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb5',
		'emojiKey': '1f6b5',
		'emojiName': 'mountain bicyclist',
		'emojiDescription': 'mountain bicyclist',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb5\u200d\u2642\ufe0f',
		'emojiKey': '1f6b5-200d-2642-fe0f',
		'emojiName': 'man mountain biking',
		'emojiDescription': 'man mountain biking,man-mountain-biking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb5\u200d\u2640\ufe0f',
		'emojiKey': '1f6b5-200d-2640-fe0f',
		'emojiName': 'woman mountain biking',
		'emojiDescription': 'woman mountain biking,woman-mountain-biking',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd38',
		'emojiKey': '1f938',
		'emojiName': 'person doing cartwheel',
		'emojiDescription': 'person doing cartwheel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd38\u200d\u2642\ufe0f',
		'emojiKey': '1f938-200d-2642-fe0f',
		'emojiName': 'man cartwheeling',
		'emojiDescription': 'man cartwheeling,man-cartwheeling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd38\u200d\u2640\ufe0f',
		'emojiKey': '1f938-200d-2640-fe0f',
		'emojiName': 'woman cartwheeling',
		'emojiDescription': 'woman cartwheeling,woman-cartwheeling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3c',
		'emojiKey': '1f93c',
		'emojiName': 'wrestlers',
		'emojiDescription': 'wrestlers',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3c\u200d\u2642\ufe0f',
		'emojiKey': '1f93c-200d-2642-fe0f',
		'emojiName': 'men wrestling',
		'emojiDescription': 'men wrestling,man-wrestling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3c\u200d\u2640\ufe0f',
		'emojiKey': '1f93c-200d-2640-fe0f',
		'emojiName': 'women wrestling',
		'emojiDescription': 'women wrestling,woman-wrestling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3d',
		'emojiKey': '1f93d',
		'emojiName': 'water polo',
		'emojiDescription': 'water polo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3d\u200d\u2642\ufe0f',
		'emojiKey': '1f93d-200d-2642-fe0f',
		'emojiName': 'man playing water polo',
		'emojiDescription': 'man playing water polo,man-playing-water-polo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3d\u200d\u2640\ufe0f',
		'emojiKey': '1f93d-200d-2640-fe0f',
		'emojiName': 'woman playing water polo',
		'emojiDescription': 'woman playing water polo,woman-playing-water-polo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3e',
		'emojiKey': '1f93e',
		'emojiName': 'handball',
		'emojiDescription': 'handball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3e\u200d\u2642\ufe0f',
		'emojiKey': '1f93e-200d-2642-fe0f',
		'emojiName': 'man playing handball',
		'emojiDescription': 'man playing handball,man-playing-handball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3e\u200d\u2640\ufe0f',
		'emojiKey': '1f93e-200d-2640-fe0f',
		'emojiName': 'woman playing handball',
		'emojiDescription': 'woman playing handball,woman-playing-handball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd39',
		'emojiKey': '1f939',
		'emojiName': 'juggling',
		'emojiDescription': 'juggling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd39\u200d\u2642\ufe0f',
		'emojiKey': '1f939-200d-2642-fe0f',
		'emojiName': 'man juggling',
		'emojiDescription': 'man juggling,man-juggling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd39\u200d\u2640\ufe0f',
		'emojiKey': '1f939-200d-2640-fe0f',
		'emojiName': 'woman juggling',
		'emojiDescription': 'woman juggling,woman-juggling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd8',
		'emojiKey': '1f9d8',
		'emojiName': 'person in lotus position',
		'emojiDescription': 'person in lotus position',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd8\u200d\u2642\ufe0f',
		'emojiKey': '1f9d8-200d-2642-fe0f',
		'emojiName': 'man in lotus position',
		'emojiDescription': 'man in lotus position',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd8\u200d\u2640\ufe0f',
		'emojiKey': '1f9d8-200d-2640-fe0f',
		'emojiName': 'woman in lotus position',
		'emojiDescription': 'woman in lotus position',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udec0',
		'emojiKey': '1f6c0',
		'emojiName': 'bath',
		'emojiDescription': 'bath',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udecc',
		'emojiKey': '1f6cc',
		'emojiName': 'sleeping accommodation',
		'emojiDescription': 'sleeping accommodation',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1',
		'emojiKey': '1f9d1-200d-1f91d-200d-1f9d1',
		'emojiName': 'people holding hands',
		'emojiDescription': 'people holding hands',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6d',
		'emojiKey': '1f46d',
		'emojiName': 'women holding hands',
		'emojiDescription': 'women holding hands,two women holding hands',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6b',
		'emojiKey': '1f46b',
		'emojiName': 'couple',
		'emojiDescription': 'couple,man and woman holding hands,woman and man holding hands',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6c',
		'emojiKey': '1f46c',
		'emojiName': 'men holding hands',
		'emojiDescription': 'men holding hands,two men holding hands',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc8f',
		'emojiKey': '1f48f',
		'emojiName': 'kiss',
		'emojiDescription': 'kiss,couplekiss',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68',
		'emojiKey': '1f469-200d-2764-fe0f-200d-1f48b-200d-1f468',
		'emojiName': 'woman-kiss-man',
		'emojiDescription': 'woman-kiss-man,kiss: woman, man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68',
		'emojiKey': '1f468-200d-2764-fe0f-200d-1f48b-200d-1f468',
		'emojiName': 'man-kiss-man',
		'emojiDescription': 'man-kiss-man,kiss: man, man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69',
		'emojiKey': '1f469-200d-2764-fe0f-200d-1f48b-200d-1f469',
		'emojiName': 'woman-kiss-woman',
		'emojiDescription': 'woman-kiss-woman,kiss: woman, woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc91',
		'emojiKey': '1f491',
		'emojiName': 'couple with heart',
		'emojiDescription': 'couple with heart',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68',
		'emojiKey': '1f469-200d-2764-fe0f-200d-1f468',
		'emojiName': 'woman-heart-man',
		'emojiDescription': 'woman-heart-man,couple with heart: woman, man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68',
		'emojiKey': '1f468-200d-2764-fe0f-200d-1f468',
		'emojiName': 'man-heart-man',
		'emojiDescription': 'man-heart-man,couple with heart: man, man',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69',
		'emojiKey': '1f469-200d-2764-fe0f-200d-1f469',
		'emojiName': 'woman-heart-woman',
		'emojiDescription': 'woman-heart-woman,couple with heart: woman, woman',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc6a',
		'emojiKey': '1f46a',
		'emojiName': 'family',
		'emojiDescription': 'family',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f469-200d-1f466',
		'emojiName': 'man-woman-boy',
		'emojiDescription': 'man-woman-boy,family: man, woman, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f469-200d-1f467',
		'emojiName': 'man-woman-girl',
		'emojiDescription': 'man-woman-girl,family: man, woman, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f469-200d-1f467-200d-1f466',
		'emojiName': 'man-woman-girl-boy',
		'emojiDescription': 'man-woman-girl-boy,family: man, woman, girl, boy',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f469-200d-1f466-200d-1f466',
		'emojiName': 'man-woman-boy-boy',
		'emojiDescription': 'man-woman-boy-boy,family: man, woman, boy, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f469-200d-1f467-200d-1f467',
		'emojiName': 'man-woman-girl-girl',
		'emojiDescription': 'man-woman-girl-girl,family: man, woman, girl, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f468-200d-1f466',
		'emojiName': 'man-man-boy',
		'emojiDescription': 'man-man-boy,family: man, man, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f468-200d-1f467',
		'emojiName': 'man-man-girl',
		'emojiDescription': 'man-man-girl,family: man, man, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f468-200d-1f467-200d-1f466',
		'emojiName': 'man-man-girl-boy',
		'emojiDescription': 'man-man-girl-boy,family: man, man, girl, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f468-200d-1f466-200d-1f466',
		'emojiName': 'man-man-boy-boy',
		'emojiDescription': 'man-man-boy-boy,family: man, man, boy, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f468-200d-1f467-200d-1f467',
		'emojiName': 'man-man-girl-girl',
		'emojiDescription': 'man-man-girl-girl,family: man, man, girl, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f469-200d-1f466',
		'emojiName': 'woman-woman-boy',
		'emojiDescription': 'woman-woman-boy,family: woman, woman, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67',
		'emojiKey': '1f469-200d-1f469-200d-1f467',
		'emojiName': 'woman-woman-girl',
		'emojiDescription': 'woman-woman-girl,family: woman, woman, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f469-200d-1f467-200d-1f466',
		'emojiName': 'woman-woman-girl-boy',
		'emojiDescription': 'woman-woman-girl-boy,family: woman, woman, girl, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f469-200d-1f466-200d-1f466',
		'emojiName': 'woman-woman-boy-boy',
		'emojiDescription': 'woman-woman-boy-boy,family: woman, woman, boy, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
		'emojiKey': '1f469-200d-1f469-200d-1f467-200d-1f467',
		'emojiName': 'woman-woman-girl-girl',
		'emojiDescription': 'woman-woman-girl-girl,family: woman, woman, girl, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f466',
		'emojiName': 'man-boy',
		'emojiDescription': 'man-boy,family: man, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f466-200d-1f466',
		'emojiName': 'man-boy-boy',
		'emojiDescription': 'man-boy-boy,family: man, boy, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f467',
		'emojiName': 'man-girl',
		'emojiDescription': 'man-girl,family: man, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66',
		'emojiKey': '1f468-200d-1f467-200d-1f466',
		'emojiName': 'man-girl-boy',
		'emojiDescription': 'man-girl-boy,family: man, girl, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67',
		'emojiKey': '1f468-200d-1f467-200d-1f467',
		'emojiName': 'man-girl-girl',
		'emojiDescription': 'man-girl-girl,family: man, girl, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f466',
		'emojiName': 'woman-boy',
		'emojiDescription': 'woman-boy,family: woman, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f466-200d-1f466',
		'emojiName': 'woman-boy-boy',
		'emojiDescription': 'woman-boy-boy,family: woman, boy, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc67',
		'emojiKey': '1f469-200d-1f467',
		'emojiName': 'woman-girl',
		'emojiDescription': 'woman-girl,family: woman, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
		'emojiKey': '1f469-200d-1f467-200d-1f466',
		'emojiName': 'woman-girl-boy',
		'emojiDescription': 'woman-girl-boy,family: woman, girl, boy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67',
		'emojiKey': '1f469-200d-1f467-200d-1f467',
		'emojiName': 'woman-girl-girl',
		'emojiDescription': 'woman-girl-girl,family: woman, girl, girl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udde3\ufe0f',
		'emojiKey': '1f5e3-fe0f',
		'emojiName': 'speaking head',
		'emojiDescription': 'speaking head,speaking head in silhouette',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc64',
		'emojiKey': '1f464',
		'emojiName': 'bust in silhouette',
		'emojiDescription': 'bust in silhouette',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc65',
		'emojiKey': '1f465',
		'emojiName': 'busts in silhouette',
		'emojiDescription': 'busts in silhouette',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udec2',
		'emojiKey': '1fac2',
		'emojiName': 'people hugging',
		'emojiDescription': 'people hugging',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc63',
		'emojiKey': '1f463',
		'emojiName': 'footprints',
		'emojiDescription': 'footprints',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc35',
		'emojiKey': '1f435',
		'emojiName': 'monkey face',
		'emojiDescription': 'monkey face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc12',
		'emojiKey': '1f412',
		'emojiName': 'monkey',
		'emojiDescription': 'monkey',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd8d',
		'emojiKey': '1f98d',
		'emojiName': 'gorilla',
		'emojiDescription': 'gorilla',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udda7',
		'emojiKey': '1f9a7',
		'emojiName': 'orangutan',
		'emojiDescription': 'orangutan',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc36',
		'emojiKey': '1f436',
		'emojiName': 'dog',
		'emojiDescription': 'dog,dog face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc15',
		'emojiKey': '1f415',
		'emojiName': 'dog',
		'emojiDescription': 'dog,dog2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddae',
		'emojiKey': '1f9ae',
		'emojiName': 'guide dog',
		'emojiDescription': 'guide dog',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc15\u200d\ud83e\uddba',
		'emojiKey': '1f415-200d-1f9ba',
		'emojiName': 'service dog',
		'emojiDescription': 'service dog',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc29',
		'emojiKey': '1f429',
		'emojiName': 'poodle',
		'emojiDescription': 'poodle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc3a',
		'emojiKey': '1f43a',
		'emojiName': 'wolf',
		'emojiDescription': 'wolf,wolf face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd8a',
		'emojiKey': '1f98a',
		'emojiName': 'fox face',
		'emojiDescription': 'fox face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd9d',
		'emojiKey': '1f99d',
		'emojiName': 'raccoon',
		'emojiDescription': 'raccoon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc31',
		'emojiKey': '1f431',
		'emojiName': 'cat',
		'emojiDescription': 'cat,cat face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc08',
		'emojiKey': '1f408',
		'emojiName': 'cat',
		'emojiDescription': 'cat,cat2',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc08\u200d\u2b1b',
		'emojiKey': '1f408-200d-2b1b',
		'emojiName': 'black cat',
		'emojiDescription': 'black cat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd81',
		'emojiKey': '1f981',
		'emojiName': 'lion face',
		'emojiDescription': 'lion face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc2f',
		'emojiKey': '1f42f',
		'emojiName': 'tiger',
		'emojiDescription': 'tiger,tiger face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc05',
		'emojiKey': '1f405',
		'emojiName': 'tiger',
		'emojiDescription': 'tiger,tiger2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc06',
		'emojiKey': '1f406',
		'emojiName': 'leopard',
		'emojiDescription': 'leopard',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc34',
		'emojiKey': '1f434',
		'emojiName': 'horse',
		'emojiDescription': 'horse,horse face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc0e',
		'emojiKey': '1f40e',
		'emojiName': 'horse',
		'emojiDescription': 'horse,racehorse',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd84',
		'emojiKey': '1f984',
		'emojiName': 'unicorn face',
		'emojiDescription': 'unicorn face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd93',
		'emojiKey': '1f993',
		'emojiName': 'zebra face',
		'emojiDescription': 'zebra face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd8c',
		'emojiKey': '1f98c',
		'emojiName': 'deer',
		'emojiDescription': 'deer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddac',
		'emojiKey': '1f9ac',
		'emojiName': 'bison',
		'emojiDescription': 'bison',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc2e',
		'emojiKey': '1f42e',
		'emojiName': 'cow',
		'emojiDescription': 'cow,cow face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc02',
		'emojiKey': '1f402',
		'emojiName': 'ox',
		'emojiDescription': 'ox',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc03',
		'emojiKey': '1f403',
		'emojiName': 'water buffalo',
		'emojiDescription': 'water buffalo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc04',
		'emojiKey': '1f404',
		'emojiName': 'cow',
		'emojiDescription': 'cow,cow2',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc37',
		'emojiKey': '1f437',
		'emojiName': 'pig',
		'emojiDescription': 'pig,pig face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc16',
		'emojiKey': '1f416',
		'emojiName': 'pig',
		'emojiDescription': 'pig,pig2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc17',
		'emojiKey': '1f417',
		'emojiName': 'boar',
		'emojiDescription': 'boar',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc3d',
		'emojiKey': '1f43d',
		'emojiName': 'pig nose',
		'emojiDescription': 'pig nose',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc0f',
		'emojiKey': '1f40f',
		'emojiName': 'ram',
		'emojiDescription': 'ram',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc11',
		'emojiKey': '1f411',
		'emojiName': 'sheep',
		'emojiDescription': 'sheep',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc10',
		'emojiKey': '1f410',
		'emojiName': 'goat',
		'emojiDescription': 'goat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc2a',
		'emojiKey': '1f42a',
		'emojiName': 'dromedary camel',
		'emojiDescription': 'dromedary camel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc2b',
		'emojiKey': '1f42b',
		'emojiName': 'camel',
		'emojiDescription': 'camel,bactrian camel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd99',
		'emojiKey': '1f999',
		'emojiName': 'llama',
		'emojiDescription': 'llama',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd92',
		'emojiKey': '1f992',
		'emojiName': 'giraffe face',
		'emojiDescription': 'giraffe face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc18',
		'emojiKey': '1f418',
		'emojiName': 'elephant',
		'emojiDescription': 'elephant',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udda3',
		'emojiKey': '1f9a3',
		'emojiName': 'mammoth',
		'emojiDescription': 'mammoth',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd8f',
		'emojiKey': '1f98f',
		'emojiName': 'rhinoceros',
		'emojiDescription': 'rhinoceros',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd9b',
		'emojiKey': '1f99b',
		'emojiName': 'hippopotamus',
		'emojiDescription': 'hippopotamus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc2d',
		'emojiKey': '1f42d',
		'emojiName': 'mouse',
		'emojiDescription': 'mouse,mouse face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc01',
		'emojiKey': '1f401',
		'emojiName': 'mouse',
		'emojiDescription': 'mouse,mouse2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc00',
		'emojiKey': '1f400',
		'emojiName': 'rat',
		'emojiDescription': 'rat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc39',
		'emojiKey': '1f439',
		'emojiName': 'hamster',
		'emojiDescription': 'hamster,hamster face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc30',
		'emojiKey': '1f430',
		'emojiName': 'rabbit',
		'emojiDescription': 'rabbit,rabbit face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc07',
		'emojiKey': '1f407',
		'emojiName': 'rabbit',
		'emojiDescription': 'rabbit,rabbit2',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc3f\ufe0f',
		'emojiKey': '1f43f-fe0f',
		'emojiName': 'chipmunk',
		'emojiDescription': 'chipmunk',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddab',
		'emojiKey': '1f9ab',
		'emojiName': 'beaver',
		'emojiDescription': 'beaver',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd94',
		'emojiKey': '1f994',
		'emojiName': 'hedgehog',
		'emojiDescription': 'hedgehog',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd87',
		'emojiKey': '1f987',
		'emojiName': 'bat',
		'emojiDescription': 'bat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc3b',
		'emojiKey': '1f43b',
		'emojiName': 'bear',
		'emojiDescription': 'bear,bear face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc3b\u200d\u2744\ufe0f',
		'emojiKey': '1f43b-200d-2744-fe0f',
		'emojiName': 'polar bear',
		'emojiDescription': 'polar bear',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc28',
		'emojiKey': '1f428',
		'emojiName': 'koala',
		'emojiDescription': 'koala',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc3c',
		'emojiKey': '1f43c',
		'emojiName': 'panda face',
		'emojiDescription': 'panda face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udda5',
		'emojiKey': '1f9a5',
		'emojiName': 'sloth',
		'emojiDescription': 'sloth',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udda6',
		'emojiKey': '1f9a6',
		'emojiName': 'otter',
		'emojiDescription': 'otter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udda8',
		'emojiKey': '1f9a8',
		'emojiName': 'skunk',
		'emojiDescription': 'skunk',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd98',
		'emojiKey': '1f998',
		'emojiName': 'kangaroo',
		'emojiDescription': 'kangaroo',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udda1',
		'emojiKey': '1f9a1',
		'emojiName': 'badger',
		'emojiDescription': 'badger',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc3e',
		'emojiKey': '1f43e',
		'emojiName': 'feet',
		'emojiDescription': 'feet,paw prints',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd83',
		'emojiKey': '1f983',
		'emojiName': 'turkey',
		'emojiDescription': 'turkey',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc14',
		'emojiKey': '1f414',
		'emojiName': 'chicken',
		'emojiDescription': 'chicken',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc13',
		'emojiKey': '1f413',
		'emojiName': 'rooster',
		'emojiDescription': 'rooster',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc23',
		'emojiKey': '1f423',
		'emojiName': 'hatching chick',
		'emojiDescription': 'hatching chick',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc24',
		'emojiKey': '1f424',
		'emojiName': 'baby chick',
		'emojiDescription': 'baby chick',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc25',
		'emojiKey': '1f425',
		'emojiName': 'hatched chick',
		'emojiDescription': 'hatched chick,front-facing baby chick',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc26',
		'emojiKey': '1f426',
		'emojiName': 'bird',
		'emojiDescription': 'bird',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc27',
		'emojiKey': '1f427',
		'emojiName': 'penguin',
		'emojiDescription': 'penguin',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd4a\ufe0f',
		'emojiKey': '1f54a-fe0f',
		'emojiName': 'dove',
		'emojiDescription': 'dove,dove of peace',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd85',
		'emojiKey': '1f985',
		'emojiName': 'eagle',
		'emojiDescription': 'eagle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd86',
		'emojiKey': '1f986',
		'emojiName': 'duck',
		'emojiDescription': 'duck',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udda2',
		'emojiKey': '1f9a2',
		'emojiName': 'swan',
		'emojiDescription': 'swan',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd89',
		'emojiKey': '1f989',
		'emojiName': 'owl',
		'emojiDescription': 'owl',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udda4',
		'emojiKey': '1f9a4',
		'emojiName': 'dodo',
		'emojiDescription': 'dodo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb6',
		'emojiKey': '1fab6',
		'emojiName': 'feather',
		'emojiDescription': 'feather',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udda9',
		'emojiKey': '1f9a9',
		'emojiName': 'flamingo',
		'emojiDescription': 'flamingo',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd9a',
		'emojiKey': '1f99a',
		'emojiName': 'peacock',
		'emojiDescription': 'peacock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd9c',
		'emojiKey': '1f99c',
		'emojiName': 'parrot',
		'emojiDescription': 'parrot',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc38',
		'emojiKey': '1f438',
		'emojiName': 'frog',
		'emojiDescription': 'frog,frog face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc0a',
		'emojiKey': '1f40a',
		'emojiName': 'crocodile',
		'emojiDescription': 'crocodile',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc22',
		'emojiKey': '1f422',
		'emojiName': 'turtle',
		'emojiDescription': 'turtle',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd8e',
		'emojiKey': '1f98e',
		'emojiName': 'lizard',
		'emojiDescription': 'lizard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc0d',
		'emojiKey': '1f40d',
		'emojiName': 'snake',
		'emojiDescription': 'snake',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc32',
		'emojiKey': '1f432',
		'emojiName': 'dragon face',
		'emojiDescription': 'dragon face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc09',
		'emojiKey': '1f409',
		'emojiName': 'dragon',
		'emojiDescription': 'dragon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd95',
		'emojiKey': '1f995',
		'emojiName': 'sauropod',
		'emojiDescription': 'sauropod',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd96',
		'emojiKey': '1f996',
		'emojiName': 't-rex',
		'emojiDescription': 't-rex',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc33',
		'emojiKey': '1f433',
		'emojiName': 'whale',
		'emojiDescription': 'whale,spouting whale',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc0b',
		'emojiKey': '1f40b',
		'emojiName': 'whale',
		'emojiDescription': 'whale,whale2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc2c',
		'emojiKey': '1f42c',
		'emojiName': 'dolphin',
		'emojiDescription': 'dolphin,flipper',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddad',
		'emojiKey': '1f9ad',
		'emojiName': 'seal',
		'emojiDescription': 'seal',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1f',
		'emojiKey': '1f41f',
		'emojiName': 'fish',
		'emojiDescription': 'fish',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc20',
		'emojiKey': '1f420',
		'emojiName': 'tropical fish',
		'emojiDescription': 'tropical fish',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc21',
		'emojiKey': '1f421',
		'emojiName': 'blowfish',
		'emojiDescription': 'blowfish',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd88',
		'emojiKey': '1f988',
		'emojiName': 'shark',
		'emojiDescription': 'shark',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc19',
		'emojiKey': '1f419',
		'emojiName': 'octopus',
		'emojiDescription': 'octopus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1a',
		'emojiKey': '1f41a',
		'emojiName': 'shell',
		'emojiDescription': 'shell,spiral shell',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb8',
		'emojiKey': '1fab8',
		'emojiName': 'coral',
		'emojiDescription': 'coral',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc0c',
		'emojiKey': '1f40c',
		'emojiName': 'snail',
		'emojiDescription': 'snail',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd8b',
		'emojiKey': '1f98b',
		'emojiName': 'butterfly',
		'emojiDescription': 'butterfly',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1b',
		'emojiKey': '1f41b',
		'emojiName': 'bug',
		'emojiDescription': 'bug',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1c',
		'emojiKey': '1f41c',
		'emojiName': 'ant',
		'emojiDescription': 'ant',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1d',
		'emojiKey': '1f41d',
		'emojiName': 'bee',
		'emojiDescription': 'bee,honeybee',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udeb2',
		'emojiKey': '1fab2',
		'emojiName': 'beetle',
		'emojiDescription': 'beetle',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc1e',
		'emojiKey': '1f41e',
		'emojiName': 'ladybug',
		'emojiDescription': 'ladybug,lady beetle',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd97',
		'emojiKey': '1f997',
		'emojiName': 'cricket',
		'emojiDescription': 'cricket',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udeb3',
		'emojiKey': '1fab3',
		'emojiName': 'cockroach',
		'emojiDescription': 'cockroach',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd77\ufe0f',
		'emojiKey': '1f577-fe0f',
		'emojiName': 'spider',
		'emojiDescription': 'spider',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd78\ufe0f',
		'emojiKey': '1f578-fe0f',
		'emojiName': 'spider web',
		'emojiDescription': 'spider web',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd82',
		'emojiKey': '1f982',
		'emojiName': 'scorpion',
		'emojiDescription': 'scorpion',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd9f',
		'emojiKey': '1f99f',
		'emojiName': 'mosquito',
		'emojiDescription': 'mosquito',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udeb0',
		'emojiKey': '1fab0',
		'emojiName': 'fly',
		'emojiDescription': 'fly',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb1',
		'emojiKey': '1fab1',
		'emojiName': 'worm',
		'emojiDescription': 'worm',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udda0',
		'emojiKey': '1f9a0',
		'emojiName': 'microbe',
		'emojiDescription': 'microbe',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc90',
		'emojiKey': '1f490',
		'emojiName': 'bouquet',
		'emojiDescription': 'bouquet',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf38',
		'emojiKey': '1f338',
		'emojiName': 'cherry blossom',
		'emojiDescription': 'cherry blossom',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcae',
		'emojiKey': '1f4ae',
		'emojiName': 'white flower',
		'emojiDescription': 'white flower',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb7',
		'emojiKey': '1fab7',
		'emojiName': 'lotus',
		'emojiDescription': 'lotus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff5\ufe0f',
		'emojiKey': '1f3f5-fe0f',
		'emojiName': 'rosette',
		'emojiDescription': 'rosette',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf39',
		'emojiKey': '1f339',
		'emojiName': 'rose',
		'emojiDescription': 'rose',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd40',
		'emojiKey': '1f940',
		'emojiName': 'wilted flower',
		'emojiDescription': 'wilted flower',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf3a',
		'emojiKey': '1f33a',
		'emojiName': 'hibiscus',
		'emojiDescription': 'hibiscus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf3b',
		'emojiKey': '1f33b',
		'emojiName': 'sunflower',
		'emojiDescription': 'sunflower',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf3c',
		'emojiKey': '1f33c',
		'emojiName': 'blossom',
		'emojiDescription': 'blossom',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf37',
		'emojiKey': '1f337',
		'emojiName': 'tulip',
		'emojiDescription': 'tulip',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf31',
		'emojiKey': '1f331',
		'emojiName': 'seedling',
		'emojiDescription': 'seedling',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udeb4',
		'emojiKey': '1fab4',
		'emojiName': 'potted plant',
		'emojiDescription': 'potted plant',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf32',
		'emojiKey': '1f332',
		'emojiName': 'evergreen tree',
		'emojiDescription': 'evergreen tree',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf33',
		'emojiKey': '1f333',
		'emojiName': 'deciduous tree',
		'emojiDescription': 'deciduous tree',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf34',
		'emojiKey': '1f334',
		'emojiName': 'palm tree',
		'emojiDescription': 'palm tree',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf35',
		'emojiKey': '1f335',
		'emojiName': 'cactus',
		'emojiDescription': 'cactus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf3e',
		'emojiKey': '1f33e',
		'emojiName': 'ear of rice',
		'emojiDescription': 'ear of rice',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf3f',
		'emojiKey': '1f33f',
		'emojiName': 'herb',
		'emojiDescription': 'herb',
		'hasVideo': true
	},
	{
		'emoji': '\u2618\ufe0f',
		'emojiKey': '2618-fe0f',
		'emojiName': 'shamrock',
		'emojiDescription': 'shamrock',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf40',
		'emojiKey': '1f340',
		'emojiName': 'four leaf clover',
		'emojiDescription': 'four leaf clover',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf41',
		'emojiKey': '1f341',
		'emojiName': 'maple leaf',
		'emojiDescription': 'maple leaf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf42',
		'emojiKey': '1f342',
		'emojiName': 'fallen leaf',
		'emojiDescription': 'fallen leaf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf43',
		'emojiKey': '1f343',
		'emojiName': 'leaves',
		'emojiDescription': 'leaves,leaf fluttering in wind',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb9',
		'emojiKey': '1fab9',
		'emojiName': 'empty nest',
		'emojiDescription': 'empty nest',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeba',
		'emojiKey': '1faba',
		'emojiName': 'nest with eggs',
		'emojiDescription': 'nest with eggs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf47',
		'emojiKey': '1f347',
		'emojiName': 'grapes',
		'emojiDescription': 'grapes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf48',
		'emojiKey': '1f348',
		'emojiName': 'melon',
		'emojiDescription': 'melon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf49',
		'emojiKey': '1f349',
		'emojiName': 'watermelon',
		'emojiDescription': 'watermelon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf4a',
		'emojiKey': '1f34a',
		'emojiName': 'tangerine',
		'emojiDescription': 'tangerine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf4b',
		'emojiKey': '1f34b',
		'emojiName': 'lemon',
		'emojiDescription': 'lemon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf4c',
		'emojiKey': '1f34c',
		'emojiName': 'banana',
		'emojiDescription': 'banana',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf4d',
		'emojiKey': '1f34d',
		'emojiName': 'pineapple',
		'emojiDescription': 'pineapple',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd6d',
		'emojiKey': '1f96d',
		'emojiName': 'mango',
		'emojiDescription': 'mango',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf4e',
		'emojiKey': '1f34e',
		'emojiName': 'apple',
		'emojiDescription': 'apple,red apple',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf4f',
		'emojiKey': '1f34f',
		'emojiName': 'green apple',
		'emojiDescription': 'green apple',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf50',
		'emojiKey': '1f350',
		'emojiName': 'pear',
		'emojiDescription': 'pear',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf51',
		'emojiKey': '1f351',
		'emojiName': 'peach',
		'emojiDescription': 'peach',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf52',
		'emojiKey': '1f352',
		'emojiName': 'cherries',
		'emojiDescription': 'cherries',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf53',
		'emojiKey': '1f353',
		'emojiName': 'strawberry',
		'emojiDescription': 'strawberry',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uded0',
		'emojiKey': '1fad0',
		'emojiName': 'blueberries',
		'emojiDescription': 'blueberries',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd5d',
		'emojiKey': '1f95d',
		'emojiName': 'kiwifruit',
		'emojiDescription': 'kiwifruit',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf45',
		'emojiKey': '1f345',
		'emojiName': 'tomato',
		'emojiDescription': 'tomato',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded2',
		'emojiKey': '1fad2',
		'emojiName': 'olive',
		'emojiDescription': 'olive',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd65',
		'emojiKey': '1f965',
		'emojiName': 'coconut',
		'emojiDescription': 'coconut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd51',
		'emojiKey': '1f951',
		'emojiName': 'avocado',
		'emojiDescription': 'avocado',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf46',
		'emojiKey': '1f346',
		'emojiName': 'eggplant',
		'emojiDescription': 'eggplant,aubergine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd54',
		'emojiKey': '1f954',
		'emojiName': 'potato',
		'emojiDescription': 'potato',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd55',
		'emojiKey': '1f955',
		'emojiName': 'carrot',
		'emojiDescription': 'carrot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf3d',
		'emojiKey': '1f33d',
		'emojiName': 'corn',
		'emojiDescription': 'corn,ear of maize',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf36\ufe0f',
		'emojiKey': '1f336-fe0f',
		'emojiName': 'hot pepper',
		'emojiDescription': 'hot pepper',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded1',
		'emojiKey': '1fad1',
		'emojiName': 'bell pepper',
		'emojiDescription': 'bell pepper',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd52',
		'emojiKey': '1f952',
		'emojiName': 'cucumber',
		'emojiDescription': 'cucumber',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd6c',
		'emojiKey': '1f96c',
		'emojiName': 'leafy green',
		'emojiDescription': 'leafy green',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd66',
		'emojiKey': '1f966',
		'emojiName': 'broccoli',
		'emojiDescription': 'broccoli',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddc4',
		'emojiKey': '1f9c4',
		'emojiName': 'garlic',
		'emojiDescription': 'garlic',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddc5',
		'emojiKey': '1f9c5',
		'emojiName': 'onion',
		'emojiDescription': 'onion',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf44',
		'emojiKey': '1f344',
		'emojiName': 'mushroom',
		'emojiDescription': 'mushroom',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd5c',
		'emojiKey': '1f95c',
		'emojiName': 'peanuts',
		'emojiDescription': 'peanuts',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded8',
		'emojiKey': '1fad8',
		'emojiName': 'beans',
		'emojiDescription': 'beans',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf30',
		'emojiKey': '1f330',
		'emojiName': 'chestnut',
		'emojiDescription': 'chestnut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf5e',
		'emojiKey': '1f35e',
		'emojiName': 'bread',
		'emojiDescription': 'bread',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd50',
		'emojiKey': '1f950',
		'emojiName': 'croissant',
		'emojiDescription': 'croissant',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd56',
		'emojiKey': '1f956',
		'emojiName': 'baguette bread',
		'emojiDescription': 'baguette bread',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded3',
		'emojiKey': '1fad3',
		'emojiName': 'flatbread',
		'emojiDescription': 'flatbread',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd68',
		'emojiKey': '1f968',
		'emojiName': 'pretzel',
		'emojiDescription': 'pretzel',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd6f',
		'emojiKey': '1f96f',
		'emojiName': 'bagel',
		'emojiDescription': 'bagel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd5e',
		'emojiKey': '1f95e',
		'emojiName': 'pancakes',
		'emojiDescription': 'pancakes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc7',
		'emojiKey': '1f9c7',
		'emojiName': 'waffle',
		'emojiDescription': 'waffle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddc0',
		'emojiKey': '1f9c0',
		'emojiName': 'cheese wedge',
		'emojiDescription': 'cheese wedge',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf56',
		'emojiKey': '1f356',
		'emojiName': 'meat on bone',
		'emojiDescription': 'meat on bone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf57',
		'emojiKey': '1f357',
		'emojiName': 'poultry leg',
		'emojiDescription': 'poultry leg',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd69',
		'emojiKey': '1f969',
		'emojiName': 'cut of meat',
		'emojiDescription': 'cut of meat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd53',
		'emojiKey': '1f953',
		'emojiName': 'bacon',
		'emojiDescription': 'bacon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf54',
		'emojiKey': '1f354',
		'emojiName': 'hamburger',
		'emojiDescription': 'hamburger',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf5f',
		'emojiKey': '1f35f',
		'emojiName': 'fries',
		'emojiDescription': 'fries,french fries',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf55',
		'emojiKey': '1f355',
		'emojiName': 'pizza',
		'emojiDescription': 'pizza,slice of pizza',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf2d',
		'emojiKey': '1f32d',
		'emojiName': 'hotdog',
		'emojiDescription': 'hotdog,hot dog',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd6a',
		'emojiKey': '1f96a',
		'emojiName': 'sandwich',
		'emojiDescription': 'sandwich',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf2e',
		'emojiKey': '1f32e',
		'emojiName': 'taco',
		'emojiDescription': 'taco',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf2f',
		'emojiKey': '1f32f',
		'emojiName': 'burrito',
		'emojiDescription': 'burrito',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded4',
		'emojiKey': '1fad4',
		'emojiName': 'tamale',
		'emojiDescription': 'tamale',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd59',
		'emojiKey': '1f959',
		'emojiName': 'stuffed flatbread',
		'emojiDescription': 'stuffed flatbread',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc6',
		'emojiKey': '1f9c6',
		'emojiName': 'falafel',
		'emojiDescription': 'falafel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd5a',
		'emojiKey': '1f95a',
		'emojiName': 'egg',
		'emojiDescription': 'egg',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf73',
		'emojiKey': '1f373',
		'emojiName': 'cooking',
		'emojiDescription': 'cooking,fried egg',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd58',
		'emojiKey': '1f958',
		'emojiName': 'shallow pan of food',
		'emojiDescription': 'shallow pan of food',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf72',
		'emojiKey': '1f372',
		'emojiName': 'stew',
		'emojiDescription': 'stew,pot of food',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded5',
		'emojiKey': '1fad5',
		'emojiName': 'fondue',
		'emojiDescription': 'fondue',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd63',
		'emojiKey': '1f963',
		'emojiName': 'bowl with spoon',
		'emojiDescription': 'bowl with spoon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd57',
		'emojiKey': '1f957',
		'emojiName': 'green salad',
		'emojiDescription': 'green salad',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf7f',
		'emojiKey': '1f37f',
		'emojiName': 'popcorn',
		'emojiDescription': 'popcorn',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc8',
		'emojiKey': '1f9c8',
		'emojiName': 'butter',
		'emojiDescription': 'butter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddc2',
		'emojiKey': '1f9c2',
		'emojiName': 'salt',
		'emojiDescription': 'salt,salt shaker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd6b',
		'emojiKey': '1f96b',
		'emojiName': 'canned food',
		'emojiDescription': 'canned food',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf71',
		'emojiKey': '1f371',
		'emojiName': 'bento',
		'emojiDescription': 'bento,bento box',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf58',
		'emojiKey': '1f358',
		'emojiName': 'rice cracker',
		'emojiDescription': 'rice cracker',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf59',
		'emojiKey': '1f359',
		'emojiName': 'rice ball',
		'emojiDescription': 'rice ball',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf5a',
		'emojiKey': '1f35a',
		'emojiName': 'rice',
		'emojiDescription': 'rice,cooked rice',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf5b',
		'emojiKey': '1f35b',
		'emojiName': 'curry',
		'emojiDescription': 'curry,curry and rice',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf5c',
		'emojiKey': '1f35c',
		'emojiName': 'ramen',
		'emojiDescription': 'ramen,steaming bowl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf5d',
		'emojiKey': '1f35d',
		'emojiName': 'spaghetti',
		'emojiDescription': 'spaghetti',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf60',
		'emojiKey': '1f360',
		'emojiName': 'sweet potato',
		'emojiDescription': 'sweet potato,roasted sweet potato',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf62',
		'emojiKey': '1f362',
		'emojiName': 'oden',
		'emojiDescription': 'oden',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf63',
		'emojiKey': '1f363',
		'emojiName': 'sushi',
		'emojiDescription': 'sushi',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf64',
		'emojiKey': '1f364',
		'emojiName': 'fried shrimp',
		'emojiDescription': 'fried shrimp',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf65',
		'emojiKey': '1f365',
		'emojiName': 'fish cake',
		'emojiDescription': 'fish cake,fish cake with swirl design',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd6e',
		'emojiKey': '1f96e',
		'emojiName': 'moon cake',
		'emojiDescription': 'moon cake',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf61',
		'emojiKey': '1f361',
		'emojiName': 'dango',
		'emojiDescription': 'dango',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd5f',
		'emojiKey': '1f95f',
		'emojiName': 'dumpling',
		'emojiDescription': 'dumpling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd60',
		'emojiKey': '1f960',
		'emojiName': 'fortune cookie',
		'emojiDescription': 'fortune cookie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd61',
		'emojiKey': '1f961',
		'emojiName': 'takeout box',
		'emojiDescription': 'takeout box',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd80',
		'emojiKey': '1f980',
		'emojiName': 'crab',
		'emojiDescription': 'crab',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd9e',
		'emojiKey': '1f99e',
		'emojiName': 'lobster',
		'emojiDescription': 'lobster',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd90',
		'emojiKey': '1f990',
		'emojiName': 'shrimp',
		'emojiDescription': 'shrimp',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd91',
		'emojiKey': '1f991',
		'emojiName': 'squid',
		'emojiDescription': 'squid',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddaa',
		'emojiKey': '1f9aa',
		'emojiName': 'oyster',
		'emojiDescription': 'oyster',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf66',
		'emojiKey': '1f366',
		'emojiName': 'icecream',
		'emojiDescription': 'icecream,soft ice cream',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf67',
		'emojiKey': '1f367',
		'emojiName': 'shaved ice',
		'emojiDescription': 'shaved ice',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf68',
		'emojiKey': '1f368',
		'emojiName': 'ice cream',
		'emojiDescription': 'ice cream',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf69',
		'emojiKey': '1f369',
		'emojiName': 'doughnut',
		'emojiDescription': 'doughnut',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf6a',
		'emojiKey': '1f36a',
		'emojiName': 'cookie',
		'emojiDescription': 'cookie',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf82',
		'emojiKey': '1f382',
		'emojiName': 'birthday',
		'emojiDescription': 'birthday,birthday cake',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf70',
		'emojiKey': '1f370',
		'emojiName': 'cake',
		'emojiDescription': 'cake,shortcake',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc1',
		'emojiKey': '1f9c1',
		'emojiName': 'cupcake',
		'emojiDescription': 'cupcake',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd67',
		'emojiKey': '1f967',
		'emojiName': 'pie',
		'emojiDescription': 'pie',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf6b',
		'emojiKey': '1f36b',
		'emojiName': 'chocolate bar',
		'emojiDescription': 'chocolate bar',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf6c',
		'emojiKey': '1f36c',
		'emojiName': 'candy',
		'emojiDescription': 'candy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf6d',
		'emojiKey': '1f36d',
		'emojiName': 'lollipop',
		'emojiDescription': 'lollipop',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf6e',
		'emojiKey': '1f36e',
		'emojiName': 'custard',
		'emojiDescription': 'custard',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf6f',
		'emojiKey': '1f36f',
		'emojiName': 'honey pot',
		'emojiDescription': 'honey pot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf7c',
		'emojiKey': '1f37c',
		'emojiName': 'baby bottle',
		'emojiDescription': 'baby bottle',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd5b',
		'emojiKey': '1f95b',
		'emojiName': 'glass of milk',
		'emojiDescription': 'glass of milk',
		'hasVideo': true
	},
	{
		'emoji': '\u2615',
		'emojiKey': '2615',
		'emojiName': 'coffee',
		'emojiDescription': 'coffee,hot beverage',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uded6',
		'emojiKey': '1fad6',
		'emojiName': 'teapot',
		'emojiDescription': 'teapot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf75',
		'emojiKey': '1f375',
		'emojiName': 'tea',
		'emojiDescription': 'tea,teacup without handle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf76',
		'emojiKey': '1f376',
		'emojiName': 'sake',
		'emojiDescription': 'sake,sake bottle and cup',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf7e',
		'emojiKey': '1f37e',
		'emojiName': 'champagne',
		'emojiDescription': 'champagne,bottle with popping cork',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf77',
		'emojiKey': '1f377',
		'emojiName': 'wine glass',
		'emojiDescription': 'wine glass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf78',
		'emojiKey': '1f378',
		'emojiName': 'cocktail',
		'emojiDescription': 'cocktail,cocktail glass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf79',
		'emojiKey': '1f379',
		'emojiName': 'tropical drink',
		'emojiDescription': 'tropical drink',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf7a',
		'emojiKey': '1f37a',
		'emojiName': 'beer',
		'emojiDescription': 'beer,beer mug',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf7b',
		'emojiKey': '1f37b',
		'emojiName': 'beers',
		'emojiDescription': 'beers,clinking beer mugs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd42',
		'emojiKey': '1f942',
		'emojiName': 'clinking glasses',
		'emojiDescription': 'clinking glasses',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd43',
		'emojiKey': '1f943',
		'emojiName': 'tumbler glass',
		'emojiDescription': 'tumbler glass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uded7',
		'emojiKey': '1fad7',
		'emojiName': 'pouring liquid',
		'emojiDescription': 'pouring liquid',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd64',
		'emojiKey': '1f964',
		'emojiName': 'cup with straw',
		'emojiDescription': 'cup with straw',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddcb',
		'emojiKey': '1f9cb',
		'emojiName': 'bubble tea',
		'emojiDescription': 'bubble tea',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc3',
		'emojiKey': '1f9c3',
		'emojiName': 'beverage box',
		'emojiDescription': 'beverage box',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddc9',
		'emojiKey': '1f9c9',
		'emojiName': 'mate drink',
		'emojiDescription': 'mate drink',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddca',
		'emojiKey': '1f9ca',
		'emojiName': 'ice cube',
		'emojiDescription': 'ice cube',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd62',
		'emojiKey': '1f962',
		'emojiName': 'chopsticks',
		'emojiDescription': 'chopsticks',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf7d\ufe0f',
		'emojiKey': '1f37d-fe0f',
		'emojiName': 'knife fork plate',
		'emojiDescription': 'knife fork plate,fork and knife with plate',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf74',
		'emojiKey': '1f374',
		'emojiName': 'fork and knife',
		'emojiDescription': 'fork and knife',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd44',
		'emojiKey': '1f944',
		'emojiName': 'spoon',
		'emojiDescription': 'spoon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd2a',
		'emojiKey': '1f52a',
		'emojiName': 'hocho',
		'emojiDescription': 'hocho,knife',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uded9',
		'emojiKey': '1fad9',
		'emojiName': 'jar',
		'emojiDescription': 'jar',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udffa',
		'emojiKey': '1f3fa',
		'emojiName': 'amphora',
		'emojiDescription': 'amphora',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0d',
		'emojiKey': '1f30d',
		'emojiName': 'earth africa',
		'emojiDescription': 'earth africa,earth globe europe-africa',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0e',
		'emojiKey': '1f30e',
		'emojiName': 'earth americas',
		'emojiDescription': 'earth americas,earth globe americas',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0f',
		'emojiKey': '1f30f',
		'emojiName': 'earth asia',
		'emojiDescription': 'earth asia,earth globe asia-australia',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf10',
		'emojiKey': '1f310',
		'emojiName': 'globe with meridians',
		'emojiDescription': 'globe with meridians',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddfa\ufe0f',
		'emojiKey': '1f5fa-fe0f',
		'emojiName': 'world map',
		'emojiDescription': 'world map',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddfe',
		'emojiKey': '1f5fe',
		'emojiName': 'japan',
		'emojiDescription': 'japan,silhouette of japan',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udded',
		'emojiKey': '1f9ed',
		'emojiName': 'compass',
		'emojiDescription': 'compass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfd4\ufe0f',
		'emojiKey': '1f3d4-fe0f',
		'emojiName': 'snow-capped mountain',
		'emojiDescription': 'snow-capped mountain,snow capped mountain',
		'hasVideo': false
	},
	{
		'emoji': '\u26f0\ufe0f',
		'emojiKey': '26f0-fe0f',
		'emojiName': 'mountain',
		'emojiDescription': 'mountain',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0b',
		'emojiKey': '1f30b',
		'emojiName': 'volcano',
		'emojiDescription': 'volcano',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddfb',
		'emojiKey': '1f5fb',
		'emojiName': 'mount fuji',
		'emojiDescription': 'mount fuji',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd5\ufe0f',
		'emojiKey': '1f3d5-fe0f',
		'emojiName': 'camping',
		'emojiDescription': 'camping',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfd6\ufe0f',
		'emojiKey': '1f3d6-fe0f',
		'emojiName': 'beach with umbrella',
		'emojiDescription': 'beach with umbrella',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfdc\ufe0f',
		'emojiKey': '1f3dc-fe0f',
		'emojiName': 'desert',
		'emojiDescription': 'desert',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfdd\ufe0f',
		'emojiKey': '1f3dd-fe0f',
		'emojiName': 'desert island',
		'emojiDescription': 'desert island',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfde\ufe0f',
		'emojiKey': '1f3de-fe0f',
		'emojiName': 'national park',
		'emojiDescription': 'national park',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfdf\ufe0f',
		'emojiKey': '1f3df-fe0f',
		'emojiName': 'stadium',
		'emojiDescription': 'stadium',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfdb\ufe0f',
		'emojiKey': '1f3db-fe0f',
		'emojiName': 'classical building',
		'emojiDescription': 'classical building',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfd7\ufe0f',
		'emojiKey': '1f3d7-fe0f',
		'emojiName': 'building construction',
		'emojiDescription': 'building construction',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf1',
		'emojiKey': '1f9f1',
		'emojiName': 'brick',
		'emojiDescription': 'brick,bricks',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea8',
		'emojiKey': '1faa8',
		'emojiName': 'rock',
		'emojiDescription': 'rock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeb5',
		'emojiKey': '1fab5',
		'emojiName': 'wood',
		'emojiDescription': 'wood',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uded6',
		'emojiKey': '1f6d6',
		'emojiName': 'hut',
		'emojiDescription': 'hut',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd8\ufe0f',
		'emojiKey': '1f3d8-fe0f',
		'emojiName': 'houses',
		'emojiDescription': 'houses,house buildings',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfda\ufe0f',
		'emojiKey': '1f3da-fe0f',
		'emojiName': 'derelict house',
		'emojiDescription': 'derelict house,derelict house building',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe0',
		'emojiKey': '1f3e0',
		'emojiName': 'house',
		'emojiDescription': 'house,house building',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfe1',
		'emojiKey': '1f3e1',
		'emojiName': 'house with garden',
		'emojiDescription': 'house with garden',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe2',
		'emojiKey': '1f3e2',
		'emojiName': 'office',
		'emojiDescription': 'office,office building',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe3',
		'emojiKey': '1f3e3',
		'emojiName': 'post office',
		'emojiDescription': 'post office,japanese post office',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe4',
		'emojiKey': '1f3e4',
		'emojiName': 'european post office',
		'emojiDescription': 'european post office',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe5',
		'emojiKey': '1f3e5',
		'emojiName': 'hospital',
		'emojiDescription': 'hospital',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe6',
		'emojiKey': '1f3e6',
		'emojiName': 'bank',
		'emojiDescription': 'bank',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe8',
		'emojiKey': '1f3e8',
		'emojiName': 'hotel',
		'emojiDescription': 'hotel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfe9',
		'emojiKey': '1f3e9',
		'emojiName': 'love hotel',
		'emojiDescription': 'love hotel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfea',
		'emojiKey': '1f3ea',
		'emojiName': 'convenience store',
		'emojiDescription': 'convenience store',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfeb',
		'emojiKey': '1f3eb',
		'emojiName': 'school',
		'emojiDescription': 'school',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfec',
		'emojiKey': '1f3ec',
		'emojiName': 'department store',
		'emojiDescription': 'department store',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfed',
		'emojiKey': '1f3ed',
		'emojiName': 'factory',
		'emojiDescription': 'factory',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfef',
		'emojiKey': '1f3ef',
		'emojiName': 'japanese castle',
		'emojiDescription': 'japanese castle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff0',
		'emojiKey': '1f3f0',
		'emojiName': 'european castle',
		'emojiDescription': 'european castle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc92',
		'emojiKey': '1f492',
		'emojiName': 'wedding',
		'emojiDescription': 'wedding',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddfc',
		'emojiKey': '1f5fc',
		'emojiName': 'tokyo tower',
		'emojiDescription': 'tokyo tower',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddfd',
		'emojiKey': '1f5fd',
		'emojiName': 'statue of liberty',
		'emojiDescription': 'statue of liberty',
		'hasVideo': false
	},
	{
		'emoji': '\u26ea',
		'emojiKey': '26ea',
		'emojiName': 'church',
		'emojiDescription': 'church',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd4c',
		'emojiKey': '1f54c',
		'emojiName': 'mosque',
		'emojiDescription': 'mosque',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uded5',
		'emojiKey': '1f6d5',
		'emojiName': 'hindu temple',
		'emojiDescription': 'hindu temple',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd4d',
		'emojiKey': '1f54d',
		'emojiName': 'synagogue',
		'emojiDescription': 'synagogue',
		'hasVideo': false
	},
	{
		'emoji': '\u26e9\ufe0f',
		'emojiKey': '26e9-fe0f',
		'emojiName': 'shinto shrine',
		'emojiDescription': 'shinto shrine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd4b',
		'emojiKey': '1f54b',
		'emojiName': 'kaaba',
		'emojiDescription': 'kaaba',
		'hasVideo': false
	},
	{
		'emoji': '\u26f2',
		'emojiKey': '26f2',
		'emojiName': 'fountain',
		'emojiDescription': 'fountain',
		'hasVideo': false
	},
	{
		'emoji': '\u26fa',
		'emojiKey': '26fa',
		'emojiName': 'tent',
		'emojiDescription': 'tent',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf01',
		'emojiKey': '1f301',
		'emojiName': 'foggy',
		'emojiDescription': 'foggy',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf03',
		'emojiKey': '1f303',
		'emojiName': 'night with stars',
		'emojiDescription': 'night with stars',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd9\ufe0f',
		'emojiKey': '1f3d9-fe0f',
		'emojiName': 'cityscape',
		'emojiDescription': 'cityscape',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf04',
		'emojiKey': '1f304',
		'emojiName': 'sunrise over mountains',
		'emojiDescription': 'sunrise over mountains',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf05',
		'emojiKey': '1f305',
		'emojiName': 'sunrise',
		'emojiDescription': 'sunrise',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf06',
		'emojiKey': '1f306',
		'emojiName': 'city sunset',
		'emojiDescription': 'city sunset,cityscape at dusk',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf07',
		'emojiKey': '1f307',
		'emojiName': 'city sunrise',
		'emojiDescription': 'city sunrise,sunset over buildings',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf09',
		'emojiKey': '1f309',
		'emojiName': 'bridge at night',
		'emojiDescription': 'bridge at night',
		'hasVideo': false
	},
	{
		'emoji': '\u2668\ufe0f',
		'emojiKey': '2668-fe0f',
		'emojiName': 'hotsprings',
		'emojiDescription': 'hotsprings,hot springs',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfa0',
		'emojiKey': '1f3a0',
		'emojiName': 'carousel horse',
		'emojiDescription': 'carousel horse',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udedd',
		'emojiKey': '1f6dd',
		'emojiName': 'playground slide',
		'emojiDescription': 'playground slide',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa1',
		'emojiKey': '1f3a1',
		'emojiName': 'ferris wheel',
		'emojiDescription': 'ferris wheel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa2',
		'emojiKey': '1f3a2',
		'emojiName': 'roller coaster',
		'emojiDescription': 'roller coaster',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc88',
		'emojiKey': '1f488',
		'emojiName': 'barber',
		'emojiDescription': 'barber,barber pole',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfaa',
		'emojiKey': '1f3aa',
		'emojiName': 'circus tent',
		'emojiDescription': 'circus tent',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude82',
		'emojiKey': '1f682',
		'emojiName': 'steam locomotive',
		'emojiDescription': 'steam locomotive',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude83',
		'emojiKey': '1f683',
		'emojiName': 'railway car',
		'emojiDescription': 'railway car',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude84',
		'emojiKey': '1f684',
		'emojiName': 'high-speed train',
		'emojiDescription': 'high-speed train,bullettrain side',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude85',
		'emojiKey': '1f685',
		'emojiName': 'bullettrain front',
		'emojiDescription': 'bullettrain front,high-speed train with bullet nose',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude86',
		'emojiKey': '1f686',
		'emojiName': 'train',
		'emojiDescription': 'train,train2',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude87',
		'emojiKey': '1f687',
		'emojiName': 'metro',
		'emojiDescription': 'metro',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude88',
		'emojiKey': '1f688',
		'emojiName': 'light rail',
		'emojiDescription': 'light rail',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude89',
		'emojiKey': '1f689',
		'emojiName': 'station',
		'emojiDescription': 'station',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8a',
		'emojiKey': '1f68a',
		'emojiName': 'tram',
		'emojiDescription': 'tram',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9d',
		'emojiKey': '1f69d',
		'emojiName': 'monorail',
		'emojiDescription': 'monorail',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9e',
		'emojiKey': '1f69e',
		'emojiName': 'mountain railway',
		'emojiDescription': 'mountain railway',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8b',
		'emojiKey': '1f68b',
		'emojiName': 'train',
		'emojiDescription': 'train,tram car',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8c',
		'emojiKey': '1f68c',
		'emojiName': 'bus',
		'emojiDescription': 'bus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8d',
		'emojiKey': '1f68d',
		'emojiName': 'oncoming bus',
		'emojiDescription': 'oncoming bus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8e',
		'emojiKey': '1f68e',
		'emojiName': 'trolleybus',
		'emojiDescription': 'trolleybus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude90',
		'emojiKey': '1f690',
		'emojiName': 'minibus',
		'emojiDescription': 'minibus',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude91',
		'emojiKey': '1f691',
		'emojiName': 'ambulance',
		'emojiDescription': 'ambulance',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude92',
		'emojiKey': '1f692',
		'emojiName': 'fire engine',
		'emojiDescription': 'fire engine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude93',
		'emojiKey': '1f693',
		'emojiName': 'police car',
		'emojiDescription': 'police car',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude94',
		'emojiKey': '1f694',
		'emojiName': 'oncoming police car',
		'emojiDescription': 'oncoming police car',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude95',
		'emojiKey': '1f695',
		'emojiName': 'taxi',
		'emojiDescription': 'taxi',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude96',
		'emojiKey': '1f696',
		'emojiName': 'oncoming taxi',
		'emojiDescription': 'oncoming taxi',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude97',
		'emojiKey': '1f697',
		'emojiName': 'car',
		'emojiDescription': 'car,red car,automobile',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\ude98',
		'emojiKey': '1f698',
		'emojiName': 'oncoming automobile',
		'emojiDescription': 'oncoming automobile',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude99',
		'emojiKey': '1f699',
		'emojiName': 'blue car',
		'emojiDescription': 'blue car,recreational vehicle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udefb',
		'emojiKey': '1f6fb',
		'emojiName': 'pickup truck',
		'emojiDescription': 'pickup truck',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9a',
		'emojiKey': '1f69a',
		'emojiName': 'truck',
		'emojiDescription': 'truck,delivery truck',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9b',
		'emojiKey': '1f69b',
		'emojiName': 'articulated lorry',
		'emojiDescription': 'articulated lorry',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9c',
		'emojiKey': '1f69c',
		'emojiName': 'tractor',
		'emojiDescription': 'tractor',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfce\ufe0f',
		'emojiKey': '1f3ce-fe0f',
		'emojiName': 'racing car',
		'emojiDescription': 'racing car',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcd\ufe0f',
		'emojiKey': '1f3cd-fe0f',
		'emojiName': 'motorcycle',
		'emojiDescription': 'motorcycle,racing motorcycle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef5',
		'emojiKey': '1f6f5',
		'emojiName': 'motor scooter',
		'emojiDescription': 'motor scooter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddbd',
		'emojiKey': '1f9bd',
		'emojiName': 'manual wheelchair',
		'emojiDescription': 'manual wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddbc',
		'emojiKey': '1f9bc',
		'emojiName': 'motorized wheelchair',
		'emojiDescription': 'motorized wheelchair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udefa',
		'emojiKey': '1f6fa',
		'emojiName': 'auto rickshaw',
		'emojiDescription': 'auto rickshaw',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb2',
		'emojiKey': '1f6b2',
		'emojiName': 'bike',
		'emojiDescription': 'bike,bicycle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef4',
		'emojiKey': '1f6f4',
		'emojiName': 'scooter',
		'emojiDescription': 'scooter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef9',
		'emojiKey': '1f6f9',
		'emojiName': 'skateboard',
		'emojiDescription': 'skateboard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udefc',
		'emojiKey': '1f6fc',
		'emojiName': 'roller skate',
		'emojiDescription': 'roller skate',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude8f',
		'emojiKey': '1f68f',
		'emojiName': 'busstop',
		'emojiDescription': 'busstop,bus stop',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee3\ufe0f',
		'emojiKey': '1f6e3-fe0f',
		'emojiName': 'motorway',
		'emojiDescription': 'motorway',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee4\ufe0f',
		'emojiKey': '1f6e4-fe0f',
		'emojiName': 'railway track',
		'emojiDescription': 'railway track',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee2\ufe0f',
		'emojiKey': '1f6e2-fe0f',
		'emojiName': 'oil drum',
		'emojiDescription': 'oil drum',
		'hasVideo': false
	},
	{
		'emoji': '\u26fd',
		'emojiKey': '26fd',
		'emojiName': 'fuelpump',
		'emojiDescription': 'fuelpump,fuel pump',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udede',
		'emojiKey': '1f6de',
		'emojiName': 'wheel',
		'emojiDescription': 'wheel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea8',
		'emojiKey': '1f6a8',
		'emojiName': 'rotating light',
		'emojiDescription': 'rotating light,police cars revolving light',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea5',
		'emojiKey': '1f6a5',
		'emojiName': 'traffic light',
		'emojiDescription': 'traffic light,horizontal traffic light',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea6',
		'emojiKey': '1f6a6',
		'emojiName': 'vertical traffic light',
		'emojiDescription': 'vertical traffic light',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uded1',
		'emojiKey': '1f6d1',
		'emojiName': 'octagonal sign',
		'emojiDescription': 'octagonal sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea7',
		'emojiKey': '1f6a7',
		'emojiName': 'construction',
		'emojiDescription': 'construction,construction sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2693',
		'emojiKey': '2693',
		'emojiName': 'anchor',
		'emojiDescription': 'anchor',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udedf',
		'emojiKey': '1f6df',
		'emojiName': 'ring buoy',
		'emojiDescription': 'ring buoy',
		'hasVideo': false
	},
	{
		'emoji': '\u26f5',
		'emojiKey': '26f5',
		'emojiName': 'boat',
		'emojiDescription': 'boat,sailboat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef6',
		'emojiKey': '1f6f6',
		'emojiName': 'canoe',
		'emojiDescription': 'canoe',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea4',
		'emojiKey': '1f6a4',
		'emojiName': 'speedboat',
		'emojiDescription': 'speedboat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef3\ufe0f',
		'emojiKey': '1f6f3-fe0f',
		'emojiName': 'passenger ship',
		'emojiDescription': 'passenger ship',
		'hasVideo': false
	},
	{
		'emoji': '\u26f4\ufe0f',
		'emojiKey': '26f4-fe0f',
		'emojiName': 'ferry',
		'emojiDescription': 'ferry',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee5\ufe0f',
		'emojiKey': '1f6e5-fe0f',
		'emojiName': 'motor boat',
		'emojiDescription': 'motor boat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udea2',
		'emojiKey': '1f6a2',
		'emojiName': 'ship',
		'emojiDescription': 'ship',
		'hasVideo': false
	},
	{
		'emoji': '\u2708\ufe0f',
		'emojiKey': '2708-fe0f',
		'emojiName': 'airplane',
		'emojiDescription': 'airplane',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udee9\ufe0f',
		'emojiKey': '1f6e9-fe0f',
		'emojiName': 'small airplane',
		'emojiDescription': 'small airplane',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeeb',
		'emojiKey': '1f6eb',
		'emojiName': 'airplane departure',
		'emojiDescription': 'airplane departure',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeec',
		'emojiKey': '1f6ec',
		'emojiName': 'airplane arriving',
		'emojiDescription': 'airplane arriving',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude82',
		'emojiKey': '1fa82',
		'emojiName': 'parachute',
		'emojiDescription': 'parachute',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcba',
		'emojiKey': '1f4ba',
		'emojiName': 'seat',
		'emojiDescription': 'seat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude81',
		'emojiKey': '1f681',
		'emojiName': 'helicopter',
		'emojiDescription': 'helicopter',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude9f',
		'emojiKey': '1f69f',
		'emojiName': 'suspension railway',
		'emojiDescription': 'suspension railway',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea0',
		'emojiKey': '1f6a0',
		'emojiName': 'mountain cableway',
		'emojiDescription': 'mountain cableway',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udea1',
		'emojiKey': '1f6a1',
		'emojiName': 'aerial tramway',
		'emojiDescription': 'aerial tramway',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef0\ufe0f',
		'emojiKey': '1f6f0-fe0f',
		'emojiName': 'satellite',
		'emojiDescription': 'satellite',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\ude80',
		'emojiKey': '1f680',
		'emojiName': 'rocket',
		'emojiDescription': 'rocket',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udef8',
		'emojiKey': '1f6f8',
		'emojiName': 'flying saucer',
		'emojiDescription': 'flying saucer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udece\ufe0f',
		'emojiKey': '1f6ce-fe0f',
		'emojiName': 'bellhop bell',
		'emojiDescription': 'bellhop bell',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf3',
		'emojiKey': '1f9f3',
		'emojiName': 'luggage',
		'emojiDescription': 'luggage',
		'hasVideo': true
	},
	{
		'emoji': '\u231b',
		'emojiKey': '231b',
		'emojiName': 'hourglass',
		'emojiDescription': 'hourglass',
		'hasVideo': true
	},
	{
		'emoji': '\u23f3',
		'emojiKey': '23f3',
		'emojiName': 'hourglass flowing sand',
		'emojiDescription': 'hourglass flowing sand,hourglass with flowing sand',
		'hasVideo': true
	},
	{
		'emoji': '\u231a',
		'emojiKey': '231a',
		'emojiName': 'watch',
		'emojiDescription': 'watch',
		'hasVideo': false
	},
	{
		'emoji': '\u23f0',
		'emojiKey': '23f0',
		'emojiName': 'alarm clock',
		'emojiDescription': 'alarm clock',
		'hasVideo': false
	},
	{
		'emoji': '\u23f1\ufe0f',
		'emojiKey': '23f1-fe0f',
		'emojiName': 'stopwatch',
		'emojiDescription': 'stopwatch',
		'hasVideo': false
	},
	{
		'emoji': '\u23f2\ufe0f',
		'emojiKey': '23f2-fe0f',
		'emojiName': 'timer clock',
		'emojiDescription': 'timer clock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd70\ufe0f',
		'emojiKey': '1f570-fe0f',
		'emojiName': 'mantelpiece clock',
		'emojiDescription': 'mantelpiece clock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5b',
		'emojiKey': '1f55b',
		'emojiName': 'clock12',
		'emojiDescription': 'clock12,clock face twelve oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd67',
		'emojiKey': '1f567',
		'emojiName': 'clock1230',
		'emojiDescription': 'clock1230,clock face twelve-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd50',
		'emojiKey': '1f550',
		'emojiName': 'clock1',
		'emojiDescription': 'clock1,clock face one oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5c',
		'emojiKey': '1f55c',
		'emojiName': 'clock130',
		'emojiDescription': 'clock130,clock face one-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd51',
		'emojiKey': '1f551',
		'emojiName': 'clock2',
		'emojiDescription': 'clock2,clock face two oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5d',
		'emojiKey': '1f55d',
		'emojiName': 'clock230',
		'emojiDescription': 'clock230,clock face two-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd52',
		'emojiKey': '1f552',
		'emojiName': 'clock3',
		'emojiDescription': 'clock3,clock face three oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5e',
		'emojiKey': '1f55e',
		'emojiName': 'clock330',
		'emojiDescription': 'clock330,clock face three-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd53',
		'emojiKey': '1f553',
		'emojiName': 'clock4',
		'emojiDescription': 'clock4,clock face four oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5f',
		'emojiKey': '1f55f',
		'emojiName': 'clock430',
		'emojiDescription': 'clock430,clock face four-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd54',
		'emojiKey': '1f554',
		'emojiName': 'clock5',
		'emojiDescription': 'clock5,clock face five oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd60',
		'emojiKey': '1f560',
		'emojiName': 'clock530',
		'emojiDescription': 'clock530,clock face five-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd55',
		'emojiKey': '1f555',
		'emojiName': 'clock6',
		'emojiDescription': 'clock6,clock face six oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd61',
		'emojiKey': '1f561',
		'emojiName': 'clock630',
		'emojiDescription': 'clock630,clock face six-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd56',
		'emojiKey': '1f556',
		'emojiName': 'clock7',
		'emojiDescription': 'clock7,clock face seven oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd62',
		'emojiKey': '1f562',
		'emojiName': 'clock730',
		'emojiDescription': 'clock730,clock face seven-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd57',
		'emojiKey': '1f557',
		'emojiName': 'clock8',
		'emojiDescription': 'clock8,clock face eight oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd63',
		'emojiKey': '1f563',
		'emojiName': 'clock830',
		'emojiDescription': 'clock830,clock face eight-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd58',
		'emojiKey': '1f558',
		'emojiName': 'clock9',
		'emojiDescription': 'clock9,clock face nine oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd64',
		'emojiKey': '1f564',
		'emojiName': 'clock930',
		'emojiDescription': 'clock930,clock face nine-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd59',
		'emojiKey': '1f559',
		'emojiName': 'clock10',
		'emojiDescription': 'clock10,clock face ten oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd65',
		'emojiKey': '1f565',
		'emojiName': 'clock1030',
		'emojiDescription': 'clock1030,clock face ten-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd5a',
		'emojiKey': '1f55a',
		'emojiName': 'clock11',
		'emojiDescription': 'clock11,clock face eleven oclock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd66',
		'emojiKey': '1f566',
		'emojiName': 'clock1130',
		'emojiDescription': 'clock1130,clock face eleven-thirty',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf11',
		'emojiKey': '1f311',
		'emojiName': 'new moon',
		'emojiDescription': 'new moon,new moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf12',
		'emojiKey': '1f312',
		'emojiName': 'waxing crescent moon',
		'emojiDescription': 'waxing crescent moon,waxing crescent moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf13',
		'emojiKey': '1f313',
		'emojiName': 'first quarter moon',
		'emojiDescription': 'first quarter moon,first quarter moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf14',
		'emojiKey': '1f314',
		'emojiName': 'moon',
		'emojiDescription': 'moon,waxing gibbous moon,waxing gibbous moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf15',
		'emojiKey': '1f315',
		'emojiName': 'full moon',
		'emojiDescription': 'full moon,full moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf16',
		'emojiKey': '1f316',
		'emojiName': 'waning gibbous moon',
		'emojiDescription': 'waning gibbous moon,waning gibbous moon symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf17',
		'emojiKey': '1f317',
		'emojiName': 'last quarter moon',
		'emojiDescription': 'last quarter moon,last quarter moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf18',
		'emojiKey': '1f318',
		'emojiName': 'waning crescent moon',
		'emojiDescription': 'waning crescent moon,waning crescent moon symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf19',
		'emojiKey': '1f319',
		'emojiName': 'crescent moon',
		'emojiDescription': 'crescent moon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf1a',
		'emojiKey': '1f31a',
		'emojiName': 'new moon with face',
		'emojiDescription': 'new moon with face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf1b',
		'emojiKey': '1f31b',
		'emojiName': 'first quarter moon with face',
		'emojiDescription': 'first quarter moon with face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf1c',
		'emojiKey': '1f31c',
		'emojiName': 'last quarter moon with face',
		'emojiDescription': 'last quarter moon with face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf21\ufe0f',
		'emojiKey': '1f321-fe0f',
		'emojiName': 'thermometer',
		'emojiDescription': 'thermometer',
		'hasVideo': true
	},
	{
		'emoji': '\u2600\ufe0f',
		'emojiKey': '2600-fe0f',
		'emojiName': 'sunny',
		'emojiDescription': 'sunny,black sun with rays',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf1d',
		'emojiKey': '1f31d',
		'emojiName': 'full moon with face',
		'emojiDescription': 'full moon with face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf1e',
		'emojiKey': '1f31e',
		'emojiName': 'sun with face',
		'emojiDescription': 'sun with face',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude90',
		'emojiKey': '1fa90',
		'emojiName': 'ringed planet',
		'emojiDescription': 'ringed planet',
		'hasVideo': false
	},
	{
		'emoji': '\u2b50',
		'emojiKey': '2b50',
		'emojiName': 'star',
		'emojiDescription': 'star,white medium star',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf1f',
		'emojiKey': '1f31f',
		'emojiName': 'star2',
		'emojiDescription': 'star2,glowing star',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf20',
		'emojiKey': '1f320',
		'emojiName': 'stars',
		'emojiDescription': 'stars,shooting star',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0c',
		'emojiKey': '1f30c',
		'emojiName': 'milky way',
		'emojiDescription': 'milky way',
		'hasVideo': false
	},
	{
		'emoji': '\u2601\ufe0f',
		'emojiKey': '2601-fe0f',
		'emojiName': 'cloud',
		'emojiDescription': 'cloud',
		'hasVideo': true
	},
	{
		'emoji': '\u26c5',
		'emojiKey': '26c5',
		'emojiName': 'partly sunny',
		'emojiDescription': 'partly sunny,sun behind cloud',
		'hasVideo': true
	},
	{
		'emoji': '\u26c8\ufe0f',
		'emojiKey': '26c8-fe0f',
		'emojiName': 'thunder cloud and rain',
		'emojiDescription': 'thunder cloud and rain,cloud with lightning and rain',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf24\ufe0f',
		'emojiKey': '1f324-fe0f',
		'emojiName': 'mostly sunny',
		'emojiDescription': 'mostly sunny,sun small cloud,sun behind small cloud',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf25\ufe0f',
		'emojiKey': '1f325-fe0f',
		'emojiName': 'barely sunny',
		'emojiDescription': 'barely sunny,sun behind cloud,sun behind large cloud',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf26\ufe0f',
		'emojiKey': '1f326-fe0f',
		'emojiName': 'partly sunny rain',
		'emojiDescription': 'partly sunny rain,sun behind rain cloud',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf27\ufe0f',
		'emojiKey': '1f327-fe0f',
		'emojiName': 'rain cloud',
		'emojiDescription': 'rain cloud,cloud with rain',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf28\ufe0f',
		'emojiKey': '1f328-fe0f',
		'emojiName': 'snow cloud',
		'emojiDescription': 'snow cloud,cloud with snow',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf29\ufe0f',
		'emojiKey': '1f329-fe0f',
		'emojiName': 'lightning',
		'emojiDescription': 'lightning,lightning cloud,cloud with lightning',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf2a\ufe0f',
		'emojiKey': '1f32a-fe0f',
		'emojiName': 'tornado',
		'emojiDescription': 'tornado,tornado cloud',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf2b\ufe0f',
		'emojiKey': '1f32b-fe0f',
		'emojiName': 'fog',
		'emojiDescription': 'fog',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf2c\ufe0f',
		'emojiKey': '1f32c-fe0f',
		'emojiName': 'wind face',
		'emojiDescription': 'wind face,wind blowing face',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf00',
		'emojiKey': '1f300',
		'emojiName': 'cyclone',
		'emojiDescription': 'cyclone',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf08',
		'emojiKey': '1f308',
		'emojiName': 'rainbow',
		'emojiDescription': 'rainbow',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf02',
		'emojiKey': '1f302',
		'emojiName': 'closed umbrella',
		'emojiDescription': 'closed umbrella',
		'hasVideo': false
	},
	{
		'emoji': '\u2602\ufe0f',
		'emojiKey': '2602-fe0f',
		'emojiName': 'umbrella',
		'emojiDescription': 'umbrella',
		'hasVideo': false
	},
	{
		'emoji': '\u2614',
		'emojiKey': '2614',
		'emojiName': 'umbrella with rain drops',
		'emojiDescription': 'umbrella with rain drops',
		'hasVideo': false
	},
	{
		'emoji': '\u26f1\ufe0f',
		'emojiKey': '26f1-fe0f',
		'emojiName': 'umbrella on ground',
		'emojiDescription': 'umbrella on ground',
		'hasVideo': false
	},
	{
		'emoji': '\u26a1',
		'emojiKey': '26a1',
		'emojiName': 'zap',
		'emojiDescription': 'zap,high voltage sign',
		'hasVideo': true
	},
	{
		'emoji': '\u2744\ufe0f',
		'emojiKey': '2744-fe0f',
		'emojiName': 'snowflake',
		'emojiDescription': 'snowflake',
		'hasVideo': true
	},
	{
		'emoji': '\u2603\ufe0f',
		'emojiKey': '2603-fe0f',
		'emojiName': 'snowman',
		'emojiDescription': 'snowman',
		'hasVideo': true
	},
	{
		'emoji': '\u26c4',
		'emojiKey': '26c4',
		'emojiName': 'snowman without snow',
		'emojiDescription': 'snowman without snow',
		'hasVideo': true
	},
	{
		'emoji': '\u2604\ufe0f',
		'emojiKey': '2604-fe0f',
		'emojiName': 'comet',
		'emojiDescription': 'comet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd25',
		'emojiKey': '1f525',
		'emojiName': 'fire',
		'emojiDescription': 'fire',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udca7',
		'emojiKey': '1f4a7',
		'emojiName': 'droplet',
		'emojiDescription': 'droplet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf0a',
		'emojiKey': '1f30a',
		'emojiName': 'ocean',
		'emojiDescription': 'ocean,water wave',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf83',
		'emojiKey': '1f383',
		'emojiName': 'jack-o-lantern',
		'emojiDescription': 'jack-o-lantern,jack o lantern',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf84',
		'emojiKey': '1f384',
		'emojiName': 'christmas tree',
		'emojiDescription': 'christmas tree',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf86',
		'emojiKey': '1f386',
		'emojiName': 'fireworks',
		'emojiDescription': 'fireworks',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf87',
		'emojiKey': '1f387',
		'emojiName': 'sparkler',
		'emojiDescription': 'sparkler,firework sparkler',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udde8',
		'emojiKey': '1f9e8',
		'emojiName': 'firecracker',
		'emojiDescription': 'firecracker',
		'hasVideo': true
	},
	{
		'emoji': '\u2728',
		'emojiKey': '2728',
		'emojiName': 'sparkles',
		'emojiDescription': 'sparkles',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf88',
		'emojiKey': '1f388',
		'emojiName': 'balloon',
		'emojiDescription': 'balloon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf89',
		'emojiKey': '1f389',
		'emojiName': 'tada',
		'emojiDescription': 'tada,party popper',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf8a',
		'emojiKey': '1f38a',
		'emojiName': 'confetti ball',
		'emojiDescription': 'confetti ball',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf8b',
		'emojiKey': '1f38b',
		'emojiName': 'tanabata tree',
		'emojiDescription': 'tanabata tree',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf8d',
		'emojiKey': '1f38d',
		'emojiName': 'bamboo',
		'emojiDescription': 'bamboo,pine decoration',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf8e',
		'emojiKey': '1f38e',
		'emojiName': 'dolls',
		'emojiDescription': 'dolls,japanese dolls',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf8f',
		'emojiKey': '1f38f',
		'emojiName': 'flags',
		'emojiDescription': 'flags,carp streamer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf90',
		'emojiKey': '1f390',
		'emojiName': 'wind chime',
		'emojiDescription': 'wind chime',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf91',
		'emojiKey': '1f391',
		'emojiName': 'rice scene',
		'emojiDescription': 'rice scene,moon viewing ceremony',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde7',
		'emojiKey': '1f9e7',
		'emojiName': 'red envelope',
		'emojiDescription': 'red envelope,red gift envelope',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf80',
		'emojiKey': '1f380',
		'emojiName': 'ribbon',
		'emojiDescription': 'ribbon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf81',
		'emojiKey': '1f381',
		'emojiName': 'gift',
		'emojiDescription': 'gift,wrapped present',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf97\ufe0f',
		'emojiKey': '1f397-fe0f',
		'emojiName': 'reminder ribbon',
		'emojiDescription': 'reminder ribbon',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf9f\ufe0f',
		'emojiKey': '1f39f-fe0f',
		'emojiName': 'admission tickets',
		'emojiDescription': 'admission tickets',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfab',
		'emojiKey': '1f3ab',
		'emojiName': 'ticket',
		'emojiDescription': 'ticket',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf96\ufe0f',
		'emojiKey': '1f396-fe0f',
		'emojiName': 'medal',
		'emojiDescription': 'medal,military medal',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfc6',
		'emojiKey': '1f3c6',
		'emojiName': 'trophy',
		'emojiDescription': 'trophy',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfc5',
		'emojiKey': '1f3c5',
		'emojiName': 'sports medal',
		'emojiDescription': 'sports medal',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd47',
		'emojiKey': '1f947',
		'emojiName': 'first place medal',
		'emojiDescription': 'first place medal',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd48',
		'emojiKey': '1f948',
		'emojiName': 'second place medal',
		'emojiDescription': 'second place medal',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udd49',
		'emojiKey': '1f949',
		'emojiName': 'third place medal',
		'emojiDescription': 'third place medal',
		'hasVideo': true
	},
	{
		'emoji': '\u26bd',
		'emojiKey': '26bd',
		'emojiName': 'soccer',
		'emojiDescription': 'soccer,soccer ball',
		'hasVideo': true
	},
	{
		'emoji': '\u26be',
		'emojiKey': '26be',
		'emojiName': 'baseball',
		'emojiDescription': 'baseball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4e',
		'emojiKey': '1f94e',
		'emojiName': 'softball',
		'emojiDescription': 'softball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc0',
		'emojiKey': '1f3c0',
		'emojiName': 'basketball',
		'emojiDescription': 'basketball,basketball and hoop',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfd0',
		'emojiKey': '1f3d0',
		'emojiName': 'volleyball',
		'emojiDescription': 'volleyball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc8',
		'emojiKey': '1f3c8',
		'emojiName': 'football',
		'emojiDescription': 'football,american football',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc9',
		'emojiKey': '1f3c9',
		'emojiName': 'rugby football',
		'emojiDescription': 'rugby football',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfbe',
		'emojiKey': '1f3be',
		'emojiName': 'tennis',
		'emojiDescription': 'tennis,tennis racquet and ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4f',
		'emojiKey': '1f94f',
		'emojiName': 'flying disc',
		'emojiDescription': 'flying disc',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb3',
		'emojiKey': '1f3b3',
		'emojiName': 'bowling',
		'emojiDescription': 'bowling',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfcf',
		'emojiKey': '1f3cf',
		'emojiName': 'cricket bat and ball',
		'emojiDescription': 'cricket bat and ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd1',
		'emojiKey': '1f3d1',
		'emojiName': 'field hockey stick and ball',
		'emojiDescription': 'field hockey stick and ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd2',
		'emojiKey': '1f3d2',
		'emojiName': 'ice hockey stick and puck',
		'emojiDescription': 'ice hockey stick and puck',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4d',
		'emojiKey': '1f94d',
		'emojiName': 'lacrosse',
		'emojiDescription': 'lacrosse,lacrosse stick and ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfd3',
		'emojiKey': '1f3d3',
		'emojiName': 'table tennis paddle and ball',
		'emojiDescription': 'table tennis paddle and ball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff8',
		'emojiKey': '1f3f8',
		'emojiName': 'badminton racquet and shuttlecock',
		'emojiDescription': 'badminton racquet and shuttlecock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4a',
		'emojiKey': '1f94a',
		'emojiName': 'boxing glove',
		'emojiDescription': 'boxing glove',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4b',
		'emojiKey': '1f94b',
		'emojiName': 'martial arts uniform',
		'emojiDescription': 'martial arts uniform',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd45',
		'emojiKey': '1f945',
		'emojiName': 'goal net',
		'emojiDescription': 'goal net',
		'hasVideo': false
	},
	{
		'emoji': '\u26f3',
		'emojiKey': '26f3',
		'emojiName': 'golf',
		'emojiDescription': 'golf,flag in hole',
		'hasVideo': false
	},
	{
		'emoji': '\u26f8\ufe0f',
		'emojiKey': '26f8-fe0f',
		'emojiName': 'ice skate',
		'emojiDescription': 'ice skate',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa3',
		'emojiKey': '1f3a3',
		'emojiName': 'fishing pole and fish',
		'emojiDescription': 'fishing pole and fish',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd3f',
		'emojiKey': '1f93f',
		'emojiName': 'diving mask',
		'emojiDescription': 'diving mask',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfbd',
		'emojiKey': '1f3bd',
		'emojiName': 'running shirt with sash',
		'emojiDescription': 'running shirt with sash',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfbf',
		'emojiKey': '1f3bf',
		'emojiName': 'ski',
		'emojiDescription': 'ski,ski and ski boot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udef7',
		'emojiKey': '1f6f7',
		'emojiName': 'sled',
		'emojiDescription': 'sled',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd4c',
		'emojiKey': '1f94c',
		'emojiName': 'curling stone',
		'emojiDescription': 'curling stone',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfaf',
		'emojiKey': '1f3af',
		'emojiName': 'dart',
		'emojiDescription': 'dart,direct hit',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude80',
		'emojiKey': '1fa80',
		'emojiName': 'yo-yo',
		'emojiDescription': 'yo-yo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude81',
		'emojiKey': '1fa81',
		'emojiName': 'kite',
		'emojiDescription': 'kite',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb1',
		'emojiKey': '1f3b1',
		'emojiName': '8ball',
		'emojiDescription': '8ball,billiards',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd2e',
		'emojiKey': '1f52e',
		'emojiName': 'crystal ball',
		'emojiDescription': 'crystal ball',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude84',
		'emojiKey': '1fa84',
		'emojiName': 'magic wand',
		'emojiDescription': 'magic wand',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddff',
		'emojiKey': '1f9ff',
		'emojiName': 'nazar amulet',
		'emojiDescription': 'nazar amulet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeac',
		'emojiKey': '1faac',
		'emojiName': 'hamsa',
		'emojiDescription': 'hamsa',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfae',
		'emojiKey': '1f3ae',
		'emojiName': 'video game',
		'emojiDescription': 'video game',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd79\ufe0f',
		'emojiKey': '1f579-fe0f',
		'emojiName': 'joystick',
		'emojiDescription': 'joystick',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb0',
		'emojiKey': '1f3b0',
		'emojiName': 'slot machine',
		'emojiDescription': 'slot machine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb2',
		'emojiKey': '1f3b2',
		'emojiName': 'game die',
		'emojiDescription': 'game die',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde9',
		'emojiKey': '1f9e9',
		'emojiName': 'jigsaw',
		'emojiDescription': 'jigsaw,jigsaw puzzle piece',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf8',
		'emojiKey': '1f9f8',
		'emojiName': 'teddy bear',
		'emojiDescription': 'teddy bear',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude85',
		'emojiKey': '1fa85',
		'emojiName': 'pinata',
		'emojiDescription': 'pinata',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea9',
		'emojiKey': '1faa9',
		'emojiName': 'mirror ball',
		'emojiDescription': 'mirror ball',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude86',
		'emojiKey': '1fa86',
		'emojiName': 'nesting dolls',
		'emojiDescription': 'nesting dolls',
		'hasVideo': false
	},
	{
		'emoji': '\u2660\ufe0f',
		'emojiKey': '2660-fe0f',
		'emojiName': 'spades',
		'emojiDescription': 'spades,black spade suit',
		'hasVideo': false
	},
	{
		'emoji': '\u2665\ufe0f',
		'emojiKey': '2665-fe0f',
		'emojiName': 'hearts',
		'emojiDescription': 'hearts,black heart suit',
		'hasVideo': false
	},
	{
		'emoji': '\u2666\ufe0f',
		'emojiKey': '2666-fe0f',
		'emojiName': 'diamonds',
		'emojiDescription': 'diamonds,black diamond suit',
		'hasVideo': false
	},
	{
		'emoji': '\u2663\ufe0f',
		'emojiKey': '2663-fe0f',
		'emojiName': 'clubs',
		'emojiDescription': 'clubs,black club suit',
		'hasVideo': false
	},
	{
		'emoji': '\u265f\ufe0f',
		'emojiKey': '265f-fe0f',
		'emojiName': 'chess pawn',
		'emojiDescription': 'chess pawn',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udccf',
		'emojiKey': '1f0cf',
		'emojiName': 'black joker',
		'emojiDescription': 'black joker,playing card black joker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udc04',
		'emojiKey': '1f004',
		'emojiName': 'mahjong',
		'emojiDescription': 'mahjong,mahjong tile red dragon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb4',
		'emojiKey': '1f3b4',
		'emojiName': 'flower playing cards',
		'emojiDescription': 'flower playing cards',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfad',
		'emojiKey': '1f3ad',
		'emojiName': 'performing arts',
		'emojiDescription': 'performing arts',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\uddbc\ufe0f',
		'emojiKey': '1f5bc-fe0f',
		'emojiName': 'framed picture',
		'emojiDescription': 'framed picture,frame with picture',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa8',
		'emojiKey': '1f3a8',
		'emojiName': 'art',
		'emojiDescription': 'art,artist palette',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddf5',
		'emojiKey': '1f9f5',
		'emojiName': 'thread',
		'emojiDescription': 'thread,spool of thread',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea1',
		'emojiKey': '1faa1',
		'emojiName': 'sewing needle',
		'emojiDescription': 'sewing needle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf6',
		'emojiKey': '1f9f6',
		'emojiName': 'yarn',
		'emojiDescription': 'yarn,ball of yarn',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea2',
		'emojiKey': '1faa2',
		'emojiName': 'knot',
		'emojiDescription': 'knot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc53',
		'emojiKey': '1f453',
		'emojiName': 'eyeglasses',
		'emojiDescription': 'eyeglasses',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd76\ufe0f',
		'emojiKey': '1f576-fe0f',
		'emojiName': 'sunglasses',
		'emojiDescription': 'sunglasses,dark sunglasses',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd7d',
		'emojiKey': '1f97d',
		'emojiName': 'goggles',
		'emojiDescription': 'goggles',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd7c',
		'emojiKey': '1f97c',
		'emojiName': 'lab coat',
		'emojiDescription': 'lab coat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddba',
		'emojiKey': '1f9ba',
		'emojiName': 'safety vest',
		'emojiDescription': 'safety vest',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc54',
		'emojiKey': '1f454',
		'emojiName': 'necktie',
		'emojiDescription': 'necktie',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc55',
		'emojiKey': '1f455',
		'emojiName': 'shirt',
		'emojiDescription': 'shirt,tshirt,t-shirt',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc56',
		'emojiKey': '1f456',
		'emojiName': 'jeans',
		'emojiDescription': 'jeans',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde3',
		'emojiKey': '1f9e3',
		'emojiName': 'scarf',
		'emojiDescription': 'scarf',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde4',
		'emojiKey': '1f9e4',
		'emojiName': 'gloves',
		'emojiDescription': 'gloves',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde5',
		'emojiKey': '1f9e5',
		'emojiName': 'coat',
		'emojiDescription': 'coat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udde6',
		'emojiKey': '1f9e6',
		'emojiName': 'socks',
		'emojiDescription': 'socks',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc57',
		'emojiKey': '1f457',
		'emojiName': 'dress',
		'emojiDescription': 'dress',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc58',
		'emojiKey': '1f458',
		'emojiName': 'kimono',
		'emojiDescription': 'kimono',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd7b',
		'emojiKey': '1f97b',
		'emojiName': 'sari',
		'emojiDescription': 'sari',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude71',
		'emojiKey': '1fa71',
		'emojiName': 'one-piece swimsuit',
		'emojiDescription': 'one-piece swimsuit',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude72',
		'emojiKey': '1fa72',
		'emojiName': 'briefs',
		'emojiDescription': 'briefs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude73',
		'emojiKey': '1fa73',
		'emojiName': 'shorts',
		'emojiDescription': 'shorts',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc59',
		'emojiKey': '1f459',
		'emojiName': 'bikini',
		'emojiDescription': 'bikini',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc5a',
		'emojiKey': '1f45a',
		'emojiName': 'womans clothes',
		'emojiDescription': 'womans clothes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc5b',
		'emojiKey': '1f45b',
		'emojiName': 'purse',
		'emojiDescription': 'purse',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc5c',
		'emojiKey': '1f45c',
		'emojiName': 'handbag',
		'emojiDescription': 'handbag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc5d',
		'emojiKey': '1f45d',
		'emojiName': 'pouch',
		'emojiDescription': 'pouch',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udecd\ufe0f',
		'emojiKey': '1f6cd-fe0f',
		'emojiName': 'shopping bags',
		'emojiDescription': 'shopping bags',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf92',
		'emojiKey': '1f392',
		'emojiName': 'school satchel',
		'emojiDescription': 'school satchel',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude74',
		'emojiKey': '1fa74',
		'emojiName': 'thong sandal',
		'emojiDescription': 'thong sandal',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc5e',
		'emojiKey': '1f45e',
		'emojiName': 'shoe',
		'emojiDescription': 'shoe,mans shoe',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc5f',
		'emojiKey': '1f45f',
		'emojiName': 'athletic shoe',
		'emojiDescription': 'athletic shoe',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd7e',
		'emojiKey': '1f97e',
		'emojiName': 'hiking boot',
		'emojiDescription': 'hiking boot',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd7f',
		'emojiKey': '1f97f',
		'emojiName': 'flat shoe',
		'emojiDescription': 'flat shoe,womans flat shoe',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc60',
		'emojiKey': '1f460',
		'emojiName': 'high heel',
		'emojiDescription': 'high heel,high-heeled shoe',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc61',
		'emojiKey': '1f461',
		'emojiName': 'sandal',
		'emojiDescription': 'sandal,womans sandal',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude70',
		'emojiKey': '1fa70',
		'emojiName': 'ballet shoes',
		'emojiDescription': 'ballet shoes',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc62',
		'emojiKey': '1f462',
		'emojiName': 'boot',
		'emojiDescription': 'boot,womans boots',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc51',
		'emojiKey': '1f451',
		'emojiName': 'crown',
		'emojiDescription': 'crown',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udc52',
		'emojiKey': '1f452',
		'emojiName': 'womans hat',
		'emojiDescription': 'womans hat',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa9',
		'emojiKey': '1f3a9',
		'emojiName': 'tophat',
		'emojiDescription': 'tophat,top hat',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf93',
		'emojiKey': '1f393',
		'emojiName': 'mortar board',
		'emojiDescription': 'mortar board,graduation cap',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udde2',
		'emojiKey': '1f9e2',
		'emojiName': 'billed cap',
		'emojiDescription': 'billed cap',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude96',
		'emojiKey': '1fa96',
		'emojiName': 'military helmet',
		'emojiDescription': 'military helmet',
		'hasVideo': true
	},
	{
		'emoji': '\u26d1\ufe0f',
		'emojiKey': '26d1-fe0f',
		'emojiName': 'rescue worker\u2019s helmet',
		'emojiDescription': 'rescue worker\u2019s helmet,helmet with white cross',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcff',
		'emojiKey': '1f4ff',
		'emojiName': 'prayer beads',
		'emojiDescription': 'prayer beads',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc84',
		'emojiKey': '1f484',
		'emojiName': 'lipstick',
		'emojiDescription': 'lipstick',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc8d',
		'emojiKey': '1f48d',
		'emojiName': 'ring',
		'emojiDescription': 'ring',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc8e',
		'emojiKey': '1f48e',
		'emojiName': 'gem',
		'emojiDescription': 'gem,gem stone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd07',
		'emojiKey': '1f507',
		'emojiName': 'mute',
		'emojiDescription': 'mute,speaker with cancellation stroke',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd08',
		'emojiKey': '1f508',
		'emojiName': 'speaker',
		'emojiDescription': 'speaker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd09',
		'emojiKey': '1f509',
		'emojiName': 'sound',
		'emojiDescription': 'sound,speaker with one sound wave',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd0a',
		'emojiKey': '1f50a',
		'emojiName': 'loud sound',
		'emojiDescription': 'loud sound,speaker with three sound waves',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce2',
		'emojiKey': '1f4e2',
		'emojiName': 'loudspeaker',
		'emojiDescription': 'loudspeaker,public address loudspeaker',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce3',
		'emojiKey': '1f4e3',
		'emojiName': 'mega',
		'emojiDescription': 'mega,cheering megaphone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcef',
		'emojiKey': '1f4ef',
		'emojiName': 'postal horn',
		'emojiDescription': 'postal horn',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd14',
		'emojiKey': '1f514',
		'emojiName': 'bell',
		'emojiDescription': 'bell',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd15',
		'emojiKey': '1f515',
		'emojiName': 'no bell',
		'emojiDescription': 'no bell,bell with cancellation stroke',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfbc',
		'emojiKey': '1f3bc',
		'emojiName': 'musical score',
		'emojiDescription': 'musical score',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb5',
		'emojiKey': '1f3b5',
		'emojiName': 'musical note',
		'emojiDescription': 'musical note',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfb6',
		'emojiKey': '1f3b6',
		'emojiName': 'notes',
		'emojiDescription': 'notes,multiple musical notes',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf99\ufe0f',
		'emojiKey': '1f399-fe0f',
		'emojiName': 'studio microphone',
		'emojiDescription': 'studio microphone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf9a\ufe0f',
		'emojiKey': '1f39a-fe0f',
		'emojiName': 'level slider',
		'emojiDescription': 'level slider',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf9b\ufe0f',
		'emojiKey': '1f39b-fe0f',
		'emojiName': 'control knobs',
		'emojiDescription': 'control knobs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa4',
		'emojiKey': '1f3a4',
		'emojiName': 'microphone',
		'emojiDescription': 'microphone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfa7',
		'emojiKey': '1f3a7',
		'emojiName': 'headphone',
		'emojiDescription': 'headphone,headphones',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcfb',
		'emojiKey': '1f4fb',
		'emojiName': 'radio',
		'emojiDescription': 'radio',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb7',
		'emojiKey': '1f3b7',
		'emojiName': 'saxophone',
		'emojiDescription': 'saxophone',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude97',
		'emojiKey': '1fa97',
		'emojiName': 'accordion',
		'emojiDescription': 'accordion',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb8',
		'emojiKey': '1f3b8',
		'emojiName': 'guitar',
		'emojiDescription': 'guitar',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfb9',
		'emojiKey': '1f3b9',
		'emojiName': 'musical keyboard',
		'emojiDescription': 'musical keyboard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfba',
		'emojiKey': '1f3ba',
		'emojiName': 'trumpet',
		'emojiDescription': 'trumpet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfbb',
		'emojiKey': '1f3bb',
		'emojiName': 'violin',
		'emojiDescription': 'violin',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude95',
		'emojiKey': '1fa95',
		'emojiName': 'banjo',
		'emojiDescription': 'banjo',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udd41',
		'emojiKey': '1f941',
		'emojiName': 'drum with drumsticks',
		'emojiDescription': 'drum with drumsticks',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude98',
		'emojiKey': '1fa98',
		'emojiName': 'long drum',
		'emojiDescription': 'long drum',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf1',
		'emojiKey': '1f4f1',
		'emojiName': 'iphone',
		'emojiDescription': 'iphone,mobile phone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcf2',
		'emojiKey': '1f4f2',
		'emojiName': 'calling',
		'emojiDescription': 'calling,mobile phone with rightwards arrow at left',
		'hasVideo': true
	},
	{
		'emoji': '\u260e\ufe0f',
		'emojiKey': '260e-fe0f',
		'emojiName': 'phone',
		'emojiDescription': 'phone,telephone,black telephone',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcde',
		'emojiKey': '1f4de',
		'emojiName': 'telephone receiver',
		'emojiDescription': 'telephone receiver',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcdf',
		'emojiKey': '1f4df',
		'emojiName': 'pager',
		'emojiDescription': 'pager',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce0',
		'emojiKey': '1f4e0',
		'emojiName': 'fax',
		'emojiDescription': 'fax,fax machine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd0b',
		'emojiKey': '1f50b',
		'emojiName': 'battery',
		'emojiDescription': 'battery',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeab',
		'emojiKey': '1faab',
		'emojiName': 'low battery',
		'emojiDescription': 'low battery',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd0c',
		'emojiKey': '1f50c',
		'emojiName': 'electric plug',
		'emojiDescription': 'electric plug',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcbb',
		'emojiKey': '1f4bb',
		'emojiName': 'computer',
		'emojiDescription': 'computer,personal computer',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udda5\ufe0f',
		'emojiKey': '1f5a5-fe0f',
		'emojiName': 'desktop computer',
		'emojiDescription': 'desktop computer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udda8\ufe0f',
		'emojiKey': '1f5a8-fe0f',
		'emojiName': 'printer',
		'emojiDescription': 'printer',
		'hasVideo': true
	},
	{
		'emoji': '\u2328\ufe0f',
		'emojiKey': '2328-fe0f',
		'emojiName': 'keyboard',
		'emojiDescription': 'keyboard',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\uddb1\ufe0f',
		'emojiKey': '1f5b1-fe0f',
		'emojiName': 'computer mouse',
		'emojiDescription': 'computer mouse,three button mouse',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddb2\ufe0f',
		'emojiKey': '1f5b2-fe0f',
		'emojiName': 'trackball',
		'emojiDescription': 'trackball',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcbd',
		'emojiKey': '1f4bd',
		'emojiName': 'minidisc',
		'emojiDescription': 'minidisc',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcbe',
		'emojiKey': '1f4be',
		'emojiName': 'floppy disk',
		'emojiDescription': 'floppy disk',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcbf',
		'emojiKey': '1f4bf',
		'emojiName': 'cd',
		'emojiDescription': 'cd,optical disc',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcc0',
		'emojiKey': '1f4c0',
		'emojiName': 'dvd',
		'emojiDescription': 'dvd',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddee',
		'emojiKey': '1f9ee',
		'emojiName': 'abacus',
		'emojiDescription': 'abacus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfa5',
		'emojiKey': '1f3a5',
		'emojiName': 'movie camera',
		'emojiDescription': 'movie camera',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udf9e\ufe0f',
		'emojiKey': '1f39e-fe0f',
		'emojiName': 'film frames',
		'emojiDescription': 'film frames',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcfd\ufe0f',
		'emojiKey': '1f4fd-fe0f',
		'emojiName': 'film projector',
		'emojiDescription': 'film projector',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfac',
		'emojiKey': '1f3ac',
		'emojiName': 'clapper',
		'emojiDescription': 'clapper,clapper board',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcfa',
		'emojiKey': '1f4fa',
		'emojiName': 'tv',
		'emojiDescription': 'tv,television',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcf7',
		'emojiKey': '1f4f7',
		'emojiName': 'camera',
		'emojiDescription': 'camera',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf8',
		'emojiKey': '1f4f8',
		'emojiName': 'camera with flash',
		'emojiDescription': 'camera with flash',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf9',
		'emojiKey': '1f4f9',
		'emojiName': 'video camera',
		'emojiDescription': 'video camera',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcfc',
		'emojiKey': '1f4fc',
		'emojiName': 'vhs',
		'emojiDescription': 'vhs,videocassette',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd0d',
		'emojiKey': '1f50d',
		'emojiName': 'mag',
		'emojiDescription': 'mag,left-pointing magnifying glass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd0e',
		'emojiKey': '1f50e',
		'emojiName': 'mag right',
		'emojiDescription': 'mag right,right-pointing magnifying glass',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd6f\ufe0f',
		'emojiKey': '1f56f-fe0f',
		'emojiName': 'candle',
		'emojiDescription': 'candle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udca1',
		'emojiKey': '1f4a1',
		'emojiName': 'bulb',
		'emojiDescription': 'bulb,electric light bulb',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd26',
		'emojiKey': '1f526',
		'emojiName': 'flashlight',
		'emojiDescription': 'flashlight,electric torch',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfee',
		'emojiKey': '1f3ee',
		'emojiName': 'lantern',
		'emojiDescription': 'lantern,izakaya lantern',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude94',
		'emojiKey': '1fa94',
		'emojiName': 'diya lamp',
		'emojiDescription': 'diya lamp',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd4',
		'emojiKey': '1f4d4',
		'emojiName': 'notebook with decorative cover',
		'emojiDescription': 'notebook with decorative cover',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd5',
		'emojiKey': '1f4d5',
		'emojiName': 'closed book',
		'emojiDescription': 'closed book',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd6',
		'emojiKey': '1f4d6',
		'emojiName': 'book',
		'emojiDescription': 'book,open book',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcd7',
		'emojiKey': '1f4d7',
		'emojiName': 'green book',
		'emojiDescription': 'green book',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd8',
		'emojiKey': '1f4d8',
		'emojiName': 'blue book',
		'emojiDescription': 'blue book',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd9',
		'emojiKey': '1f4d9',
		'emojiName': 'orange book',
		'emojiDescription': 'orange book',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcda',
		'emojiKey': '1f4da',
		'emojiName': 'books',
		'emojiDescription': 'books',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcd3',
		'emojiKey': '1f4d3',
		'emojiName': 'notebook',
		'emojiDescription': 'notebook',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd2',
		'emojiKey': '1f4d2',
		'emojiName': 'ledger',
		'emojiDescription': 'ledger',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcc3',
		'emojiKey': '1f4c3',
		'emojiName': 'page with curl',
		'emojiDescription': 'page with curl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcdc',
		'emojiKey': '1f4dc',
		'emojiName': 'scroll',
		'emojiDescription': 'scroll',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcc4',
		'emojiKey': '1f4c4',
		'emojiName': 'page facing up',
		'emojiDescription': 'page facing up',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf0',
		'emojiKey': '1f4f0',
		'emojiName': 'newspaper',
		'emojiDescription': 'newspaper',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\uddde\ufe0f',
		'emojiKey': '1f5de-fe0f',
		'emojiName': 'rolled-up newspaper',
		'emojiDescription': 'rolled-up newspaper,rolled up newspaper',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd1',
		'emojiKey': '1f4d1',
		'emojiName': 'bookmark tabs',
		'emojiDescription': 'bookmark tabs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd16',
		'emojiKey': '1f516',
		'emojiName': 'bookmark',
		'emojiDescription': 'bookmark',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff7\ufe0f',
		'emojiKey': '1f3f7-fe0f',
		'emojiName': 'label',
		'emojiDescription': 'label',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb0',
		'emojiKey': '1f4b0',
		'emojiName': 'moneybag',
		'emojiDescription': 'moneybag,money bag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude99',
		'emojiKey': '1fa99',
		'emojiName': 'coin',
		'emojiDescription': 'coin',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcb4',
		'emojiKey': '1f4b4',
		'emojiName': 'yen',
		'emojiDescription': 'yen,banknote with yen sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb5',
		'emojiKey': '1f4b5',
		'emojiName': 'dollar',
		'emojiDescription': 'dollar,banknote with dollar sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb6',
		'emojiKey': '1f4b6',
		'emojiName': 'euro',
		'emojiDescription': 'euro,banknote with euro sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb7',
		'emojiKey': '1f4b7',
		'emojiName': 'pound',
		'emojiDescription': 'pound,banknote with pound sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb8',
		'emojiKey': '1f4b8',
		'emojiName': 'money with wings',
		'emojiDescription': 'money with wings',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcb3',
		'emojiKey': '1f4b3',
		'emojiName': 'credit card',
		'emojiDescription': 'credit card',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddfe',
		'emojiKey': '1f9fe',
		'emojiName': 'receipt',
		'emojiDescription': 'receipt',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb9',
		'emojiKey': '1f4b9',
		'emojiName': 'chart',
		'emojiDescription': 'chart,chart with upwards trend and yen sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2709\ufe0f',
		'emojiKey': '2709-fe0f',
		'emojiName': 'email',
		'emojiDescription': 'email,envelope',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udce7',
		'emojiKey': '1f4e7',
		'emojiName': 'e-mail',
		'emojiDescription': 'e-mail,e-mail symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce8',
		'emojiKey': '1f4e8',
		'emojiName': 'incoming envelope',
		'emojiDescription': 'incoming envelope',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce9',
		'emojiKey': '1f4e9',
		'emojiName': 'envelope with arrow',
		'emojiDescription': 'envelope with arrow,envelope with downwards arrow above',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udce4',
		'emojiKey': '1f4e4',
		'emojiName': 'outbox tray',
		'emojiDescription': 'outbox tray',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udce5',
		'emojiKey': '1f4e5',
		'emojiName': 'inbox tray',
		'emojiDescription': 'inbox tray',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udce6',
		'emojiKey': '1f4e6',
		'emojiName': 'package',
		'emojiDescription': 'package',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udceb',
		'emojiKey': '1f4eb',
		'emojiName': 'mailbox',
		'emojiDescription': 'mailbox,closed mailbox with raised flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcea',
		'emojiKey': '1f4ea',
		'emojiName': 'mailbox closed',
		'emojiDescription': 'mailbox closed,closed mailbox with lowered flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcec',
		'emojiKey': '1f4ec',
		'emojiName': 'mailbox with mail',
		'emojiDescription': 'mailbox with mail,open mailbox with raised flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udced',
		'emojiKey': '1f4ed',
		'emojiName': 'mailbox with no mail',
		'emojiDescription': 'mailbox with no mail,open mailbox with lowered flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcee',
		'emojiKey': '1f4ee',
		'emojiName': 'postbox',
		'emojiDescription': 'postbox',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddf3\ufe0f',
		'emojiKey': '1f5f3-fe0f',
		'emojiName': 'ballot box with ballot',
		'emojiDescription': 'ballot box with ballot',
		'hasVideo': true
	},
	{
		'emoji': '\u270f\ufe0f',
		'emojiKey': '270f-fe0f',
		'emojiName': 'pencil',
		'emojiDescription': 'pencil,pencil2',
		'hasVideo': true
	},
	{
		'emoji': '\u2712\ufe0f',
		'emojiKey': '2712-fe0f',
		'emojiName': 'black nib',
		'emojiDescription': 'black nib',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd8b\ufe0f',
		'emojiKey': '1f58b-fe0f',
		'emojiName': 'fountain pen',
		'emojiDescription': 'fountain pen,lower left fountain pen',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd8a\ufe0f',
		'emojiKey': '1f58a-fe0f',
		'emojiName': 'pen',
		'emojiDescription': 'pen,lower left ballpoint pen',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd8c\ufe0f',
		'emojiKey': '1f58c-fe0f',
		'emojiName': 'paintbrush',
		'emojiDescription': 'paintbrush,lower left paintbrush',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd8d\ufe0f',
		'emojiKey': '1f58d-fe0f',
		'emojiName': 'crayon',
		'emojiDescription': 'crayon,lower left crayon',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcdd',
		'emojiKey': '1f4dd',
		'emojiName': 'memo',
		'emojiDescription': 'memo,pencil',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcbc',
		'emojiKey': '1f4bc',
		'emojiName': 'briefcase',
		'emojiDescription': 'briefcase',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcc1',
		'emojiKey': '1f4c1',
		'emojiName': 'file folder',
		'emojiDescription': 'file folder',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcc2',
		'emojiKey': '1f4c2',
		'emojiName': 'open file folder',
		'emojiDescription': 'open file folder',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddc2\ufe0f',
		'emojiKey': '1f5c2-fe0f',
		'emojiName': 'card index dividers',
		'emojiDescription': 'card index dividers',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcc5',
		'emojiKey': '1f4c5',
		'emojiName': 'date',
		'emojiDescription': 'date,calendar',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcc6',
		'emojiKey': '1f4c6',
		'emojiName': 'calendar',
		'emojiDescription': 'calendar,tear-off calendar',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddd2\ufe0f',
		'emojiKey': '1f5d2-fe0f',
		'emojiName': 'spiral notepad',
		'emojiDescription': 'spiral notepad,spiral note pad',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddd3\ufe0f',
		'emojiKey': '1f5d3-fe0f',
		'emojiName': 'spiral calendar',
		'emojiDescription': 'spiral calendar,spiral calendar pad',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcc7',
		'emojiKey': '1f4c7',
		'emojiName': 'card index',
		'emojiDescription': 'card index',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcc8',
		'emojiKey': '1f4c8',
		'emojiName': 'chart with upwards trend',
		'emojiDescription': 'chart with upwards trend',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcc9',
		'emojiKey': '1f4c9',
		'emojiName': 'chart with downwards trend',
		'emojiDescription': 'chart with downwards trend',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcca',
		'emojiKey': '1f4ca',
		'emojiName': 'bar chart',
		'emojiDescription': 'bar chart',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udccb',
		'emojiKey': '1f4cb',
		'emojiName': 'clipboard',
		'emojiDescription': 'clipboard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udccc',
		'emojiKey': '1f4cc',
		'emojiName': 'pushpin',
		'emojiDescription': 'pushpin',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udccd',
		'emojiKey': '1f4cd',
		'emojiName': 'round pushpin',
		'emojiDescription': 'round pushpin',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcce',
		'emojiKey': '1f4ce',
		'emojiName': 'paperclip',
		'emojiDescription': 'paperclip',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd87\ufe0f',
		'emojiKey': '1f587-fe0f',
		'emojiName': 'linked paperclips',
		'emojiDescription': 'linked paperclips',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udccf',
		'emojiKey': '1f4cf',
		'emojiName': 'straight ruler',
		'emojiDescription': 'straight ruler',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcd0',
		'emojiKey': '1f4d0',
		'emojiName': 'triangular ruler',
		'emojiDescription': 'triangular ruler',
		'hasVideo': false
	},
	{
		'emoji': '\u2702\ufe0f',
		'emojiKey': '2702-fe0f',
		'emojiName': 'scissors',
		'emojiDescription': 'scissors,black scissors',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddc3\ufe0f',
		'emojiKey': '1f5c3-fe0f',
		'emojiName': 'card file box',
		'emojiDescription': 'card file box',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddc4\ufe0f',
		'emojiKey': '1f5c4-fe0f',
		'emojiName': 'file cabinet',
		'emojiDescription': 'file cabinet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddd1\ufe0f',
		'emojiKey': '1f5d1-fe0f',
		'emojiName': 'wastebasket',
		'emojiDescription': 'wastebasket',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd12',
		'emojiKey': '1f512',
		'emojiName': 'lock',
		'emojiDescription': 'lock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd13',
		'emojiKey': '1f513',
		'emojiName': 'unlock',
		'emojiDescription': 'unlock,open lock',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd0f',
		'emojiKey': '1f50f',
		'emojiName': 'lock with ink pen',
		'emojiDescription': 'lock with ink pen',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd10',
		'emojiKey': '1f510',
		'emojiName': 'closed lock with key',
		'emojiDescription': 'closed lock with key',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd11',
		'emojiKey': '1f511',
		'emojiName': 'key',
		'emojiDescription': 'key',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udddd\ufe0f',
		'emojiKey': '1f5dd-fe0f',
		'emojiName': 'old key',
		'emojiDescription': 'old key',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd28',
		'emojiKey': '1f528',
		'emojiName': 'hammer',
		'emojiDescription': 'hammer',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude93',
		'emojiKey': '1fa93',
		'emojiName': 'axe',
		'emojiDescription': 'axe',
		'hasVideo': false
	},
	{
		'emoji': '\u26cf\ufe0f',
		'emojiKey': '26cf-fe0f',
		'emojiName': 'pick',
		'emojiDescription': 'pick',
		'hasVideo': false
	},
	{
		'emoji': '\u2692\ufe0f',
		'emojiKey': '2692-fe0f',
		'emojiName': 'hammer and pick',
		'emojiDescription': 'hammer and pick',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee0\ufe0f',
		'emojiKey': '1f6e0-fe0f',
		'emojiName': 'hammer and wrench',
		'emojiDescription': 'hammer and wrench',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udde1\ufe0f',
		'emojiKey': '1f5e1-fe0f',
		'emojiName': 'dagger',
		'emojiDescription': 'dagger,dagger knife',
		'hasVideo': false
	},
	{
		'emoji': '\u2694\ufe0f',
		'emojiKey': '2694-fe0f',
		'emojiName': 'crossed swords',
		'emojiDescription': 'crossed swords',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd2b',
		'emojiKey': '1f52b',
		'emojiName': 'gun',
		'emojiDescription': 'gun,pistol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude83',
		'emojiKey': '1fa83',
		'emojiName': 'boomerang',
		'emojiDescription': 'boomerang',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff9',
		'emojiKey': '1f3f9',
		'emojiName': 'bow and arrow',
		'emojiDescription': 'bow and arrow',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udee1\ufe0f',
		'emojiKey': '1f6e1-fe0f',
		'emojiName': 'shield',
		'emojiDescription': 'shield',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9a',
		'emojiKey': '1fa9a',
		'emojiName': 'carpentry saw',
		'emojiDescription': 'carpentry saw',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd27',
		'emojiKey': '1f527',
		'emojiName': 'wrench',
		'emojiDescription': 'wrench',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9b',
		'emojiKey': '1fa9b',
		'emojiName': 'screwdriver',
		'emojiDescription': 'screwdriver',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd29',
		'emojiKey': '1f529',
		'emojiName': 'nut and bolt',
		'emojiDescription': 'nut and bolt',
		'hasVideo': false
	},
	{
		'emoji': '\u2699\ufe0f',
		'emojiKey': '2699-fe0f',
		'emojiName': 'gear',
		'emojiDescription': 'gear',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udddc\ufe0f',
		'emojiKey': '1f5dc-fe0f',
		'emojiName': 'clamp',
		'emojiDescription': 'clamp,compression',
		'hasVideo': false
	},
	{
		'emoji': '\u2696\ufe0f',
		'emojiKey': '2696-fe0f',
		'emojiName': 'scales',
		'emojiDescription': 'scales,balance scale',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddaf',
		'emojiKey': '1f9af',
		'emojiName': 'probing cane',
		'emojiDescription': 'probing cane',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd17',
		'emojiKey': '1f517',
		'emojiName': 'link',
		'emojiDescription': 'link,link symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u26d3\ufe0f',
		'emojiKey': '26d3-fe0f',
		'emojiName': 'chains',
		'emojiDescription': 'chains',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9d',
		'emojiKey': '1fa9d',
		'emojiName': 'hook',
		'emojiDescription': 'hook',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf0',
		'emojiKey': '1f9f0',
		'emojiName': 'toolbox',
		'emojiDescription': 'toolbox',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddf2',
		'emojiKey': '1f9f2',
		'emojiName': 'magnet',
		'emojiDescription': 'magnet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9c',
		'emojiKey': '1fa9c',
		'emojiName': 'ladder',
		'emojiDescription': 'ladder',
		'hasVideo': false
	},
	{
		'emoji': '\u2697\ufe0f',
		'emojiKey': '2697-fe0f',
		'emojiName': 'alembic',
		'emojiDescription': 'alembic',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddea',
		'emojiKey': '1f9ea',
		'emojiName': 'test tube',
		'emojiDescription': 'test tube',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddeb',
		'emojiKey': '1f9eb',
		'emojiName': 'petri dish',
		'emojiDescription': 'petri dish',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddec',
		'emojiKey': '1f9ec',
		'emojiName': 'dna',
		'emojiDescription': 'dna,dna double helix',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd2c',
		'emojiKey': '1f52c',
		'emojiName': 'microscope',
		'emojiDescription': 'microscope',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd2d',
		'emojiKey': '1f52d',
		'emojiName': 'telescope',
		'emojiDescription': 'telescope',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udce1',
		'emojiKey': '1f4e1',
		'emojiName': 'satellite antenna',
		'emojiDescription': 'satellite antenna',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc89',
		'emojiKey': '1f489',
		'emojiName': 'syringe',
		'emojiDescription': 'syringe',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude78',
		'emojiKey': '1fa78',
		'emojiName': 'drop of blood',
		'emojiDescription': 'drop of blood',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udc8a',
		'emojiKey': '1f48a',
		'emojiName': 'pill',
		'emojiDescription': 'pill',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude79',
		'emojiKey': '1fa79',
		'emojiName': 'adhesive bandage',
		'emojiDescription': 'adhesive bandage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude7c',
		'emojiKey': '1fa7c',
		'emojiName': 'crutch',
		'emojiDescription': 'crutch',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude7a',
		'emojiKey': '1fa7a',
		'emojiName': 'stethoscope',
		'emojiDescription': 'stethoscope',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\ude7b',
		'emojiKey': '1fa7b',
		'emojiName': 'x-ray',
		'emojiDescription': 'x-ray',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeaa',
		'emojiKey': '1f6aa',
		'emojiName': 'door',
		'emojiDescription': 'door',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uded7',
		'emojiKey': '1f6d7',
		'emojiName': 'elevator',
		'emojiDescription': 'elevator',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9e',
		'emojiKey': '1fa9e',
		'emojiName': 'mirror',
		'emojiDescription': 'mirror',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude9f',
		'emojiKey': '1fa9f',
		'emojiName': 'window',
		'emojiDescription': 'window',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udecf\ufe0f',
		'emojiKey': '1f6cf-fe0f',
		'emojiName': 'bed',
		'emojiDescription': 'bed',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udecb\ufe0f',
		'emojiKey': '1f6cb-fe0f',
		'emojiName': 'couch and lamp',
		'emojiDescription': 'couch and lamp',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude91',
		'emojiKey': '1fa91',
		'emojiName': 'chair',
		'emojiDescription': 'chair',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udebd',
		'emojiKey': '1f6bd',
		'emojiName': 'toilet',
		'emojiDescription': 'toilet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea0',
		'emojiKey': '1faa0',
		'emojiName': 'plunger',
		'emojiDescription': 'plunger',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udebf',
		'emojiKey': '1f6bf',
		'emojiName': 'shower',
		'emojiDescription': 'shower',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udec1',
		'emojiKey': '1f6c1',
		'emojiName': 'bathtub',
		'emojiDescription': 'bathtub',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea4',
		'emojiKey': '1faa4',
		'emojiName': 'mouse trap',
		'emojiDescription': 'mouse trap',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\ude92',
		'emojiKey': '1fa92',
		'emojiName': 'razor',
		'emojiDescription': 'razor',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf4',
		'emojiKey': '1f9f4',
		'emojiName': 'lotion bottle',
		'emojiDescription': 'lotion bottle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf7',
		'emojiKey': '1f9f7',
		'emojiName': 'safety pin',
		'emojiDescription': 'safety pin',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddf9',
		'emojiKey': '1f9f9',
		'emojiName': 'broom',
		'emojiDescription': 'broom',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddfa',
		'emojiKey': '1f9fa',
		'emojiName': 'basket',
		'emojiDescription': 'basket',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddfb',
		'emojiKey': '1f9fb',
		'emojiName': 'roll of paper',
		'emojiDescription': 'roll of paper',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udea3',
		'emojiKey': '1faa3',
		'emojiName': 'bucket',
		'emojiDescription': 'bucket',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddfc',
		'emojiKey': '1f9fc',
		'emojiName': 'soap',
		'emojiDescription': 'soap,bar of soap',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udee7',
		'emojiKey': '1fae7',
		'emojiName': 'bubbles',
		'emojiDescription': 'bubbles',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udea5',
		'emojiKey': '1faa5',
		'emojiName': 'toothbrush',
		'emojiDescription': 'toothbrush',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\uddfd',
		'emojiKey': '1f9fd',
		'emojiName': 'sponge',
		'emojiDescription': 'sponge',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\uddef',
		'emojiKey': '1f9ef',
		'emojiName': 'fire extinguisher',
		'emojiDescription': 'fire extinguisher',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uded2',
		'emojiKey': '1f6d2',
		'emojiName': 'shopping trolley',
		'emojiDescription': 'shopping trolley',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udeac',
		'emojiKey': '1f6ac',
		'emojiName': 'smoking',
		'emojiDescription': 'smoking,smoking symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u26b0\ufe0f',
		'emojiKey': '26b0-fe0f',
		'emojiName': 'coffin',
		'emojiDescription': 'coffin',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udea6',
		'emojiKey': '1faa6',
		'emojiName': 'headstone',
		'emojiDescription': 'headstone',
		'hasVideo': false
	},
	{
		'emoji': '\u26b1\ufe0f',
		'emojiKey': '26b1-fe0f',
		'emojiName': 'funeral urn',
		'emojiDescription': 'funeral urn',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\uddff',
		'emojiKey': '1f5ff',
		'emojiName': 'moyai',
		'emojiDescription': 'moyai',
		'hasVideo': true
	},
	{
		'emoji': '\ud83e\udea7',
		'emojiKey': '1faa7',
		'emojiName': 'placard',
		'emojiDescription': 'placard',
		'hasVideo': false
	},
	{
		'emoji': '\ud83e\udeaa',
		'emojiKey': '1faaa',
		'emojiName': 'identification card',
		'emojiDescription': 'identification card',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udfe7',
		'emojiKey': '1f3e7',
		'emojiName': 'atm',
		'emojiDescription': 'atm,automated teller machine',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeae',
		'emojiKey': '1f6ae',
		'emojiName': 'put litter in its place',
		'emojiDescription': 'put litter in its place,put litter in its place symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb0',
		'emojiKey': '1f6b0',
		'emojiName': 'potable water',
		'emojiDescription': 'potable water,potable water symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u267f',
		'emojiKey': '267f',
		'emojiName': 'wheelchair',
		'emojiDescription': 'wheelchair,wheelchair symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb9',
		'emojiKey': '1f6b9',
		'emojiName': 'mens',
		'emojiDescription': 'mens,mens symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udeba',
		'emojiKey': '1f6ba',
		'emojiName': 'womens',
		'emojiDescription': 'womens,womens symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udebb',
		'emojiKey': '1f6bb',
		'emojiName': 'restroom',
		'emojiDescription': 'restroom',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udebc',
		'emojiKey': '1f6bc',
		'emojiName': 'baby symbol',
		'emojiDescription': 'baby symbol',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udebe',
		'emojiKey': '1f6be',
		'emojiName': 'wc',
		'emojiDescription': 'wc,water closet',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udec2',
		'emojiKey': '1f6c2',
		'emojiName': 'passport control',
		'emojiDescription': 'passport control',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udec3',
		'emojiKey': '1f6c3',
		'emojiName': 'customs',
		'emojiDescription': 'customs',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udec4',
		'emojiKey': '1f6c4',
		'emojiName': 'baggage claim',
		'emojiDescription': 'baggage claim',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udec5',
		'emojiKey': '1f6c5',
		'emojiName': 'left luggage',
		'emojiDescription': 'left luggage',
		'hasVideo': true
	},
	{
		'emoji': '\u26a0\ufe0f',
		'emojiKey': '26a0-fe0f',
		'emojiName': 'warning',
		'emojiDescription': 'warning,warning sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb8',
		'emojiKey': '1f6b8',
		'emojiName': 'children crossing',
		'emojiDescription': 'children crossing',
		'hasVideo': false
	},
	{
		'emoji': '\u26d4',
		'emojiKey': '26d4',
		'emojiName': 'no entry',
		'emojiDescription': 'no entry',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeab',
		'emojiKey': '1f6ab',
		'emojiName': 'no entry sign',
		'emojiDescription': 'no entry sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb3',
		'emojiKey': '1f6b3',
		'emojiName': 'no bicycles',
		'emojiDescription': 'no bicycles',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udead',
		'emojiKey': '1f6ad',
		'emojiName': 'no smoking',
		'emojiDescription': 'no smoking,no smoking symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeaf',
		'emojiKey': '1f6af',
		'emojiName': 'do not litter',
		'emojiDescription': 'do not litter,do not litter symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb1',
		'emojiKey': '1f6b1',
		'emojiName': 'non-potable water',
		'emojiDescription': 'non-potable water,non-potable water symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udeb7',
		'emojiKey': '1f6b7',
		'emojiName': 'no pedestrians',
		'emojiDescription': 'no pedestrians',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf5',
		'emojiKey': '1f4f5',
		'emojiName': 'no mobile phones',
		'emojiDescription': 'no mobile phones',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1e',
		'emojiKey': '1f51e',
		'emojiName': 'underage',
		'emojiDescription': 'underage,no one under eighteen symbol',
		'hasVideo': true
	},
	{
		'emoji': '\u2622\ufe0f',
		'emojiKey': '2622-fe0f',
		'emojiName': 'radioactive',
		'emojiDescription': 'radioactive,radioactive sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2623\ufe0f',
		'emojiKey': '2623-fe0f',
		'emojiName': 'biohazard',
		'emojiDescription': 'biohazard,biohazard sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2b06\ufe0f',
		'emojiKey': '2b06-fe0f',
		'emojiName': 'arrow up',
		'emojiDescription': 'arrow up,upwards black arrow',
		'hasVideo': false
	},
	{
		'emoji': '\u2197\ufe0f',
		'emojiKey': '2197-fe0f',
		'emojiName': 'north east arrow',
		'emojiDescription': 'north east arrow,arrow upper right',
		'hasVideo': false
	},
	{
		'emoji': '\u27a1\ufe0f',
		'emojiKey': '27a1-fe0f',
		'emojiName': 'arrow right',
		'emojiDescription': 'arrow right,black rightwards arrow',
		'hasVideo': false
	},
	{
		'emoji': '\u2198\ufe0f',
		'emojiKey': '2198-fe0f',
		'emojiName': 'south east arrow',
		'emojiDescription': 'south east arrow,arrow lower right',
		'hasVideo': false
	},
	{
		'emoji': '\u2b07\ufe0f',
		'emojiKey': '2b07-fe0f',
		'emojiName': 'arrow down',
		'emojiDescription': 'arrow down,downwards black arrow',
		'hasVideo': false
	},
	{
		'emoji': '\u2199\ufe0f',
		'emojiKey': '2199-fe0f',
		'emojiName': 'south west arrow',
		'emojiDescription': 'south west arrow,arrow lower left',
		'hasVideo': false
	},
	{
		'emoji': '\u2b05\ufe0f',
		'emojiKey': '2b05-fe0f',
		'emojiName': 'arrow left',
		'emojiDescription': 'arrow left,leftwards black arrow',
		'hasVideo': false
	},
	{
		'emoji': '\u2196\ufe0f',
		'emojiKey': '2196-fe0f',
		'emojiName': 'north west arrow',
		'emojiDescription': 'north west arrow,arrow upper left',
		'hasVideo': false
	},
	{
		'emoji': '\u2195\ufe0f',
		'emojiKey': '2195-fe0f',
		'emojiName': 'up down arrow',
		'emojiDescription': 'up down arrow,arrow up down',
		'hasVideo': false
	},
	{
		'emoji': '\u2194\ufe0f',
		'emojiKey': '2194-fe0f',
		'emojiName': 'left right arrow',
		'emojiDescription': 'left right arrow',
		'hasVideo': false
	},
	{
		'emoji': '\u21a9\ufe0f',
		'emojiKey': '21a9-fe0f',
		'emojiName': 'leftwards arrow with hook',
		'emojiDescription': 'leftwards arrow with hook',
		'hasVideo': false
	},
	{
		'emoji': '\u21aa\ufe0f',
		'emojiKey': '21aa-fe0f',
		'emojiName': 'arrow right hook',
		'emojiDescription': 'arrow right hook,rightwards arrow with hook',
		'hasVideo': false
	},
	{
		'emoji': '\u2934\ufe0f',
		'emojiKey': '2934-fe0f',
		'emojiName': 'arrow heading up',
		'emojiDescription': 'arrow heading up,arrow pointing rightwards then curving upwards',
		'hasVideo': false
	},
	{
		'emoji': '\u2935\ufe0f',
		'emojiKey': '2935-fe0f',
		'emojiName': 'arrow heading down',
		'emojiDescription': 'arrow heading down,arrow pointing rightwards then curving downwards',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd03',
		'emojiKey': '1f503',
		'emojiName': 'arrows clockwise',
		'emojiDescription': 'arrows clockwise,clockwise downwards and upwards open circle arrows',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd04',
		'emojiKey': '1f504',
		'emojiName': 'arrows counterclockwise',
		'emojiDescription': 'arrows counterclockwise,anticlockwise downwards and upwards open circle arrows',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd19',
		'emojiKey': '1f519',
		'emojiName': 'back',
		'emojiDescription': 'back,back with leftwards arrow above',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1a',
		'emojiKey': '1f51a',
		'emojiName': 'end',
		'emojiDescription': 'end,end with leftwards arrow above',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1b',
		'emojiKey': '1f51b',
		'emojiName': 'on',
		'emojiDescription': 'on,on with exclamation mark with left right arrow above',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1c',
		'emojiKey': '1f51c',
		'emojiName': 'soon',
		'emojiDescription': 'soon,soon with rightwards arrow above',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1d',
		'emojiKey': '1f51d',
		'emojiName': 'top',
		'emojiDescription': 'top,top with upwards arrow above',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\uded0',
		'emojiKey': '1f6d0',
		'emojiName': 'place of worship',
		'emojiDescription': 'place of worship',
		'hasVideo': false
	},
	{
		'emoji': '\u269b\ufe0f',
		'emojiKey': '269b-fe0f',
		'emojiName': 'atom symbol',
		'emojiDescription': 'atom symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd49\ufe0f',
		'emojiKey': '1f549-fe0f',
		'emojiName': 'om',
		'emojiDescription': 'om,om symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u2721\ufe0f',
		'emojiKey': '2721-fe0f',
		'emojiName': 'star of david',
		'emojiDescription': 'star of david',
		'hasVideo': false
	},
	{
		'emoji': '\u2638\ufe0f',
		'emojiKey': '2638-fe0f',
		'emojiName': 'wheel of dharma',
		'emojiDescription': 'wheel of dharma',
		'hasVideo': false
	},
	{
		'emoji': '\u262f\ufe0f',
		'emojiKey': '262f-fe0f',
		'emojiName': 'yin yang',
		'emojiDescription': 'yin yang',
		'hasVideo': false
	},
	{
		'emoji': '\u271d\ufe0f',
		'emojiKey': '271d-fe0f',
		'emojiName': 'latin cross',
		'emojiDescription': 'latin cross',
		'hasVideo': false
	},
	{
		'emoji': '\u2626\ufe0f',
		'emojiKey': '2626-fe0f',
		'emojiName': 'orthodox cross',
		'emojiDescription': 'orthodox cross',
		'hasVideo': false
	},
	{
		'emoji': '\u262a\ufe0f',
		'emojiKey': '262a-fe0f',
		'emojiName': 'star and crescent',
		'emojiDescription': 'star and crescent',
		'hasVideo': false
	},
	{
		'emoji': '\u262e\ufe0f',
		'emojiKey': '262e-fe0f',
		'emojiName': 'peace symbol',
		'emojiDescription': 'peace symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd4e',
		'emojiKey': '1f54e',
		'emojiName': 'menorah with nine branches',
		'emojiDescription': 'menorah with nine branches',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd2f',
		'emojiKey': '1f52f',
		'emojiName': 'six pointed star',
		'emojiDescription': 'six pointed star,six pointed star with middle dot',
		'hasVideo': false
	},
	{
		'emoji': '\u2648',
		'emojiKey': '2648',
		'emojiName': 'aries',
		'emojiDescription': 'aries',
		'hasVideo': true
	},
	{
		'emoji': '\u2649',
		'emojiKey': '2649',
		'emojiName': 'taurus',
		'emojiDescription': 'taurus',
		'hasVideo': true
	},
	{
		'emoji': '\u264a',
		'emojiKey': '264a',
		'emojiName': 'gemini',
		'emojiDescription': 'gemini',
		'hasVideo': true
	},
	{
		'emoji': '\u264b',
		'emojiKey': '264b',
		'emojiName': 'cancer',
		'emojiDescription': 'cancer',
		'hasVideo': true
	},
	{
		'emoji': '\u264c',
		'emojiKey': '264c',
		'emojiName': 'leo',
		'emojiDescription': 'leo',
		'hasVideo': true
	},
	{
		'emoji': '\u264d',
		'emojiKey': '264d',
		'emojiName': 'virgo',
		'emojiDescription': 'virgo',
		'hasVideo': true
	},
	{
		'emoji': '\u264e',
		'emojiKey': '264e',
		'emojiName': 'libra',
		'emojiDescription': 'libra',
		'hasVideo': true
	},
	{
		'emoji': '\u264f',
		'emojiKey': '264f',
		'emojiName': 'scorpius',
		'emojiDescription': 'scorpius',
		'hasVideo': true
	},
	{
		'emoji': '\u2650',
		'emojiKey': '2650',
		'emojiName': 'sagittarius',
		'emojiDescription': 'sagittarius',
		'hasVideo': true
	},
	{
		'emoji': '\u2651',
		'emojiKey': '2651',
		'emojiName': 'capricorn',
		'emojiDescription': 'capricorn',
		'hasVideo': true
	},
	{
		'emoji': '\u2652',
		'emojiKey': '2652',
		'emojiName': 'aquarius',
		'emojiDescription': 'aquarius',
		'hasVideo': true
	},
	{
		'emoji': '\u2653',
		'emojiKey': '2653',
		'emojiName': 'pisces',
		'emojiDescription': 'pisces',
		'hasVideo': true
	},
	{
		'emoji': '\u26ce',
		'emojiKey': '26ce',
		'emojiName': 'ophiuchus',
		'emojiDescription': 'ophiuchus',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udd00',
		'emojiKey': '1f500',
		'emojiName': 'twisted rightwards arrows',
		'emojiDescription': 'twisted rightwards arrows',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd01',
		'emojiKey': '1f501',
		'emojiName': 'repeat',
		'emojiDescription': 'repeat,clockwise rightwards and leftwards open circle arrows',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd02',
		'emojiKey': '1f502',
		'emojiName': 'repeat one',
		'emojiDescription': 'repeat one,clockwise rightwards and leftwards open circle arrows with circled one overlay',
		'hasVideo': false
	},
	{
		'emoji': '\u25b6\ufe0f',
		'emojiKey': '25b6-fe0f',
		'emojiName': 'arrow forward',
		'emojiDescription': 'arrow forward,black right-pointing triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23e9',
		'emojiKey': '23e9',
		'emojiName': 'fast forward',
		'emojiDescription': 'fast forward,black right-pointing double triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23ed\ufe0f',
		'emojiKey': '23ed-fe0f',
		'emojiName': 'next track button',
		'emojiDescription': 'next track button,black right pointing double triangle with vertical bar',
		'hasVideo': false
	},
	{
		'emoji': '\u23ef\ufe0f',
		'emojiKey': '23ef-fe0f',
		'emojiName': 'play or pause button',
		'emojiDescription': 'play or pause button,black right pointing triangle with double vertical bar',
		'hasVideo': false
	},
	{
		'emoji': '\u25c0\ufe0f',
		'emojiKey': '25c0-fe0f',
		'emojiName': 'arrow backward',
		'emojiDescription': 'arrow backward,black left-pointing triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23ea',
		'emojiKey': '23ea',
		'emojiName': 'rewind',
		'emojiDescription': 'rewind,black left-pointing double triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23ee\ufe0f',
		'emojiKey': '23ee-fe0f',
		'emojiName': 'last track button',
		'emojiDescription': 'last track button,black left pointing double triangle with vertical bar',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd3c',
		'emojiKey': '1f53c',
		'emojiName': 'arrow up small',
		'emojiDescription': 'arrow up small,up-pointing small red triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23eb',
		'emojiKey': '23eb',
		'emojiName': 'arrow double up',
		'emojiDescription': 'arrow double up,black up-pointing double triangle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd3d',
		'emojiKey': '1f53d',
		'emojiName': 'arrow down small',
		'emojiDescription': 'arrow down small,down-pointing small red triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23ec',
		'emojiKey': '23ec',
		'emojiName': 'arrow double down',
		'emojiDescription': 'arrow double down,black down-pointing double triangle',
		'hasVideo': false
	},
	{
		'emoji': '\u23f8\ufe0f',
		'emojiKey': '23f8-fe0f',
		'emojiName': 'pause button',
		'emojiDescription': 'pause button,double vertical bar',
		'hasVideo': false
	},
	{
		'emoji': '\u23f9\ufe0f',
		'emojiKey': '23f9-fe0f',
		'emojiName': 'stop button',
		'emojiDescription': 'stop button,black square for stop',
		'hasVideo': false
	},
	{
		'emoji': '\u23fa\ufe0f',
		'emojiKey': '23fa-fe0f',
		'emojiName': 'record button',
		'emojiDescription': 'record button,black circle for record',
		'hasVideo': false
	},
	{
		'emoji': '\u23cf\ufe0f',
		'emojiKey': '23cf-fe0f',
		'emojiName': 'eject',
		'emojiDescription': 'eject,eject button',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfa6',
		'emojiKey': '1f3a6',
		'emojiName': 'cinema',
		'emojiDescription': 'cinema',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd05',
		'emojiKey': '1f505',
		'emojiName': 'low brightness',
		'emojiDescription': 'low brightness,low brightness symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd06',
		'emojiKey': '1f506',
		'emojiName': 'high brightness',
		'emojiDescription': 'high brightness,high brightness symbol',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf6',
		'emojiKey': '1f4f6',
		'emojiName': 'signal strength',
		'emojiDescription': 'signal strength,antenna with bars',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf3',
		'emojiKey': '1f4f3',
		'emojiName': 'vibration mode',
		'emojiDescription': 'vibration mode',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcf4',
		'emojiKey': '1f4f4',
		'emojiName': 'mobile phone off',
		'emojiDescription': 'mobile phone off',
		'hasVideo': false
	},
	{
		'emoji': '\u2640\ufe0f',
		'emojiKey': '2640-fe0f',
		'emojiName': 'female sign',
		'emojiDescription': 'female sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2642\ufe0f',
		'emojiKey': '2642-fe0f',
		'emojiName': 'male sign',
		'emojiDescription': 'male sign',
		'hasVideo': false
	},
	{
		'emoji': '\u26a7\ufe0f',
		'emojiKey': '26a7-fe0f',
		'emojiName': 'transgender symbol',
		'emojiDescription': 'transgender symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u2716\ufe0f',
		'emojiKey': '2716-fe0f',
		'emojiName': 'heavy multiplication x',
		'emojiDescription': 'heavy multiplication x',
		'hasVideo': false
	},
	{
		'emoji': '\u2795',
		'emojiKey': '2795',
		'emojiName': 'heavy plus sign',
		'emojiDescription': 'heavy plus sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2796',
		'emojiKey': '2796',
		'emojiName': 'heavy minus sign',
		'emojiDescription': 'heavy minus sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2797',
		'emojiKey': '2797',
		'emojiName': 'heavy division sign',
		'emojiDescription': 'heavy division sign',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udff0',
		'emojiKey': '1f7f0',
		'emojiName': 'heavy equals sign',
		'emojiDescription': 'heavy equals sign',
		'hasVideo': false
	},
	{
		'emoji': '\u267e\ufe0f',
		'emojiKey': '267e-fe0f',
		'emojiName': 'infinity',
		'emojiDescription': 'infinity',
		'hasVideo': false
	},
	{
		'emoji': '\u203c\ufe0f',
		'emojiKey': '203c-fe0f',
		'emojiName': 'bangbang',
		'emojiDescription': 'bangbang,double exclamation mark',
		'hasVideo': true
	},
	{
		'emoji': '\u2049\ufe0f',
		'emojiKey': '2049-fe0f',
		'emojiName': 'interrobang',
		'emojiDescription': 'interrobang,exclamation question mark',
		'hasVideo': true
	},
	{
		'emoji': '\u2753',
		'emojiKey': '2753',
		'emojiName': 'question',
		'emojiDescription': 'question,black question mark ornament',
		'hasVideo': true
	},
	{
		'emoji': '\u2754',
		'emojiKey': '2754',
		'emojiName': 'grey question',
		'emojiDescription': 'grey question,white question mark ornament',
		'hasVideo': true
	},
	{
		'emoji': '\u2755',
		'emojiKey': '2755',
		'emojiName': 'grey exclamation',
		'emojiDescription': 'grey exclamation,white exclamation mark ornament',
		'hasVideo': true
	},
	{
		'emoji': '\u2757',
		'emojiKey': '2757',
		'emojiName': 'exclamation',
		'emojiDescription': 'exclamation,heavy exclamation mark,heavy exclamation mark symbol',
		'hasVideo': true
	},
	{
		'emoji': '\u3030\ufe0f',
		'emojiKey': '3030-fe0f',
		'emojiName': 'wavy dash',
		'emojiDescription': 'wavy dash',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcb1',
		'emojiKey': '1f4b1',
		'emojiName': 'currency exchange',
		'emojiDescription': 'currency exchange',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udcb2',
		'emojiKey': '1f4b2',
		'emojiName': 'heavy dollar sign',
		'emojiDescription': 'heavy dollar sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2695\ufe0f',
		'emojiKey': '2695-fe0f',
		'emojiName': 'medical symbol',
		'emojiDescription': 'medical symbol,staff of aesculapius',
		'hasVideo': false
	},
	{
		'emoji': '\u267b\ufe0f',
		'emojiKey': '267b-fe0f',
		'emojiName': 'recycle',
		'emojiDescription': 'recycle,black universal recycling symbol',
		'hasVideo': false
	},
	{
		'emoji': '\u269c\ufe0f',
		'emojiKey': '269c-fe0f',
		'emojiName': 'fleur-de-lis',
		'emojiDescription': 'fleur-de-lis,fleur de lis',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd31',
		'emojiKey': '1f531',
		'emojiName': 'trident',
		'emojiDescription': 'trident,trident emblem',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udcdb',
		'emojiKey': '1f4db',
		'emojiName': 'name badge',
		'emojiDescription': 'name badge',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd30',
		'emojiKey': '1f530',
		'emojiName': 'beginner',
		'emojiDescription': 'beginner,japanese symbol for beginner',
		'hasVideo': false
	},
	{
		'emoji': '\u2b55',
		'emojiKey': '2b55',
		'emojiName': 'o',
		'emojiDescription': 'o,heavy large circle',
		'hasVideo': false
	},
	{
		'emoji': '\u2705',
		'emojiKey': '2705',
		'emojiName': 'white check mark',
		'emojiDescription': 'white check mark,white heavy check mark',
		'hasVideo': true
	},
	{
		'emoji': '\u2611\ufe0f',
		'emojiKey': '2611-fe0f',
		'emojiName': 'ballot box with check',
		'emojiDescription': 'ballot box with check',
		'hasVideo': true
	},
	{
		'emoji': '\u2714\ufe0f',
		'emojiKey': '2714-fe0f',
		'emojiName': 'heavy check mark',
		'emojiDescription': 'heavy check mark',
		'hasVideo': true
	},
	{
		'emoji': '\u274c',
		'emojiKey': '274c',
		'emojiName': 'x',
		'emojiDescription': 'x,cross mark',
		'hasVideo': true
	},
	{
		'emoji': '\u274e',
		'emojiKey': '274e',
		'emojiName': 'negative squared cross mark',
		'emojiDescription': 'negative squared cross mark',
		'hasVideo': false
	},
	{
		'emoji': '\u27b0',
		'emojiKey': '27b0',
		'emojiName': 'curly loop',
		'emojiDescription': 'curly loop',
		'hasVideo': false
	},
	{
		'emoji': '\u27bf',
		'emojiKey': '27bf',
		'emojiName': 'loop',
		'emojiDescription': 'loop,double curly loop',
		'hasVideo': false
	},
	{
		'emoji': '\u303d\ufe0f',
		'emojiKey': '303d-fe0f',
		'emojiName': 'part alternation mark',
		'emojiDescription': 'part alternation mark',
		'hasVideo': false
	},
	{
		'emoji': '\u2733\ufe0f',
		'emojiKey': '2733-fe0f',
		'emojiName': 'eight spoked asterisk',
		'emojiDescription': 'eight spoked asterisk',
		'hasVideo': false
	},
	{
		'emoji': '\u2734\ufe0f',
		'emojiKey': '2734-fe0f',
		'emojiName': 'eight pointed black star',
		'emojiDescription': 'eight pointed black star',
		'hasVideo': false
	},
	{
		'emoji': '\u2747\ufe0f',
		'emojiKey': '2747-fe0f',
		'emojiName': 'sparkle',
		'emojiDescription': 'sparkle',
		'hasVideo': false
	},
	{
		'emoji': '\u00a9\ufe0f',
		'emojiKey': '00a9-fe0f',
		'emojiName': 'copyright',
		'emojiDescription': 'copyright,copyright sign',
		'hasVideo': false
	},
	{
		'emoji': '\u00ae\ufe0f',
		'emojiKey': '00ae-fe0f',
		'emojiName': 'registered',
		'emojiDescription': 'registered,registered sign',
		'hasVideo': false
	},
	{
		'emoji': '\u2122\ufe0f',
		'emojiKey': '2122-fe0f',
		'emojiName': 'tm',
		'emojiDescription': 'tm,trade mark sign',
		'hasVideo': false
	},
	{
		'emoji': '#\ufe0f\u20e3',
		'emojiKey': '0023-fe0f-20e3',
		'emojiName': 'hash',
		'emojiDescription': 'hash,hash key',
		'hasVideo': false
	},
	{
		'emoji': '*\ufe0f\u20e3',
		'emojiKey': '002a-fe0f-20e3',
		'emojiName': 'keycap: *',
		'emojiDescription': 'keycap: *,keycap star',
		'hasVideo': false
	},
	{
		'emoji': '0\ufe0f\u20e3',
		'emojiKey': '0030-fe0f-20e3',
		'emojiName': 'zero',
		'emojiDescription': 'zero,keycap 0',
		'hasVideo': false
	},
	{
		'emoji': '1\ufe0f\u20e3',
		'emojiKey': '0031-fe0f-20e3',
		'emojiName': 'one',
		'emojiDescription': 'one,keycap 1',
		'hasVideo': false
	},
	{
		'emoji': '2\ufe0f\u20e3',
		'emojiKey': '0032-fe0f-20e3',
		'emojiName': 'two',
		'emojiDescription': 'two,keycap 2',
		'hasVideo': false
	},
	{
		'emoji': '3\ufe0f\u20e3',
		'emojiKey': '0033-fe0f-20e3',
		'emojiName': 'three',
		'emojiDescription': 'three,keycap 3',
		'hasVideo': false
	},
	{
		'emoji': '4\ufe0f\u20e3',
		'emojiKey': '0034-fe0f-20e3',
		'emojiName': 'four',
		'emojiDescription': 'four,keycap 4',
		'hasVideo': false
	},
	{
		'emoji': '5\ufe0f\u20e3',
		'emojiKey': '0035-fe0f-20e3',
		'emojiName': 'five',
		'emojiDescription': 'five,keycap 5',
		'hasVideo': false
	},
	{
		'emoji': '6\ufe0f\u20e3',
		'emojiKey': '0036-fe0f-20e3',
		'emojiName': 'six',
		'emojiDescription': 'six,keycap 6',
		'hasVideo': false
	},
	{
		'emoji': '7\ufe0f\u20e3',
		'emojiKey': '0037-fe0f-20e3',
		'emojiName': 'seven',
		'emojiDescription': 'seven,keycap 7',
		'hasVideo': false
	},
	{
		'emoji': '8\ufe0f\u20e3',
		'emojiKey': '0038-fe0f-20e3',
		'emojiName': 'eight',
		'emojiDescription': 'eight,keycap 8',
		'hasVideo': false
	},
	{
		'emoji': '9\ufe0f\u20e3',
		'emojiKey': '0039-fe0f-20e3',
		'emojiName': 'nine',
		'emojiDescription': 'nine,keycap 9',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd1f',
		'emojiKey': '1f51f',
		'emojiName': 'keycap ten',
		'emojiDescription': 'keycap ten',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd20',
		'emojiKey': '1f520',
		'emojiName': 'capital abcd',
		'emojiDescription': 'capital abcd,input symbol for latin capital letters',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd21',
		'emojiKey': '1f521',
		'emojiName': 'abcd',
		'emojiDescription': 'abcd,input symbol for latin small letters',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd22',
		'emojiKey': '1f522',
		'emojiName': '1234',
		'emojiDescription': '1234,input symbol for numbers',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd23',
		'emojiKey': '1f523',
		'emojiName': 'symbols',
		'emojiDescription': 'symbols,input symbol for symbols',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd24',
		'emojiKey': '1f524',
		'emojiName': 'abc',
		'emojiDescription': 'abc,input symbol for latin letters',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd70\ufe0f',
		'emojiKey': '1f170-fe0f',
		'emojiName': 'a',
		'emojiDescription': 'a,negative squared latin capital letter a',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd8e',
		'emojiKey': '1f18e',
		'emojiName': 'ab',
		'emojiDescription': 'ab,negative squared ab',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd71\ufe0f',
		'emojiKey': '1f171-fe0f',
		'emojiName': 'b',
		'emojiDescription': 'b,negative squared latin capital letter b',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd91',
		'emojiKey': '1f191',
		'emojiName': 'cl',
		'emojiDescription': 'cl,squared cl',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd92',
		'emojiKey': '1f192',
		'emojiName': 'cool',
		'emojiDescription': 'cool,squared cool',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udd93',
		'emojiKey': '1f193',
		'emojiName': 'free',
		'emojiDescription': 'free,squared free',
		'hasVideo': true
	},
	{
		'emoji': '\u2139\ufe0f',
		'emojiKey': '2139-fe0f',
		'emojiName': 'information source',
		'emojiDescription': 'information source',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd94',
		'emojiKey': '1f194',
		'emojiName': 'id',
		'emojiDescription': 'id,squared id',
		'hasVideo': false
	},
	{
		'emoji': '\u24c2\ufe0f',
		'emojiKey': '24c2-fe0f',
		'emojiName': 'm',
		'emojiDescription': 'm,circled latin capital letter m',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd95',
		'emojiKey': '1f195',
		'emojiName': 'new',
		'emojiDescription': 'new,squared new',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udd96',
		'emojiKey': '1f196',
		'emojiName': 'ng',
		'emojiDescription': 'ng,squared ng',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd7e\ufe0f',
		'emojiKey': '1f17e-fe0f',
		'emojiName': 'o2',
		'emojiDescription': 'o2,negative squared latin capital letter o',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd97',
		'emojiKey': '1f197',
		'emojiName': 'ok',
		'emojiDescription': 'ok,squared ok',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udd7f\ufe0f',
		'emojiKey': '1f17f-fe0f',
		'emojiName': 'parking',
		'emojiDescription': 'parking,negative squared latin capital letter p',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd98',
		'emojiKey': '1f198',
		'emojiName': 'sos',
		'emojiDescription': 'sos,squared sos',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udd99',
		'emojiKey': '1f199',
		'emojiName': 'up',
		'emojiDescription': 'up,squared up with exclamation mark',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udd9a',
		'emojiKey': '1f19a',
		'emojiName': 'vs',
		'emojiDescription': 'vs,squared vs',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude01',
		'emojiKey': '1f201',
		'emojiName': 'koko',
		'emojiDescription': 'koko,squared katakana koko',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude02\ufe0f',
		'emojiKey': '1f202-fe0f',
		'emojiName': 'sa',
		'emojiDescription': 'sa,squared katakana sa',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude37\ufe0f',
		'emojiKey': '1f237-fe0f',
		'emojiName': 'u6708',
		'emojiDescription': 'u6708,squared cjk unified ideograph-6708',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude36',
		'emojiKey': '1f236',
		'emojiName': 'u6709',
		'emojiDescription': 'u6709,squared cjk unified ideograph-6709',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude2f',
		'emojiKey': '1f22f',
		'emojiName': 'u6307',
		'emojiDescription': 'u6307,squared cjk unified ideograph-6307',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude50',
		'emojiKey': '1f250',
		'emojiName': 'ideograph advantage',
		'emojiDescription': 'ideograph advantage,circled ideograph advantage',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude39',
		'emojiKey': '1f239',
		'emojiName': 'u5272',
		'emojiDescription': 'u5272,squared cjk unified ideograph-5272',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude1a',
		'emojiKey': '1f21a',
		'emojiName': 'u7121',
		'emojiDescription': 'u7121,squared cjk unified ideograph-7121',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude32',
		'emojiKey': '1f232',
		'emojiName': 'u7981',
		'emojiDescription': 'u7981,squared cjk unified ideograph-7981',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude51',
		'emojiKey': '1f251',
		'emojiName': 'accept',
		'emojiDescription': 'accept,circled ideograph accept',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude38',
		'emojiKey': '1f238',
		'emojiName': 'u7533',
		'emojiDescription': 'u7533,squared cjk unified ideograph-7533',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude34',
		'emojiKey': '1f234',
		'emojiName': 'u5408',
		'emojiDescription': 'u5408,squared cjk unified ideograph-5408',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude33',
		'emojiKey': '1f233',
		'emojiName': 'u7a7a',
		'emojiDescription': 'u7a7a,squared cjk unified ideograph-7a7a',
		'hasVideo': false
	},
	{
		'emoji': '\u3297\ufe0f',
		'emojiKey': '3297-fe0f',
		'emojiName': 'congratulations',
		'emojiDescription': 'congratulations,circled ideograph congratulation',
		'hasVideo': false
	},
	{
		'emoji': '\u3299\ufe0f',
		'emojiKey': '3299-fe0f',
		'emojiName': 'secret',
		'emojiDescription': 'secret,circled ideograph secret',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude3a',
		'emojiKey': '1f23a',
		'emojiName': 'u55b6',
		'emojiDescription': 'u55b6,squared cjk unified ideograph-55b6',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\ude35',
		'emojiKey': '1f235',
		'emojiName': 'u6e80',
		'emojiDescription': 'u6e80,squared cjk unified ideograph-6e80',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd34',
		'emojiKey': '1f534',
		'emojiName': 'red circle',
		'emojiDescription': 'red circle,large red circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe0',
		'emojiKey': '1f7e0',
		'emojiName': 'large orange circle',
		'emojiDescription': 'large orange circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe1',
		'emojiKey': '1f7e1',
		'emojiName': 'large yellow circle',
		'emojiDescription': 'large yellow circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe2',
		'emojiKey': '1f7e2',
		'emojiName': 'large green circle',
		'emojiDescription': 'large green circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd35',
		'emojiKey': '1f535',
		'emojiName': 'large blue circle',
		'emojiDescription': 'large blue circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe3',
		'emojiKey': '1f7e3',
		'emojiName': 'large purple circle',
		'emojiDescription': 'large purple circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe4',
		'emojiKey': '1f7e4',
		'emojiName': 'large brown circle',
		'emojiDescription': 'large brown circle',
		'hasVideo': false
	},
	{
		'emoji': '\u26ab',
		'emojiKey': '26ab',
		'emojiName': 'black circle',
		'emojiDescription': 'black circle,medium black circle',
		'hasVideo': false
	},
	{
		'emoji': '\u26aa',
		'emojiKey': '26aa',
		'emojiName': 'white circle',
		'emojiDescription': 'white circle,medium white circle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe5',
		'emojiKey': '1f7e5',
		'emojiName': 'large red square',
		'emojiDescription': 'large red square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe7',
		'emojiKey': '1f7e7',
		'emojiName': 'large orange square',
		'emojiDescription': 'large orange square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe8',
		'emojiKey': '1f7e8',
		'emojiName': 'large yellow square',
		'emojiDescription': 'large yellow square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe9',
		'emojiKey': '1f7e9',
		'emojiName': 'large green square',
		'emojiDescription': 'large green square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfe6',
		'emojiKey': '1f7e6',
		'emojiName': 'large blue square',
		'emojiDescription': 'large blue square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfea',
		'emojiKey': '1f7ea',
		'emojiName': 'large purple square',
		'emojiDescription': 'large purple square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udfeb',
		'emojiKey': '1f7eb',
		'emojiName': 'large brown square',
		'emojiDescription': 'large brown square',
		'hasVideo': false
	},
	{
		'emoji': '\u2b1b',
		'emojiKey': '2b1b',
		'emojiName': 'black large square',
		'emojiDescription': 'black large square',
		'hasVideo': false
	},
	{
		'emoji': '\u2b1c',
		'emojiKey': '2b1c',
		'emojiName': 'white large square',
		'emojiDescription': 'white large square',
		'hasVideo': false
	},
	{
		'emoji': '\u25fc\ufe0f',
		'emojiKey': '25fc-fe0f',
		'emojiName': 'black medium square',
		'emojiDescription': 'black medium square',
		'hasVideo': false
	},
	{
		'emoji': '\u25fb\ufe0f',
		'emojiKey': '25fb-fe0f',
		'emojiName': 'white medium square',
		'emojiDescription': 'white medium square',
		'hasVideo': false
	},
	{
		'emoji': '\u25fe',
		'emojiKey': '25fe',
		'emojiName': 'black medium small square',
		'emojiDescription': 'black medium small square',
		'hasVideo': false
	},
	{
		'emoji': '\u25fd',
		'emojiKey': '25fd',
		'emojiName': 'white medium small square',
		'emojiDescription': 'white medium small square',
		'hasVideo': false
	},
	{
		'emoji': '\u25aa\ufe0f',
		'emojiKey': '25aa-fe0f',
		'emojiName': 'black small square',
		'emojiDescription': 'black small square',
		'hasVideo': false
	},
	{
		'emoji': '\u25ab\ufe0f',
		'emojiKey': '25ab-fe0f',
		'emojiName': 'white small square',
		'emojiDescription': 'white small square',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd36',
		'emojiKey': '1f536',
		'emojiName': 'large orange diamond',
		'emojiDescription': 'large orange diamond',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd37',
		'emojiKey': '1f537',
		'emojiName': 'large blue diamond',
		'emojiDescription': 'large blue diamond',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd38',
		'emojiKey': '1f538',
		'emojiName': 'small orange diamond',
		'emojiDescription': 'small orange diamond',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd39',
		'emojiKey': '1f539',
		'emojiName': 'small blue diamond',
		'emojiDescription': 'small blue diamond',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd3a',
		'emojiKey': '1f53a',
		'emojiName': 'small red triangle',
		'emojiDescription': 'small red triangle,up-pointing red triangle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd3b',
		'emojiKey': '1f53b',
		'emojiName': 'small red triangle down',
		'emojiDescription': 'small red triangle down,down-pointing red triangle',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udca0',
		'emojiKey': '1f4a0',
		'emojiName': 'diamond shape with a dot inside',
		'emojiDescription': 'diamond shape with a dot inside',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd18',
		'emojiKey': '1f518',
		'emojiName': 'radio button',
		'emojiDescription': 'radio button',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd33',
		'emojiKey': '1f533',
		'emojiName': 'white square button',
		'emojiDescription': 'white square button',
		'hasVideo': false
	},
	{
		'emoji': '\ud83d\udd32',
		'emojiKey': '1f532',
		'emojiName': 'black square button',
		'emojiDescription': 'black square button',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udfc1',
		'emojiKey': '1f3c1',
		'emojiName': 'chequered flag',
		'emojiDescription': 'chequered flag,checkered flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83d\udea9',
		'emojiKey': '1f6a9',
		'emojiName': 'triangular flag on post',
		'emojiDescription': 'triangular flag on post',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udf8c',
		'emojiKey': '1f38c',
		'emojiName': 'crossed flags',
		'emojiDescription': 'crossed flags',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff4',
		'emojiKey': '1f3f4',
		'emojiName': 'waving black flag',
		'emojiDescription': 'waving black flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udff3\ufe0f',
		'emojiKey': '1f3f3-fe0f',
		'emojiName': 'white flag',
		'emojiDescription': 'white flag,waving white flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udff3\ufe0f\u200d\ud83c\udf08',
		'emojiKey': '1f3f3-fe0f-200d-1f308',
		'emojiName': 'rainbow flag',
		'emojiDescription': 'rainbow flag,rainbow-flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f',
		'emojiKey': '1f3f3-fe0f-200d-26a7-fe0f',
		'emojiName': 'transgender flag',
		'emojiDescription': 'transgender flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff4\u200d\u2620\ufe0f',
		'emojiKey': '1f3f4-200d-2620-fe0f',
		'emojiName': 'pirate flag',
		'emojiDescription': 'pirate flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde6\ud83c\udde8',
		'emojiKey': '1f1e6-1f1e8',
		'emojiName': 'flag-ac',
		'emojiDescription': 'flag-ac,ascension island flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\udde9',
		'emojiKey': '1f1e6-1f1e9',
		'emojiName': 'flag-ad',
		'emojiDescription': 'flag-ad,andorra flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddea',
		'emojiKey': '1f1e6-1f1ea',
		'emojiName': 'flag-ae',
		'emojiDescription': 'flag-ae,united arab emirates flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddeb',
		'emojiKey': '1f1e6-1f1eb',
		'emojiName': 'flag-af',
		'emojiDescription': 'flag-af,afghanistan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddec',
		'emojiKey': '1f1e6-1f1ec',
		'emojiName': 'flag-ag',
		'emojiDescription': 'flag-ag,antigua & barbuda flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddee',
		'emojiKey': '1f1e6-1f1ee',
		'emojiName': 'flag-ai',
		'emojiDescription': 'flag-ai,anguilla flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf1',
		'emojiKey': '1f1e6-1f1f1',
		'emojiName': 'flag-al',
		'emojiDescription': 'flag-al,albania flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf2',
		'emojiKey': '1f1e6-1f1f2',
		'emojiName': 'flag-am',
		'emojiDescription': 'flag-am,armenia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf4',
		'emojiKey': '1f1e6-1f1f4',
		'emojiName': 'flag-ao',
		'emojiDescription': 'flag-ao,angola flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf6',
		'emojiKey': '1f1e6-1f1f6',
		'emojiName': 'flag-aq',
		'emojiDescription': 'flag-aq,antarctica flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf7',
		'emojiKey': '1f1e6-1f1f7',
		'emojiName': 'flag-ar',
		'emojiDescription': 'flag-ar,argentina flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf8',
		'emojiKey': '1f1e6-1f1f8',
		'emojiName': 'flag-as',
		'emojiDescription': 'flag-as,american samoa flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddf9',
		'emojiKey': '1f1e6-1f1f9',
		'emojiName': 'flag-at',
		'emojiDescription': 'flag-at,austria flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddfa',
		'emojiKey': '1f1e6-1f1fa',
		'emojiName': 'flag-au',
		'emojiDescription': 'flag-au,australia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddfc',
		'emojiKey': '1f1e6-1f1fc',
		'emojiName': 'flag-aw',
		'emojiDescription': 'flag-aw,aruba flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddfd',
		'emojiKey': '1f1e6-1f1fd',
		'emojiName': 'flag-ax',
		'emojiDescription': 'flag-ax,\u00e5land islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde6\ud83c\uddff',
		'emojiKey': '1f1e6-1f1ff',
		'emojiName': 'flag-az',
		'emojiDescription': 'flag-az,azerbaijan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\udde6',
		'emojiKey': '1f1e7-1f1e6',
		'emojiName': 'flag-ba',
		'emojiDescription': 'flag-ba,bosnia & herzegovina flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\udde7',
		'emojiKey': '1f1e7-1f1e7',
		'emojiName': 'flag-bb',
		'emojiDescription': 'flag-bb,barbados flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\udde9',
		'emojiKey': '1f1e7-1f1e9',
		'emojiName': 'flag-bd',
		'emojiDescription': 'flag-bd,bangladesh flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddea',
		'emojiKey': '1f1e7-1f1ea',
		'emojiName': 'flag-be',
		'emojiDescription': 'flag-be,belgium flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddeb',
		'emojiKey': '1f1e7-1f1eb',
		'emojiName': 'flag-bf',
		'emojiDescription': 'flag-bf,burkina faso flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddec',
		'emojiKey': '1f1e7-1f1ec',
		'emojiName': 'flag-bg',
		'emojiDescription': 'flag-bg,bulgaria flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\udded',
		'emojiKey': '1f1e7-1f1ed',
		'emojiName': 'flag-bh',
		'emojiDescription': 'flag-bh,bahrain flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddee',
		'emojiKey': '1f1e7-1f1ee',
		'emojiName': 'flag-bi',
		'emojiDescription': 'flag-bi,burundi flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddef',
		'emojiKey': '1f1e7-1f1ef',
		'emojiName': 'flag-bj',
		'emojiDescription': 'flag-bj,benin flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf1',
		'emojiKey': '1f1e7-1f1f1',
		'emojiName': 'flag-bl',
		'emojiDescription': 'flag-bl,st. barth\u00e9lemy flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf2',
		'emojiKey': '1f1e7-1f1f2',
		'emojiName': 'flag-bm',
		'emojiDescription': 'flag-bm,bermuda flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf3',
		'emojiKey': '1f1e7-1f1f3',
		'emojiName': 'flag-bn',
		'emojiDescription': 'flag-bn,brunei flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf4',
		'emojiKey': '1f1e7-1f1f4',
		'emojiName': 'flag-bo',
		'emojiDescription': 'flag-bo,bolivia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf6',
		'emojiKey': '1f1e7-1f1f6',
		'emojiName': 'flag-bq',
		'emojiDescription': 'flag-bq,caribbean netherlands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf7',
		'emojiKey': '1f1e7-1f1f7',
		'emojiName': 'flag-br',
		'emojiDescription': 'flag-br,brazil flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf8',
		'emojiKey': '1f1e7-1f1f8',
		'emojiName': 'flag-bs',
		'emojiDescription': 'flag-bs,bahamas flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddf9',
		'emojiKey': '1f1e7-1f1f9',
		'emojiName': 'flag-bt',
		'emojiDescription': 'flag-bt,bhutan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddfb',
		'emojiKey': '1f1e7-1f1fb',
		'emojiName': 'flag-bv',
		'emojiDescription': 'flag-bv,bouvet island flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddfc',
		'emojiKey': '1f1e7-1f1fc',
		'emojiName': 'flag-bw',
		'emojiDescription': 'flag-bw,botswana flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddfe',
		'emojiKey': '1f1e7-1f1fe',
		'emojiName': 'flag-by',
		'emojiDescription': 'flag-by,belarus flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde7\ud83c\uddff',
		'emojiKey': '1f1e7-1f1ff',
		'emojiName': 'flag-bz',
		'emojiDescription': 'flag-bz,belize flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\udde6',
		'emojiKey': '1f1e8-1f1e6',
		'emojiName': 'flag-ca',
		'emojiDescription': 'flag-ca,canada flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\udde8',
		'emojiKey': '1f1e8-1f1e8',
		'emojiName': 'flag-cc',
		'emojiDescription': 'flag-cc,cocos (keeling) islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\udde9',
		'emojiKey': '1f1e8-1f1e9',
		'emojiName': 'flag-cd',
		'emojiDescription': 'flag-cd,congo - kinshasa flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddeb',
		'emojiKey': '1f1e8-1f1eb',
		'emojiName': 'flag-cf',
		'emojiDescription': 'flag-cf,central african republic flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddec',
		'emojiKey': '1f1e8-1f1ec',
		'emojiName': 'flag-cg',
		'emojiDescription': 'flag-cg,congo - brazzaville flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\udded',
		'emojiKey': '1f1e8-1f1ed',
		'emojiName': 'flag-ch',
		'emojiDescription': 'flag-ch,switzerland flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddee',
		'emojiKey': '1f1e8-1f1ee',
		'emojiName': 'flag-ci',
		'emojiDescription': 'flag-ci,c\u00f4te d\u2019ivoire flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf0',
		'emojiKey': '1f1e8-1f1f0',
		'emojiName': 'flag-ck',
		'emojiDescription': 'flag-ck,cook islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf1',
		'emojiKey': '1f1e8-1f1f1',
		'emojiName': 'flag-cl',
		'emojiDescription': 'flag-cl,chile flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf2',
		'emojiKey': '1f1e8-1f1f2',
		'emojiName': 'flag-cm',
		'emojiDescription': 'flag-cm,cameroon flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf3',
		'emojiKey': '1f1e8-1f1f3',
		'emojiName': 'cn',
		'emojiDescription': 'cn,flag-cn,china flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf4',
		'emojiKey': '1f1e8-1f1f4',
		'emojiName': 'flag-co',
		'emojiDescription': 'flag-co,colombia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf5',
		'emojiKey': '1f1e8-1f1f5',
		'emojiName': 'flag-cp',
		'emojiDescription': 'flag-cp,clipperton island flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddf7',
		'emojiKey': '1f1e8-1f1f7',
		'emojiName': 'flag-cr',
		'emojiDescription': 'flag-cr,costa rica flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddfa',
		'emojiKey': '1f1e8-1f1fa',
		'emojiName': 'flag-cu',
		'emojiDescription': 'flag-cu,cuba flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddfb',
		'emojiKey': '1f1e8-1f1fb',
		'emojiName': 'flag-cv',
		'emojiDescription': 'flag-cv,cape verde flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddfc',
		'emojiKey': '1f1e8-1f1fc',
		'emojiName': 'flag-cw',
		'emojiDescription': 'flag-cw,cura\u00e7ao flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddfd',
		'emojiKey': '1f1e8-1f1fd',
		'emojiName': 'flag-cx',
		'emojiDescription': 'flag-cx,christmas island flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddfe',
		'emojiKey': '1f1e8-1f1fe',
		'emojiName': 'flag-cy',
		'emojiDescription': 'flag-cy,cyprus flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde8\ud83c\uddff',
		'emojiKey': '1f1e8-1f1ff',
		'emojiName': 'flag-cz',
		'emojiDescription': 'flag-cz,czechia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddea',
		'emojiKey': '1f1e9-1f1ea',
		'emojiName': 'de',
		'emojiDescription': 'de,flag-de,germany flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddec',
		'emojiKey': '1f1e9-1f1ec',
		'emojiName': 'flag-dg',
		'emojiDescription': 'flag-dg,diego garcia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddef',
		'emojiKey': '1f1e9-1f1ef',
		'emojiName': 'flag-dj',
		'emojiDescription': 'flag-dj,djibouti flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddf0',
		'emojiKey': '1f1e9-1f1f0',
		'emojiName': 'flag-dk',
		'emojiDescription': 'flag-dk,denmark flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddf2',
		'emojiKey': '1f1e9-1f1f2',
		'emojiName': 'flag-dm',
		'emojiDescription': 'flag-dm,dominica flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddf4',
		'emojiKey': '1f1e9-1f1f4',
		'emojiName': 'flag-do',
		'emojiDescription': 'flag-do,dominican republic flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udde9\ud83c\uddff',
		'emojiKey': '1f1e9-1f1ff',
		'emojiName': 'flag-dz',
		'emojiDescription': 'flag-dz,algeria flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\udde6',
		'emojiKey': '1f1ea-1f1e6',
		'emojiName': 'flag-ea',
		'emojiDescription': 'flag-ea,ceuta & melilla flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\udde8',
		'emojiKey': '1f1ea-1f1e8',
		'emojiName': 'flag-ec',
		'emojiDescription': 'flag-ec,ecuador flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddea',
		'emojiKey': '1f1ea-1f1ea',
		'emojiName': 'flag-ee',
		'emojiDescription': 'flag-ee,estonia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddec',
		'emojiKey': '1f1ea-1f1ec',
		'emojiName': 'flag-eg',
		'emojiDescription': 'flag-eg,egypt flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\udded',
		'emojiKey': '1f1ea-1f1ed',
		'emojiName': 'flag-eh',
		'emojiDescription': 'flag-eh,western sahara flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddf7',
		'emojiKey': '1f1ea-1f1f7',
		'emojiName': 'flag-er',
		'emojiDescription': 'flag-er,eritrea flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddf8',
		'emojiKey': '1f1ea-1f1f8',
		'emojiName': 'es',
		'emojiDescription': 'es,flag-es,spain flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddf9',
		'emojiKey': '1f1ea-1f1f9',
		'emojiName': 'flag-et',
		'emojiDescription': 'flag-et,ethiopia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddea\ud83c\uddfa',
		'emojiKey': '1f1ea-1f1fa',
		'emojiName': 'flag-eu',
		'emojiDescription': 'flag-eu,european union flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddee',
		'emojiKey': '1f1eb-1f1ee',
		'emojiName': 'flag-fi',
		'emojiDescription': 'flag-fi,finland flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddef',
		'emojiKey': '1f1eb-1f1ef',
		'emojiName': 'flag-fj',
		'emojiDescription': 'flag-fj,fiji flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddf0',
		'emojiKey': '1f1eb-1f1f0',
		'emojiName': 'flag-fk',
		'emojiDescription': 'flag-fk,falkland islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddf2',
		'emojiKey': '1f1eb-1f1f2',
		'emojiName': 'flag-fm',
		'emojiDescription': 'flag-fm,micronesia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddf4',
		'emojiKey': '1f1eb-1f1f4',
		'emojiName': 'flag-fo',
		'emojiDescription': 'flag-fo,faroe islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddeb\ud83c\uddf7',
		'emojiKey': '1f1eb-1f1f7',
		'emojiName': 'fr',
		'emojiDescription': 'fr,flag-fr,france flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\udde6',
		'emojiKey': '1f1ec-1f1e6',
		'emojiName': 'flag-ga',
		'emojiDescription': 'flag-ga,gabon flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\udde7',
		'emojiKey': '1f1ec-1f1e7',
		'emojiName': 'gb',
		'emojiDescription': 'gb,uk,flag-gb,united kingdom flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\udde9',
		'emojiKey': '1f1ec-1f1e9',
		'emojiName': 'flag-gd',
		'emojiDescription': 'flag-gd,grenada flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddea',
		'emojiKey': '1f1ec-1f1ea',
		'emojiName': 'flag-ge',
		'emojiDescription': 'flag-ge,georgia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddeb',
		'emojiKey': '1f1ec-1f1eb',
		'emojiName': 'flag-gf',
		'emojiDescription': 'flag-gf,french guiana flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddec',
		'emojiKey': '1f1ec-1f1ec',
		'emojiName': 'flag-gg',
		'emojiDescription': 'flag-gg,guernsey flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\udded',
		'emojiKey': '1f1ec-1f1ed',
		'emojiName': 'flag-gh',
		'emojiDescription': 'flag-gh,ghana flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddee',
		'emojiKey': '1f1ec-1f1ee',
		'emojiName': 'flag-gi',
		'emojiDescription': 'flag-gi,gibraltar flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf1',
		'emojiKey': '1f1ec-1f1f1',
		'emojiName': 'flag-gl',
		'emojiDescription': 'flag-gl,greenland flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf2',
		'emojiKey': '1f1ec-1f1f2',
		'emojiName': 'flag-gm',
		'emojiDescription': 'flag-gm,gambia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf3',
		'emojiKey': '1f1ec-1f1f3',
		'emojiName': 'flag-gn',
		'emojiDescription': 'flag-gn,guinea flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf5',
		'emojiKey': '1f1ec-1f1f5',
		'emojiName': 'flag-gp',
		'emojiDescription': 'flag-gp,guadeloupe flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf6',
		'emojiKey': '1f1ec-1f1f6',
		'emojiName': 'flag-gq',
		'emojiDescription': 'flag-gq,equatorial guinea flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf7',
		'emojiKey': '1f1ec-1f1f7',
		'emojiName': 'flag-gr',
		'emojiDescription': 'flag-gr,greece flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf8',
		'emojiKey': '1f1ec-1f1f8',
		'emojiName': 'flag-gs',
		'emojiDescription': 'flag-gs,south georgia & south sandwich islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddf9',
		'emojiKey': '1f1ec-1f1f9',
		'emojiName': 'flag-gt',
		'emojiDescription': 'flag-gt,guatemala flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddfa',
		'emojiKey': '1f1ec-1f1fa',
		'emojiName': 'flag-gu',
		'emojiDescription': 'flag-gu,guam flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddfc',
		'emojiKey': '1f1ec-1f1fc',
		'emojiName': 'flag-gw',
		'emojiDescription': 'flag-gw,guinea-bissau flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddec\ud83c\uddfe',
		'emojiKey': '1f1ec-1f1fe',
		'emojiName': 'flag-gy',
		'emojiDescription': 'flag-gy,guyana flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddf0',
		'emojiKey': '1f1ed-1f1f0',
		'emojiName': 'flag-hk',
		'emojiDescription': 'flag-hk,hong kong sar china flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddf2',
		'emojiKey': '1f1ed-1f1f2',
		'emojiName': 'flag-hm',
		'emojiDescription': 'flag-hm,heard & mcdonald islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddf3',
		'emojiKey': '1f1ed-1f1f3',
		'emojiName': 'flag-hn',
		'emojiDescription': 'flag-hn,honduras flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddf7',
		'emojiKey': '1f1ed-1f1f7',
		'emojiName': 'flag-hr',
		'emojiDescription': 'flag-hr,croatia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddf9',
		'emojiKey': '1f1ed-1f1f9',
		'emojiName': 'flag-ht',
		'emojiDescription': 'flag-ht,haiti flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udded\ud83c\uddfa',
		'emojiKey': '1f1ed-1f1fa',
		'emojiName': 'flag-hu',
		'emojiDescription': 'flag-hu,hungary flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddee\ud83c\udde8',
		'emojiKey': '1f1ee-1f1e8',
		'emojiName': 'flag-ic',
		'emojiDescription': 'flag-ic,canary islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\udde9',
		'emojiKey': '1f1ee-1f1e9',
		'emojiName': 'flag-id',
		'emojiDescription': 'flag-id,indonesia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddea',
		'emojiKey': '1f1ee-1f1ea',
		'emojiName': 'flag-ie',
		'emojiDescription': 'flag-ie,ireland flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf1',
		'emojiKey': '1f1ee-1f1f1',
		'emojiName': 'flag-il',
		'emojiDescription': 'flag-il,israel flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf2',
		'emojiKey': '1f1ee-1f1f2',
		'emojiName': 'flag-im',
		'emojiDescription': 'flag-im,isle of man flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf3',
		'emojiKey': '1f1ee-1f1f3',
		'emojiName': 'flag-in',
		'emojiDescription': 'flag-in,india flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf4',
		'emojiKey': '1f1ee-1f1f4',
		'emojiName': 'flag-io',
		'emojiDescription': 'flag-io,british indian ocean territory flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf6',
		'emojiKey': '1f1ee-1f1f6',
		'emojiName': 'flag-iq',
		'emojiDescription': 'flag-iq,iraq flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf7',
		'emojiKey': '1f1ee-1f1f7',
		'emojiName': 'flag-ir',
		'emojiDescription': 'flag-ir,iran flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf8',
		'emojiKey': '1f1ee-1f1f8',
		'emojiName': 'flag-is',
		'emojiDescription': 'flag-is,iceland flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddee\ud83c\uddf9',
		'emojiKey': '1f1ee-1f1f9',
		'emojiName': 'it',
		'emojiDescription': 'it,flag-it,italy flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddef\ud83c\uddea',
		'emojiKey': '1f1ef-1f1ea',
		'emojiName': 'flag-je',
		'emojiDescription': 'flag-je,jersey flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddef\ud83c\uddf2',
		'emojiKey': '1f1ef-1f1f2',
		'emojiName': 'flag-jm',
		'emojiDescription': 'flag-jm,jamaica flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddef\ud83c\uddf4',
		'emojiKey': '1f1ef-1f1f4',
		'emojiName': 'flag-jo',
		'emojiDescription': 'flag-jo,jordan flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddef\ud83c\uddf5',
		'emojiKey': '1f1ef-1f1f5',
		'emojiName': 'jp',
		'emojiDescription': 'jp,flag-jp,japan flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddea',
		'emojiKey': '1f1f0-1f1ea',
		'emojiName': 'flag-ke',
		'emojiDescription': 'flag-ke,kenya flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddec',
		'emojiKey': '1f1f0-1f1ec',
		'emojiName': 'flag-kg',
		'emojiDescription': 'flag-kg,kyrgyzstan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\udded',
		'emojiKey': '1f1f0-1f1ed',
		'emojiName': 'flag-kh',
		'emojiDescription': 'flag-kh,cambodia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddee',
		'emojiKey': '1f1f0-1f1ee',
		'emojiName': 'flag-ki',
		'emojiDescription': 'flag-ki,kiribati flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddf2',
		'emojiKey': '1f1f0-1f1f2',
		'emojiName': 'flag-km',
		'emojiDescription': 'flag-km,comoros flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddf3',
		'emojiKey': '1f1f0-1f1f3',
		'emojiName': 'flag-kn',
		'emojiDescription': 'flag-kn,st. kitts & nevis flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddf5',
		'emojiKey': '1f1f0-1f1f5',
		'emojiName': 'flag-kp',
		'emojiDescription': 'flag-kp,north korea flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddf7',
		'emojiKey': '1f1f0-1f1f7',
		'emojiName': 'kr',
		'emojiDescription': 'kr,flag-kr,south korea flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddfc',
		'emojiKey': '1f1f0-1f1fc',
		'emojiName': 'flag-kw',
		'emojiDescription': 'flag-kw,kuwait flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddfe',
		'emojiKey': '1f1f0-1f1fe',
		'emojiName': 'flag-ky',
		'emojiDescription': 'flag-ky,cayman islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf0\ud83c\uddff',
		'emojiKey': '1f1f0-1f1ff',
		'emojiName': 'flag-kz',
		'emojiDescription': 'flag-kz,kazakhstan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\udde6',
		'emojiKey': '1f1f1-1f1e6',
		'emojiName': 'flag-la',
		'emojiDescription': 'flag-la,laos flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\udde7',
		'emojiKey': '1f1f1-1f1e7',
		'emojiName': 'flag-lb',
		'emojiDescription': 'flag-lb,lebanon flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\udde8',
		'emojiKey': '1f1f1-1f1e8',
		'emojiName': 'flag-lc',
		'emojiDescription': 'flag-lc,st. lucia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddee',
		'emojiKey': '1f1f1-1f1ee',
		'emojiName': 'flag-li',
		'emojiDescription': 'flag-li,liechtenstein flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddf0',
		'emojiKey': '1f1f1-1f1f0',
		'emojiName': 'flag-lk',
		'emojiDescription': 'flag-lk,sri lanka flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddf7',
		'emojiKey': '1f1f1-1f1f7',
		'emojiName': 'flag-lr',
		'emojiDescription': 'flag-lr,liberia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddf8',
		'emojiKey': '1f1f1-1f1f8',
		'emojiName': 'flag-ls',
		'emojiDescription': 'flag-ls,lesotho flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddf9',
		'emojiKey': '1f1f1-1f1f9',
		'emojiName': 'flag-lt',
		'emojiDescription': 'flag-lt,lithuania flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddfa',
		'emojiKey': '1f1f1-1f1fa',
		'emojiName': 'flag-lu',
		'emojiDescription': 'flag-lu,luxembourg flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddfb',
		'emojiKey': '1f1f1-1f1fb',
		'emojiName': 'flag-lv',
		'emojiDescription': 'flag-lv,latvia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf1\ud83c\uddfe',
		'emojiKey': '1f1f1-1f1fe',
		'emojiName': 'flag-ly',
		'emojiDescription': 'flag-ly,libya flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\udde6',
		'emojiKey': '1f1f2-1f1e6',
		'emojiName': 'flag-ma',
		'emojiDescription': 'flag-ma,morocco flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\udde8',
		'emojiKey': '1f1f2-1f1e8',
		'emojiName': 'flag-mc',
		'emojiDescription': 'flag-mc,monaco flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\udde9',
		'emojiKey': '1f1f2-1f1e9',
		'emojiName': 'flag-md',
		'emojiDescription': 'flag-md,moldova flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddea',
		'emojiKey': '1f1f2-1f1ea',
		'emojiName': 'flag-me',
		'emojiDescription': 'flag-me,montenegro flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddeb',
		'emojiKey': '1f1f2-1f1eb',
		'emojiName': 'flag-mf',
		'emojiDescription': 'flag-mf,st. martin flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddec',
		'emojiKey': '1f1f2-1f1ec',
		'emojiName': 'flag-mg',
		'emojiDescription': 'flag-mg,madagascar flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\udded',
		'emojiKey': '1f1f2-1f1ed',
		'emojiName': 'flag-mh',
		'emojiDescription': 'flag-mh,marshall islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf0',
		'emojiKey': '1f1f2-1f1f0',
		'emojiName': 'flag-mk',
		'emojiDescription': 'flag-mk,north macedonia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf1',
		'emojiKey': '1f1f2-1f1f1',
		'emojiName': 'flag-ml',
		'emojiDescription': 'flag-ml,mali flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf2',
		'emojiKey': '1f1f2-1f1f2',
		'emojiName': 'flag-mm',
		'emojiDescription': 'flag-mm,myanmar (burma) flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf3',
		'emojiKey': '1f1f2-1f1f3',
		'emojiName': 'flag-mn',
		'emojiDescription': 'flag-mn,mongolia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf4',
		'emojiKey': '1f1f2-1f1f4',
		'emojiName': 'flag-mo',
		'emojiDescription': 'flag-mo,macao sar china flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf5',
		'emojiKey': '1f1f2-1f1f5',
		'emojiName': 'flag-mp',
		'emojiDescription': 'flag-mp,northern mariana islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf6',
		'emojiKey': '1f1f2-1f1f6',
		'emojiName': 'flag-mq',
		'emojiDescription': 'flag-mq,martinique flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf7',
		'emojiKey': '1f1f2-1f1f7',
		'emojiName': 'flag-mr',
		'emojiDescription': 'flag-mr,mauritania flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf8',
		'emojiKey': '1f1f2-1f1f8',
		'emojiName': 'flag-ms',
		'emojiDescription': 'flag-ms,montserrat flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddf9',
		'emojiKey': '1f1f2-1f1f9',
		'emojiName': 'flag-mt',
		'emojiDescription': 'flag-mt,malta flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddfa',
		'emojiKey': '1f1f2-1f1fa',
		'emojiName': 'flag-mu',
		'emojiDescription': 'flag-mu,mauritius flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddfb',
		'emojiKey': '1f1f2-1f1fb',
		'emojiName': 'flag-mv',
		'emojiDescription': 'flag-mv,maldives flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddfc',
		'emojiKey': '1f1f2-1f1fc',
		'emojiName': 'flag-mw',
		'emojiDescription': 'flag-mw,malawi flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddfd',
		'emojiKey': '1f1f2-1f1fd',
		'emojiName': 'flag-mx',
		'emojiDescription': 'flag-mx,mexico flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddfe',
		'emojiKey': '1f1f2-1f1fe',
		'emojiName': 'flag-my',
		'emojiDescription': 'flag-my,malaysia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf2\ud83c\uddff',
		'emojiKey': '1f1f2-1f1ff',
		'emojiName': 'flag-mz',
		'emojiDescription': 'flag-mz,mozambique flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\udde6',
		'emojiKey': '1f1f3-1f1e6',
		'emojiName': 'flag-na',
		'emojiDescription': 'flag-na,namibia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\udde8',
		'emojiKey': '1f1f3-1f1e8',
		'emojiName': 'flag-nc',
		'emojiDescription': 'flag-nc,new caledonia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddea',
		'emojiKey': '1f1f3-1f1ea',
		'emojiName': 'flag-ne',
		'emojiDescription': 'flag-ne,niger flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddeb',
		'emojiKey': '1f1f3-1f1eb',
		'emojiName': 'flag-nf',
		'emojiDescription': 'flag-nf,norfolk island flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddec',
		'emojiKey': '1f1f3-1f1ec',
		'emojiName': 'flag-ng',
		'emojiDescription': 'flag-ng,nigeria flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddee',
		'emojiKey': '1f1f3-1f1ee',
		'emojiName': 'flag-ni',
		'emojiDescription': 'flag-ni,nicaragua flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddf1',
		'emojiKey': '1f1f3-1f1f1',
		'emojiName': 'flag-nl',
		'emojiDescription': 'flag-nl,netherlands flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddf4',
		'emojiKey': '1f1f3-1f1f4',
		'emojiName': 'flag-no',
		'emojiDescription': 'flag-no,norway flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddf5',
		'emojiKey': '1f1f3-1f1f5',
		'emojiName': 'flag-np',
		'emojiDescription': 'flag-np,nepal flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddf7',
		'emojiKey': '1f1f3-1f1f7',
		'emojiName': 'flag-nr',
		'emojiDescription': 'flag-nr,nauru flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddfa',
		'emojiKey': '1f1f3-1f1fa',
		'emojiName': 'flag-nu',
		'emojiDescription': 'flag-nu,niue flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf3\ud83c\uddff',
		'emojiKey': '1f1f3-1f1ff',
		'emojiName': 'flag-nz',
		'emojiDescription': 'flag-nz,new zealand flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf4\ud83c\uddf2',
		'emojiKey': '1f1f4-1f1f2',
		'emojiName': 'flag-om',
		'emojiDescription': 'flag-om,oman flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\udde6',
		'emojiKey': '1f1f5-1f1e6',
		'emojiName': 'flag-pa',
		'emojiDescription': 'flag-pa,panama flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddea',
		'emojiKey': '1f1f5-1f1ea',
		'emojiName': 'flag-pe',
		'emojiDescription': 'flag-pe,peru flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddeb',
		'emojiKey': '1f1f5-1f1eb',
		'emojiName': 'flag-pf',
		'emojiDescription': 'flag-pf,french polynesia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddec',
		'emojiKey': '1f1f5-1f1ec',
		'emojiName': 'flag-pg',
		'emojiDescription': 'flag-pg,papua new guinea flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\udded',
		'emojiKey': '1f1f5-1f1ed',
		'emojiName': 'flag-ph',
		'emojiDescription': 'flag-ph,philippines flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf0',
		'emojiKey': '1f1f5-1f1f0',
		'emojiName': 'flag-pk',
		'emojiDescription': 'flag-pk,pakistan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf1',
		'emojiKey': '1f1f5-1f1f1',
		'emojiName': 'flag-pl',
		'emojiDescription': 'flag-pl,poland flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf2',
		'emojiKey': '1f1f5-1f1f2',
		'emojiName': 'flag-pm',
		'emojiDescription': 'flag-pm,st. pierre & miquelon flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf3',
		'emojiKey': '1f1f5-1f1f3',
		'emojiName': 'flag-pn',
		'emojiDescription': 'flag-pn,pitcairn islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf7',
		'emojiKey': '1f1f5-1f1f7',
		'emojiName': 'flag-pr',
		'emojiDescription': 'flag-pr,puerto rico flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf8',
		'emojiKey': '1f1f5-1f1f8',
		'emojiName': 'flag-ps',
		'emojiDescription': 'flag-ps,palestinian territories flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddf9',
		'emojiKey': '1f1f5-1f1f9',
		'emojiName': 'flag-pt',
		'emojiDescription': 'flag-pt,portugal flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddfc',
		'emojiKey': '1f1f5-1f1fc',
		'emojiName': 'flag-pw',
		'emojiDescription': 'flag-pw,palau flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf5\ud83c\uddfe',
		'emojiKey': '1f1f5-1f1fe',
		'emojiName': 'flag-py',
		'emojiDescription': 'flag-py,paraguay flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf6\ud83c\udde6',
		'emojiKey': '1f1f6-1f1e6',
		'emojiName': 'flag-qa',
		'emojiDescription': 'flag-qa,qatar flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf7\ud83c\uddea',
		'emojiKey': '1f1f7-1f1ea',
		'emojiName': 'flag-re',
		'emojiDescription': 'flag-re,r\u00e9union flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf7\ud83c\uddf4',
		'emojiKey': '1f1f7-1f1f4',
		'emojiName': 'flag-ro',
		'emojiDescription': 'flag-ro,romania flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf7\ud83c\uddf8',
		'emojiKey': '1f1f7-1f1f8',
		'emojiName': 'flag-rs',
		'emojiDescription': 'flag-rs,serbia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf7\ud83c\uddfa',
		'emojiKey': '1f1f7-1f1fa',
		'emojiName': 'ru',
		'emojiDescription': 'ru,flag-ru,russia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf7\ud83c\uddfc',
		'emojiKey': '1f1f7-1f1fc',
		'emojiName': 'flag-rw',
		'emojiDescription': 'flag-rw,rwanda flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\udde6',
		'emojiKey': '1f1f8-1f1e6',
		'emojiName': 'flag-sa',
		'emojiDescription': 'flag-sa,saudi arabia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\udde7',
		'emojiKey': '1f1f8-1f1e7',
		'emojiName': 'flag-sb',
		'emojiDescription': 'flag-sb,solomon islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\udde8',
		'emojiKey': '1f1f8-1f1e8',
		'emojiName': 'flag-sc',
		'emojiDescription': 'flag-sc,seychelles flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\udde9',
		'emojiKey': '1f1f8-1f1e9',
		'emojiName': 'flag-sd',
		'emojiDescription': 'flag-sd,sudan flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddea',
		'emojiKey': '1f1f8-1f1ea',
		'emojiName': 'flag-se',
		'emojiDescription': 'flag-se,sweden flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddec',
		'emojiKey': '1f1f8-1f1ec',
		'emojiName': 'flag-sg',
		'emojiDescription': 'flag-sg,singapore flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\udded',
		'emojiKey': '1f1f8-1f1ed',
		'emojiName': 'flag-sh',
		'emojiDescription': 'flag-sh,st. helena flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddee',
		'emojiKey': '1f1f8-1f1ee',
		'emojiName': 'flag-si',
		'emojiDescription': 'flag-si,slovenia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddef',
		'emojiKey': '1f1f8-1f1ef',
		'emojiName': 'flag-sj',
		'emojiDescription': 'flag-sj,svalbard & jan mayen flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf0',
		'emojiKey': '1f1f8-1f1f0',
		'emojiName': 'flag-sk',
		'emojiDescription': 'flag-sk,slovakia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf1',
		'emojiKey': '1f1f8-1f1f1',
		'emojiName': 'flag-sl',
		'emojiDescription': 'flag-sl,sierra leone flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf2',
		'emojiKey': '1f1f8-1f1f2',
		'emojiName': 'flag-sm',
		'emojiDescription': 'flag-sm,san marino flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf3',
		'emojiKey': '1f1f8-1f1f3',
		'emojiName': 'flag-sn',
		'emojiDescription': 'flag-sn,senegal flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf4',
		'emojiKey': '1f1f8-1f1f4',
		'emojiName': 'flag-so',
		'emojiDescription': 'flag-so,somalia flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf7',
		'emojiKey': '1f1f8-1f1f7',
		'emojiName': 'flag-sr',
		'emojiDescription': 'flag-sr,suriname flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf8',
		'emojiKey': '1f1f8-1f1f8',
		'emojiName': 'flag-ss',
		'emojiDescription': 'flag-ss,south sudan flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddf9',
		'emojiKey': '1f1f8-1f1f9',
		'emojiName': 'flag-st',
		'emojiDescription': 'flag-st,s\u00e3o tom\u00e9 & pr\u00edncipe flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddfb',
		'emojiKey': '1f1f8-1f1fb',
		'emojiName': 'flag-sv',
		'emojiDescription': 'flag-sv,el salvador flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddfd',
		'emojiKey': '1f1f8-1f1fd',
		'emojiName': 'flag-sx',
		'emojiDescription': 'flag-sx,sint maarten flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddfe',
		'emojiKey': '1f1f8-1f1fe',
		'emojiName': 'flag-sy',
		'emojiDescription': 'flag-sy,syria flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf8\ud83c\uddff',
		'emojiKey': '1f1f8-1f1ff',
		'emojiName': 'flag-sz',
		'emojiDescription': 'flag-sz,eswatini flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\udde6',
		'emojiKey': '1f1f9-1f1e6',
		'emojiName': 'flag-ta',
		'emojiDescription': 'flag-ta,tristan da cunha flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\udde8',
		'emojiKey': '1f1f9-1f1e8',
		'emojiName': 'flag-tc',
		'emojiDescription': 'flag-tc,turks & caicos islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\udde9',
		'emojiKey': '1f1f9-1f1e9',
		'emojiName': 'flag-td',
		'emojiDescription': 'flag-td,chad flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddeb',
		'emojiKey': '1f1f9-1f1eb',
		'emojiName': 'flag-tf',
		'emojiDescription': 'flag-tf,french southern territories flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddec',
		'emojiKey': '1f1f9-1f1ec',
		'emojiName': 'flag-tg',
		'emojiDescription': 'flag-tg,togo flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\udded',
		'emojiKey': '1f1f9-1f1ed',
		'emojiName': 'flag-th',
		'emojiDescription': 'flag-th,thailand flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddef',
		'emojiKey': '1f1f9-1f1ef',
		'emojiName': 'flag-tj',
		'emojiDescription': 'flag-tj,tajikistan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf0',
		'emojiKey': '1f1f9-1f1f0',
		'emojiName': 'flag-tk',
		'emojiDescription': 'flag-tk,tokelau flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf1',
		'emojiKey': '1f1f9-1f1f1',
		'emojiName': 'flag-tl',
		'emojiDescription': 'flag-tl,timor-leste flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf2',
		'emojiKey': '1f1f9-1f1f2',
		'emojiName': 'flag-tm',
		'emojiDescription': 'flag-tm,turkmenistan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf3',
		'emojiKey': '1f1f9-1f1f3',
		'emojiName': 'flag-tn',
		'emojiDescription': 'flag-tn,tunisia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf4',
		'emojiKey': '1f1f9-1f1f4',
		'emojiName': 'flag-to',
		'emojiDescription': 'flag-to,tonga flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf7',
		'emojiKey': '1f1f9-1f1f7',
		'emojiName': 'flag-tr',
		'emojiDescription': 'flag-tr,turkey flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddf9',
		'emojiKey': '1f1f9-1f1f9',
		'emojiName': 'flag-tt',
		'emojiDescription': 'flag-tt,trinidad & tobago flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddfb',
		'emojiKey': '1f1f9-1f1fb',
		'emojiName': 'flag-tv',
		'emojiDescription': 'flag-tv,tuvalu flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddfc',
		'emojiKey': '1f1f9-1f1fc',
		'emojiName': 'flag-tw',
		'emojiDescription': 'flag-tw,taiwan flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddf9\ud83c\uddff',
		'emojiKey': '1f1f9-1f1ff',
		'emojiName': 'flag-tz',
		'emojiDescription': 'flag-tz,tanzania flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\udde6',
		'emojiKey': '1f1fa-1f1e6',
		'emojiName': 'flag-ua',
		'emojiDescription': 'flag-ua,ukraine flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddec',
		'emojiKey': '1f1fa-1f1ec',
		'emojiName': 'flag-ug',
		'emojiDescription': 'flag-ug,uganda flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddf2',
		'emojiKey': '1f1fa-1f1f2',
		'emojiName': 'flag-um',
		'emojiDescription': 'flag-um,u.s. outlying islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddf3',
		'emojiKey': '1f1fa-1f1f3',
		'emojiName': 'flag-un',
		'emojiDescription': 'flag-un,united nations flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddf8',
		'emojiKey': '1f1fa-1f1f8',
		'emojiName': 'us',
		'emojiDescription': 'us,flag-us,united states flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddfe',
		'emojiKey': '1f1fa-1f1fe',
		'emojiName': 'flag-uy',
		'emojiDescription': 'flag-uy,uruguay flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfa\ud83c\uddff',
		'emojiKey': '1f1fa-1f1ff',
		'emojiName': 'flag-uz',
		'emojiDescription': 'flag-uz,uzbekistan flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\udde6',
		'emojiKey': '1f1fb-1f1e6',
		'emojiName': 'flag-va',
		'emojiDescription': 'flag-va,vatican city flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\udde8',
		'emojiKey': '1f1fb-1f1e8',
		'emojiName': 'flag-vc',
		'emojiDescription': 'flag-vc,st. vincent & grenadines flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\uddea',
		'emojiKey': '1f1fb-1f1ea',
		'emojiName': 'flag-ve',
		'emojiDescription': 'flag-ve,venezuela flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\uddec',
		'emojiKey': '1f1fb-1f1ec',
		'emojiName': 'flag-vg',
		'emojiDescription': 'flag-vg,british virgin islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\uddee',
		'emojiKey': '1f1fb-1f1ee',
		'emojiName': 'flag-vi',
		'emojiDescription': 'flag-vi,u.s. virgin islands flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\uddf3',
		'emojiKey': '1f1fb-1f1f3',
		'emojiName': 'flag-vn',
		'emojiDescription': 'flag-vn,vietnam flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddfb\ud83c\uddfa',
		'emojiKey': '1f1fb-1f1fa',
		'emojiName': 'flag-vu',
		'emojiDescription': 'flag-vu,vanuatu flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfc\ud83c\uddeb',
		'emojiKey': '1f1fc-1f1eb',
		'emojiName': 'flag-wf',
		'emojiDescription': 'flag-wf,wallis & futuna flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfc\ud83c\uddf8',
		'emojiKey': '1f1fc-1f1f8',
		'emojiName': 'flag-ws',
		'emojiDescription': 'flag-ws,samoa flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfd\ud83c\uddf0',
		'emojiKey': '1f1fd-1f1f0',
		'emojiName': 'flag-xk',
		'emojiDescription': 'flag-xk,kosovo flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddfe\ud83c\uddea',
		'emojiKey': '1f1fe-1f1ea',
		'emojiName': 'flag-ye',
		'emojiDescription': 'flag-ye,yemen flag',
		'hasVideo': true
	},
	{
		'emoji': '\ud83c\uddfe\ud83c\uddf9',
		'emojiKey': '1f1fe-1f1f9',
		'emojiName': 'flag-yt',
		'emojiDescription': 'flag-yt,mayotte flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddff\ud83c\udde6',
		'emojiKey': '1f1ff-1f1e6',
		'emojiName': 'flag-za',
		'emojiDescription': 'flag-za,south africa flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddff\ud83c\uddf2',
		'emojiKey': '1f1ff-1f1f2',
		'emojiName': 'flag-zm',
		'emojiDescription': 'flag-zm,zambia flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\uddff\ud83c\uddfc',
		'emojiKey': '1f1ff-1f1fc',
		'emojiName': 'flag-zw',
		'emojiDescription': 'flag-zw,zimbabwe flag',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f',
		'emojiKey': '1f3f4-e0067-e0062-e0065-e006e-e0067-e007f',
		'emojiName': 'england flag',
		'emojiDescription': 'england flag,flag-england',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f',
		'emojiKey': '1f3f4-e0067-e0062-e0073-e0063-e0074-e007f',
		'emojiName': 'scotland flag',
		'emojiDescription': 'scotland flag,flag-scotland',
		'hasVideo': false
	},
	{
		'emoji': '\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f',
		'emojiKey': '1f3f4-e0067-e0062-e0077-e006c-e0073-e007f',
		'emojiName': 'wales flag',
		'emojiDescription': 'wales flag,flag-wales',
		'hasVideo': false
	}
];

export const keyedByEmoji = keyBy(emojiData, 'emoji');