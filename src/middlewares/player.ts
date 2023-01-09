import Firebase from 'config/firebase';
import { PlayerPosition } from 'enums';
import { NextFunction, Request, Response } from 'express';
import { YUPPlayer } from 'interfaces/player';
import * as yup from 'yup';

const playerYupSchema: yup.SchemaOf<YUPPlayer> = yup.object({
  firstName: yup
    .string()
    .required('First Name is required.')
    .min(2, 'First name is too short - should be 2 chars minimum.')
    .max(30, 'First name is too long - should be 30 chars maximum.')
    .when('$onUpdate', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('firstName is required'),
    }),
  lastName: yup
    .string()
    .required('Last Name is required.')
    .min(2, 'Last name is too short - should be 2 chars minimum.')
    .max(30, 'Last name is too long - should be 30 chars maximum.')
    .when('$onUpdate', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('lastName is required'),
    }),
  position: yup
    .mixed<PlayerPosition>()
    .required('Position is required.')
    .oneOf(Object.values(PlayerPosition), 'Position is not valid')
    .when('$onUpdate', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('position is required'),
    }),
  skill: yup
    .number()
    .required('Skill is required.')
    .min(0, 'Skill should be between 0 and 100')
    .max(100, 'Skill should be between 0 and 100')
    .integer()
    .when('$onUpdate', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('skill is required'),
    }),
  profileImage: yup
    .string()
    .url('Profile image should be a valid URL')
    .when('$onUpdate', {
      is: true,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required('profileImage is required'),
    }),
});

const validatePlayerSchema = async (req: Request, res: Response, next: NextFunction) => {
  const { firebaseUid } = res.locals;
  try {
    await playerYupSchema.validate(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        skill: req.body.skill,
        profileImage: req.body.profileImage,
      },
      {
        context: {
          onUpdate: req.method === 'PATCH',
        },
      },
    );
    next();
  } catch (error) {
    try {
      if (req.method === 'PATCH') throw new Error('Invalid player data');
      Firebase.auth().deleteUser(firebaseUid);
    } catch (error) {
      console.log('Remove Firebase Account Error - ', error);
    }
    if (error instanceof Error) return res.boom.internal(error.message);
    return res.boom.internal(String(error));
  }
};

export { validatePlayerSchema };
