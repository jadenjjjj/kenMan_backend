const mongoose = require('mongoose');
const Manga = require('./mangaModel');

mongoose.connect('mongodb://localhost:27017/mangaDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
}).then(async () => {
  console.log('MongoDB connected.');
  const sampleData = [
    {
      title: 'Attack on Titan',
      author: 'Hajime Isayama',
      genre: 'Action, Drama, Fantasy',
      status: 'ongoing',
      rating: 9,
      description: 'In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy joins the Survey Corps to fight against the Titans and uncover the secrets of the mysterious creatures.',
      coverImage: 'https://example.com/cover1.jpg',
      createdAt: new Date()
    },
    {
      title: 'One Piece',
      author: 'Eiichiro Oda',
      genre: 'Action, Adventure, Comedy',
      status: 'ongoing',
      rating: 8,
      description: 'Follow the adventures of Monkey D. Luffy and his pirate crew as they search for the ultimate treasure, the One Piece.',
      coverImage: 'https://example.com/cover2.jpg',
      createdAt: new Date()
    },
    {
      title: 'Naruto',
      author: 'Masashi Kishimoto',
      genre: 'Action, Adventure, Fantasy',
      status: 'completed',
      rating: 7,
      description: 'Follow the journey of Naruto Uzumaki, a young ninja who dreams of becoming the Hokage, the strongest ninja in his village.',
      coverImage: 'https://example.com/cover3.jpg',
      createdAt: new Date()
    }
  ];
  await Manga.insertMany(sampleData);
  console.log('Sample data inserted.');
  mongoose.connection.close();
}).catch((error) => {
  console.log(error);
});
