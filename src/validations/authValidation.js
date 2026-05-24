import { Segments, Joi } from 'celebrate';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    username: Joi.string().trim(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
