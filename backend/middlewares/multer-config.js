const multer = require('multer');
const sharpMulter = require('sharp-multer');

const MIME_TYPES = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
};

const storage = sharpMulter({
	destination: (req, file, callback) => {
		callback(null, 'images');
	},
	imageOptions: {
		fileFormat: 'webp',
		quality: 80,
		resize: { width: 500, height: 700, },
		useTimestamp: true,
	},
});

const fileFilter = (req, file, callback) => {
	if (!MIME_TYPES[file.mimetype]) {
		callback(new Error('Veuillez passer un fichier valide'));
	} else {
		callback(null, true);
	}
};

module.exports = multer({ storage: storage, fileFilter: fileFilter }).single('image');