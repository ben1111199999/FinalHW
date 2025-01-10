const Participant = require('../models/participant.model');

// 創建參加者
exports.createParticipant = async (req, res) => {
    try {
        console.log('Received participant data:', req.body);
        const newParticipant = new Participant(req.body);
        const savedParticipant = await newParticipant.save();
        
        // 創建後立即獲取包含活動資訊的完整資料
        const populatedParticipant = await Participant
            .findById(savedParticipant._id)
            .populate('eventId', 'title date location description');
            
        console.log('Saved participant:', populatedParticipant);
        res.status(201).json(populatedParticipant);
    } catch (error) {
        console.error('Error creating participant:', error);
        res.status(400).json({ message: error.message });
    }
};

// 獲取所有參加者
exports.getAllParticipants = async (req, res) => {
    try {
        const participants = await Participant
            .find()
            .populate({
                path: 'eventId',
                select: 'title date location description status',
            })
            .sort({ registrationDate: -1 });
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 獲取特定活動的參加者
exports.getEventParticipants = async (req, res) => {
    try {
        const participants = await Participant
            .find({ eventId: req.params.eventId })
            .populate({
                path: 'eventId',
                select: 'title date location description status'
            })
            .sort({ registrationDate: -1 });
        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 更新參加者資料
exports.updateParticipant = async (req, res) => {
    try {
        const participant = await Participant
            .findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            )
            .populate({
                path: 'eventId',
                select: 'title date location description status'
            });

        if (!participant) {
            return res.status(404).json({ message: '找不到該參加者' });
        }
        
        res.status(200).json(participant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// 刪除參加者
exports.deleteParticipant = async (req, res) => {
    try {
        const participant = await Participant.findByIdAndDelete(req.params.id);
        
        if (!participant) {
            return res.status(404).json({ message: '找不到該參加者' });
        }
        
        res.status(200).json({ message: '參加者已成功刪除' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 根據條件搜尋參加者
exports.searchParticipants = async (req, res) => {
    try {
        const { name, email, phone, status } = req.query;
        const searchQuery = {};

        if (name) searchQuery.name = new RegExp(name, 'i');
        if (email) searchQuery.email = new RegExp(email, 'i');
        if (phone) searchQuery.phone = new RegExp(phone, 'i');
        if (status) searchQuery.status = status;

        const participants = await Participant
            .find(searchQuery)
            .populate({
                path: 'eventId',
                select: 'title date location description status'
            })
            .sort({ registrationDate: -1 });

        res.status(200).json(participants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};