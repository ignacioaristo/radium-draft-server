import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';

import { PlayerPosition } from 'src/enums';
import { YUPPlayer } from 'src/interfaces/player';

const playerYupSchema: yup.SchemaOf<YUPPlayer> = yup.object({
  firstName: yup
    .string()
    .required('First Name is required.')
    .min(2, 'First name is too short - should be 2 chars minimum.')
    .max(30, 'First name is too long - should be 30 chars maximum.'),
  lastName: yup
    .string()
    .required('Last Name is required.')
    .min(2, 'Last name is too short - should be 2 chars minimum.')
    .max(30, 'Last name is too long - should be 30 chars maximum.'),
  position: yup
    .mixed<PlayerPosition>()
    .required('Position is required.')
    .oneOf(Object.values(PlayerPosition), 'Position is not valid'),
  skill: yup
    .number()
    .required('Skill is required.')
    .min(0, 'Skill should be between 0 and 100')
    .max(100, 'Skill should be between 0 and 100')
    .integer(),
});

const validatePlayerSchema = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await playerYupSchema.validate(
      {
        firstName: req.body.party,
      },
      {
        strict: true,
      },
    );
    next();
  } catch (error) {
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export { validatePlayerSchema };
