import React, {useEffect, useState} from 'react';
import {List, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import './customSelect.css';

interface IProps {
  name: string | undefined;
  value: string | undefined;
  label: string;
  onChange: (name: string, value: { hydra_id: number; name: string } | null) => void;
  options: { hydra_id: number; name: string }[];
}

const CustomSelect: React.FC<IProps> = ({name, value, label, options, onChange}) => {
  const [select, setSelect] = useState('');
  const [currentValue, setCurrentValue] = useState('');

  const toggleOptions = (state: string) => {
    if (state) {
      return setSelect(state);
    }
  };

  useEffect(() => {
    if (value) setCurrentValue(value);
    document.addEventListener('click', () => toggleOptions('closed'));
  }, [value]);

  const getCurrentOption = (name: string) => {
    const obj = options?.filter(option => option.name === name)[0] || null;
    setCurrentValue(obj?.name);
    return obj;
  };

  return (
    <div className='custom-select'>
      <TextField
        label={label}
        value={currentValue}
        onChange={(e) => {
          setCurrentValue(e.target.value);
          onChange(name || '', {name: '', hydra_id: -1});
        }}
        style={{width: '100%'}}
        onClick={(e) => {
          e.stopPropagation();
          setSelect('open');
        }}
        autoComplete="off"
      />
      <List className={`select-options-${select}`}>
        {options.map((item) => item.name)?.filter((item) => item.includes(currentValue || ''))
          .map((option: string, i: number) => (
            <ListItem disablePadding onClick={() => onChange(name || '', getCurrentOption(option))} key={i}>
              <ListItemButton component="a" href="#simple-list">
                <ListItemText
                  // @ts-ignore
                  primary={option}/>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );
};

export default CustomSelect;