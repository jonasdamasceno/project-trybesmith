type ServiceResponseErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: { message: string }
};

export type ServiceResponseSucces<Type> = {
  status: 'SUCCESFUL',
  data: Type
};

export type ServiceResponse<Type> = ServiceResponseError | ServiceResponseSucces<Type>;