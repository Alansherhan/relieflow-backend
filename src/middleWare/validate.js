/**
 * Zod validation middleware
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    console.log('result.error::', result.error);
    return res.status(400).json({
      success: false,
      // message: 'Validation failed',
      errors: result.error.errors.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  // Use the parsed/validated data
  req.body = result.data;
  next();
};
