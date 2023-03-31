import { FormEvent, useMemo, useState } from 'react';
import { validatorInstance } from '@/features/validation/validator';
import { clearObject, isEmptyObject } from '@/utils/functions';

interface IProps {
  initValues?: Record<string, any>;
  validationSchema?: Record<string, any>;
}

const useForm = (props: IProps) => {
  const { initValues = {}, validationSchema = {} } = props;
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<Record<string, any>>({});

  const getFieldValue = (field: string): string => values[field] ?? '';

  const getFieldProps = (field: string): Record<string, any> => ({
    name: field,
    value: getFieldValue(field),
    onChange: (e: React.FocusEvent<HTMLInputElement>) => onChange(e),
  });

  const getFieldError = (field: string): string => {
    return getFieldTouched(field) ? validatorInstance.checkCorrect(values[field] ?? '', validationSchema[field]) : '';
  };

  const getFieldTouched = (field: string): boolean => !!touched[field] ?? false;

  const setValueField = (field: string, value: string | number): void => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const setErrorField = (field: string, value: string | number): void => {
    setErrors(prev => ({
      ...prev,
      [field]: validatorInstance.checkCorrect(value.toString(), validationSchema[field]),
    }));
  };

  const setTouchedField = (field: string, value = true): void => {
    setTouched(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const onChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const elements = e.target as HTMLInputElement;

    setTouchedField(elements.name);
    setErrorField(elements.name, elements.value);
    setValueField(elements.name, elements.value);
  };

  const onChangeForm = (e: FormEvent): void => {
    const elements = e.target as HTMLInputElement;

    setTouchedField(elements.name);
    setErrorField(elements.name, elements.value);
    setValueField(elements.name, elements.value);
  };

  /** Функция валидирует все значения формы и устанавливает всем touched: true */
  const validate = (): Record<string, string> => {
    const errors = Object.keys(validationSchema).reduce((acc, key) => {
      const error = validatorInstance.checkCorrect(values[key] ?? '', validationSchema[key]);
      setTouchedField(key);
      return error ? { ...acc, [key]: error } : acc;
    }, {});

    setErrors(errors);

    return errors;
  };

  const onBlurInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    const elements = event.target as HTMLInputElement;
    setTouchedField(elements.name);
  };

  const hasError = useMemo(() => isEmptyObject(clearObject(errors)), [errors, values, touched]);

  return {
    values,
    touched,
    errors,
    hasError,
    validate,
    onChangeForm,
    getFieldValue,
    getFieldProps,
    getFieldError,
    getFieldTouched,
    onBlurInput,
  };
};

export default useForm;
