import { GraphQLScalarType } from 'graphql';
import { GraphQLUpload } from 'graphql-upload';

const UploadType = new GraphQLScalarType({
  ...GraphQLUpload,
  name: 'Upload',
});

export { UploadType };