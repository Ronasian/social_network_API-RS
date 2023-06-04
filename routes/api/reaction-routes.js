const router = require('express').Router();
const Reaction = require('../../models/Reaction');

// POST new reaction to a thought
router.post('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;
    const reaction = await Reaction.create(req.body);
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: reaction._id } },
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE reaction from a thought
router.delete('/:thoughtId/:reactionId', async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params;
    await Reaction.findByIdAndDelete(reactionId);
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: reactionId } },
      { new: true }
    );
    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
