export const messageValidator = {
  formMessage: {
    minLength: 5, // Default minLength, change as necessary
    maxLength: 50, // Default maxLength, change as necessary
    maxFileSize: 10, // Default maxFileSize in MB, change as necessary
    extensionsAllowedFile: 'pdf,docx,jpg', // Default allowed file extensions, change as necessary
  },

  actionMessage: {},

  systemMessages: {},

  getMinLength(min: number) {
    return this.formMessage.minLength + min; // Use the default minLength and add the argument value
  },
  getMaxLength(max: number) {
    return this.formMessage.maxLength + max; // Use the default maxLength and add the argument value
  },
  getMaxFileSize(max: number) {
    return this.formMessage.maxFileSize + max + 'MB'; // Use the default maxFileSize, add the argument value, and append 'MB'
  },
  getExtensionsAllowed(extensions: string) {
    return this.formMessage.extensionsAllowedFile + ', ' + extensions; // Append additional extensions to the default allowed list
  },
  getUniqueMessage(entityName?: string, message?: string) {
    return message ? message : `${entityName} bd`; // Return custom message or default format
  },
};
