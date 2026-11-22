const ContactMessage = require('../models/ContactMessage');

exports.createMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json({ message: 'Your message has been saved.', record: message });
  } catch (error) {
    res.status(400).json({ message: 'Please check the form details.', error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ submittedAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch messages.', error: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid message ID.', error: error.message });
  }
};
