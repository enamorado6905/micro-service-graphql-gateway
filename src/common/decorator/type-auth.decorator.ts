import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsUniqueAuthType(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueAuthType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Here you can call your service or repository to check if the value is unique
          // For example, it could be something like this:
          // const isUnique = await myService.isUniqueAuthType(value);
          // return isUnique;

          // But for this example, we'll just check if the value equals 'AZURE_AD'
          return value === 'AZURE_AD';
        },
      },
    });
  };
}
