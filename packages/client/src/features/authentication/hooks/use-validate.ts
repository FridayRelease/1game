import { FormEvent, useEffect, useMemo, useState } from 'react';
import { clearObject, isEmptyObject } from '@/utils/functions';
import { InferType } from 'yup';

interface IProps {
  initValues?: Record<string, any>;
  validationSchema?: InferType<any>;
}

const useForm = (props: IProps) => {
  const { initValues = {}, validationSchema = {} } = props;
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const getFieldValue = (field: string): string => values[field] ?? '';

  const getFieldProps = (field: string): Record<string, any> => ({
    name: field,
    value: getFieldValue(field),
    error: getFieldError(field),
    onChange: (e: React.FocusEvent<HTMLInputElement>) => onChange(e),
  });

  const getFieldError = (field: string): string => {
    return getFieldTouched(field) ? Object.entries(errors).find(([key]) => key === field)?.[1] : '';
  };

  const getFieldTouched = (field: string): boolean => !!touched[field] ?? false;

  const setValueField = (field: string, value: string | number): void => {
    setValues(prev => ({
      ...prev,
      [field]: value,
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
    setValueField(elements.name, elements.value);
  };

  const onChangeForm = (e: FormEvent): void => {
    const elements = e.target as HTMLInputElement;

    setTouchedField(elements.name);
    setValueField(elements.name, elements.value);
  };

  const yupValidate = () => {
    validationSchema.validate(values, { abortEarly: false }).then(function() {
      setErrors({});
    }).catch((err: { inner: any[]; }) => {
      const error = err.inner.reduce((acc, item) => {
        return { ...acc, [item.path]: item.message }
      }, {});

      setErrors(error)
    });
  }

  useEffect(() => {
    yupValidate()
  }, [values])

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
    onChangeForm,
    getFieldValue,
    getFieldProps,
    getFieldError,
    getFieldTouched,
    onBlurInput,
  };
};

export default useForm;
