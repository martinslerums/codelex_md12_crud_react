import { useId } from "react";
import styles from "./Input.module.css"

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    placeholder?: string;
    type: HTMLInputElement['type']
    required?: boolean;
    label: string;
}

export const Input = ({value, onChange, placeholder, required, type, name, label }: InputProps) => {
    const id = useId()


    return ( 
        <div className={styles.input__wrapper}>
            <label htmlFor={id} className={styles.label}>{label}</label>
            <input
              className={styles.input} 
              id={id}
              placeholder={placeholder}
              type={type}
              name={name} 
              value={value}
              onChange={onChange} 
              required={required}
            />
        </div>
     );
}
 
