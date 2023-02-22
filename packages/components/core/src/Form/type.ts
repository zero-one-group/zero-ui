export type FormLayoutType = 'vertical' | 'horizontal';

export type FormDisabledContextType = {
  disabled?: boolean;
};

export type FormContextType = {
  layout?: FormLayoutType;
  labelCol?: number;
  wrapperCol?: number;
  size?: 'sm' | 'md' | 'lg';
};

export type FormItemContextType = {
  isInvalid?: boolean;
  isWarning?: boolean;
  required?: boolean;
} & Pick<FormContextType, 'size'>;
