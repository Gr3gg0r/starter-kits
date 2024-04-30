import { ObjectId } from 'mongodb';
import { getDatabaseContext } from '../../../database';
import { GraphQLMutationResolvers } from '../definitions';

const mutation: GraphQLMutationResolvers['createLife'] = async (
    _,
    { firstName, lastName, hobbies, birthday, description, title },
    __
) => {
    const { collections } = await getDatabaseContext();

    const operation = await collections.lives.insertOne({
        _id: new ObjectId(),
        firstName,
        lastName,
        hobbies,
        birthday,
        description,
        title,
    });

    const life = await collections.lives.findOne({ _id: operation.insertedId });

    return life;
};

export default mutation;
