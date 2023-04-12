import { Input } from '@mui/material';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

function QuantityField(props) {
  const { control } = useForm({
    defaultValues: { quantity: 0 },
  });

  return (
    <div className='quantity'>
      <Controller
        name="quantity"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <>
            <button onClick={() => onChange(Math.max(value - 1, 0))}>-</button>
            <Input
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
            />
            <button onClick={() => onChange(value + 1)}>+</button>
          </>
        )}
      />
    </div>
  );
}

export default QuantityField;