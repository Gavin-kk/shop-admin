import React, {
  FC, ReactElement, memo, useState,
} from 'react';
import {
  Input, Select,
} from 'antd';

const { Option } = Select;

type Currency = 'rmb' | 'dollar';

interface PriceValue {
  number?: number;
  currency?: Currency;
}

interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
  initValue?: number
}

const PriceInput: FC<PriceInputProps> = ({ initValue, value = {}, onChange }): ReactElement => {
  const [number, setNumber] = useState<number>();
  const [currency, setCurrency] = useState<Currency>('rmb');

  const triggerChange = (changedValue: PriceValue) => {
    onChange?.({
      number, currency, ...value, ...changedValue,
    });
  };
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = parseInt(e.target.value || '0', 10);
    if (Number.isNaN(number)) {
      return;
    }
    if (!('number' in value)) {
      setNumber(newNumber);
    }
    triggerChange({ number: newNumber });
  };

  const onCurrencyChange = (newCurrency: Currency) => {
    if (!('currency' in value)) {
      setCurrency(newCurrency);
    }
    triggerChange({ currency: newCurrency });
  };
  return (
    <span>
      <Input
        type="text"
        value={value.number || number}
        onChange={onNumberChange}
        style={{ width: 200 }}
        placeholder={initValue ? String(initValue) : '请输入价格'}
      />
      <Select
        value={value.currency || currency}
        style={{ width: 80, margin: '0 8px' }}
        onChange={onCurrencyChange}
      >
        <Option value="rmb">RMB</Option>
      </Select>
    </span>
  );
};

export default memo(PriceInput);
