const express = require('express');
const router = express.Router();
const Manga = require('../models/mangaModel');

// Create a new manga
router.post('/mangas', async (req, res) => {
  try {
    const newManga = await Manga.create(req.body);
    res.status(201).json(newManga);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all mangas
router.get('/mangas', async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single manga
router.get('/mangas/:id', async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);
    if (manga) {
      res.json(manga);
    } else {
      res.status(404).json({ message: 'Manga not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a manga
router.put('/mangas/:id', async (req, res) => {
  try {
    const updatedManga = await Manga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedManga) {
      res.json(updatedManga);
    } else {
      res.status(404).json({ message: 'Manga not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a manga
router.delete('/mangas/:id', async (req, res) => {
  try {
    const deletedManga = await Manga.findByIdAndDelete(req.params.id);
    if (deletedManga) {
      res.json(deletedManga);
    } else {
      res.status(404).json({ message: 'Manga not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
