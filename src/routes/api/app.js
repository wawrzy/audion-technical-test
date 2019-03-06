const router = require('express').Router();
const boom = require('boom');

const asyncErrors = require('../../middlewares/error');
const logger = require('../../config/winston');

const { linker } = require('../../helpers/linker');

/**
 * @api {post} /api/link/interests
 * @apiParam {Object[]} Interests Array of interests points
 * @apiName Link interests
 * @apiGroup App
 *
 * @apiSuccess (200) {Object[]} Interests Interests points linked with events
 */
router.post('/link/interests', asyncErrors(async (req, res) => {
  const data = req.body;

  if (!data || !Array.isArray(data))
    throw boom.badRequest('Body should be an array');

  try {
    const links = await linker(data);

    res.send(links);
  } catch (err) {
    logger.error(err.message);
    throw boom.internal('Internal');
  }
}));

module.exports = router;
