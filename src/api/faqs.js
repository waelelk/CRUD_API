const express = require('express');
const monk = require('monk');
const joi = require('@hapi/joi');

// connect to youe db

const schema = joi.object({
    question: joi.string().trim().required(),
    answer: joi.string().trim().required(),
});

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const items = await faqs.find({});
        res.json(items);
    } catch (error){
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const item = await faqs.findOne({
            _id: id,
        });
        if(!item) return next();
        return res.json(item);
      } catch (error){
          next(error);
      }
});

router.post('/', async (req, res, next) => {
    try{
        const value = await schema.validateAsync(req.body);
        const inserted = await faqs.insert(value);
        res.json(inserted);
    } catch (error){
        next(error)
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        faqs.findOne({
            _id: id,
        });
        if(!item) return next();
        const updated = await faqs.update({
            _id: id,
        }, {
            $set: {
                value,
            }
        });
        res.json(value);
      } catch (error){
          next(error);
      }
});

router.delete('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        await faqs.remove({ _id: id });
        res.json({
            message: 'Success',
        })

    } catch (error){
        next(error)
    }
});

module.exports = router;