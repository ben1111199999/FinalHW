const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant.controller');

// 獲取所有參加者
router.get('/', participantController.getAllParticipants);

// 獲取特定活動的參加者
router.get('/event/:eventId', participantController.getEventParticipants);

// 創建新參加者
router.post('/', participantController.createParticipant);

// 更新參加者資料
router.put('/:id', participantController.updateParticipant);

// 刪除參加者
router.delete('/:id', participantController.deleteParticipant);

module.exports = router;